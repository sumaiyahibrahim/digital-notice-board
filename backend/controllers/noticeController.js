const Notice = require("../models/Notice");

exports.getNotices = async (req,res) => {
  const data = await Notice.find().sort({createdAt:-1});
  res.json(data);
};

exports.createNotice = async (req,res) => {
  const notice = await Notice.create({
    title:req.body.title,
    content:req.body.content,
    createdBy:req.user._id
  });
  res.json(notice);
};

exports.updateNotice = async (req,res) => {
  const updated = await Notice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true }
  );
  res.json(updated);
};

exports.deleteNotice = async (req,res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ msg:"Deleted" });
};
