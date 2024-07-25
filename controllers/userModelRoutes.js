import usermodel from "../models/usersmodel.js";
import bcrypt from "bcrypt"
import { setUser } from "../service/auth.js"

async function createUser(req, res) {
  try {
    const { name, email, password, reEnterPassword } = req.body;

    const existingemail = await usermodel.findOne({
      email: email,
    });

    if (existingemail) {
      return res.render("signUp.ejs", {
        error: "This email is already been used",
      });
    }
    if (password == reEnterPassword) {

      const saltRounds = process.env.SALTROUNDSFORPASSWORDHASING;
      const plainPassword = password;

    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);


      await usermodel.create({ // storing data in MongoDb
        name:name,
        email:email,
        password:hashedPassword,
      })
      res.status(201).render("signUpsuccessful.ejs");
    } else {
      res.render("signUp", {
        error: "Your entered passwords doesn't match",
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
  const email = req.body.email;
  const password = req.body.password;
  if( !email || !password) return res.redirect("/login")
  try{
  const userlogged = await usermodel.findOne({ email: email});
  if (!userlogged) {
    // If no user found, handle the case (redirect, render an error page, etc.)
    return res.render("logIn.ejs",{
      error:"Invalid credentials provided"
    });
  }

  const hashPassword= await bcrypt.compare(password,userlogged.password)
  
  
  if (!hashPassword) {
    return res.render("logIn.ejs", {
      error: "Your email or phone number and password don't match",
    });
  }
  
  if(hashPassword){
  const token=setUser(userlogged)
  res.cookie("uid",token)
  console.log(userlogged)
  res.redirect("/");
  } else{
    return res.render("logIn.ejs",{
      error:"Provided Password is wrong"
    })
  }
} catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

export{createUser, loginRoute} ;
