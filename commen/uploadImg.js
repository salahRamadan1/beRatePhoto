const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

module.exports.Upload = (fieldName) => {
  console.log({message:"Upload running"});
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log({fromL:"disk storage",file});
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "_" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  const upload = multer({ storage , fileFilter });

  return upload.single(fieldName);
};
