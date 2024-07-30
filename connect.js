import mongoose from "mongoose";
import scheduleDatabseCleanUpJobs from "./service/DatabaseCleantAutoSchedule.js"

async function mongoDBconnect(url){
    return await mongoose.connect(url)
      .then(async() => {
        //scheduling data cleanUp
        await scheduleDatabseCleanUpJobs();
      })
      .catch((err) => {
      });
}


export default mongoDBconnect;