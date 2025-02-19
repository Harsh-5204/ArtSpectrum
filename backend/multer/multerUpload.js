const multer = require("multer");

//profile pic storage
const profilePicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "D:/EVENT_BOOKING/backend/images/profilePics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});
const eventPicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "D:/EVENT_BOOKING/backend/images/eventPics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const eventPicUpload = multer({ storage: eventPicStorage });
const profilePicUpload = multer({ storage: profilePicStorage });
module.exports = { profilePicUpload,eventPicUpload }