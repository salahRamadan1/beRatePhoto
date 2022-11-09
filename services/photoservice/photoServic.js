const { createTryAndCatch } = require("../../commen/catchAsyncError");
const modelPhoto = require("../../models/photoModel/photoModel");
// add photo
module.exports.addPhoto = createTryAndCatch(async (req, res) => {
  const { title, createdBy } = req.body;
console.log(req.file);
  if (req.file) {
  const photo =    await modelPhoto.insertMany({ path: req.file.filename, title, createdBy });
    res.json({ message: "success",photo});
  } else {
    console.log(req.file);
    res.json({ message: "img only" });
  
  }
})
// delete photo
module.exports.deletePhoto = createTryAndCatch(async (req, res) => {
  const { post_id } = req.body;
  const photo =  await modelPhoto.deleteOne({ post_id  });
  res.json({ message: "success",photo });
})
// update photo
module.exports.updatePhoto =createTryAndCatch( async (req, res) => {
  const { post_id, createdBy, title } = req.body;
  if (req.file) {
    await modelPhoto.findOneAndUpdate(
      { post_id, createdBy },
      { path: req.file.filename, title }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "img only" });
  }
})
// up rate photo
module.exports.up = createTryAndCatch(async (req, res) => {
  const { post_id, createdBy } = req.body;
  const post = await modelPhoto.findById(post_id);
  if (post) {
    await upAndDown(
      -1,
      1,
      post_id,
      createdBy,
      res,
      { up: createdBy },
      { up: createdBy },
      { down: createdBy },
      { post_id: post_id, up: { $in: [createdBy] } }
    );
  } else {
    res.json({ message: "not found post" });
  }
})
// down rate photo
module.exports.down = createTryAndCatch(async (req, res) => {
  const { post_id, createdBy } = req.body;
  const post = await modelPhoto.findById(post_id);
  if (post) {
    await upAndDown(
      1,
      -1  ,
      post_id,
      createdBy,
      res,
      { down: createdBy },
      { down: createdBy },
      { up: createdBy },
      { post_id: post_id, down: { $in: [createdBy] } }
    );
  } else {
    res.json({ message: "not found post" });
  }
})
// get all img
module.exports.getAllImg =createTryAndCatch( async (req, res) => {
  let PAGE_NUMBER = req.query.page;
  if (!PAGE_NUMBER || PAGE_NUMBER <= 0) {
    PAGE_NUMBER = 1;
  }
  let PAGE_LIMIT = 5;
  let SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT;
  let count = await modelPhoto.find({}).count();
  if(count){
    const photo = await modelPhoto
    .find({})
    .sort({ count: -1 })
    .populate("up down createdBy", "first_name last_name profile_Pic createdAt")
    .skip(SKIP)
    .limit(PAGE_LIMIT);
  res.json({
    message: "success",
    pages: Math.ceil(count / PAGE_LIMIT),
    page: PAGE_NUMBER,
    photo,
  });
  }else{
    res.json({message:'not found photo until now'})
  }
})
//  get img for user
module.exports.getImgUser = createTryAndCatch(async (req,res)=>{
  const createdBy = req.header('createdBy')
  const photo = await modelPhoto.find({createdBy}).populate("up down createdBy", "first_name last_name profile_Pic createdAt")
  if(photo.length > 0){
    res.json({message:'success' , photo})
  }else{
    res.json({message:"not found image  for you "})
  }
  })
//  up and down clean
async function upAndDown(
  countMin,
  countPlu,
  post_id,
  createdBy,
  res,
  CreaPush,
  CreaPush,
  CreaPull,
  cls
) {
  let post = await modelPhoto.findOne(cls);
  if (post) {
    await modelPhoto.findByIdAndUpdate(post_id, {
      $inc: { count: countMin },
      $pull: CreaPush,
    });
    res.json({ message: "success" });
  } else {
    await modelPhoto.findByIdAndUpdate(post_id, {
      $inc: { count: countPlu },
      $push: CreaPush,
      $pull: CreaPull,
    });
    res.json({ message: "success" });
  }
}

// Down
// const post = await modelPhoto.findOne({
//   post_id,
//   down: { $in: [createdBy] },
// });
// if (post) {
//   await modelPhoto.findByIdAndUpdate(post_id, {
//     $inc: { count: 1 },
//     $pull: { down: createdBy },
//   });
//   res.json({ message: "pull" });
// } else {
//   await modelPhoto.findByIdAndUpdate(post_id, {
//     $inc: { count: -1 },
//     $push: { down: createdBy },
//     $pull: { up: createdBy },
//   });
//   res.json({ message: "push" });
// }

// up
//   let post = await modelPhoto.findOne({ post_id, up: { $in: [createdBy] } });
// if (post) {
//   await modelPhoto.findByIdAndUpdate(post_id, {
//     $inc: { count: -1 },
//     $pull: { up: createdBy },
//   });
//   res.json({ message: "success pull" });
// } else {
//   await modelPhoto.findByIdAndUpdate(post_id, {
//     $inc: { count: 1 },
//     $push: { up: createdBy },
//     $pull: { down: createdBy },
//   });
//   res.json({ message: "push" });
// }
