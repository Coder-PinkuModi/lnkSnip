import mongoose from "mongoose";
import scheduleDatabseCleanUpJobs from "./service/DatabaseCleantAutoSchedule.js"

async function mongoDBconnect(url){
    return await mongoose.connect(url)
      .then(async() => {
        console.log('Connected to MongoDB');
        //scheduling data cleanUp
        await scheduleDatabseCleanUpJobs();
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
}


export default mongoDBconnect;