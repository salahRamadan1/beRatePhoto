const { Upload } = require("../../commen/uploadImg");
const {
  addPhoto,
  up,
  down,
  getAllImg,
  deletePhoto,
  updatePhoto,
  getImgUser,
} = require("../../services/photoservice/photoServic");

const router = require("express").Router();
router.post("/addPhoto", Upload("path"), addPhoto);
router.patch("/up", up);
router.patch("/down", down);
router.get("/", getAllImg);
router.get("/getImgUser", getImgUser);
router.delete("/deletePhoto", deletePhoto);
router.patch("/updatePhoto", Upload("path"), updatePhoto);
module.exports = router;
