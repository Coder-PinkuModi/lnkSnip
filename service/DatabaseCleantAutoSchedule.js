import usermodel from '../models/usersmodel.js';

async function scheduleDatabseCleanUpJobs() {
  const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  setInterval(async () => {
    const now = Date.now();
    const tokenExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    try {
      const userNotVerified = await usermodel.find({ verified: false });

      userNotVerified.forEach(async (oneUser) => {
        if (now - new Date(oneUser.createdAt).getTime() > tokenExpiration) {
          await usermodel.deleteOne({ _id: oneUser._id });
        }
      });
      console.log(`Expires tokens cleaned up`);
    } catch (err) {
      console.log(`Error during cleanup: `, err);
    }
  }, interval);
}


export default scheduleDatabseCleanUpJobs;
