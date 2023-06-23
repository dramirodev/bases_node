const {UploadFile} = require("../helpers/upload-file");


const uploadFile = async (req, res) => {

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({msg: 'No files were uploaded.'});
    return;
  }

  if (!req.files.file) {
    res.status(400).json({msg: 'No files were uploaded.'});
    return;
  }

  try {
    const path = await UploadFile(req.files.file);
    res.json({upload: path});
  } catch (e) {
    return res.status(e.status).json({msg: e.msg});
  }

};

module.exports = {
  uploadFile
};
