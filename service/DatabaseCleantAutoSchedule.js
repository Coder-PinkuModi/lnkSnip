import cron from "node-cron"
import usermodel from '../models/usersmodel.js';

async function scheduleDatabseCleanUpJobs() {
  const tokenExpiration = 24 * 60 * 60 * 1000; 

  cron.schedule('0 0 * * *', async () => { 
    const now = Date.now();

    try {
      const userNotVerified = await usermodel.find({ verified: false });

      userNotVerified.forEach(async (oneUser) => {
        if (now - new Date(oneUser.createdAt).getTime() > tokenExpiration) {
          await usermodel.deleteOne({ _id: oneUser._id });
        }
      });
    } catch (err) {
    }
  });
}


export default scheduleDatabseCleanUpJobs;
