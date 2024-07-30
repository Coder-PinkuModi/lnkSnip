import express from "express"
import jwt from "jsonwebtoken"
import modelss from "../models/models.js"
import usermodel from "../models/usersmodel.js";

const app= express()

async function homepage(req,res){
  try {
    const user = req.user;
    if (!user) {
        return res.render("index");
    }

    const usersDetail= await usermodel.findOne({_id: user._id})

    const urls = await modelss.find({ createdBy: user._id });

    const filteredUrls = urls.filter(url => url.createdBy);
    if(!urls) return res.render("index")
    return res.render("index", {
        urls: filteredUrls,
        name:usersDetail.name
    });
} catch (error) {
    res.status(500).send("Internal Server Error");
}
}

async function signinPage(req,res){
    return res.render("logIn")
}

async function signupPage(req,res){
    return res.render("signUp")
}


export { homepage, signinPage, signupPage }