import mongoose from "mongoose";
import usermodel from "../models/usersmodel.js";
import modelss from "../models/models.js";
import { setUser } from "../service/auth.js"

async function createUser(req, res) {
  try {
    const { name, emailNumber, password, reEnterPassword } = req.body;

    const existingemaiNumber = await usermodel.findOne({
      emailNumber: emailNumber,
    });

    if (existingemaiNumber) {
      return res.render("signUp.ejs", {
        error: "This email is already been used",
      });
    }
    if (password == reEnterPassword) {
      await usermodel.create({
        name:name,
        emailNumber:emailNumber,
        password:password,
      })
      res.status(201).render("signUpsuccessful.ejs");
    } else {
      res.render("signUp", {
        error: "Your passwords doesn't match with each other",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Duplicate key error: " + error.message);
    } else {
      res.status(500).send("Error creating user: " + error.message);
    }
  }
}

async function loginRoute(req, res) {
  const emailNumber = req.body.emailNumber;
  const password = req.body.password;
  if( !emailNumber || !password) return res.redirect("/login")
  try{
  const userlogged = await usermodel.findOne({ emailNumber: emailNumber, password: password });
  if (!userlogged) {
    // If no user found, handle the case (redirect, render an error page, etc.)
    return res.render("logIn.ejs",{
      error:"Your email or phone number and password doesn't match"
    });
  }
  const token=setUser(userlogged)
  res.cookie("uid",token)
  console.log(userlogged)
  res.redirect("/");
} catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

export{createUser, loginRoute} ;
