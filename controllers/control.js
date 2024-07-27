import modelss from "../models/models.js";
import { getUser } from "../service/auth.js";
import { nanoid } from "nanoid";

async function createId(req, res) {
  try {
    const userUid = req.cookies?.uid;
    if (!userUid) return res.redirect("api/login");
    const user = getUser(userUid);
    if(!user) return res.redirect("api/login")

    const shortid = nanoid(9);
    const Url = req.body.url;
    const userId = user._id;
    if (!userId) return res.redirect("api/login");
    if (!Url) {
      return res.status(400).json("User didn't provide URL");
    }

    // Check if the URL already exists in the database
    const existingUrl = await modelss.findOne({ url: Url, createdBy: userId });

    if (existingUrl) {
      // Handle case where the URL already exists
      return res.status(409).json({ error: "URL already exists" });
    }

    await modelss.create({
      shortId: shortid,
      url: Url,
      clicks: 0,
      createdBy: userId,
    });

    res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function redirectWeb(req, res) {
  console.log(req.params.shortid);
  const shortId = req.params.shortid;
  const shortUrl = await modelss.findOne({ shortId }); //correct field name is necessary as it will match with the model of the schema using for the datatbase of the particular collection
  console.log(shortUrl);
  if (!shortUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Increment the clicks count
  shortUrl.clicks += 1;
  await shortUrl.save();

  res.status(200).redirect(`${shortUrl.url}`);
}

export { createId, redirectWeb };
