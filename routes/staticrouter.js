import express from "express"
import jwt from "jsonwebtoken"
import modelss from "../models/models.js"
const app= express()

async function homepage(req,res){
  try {
    const user = req.user;
    if (!user) {
        return res.render("homee");
    }

    const urls = await modelss.find({ createdBy: user._id });
    console.log('Fetched URLs:', urls);

    const filteredUrls = urls.filter(url => url.createdBy);

    if(!urls) return res.render("homee")
    return res.render("homee", {
        urls: filteredUrls,
        user:user.name
    });
} catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).send("Internal Server Error");
}
}

async function signinPage(req,res){
    return res.render("login")
}

async function signupPage(req,res){
    return res.render("signUp")
}


export { homepage, signinPage, signupPage }