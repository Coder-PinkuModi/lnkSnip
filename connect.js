import mongoose from "mongoose";
import scheduleDatabseCleanUpJobs from "./service/DatabaseCleantAutoSchedule.js"

async function mongoDBconnect(url){
    return await mongoose.connect(url)
      .then(() => {
        console.log('Connected to MongoDB');
        //scheduling data cleanUp
        scheduleDatabseCleanUpJobs();
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
}


export default mongoDBconnect;