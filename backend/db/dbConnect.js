const MongoClient = require('mongodb').MongoClient;

//MongoDB Connection
const connectDB = async () => {
    const dbUrl = 'mongodb+srv://sanjuprj2:dolly123@artspectrum.sspnntl.mongodb.net/EventBookingDB'
  try {
    const client = await MongoClient.connect(dbUrl);
    console.log("DB Connected!");
    return client.db(); // Return the database object for further usage
  } catch (error) {
    console.log("DB Connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;