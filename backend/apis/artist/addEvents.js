const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function AddEvents(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('events');

        const { eventName, category, pricePerSeat, totalSeats, address, datetime } = req.body;
        const eventpicture = req.file.filename;
        if (!eventName, !category || !pricePerSeat || !totalSeats || !address || !datetime ) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const artistId = await req.session.user.session._id;
        const artistName=await req.session.user.session.name;
        const intPricePerSeat = parseInt(pricePerSeat);
        const intSeat = parseInt(totalSeats);

        await collection.insertOne({
            artistId: new ObjectId(artistId),
            eventName,
            artistName,
            eventpicture,
            category,
            pricePerSeat: intPricePerSeat,
            totalSeats : intSeat,
            availableSeats: intSeat,
            address,
            datetime: new Date(datetime),
        });

        return res
            .status(201)
            .json({ success: true, message: "Event Added Successfully" });
    } catch (error) {
        console.error("AddEvents.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong!!!" });
    }
}

module.exports = { AddEvents };