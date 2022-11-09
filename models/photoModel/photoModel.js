const { model, Schema, Types } = require("mongoose");
const schema = new Schema(
  {
    path: String,
    title: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    up: [{ type: Types.ObjectId, ref: "User" }],
    down: [{ type: Types.ObjectId, ref: "User" }],

    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.post("init", function (doc) {
  doc.path = "http://localhost:3000/" + doc.path;
  
});
module.exports = model("photo", schema);
