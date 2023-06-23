const {v4: uuidv4} = require("uuid");
const path = require("path");
const MoveFile = (file, path) => {
  return new Promise((resolve, reject) => {
    file.mv(path, function (err) {
      if (err) {
        reject(err);
      }
      resolve(path);
    });
  });
};

const ValidExtension = (file, validExtensions) => {
  const nameCut = file.name.split('.');
  const extension = nameCut[nameCut.length - 1];

  return validExtensions.includes(extension) ? extension : '';
};

const GenerateFileName = (extension, folder) => {
  const fileName = uuidv4() + '.' + extension;

  return {path: path.join(__dirname, '../uploads/', folder, fileName), fileName};
};

const UploadFile = async (file, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = 'images') => {

  return new Promise(async (resolve, reject) => {
    const extension = ValidExtension(file, validExtensions);

    if (!extension) {
      reject({
        status: 400,
        msg: `The extension ${extension} is not allowed`
      });
      return;
    }

    const {path: pathServer, fileName} = GenerateFileName(extension, folder);

    try {
      const path = await MoveFile(file, pathServer);

      if (!path) {
        reject({
          status: 500,
          msg: 'Error uploading file'
        });
        return;
      }
      resolve(fileName);
    } catch (e) {
      reject({
        status: 500,
        msg: e
      });
    }


  });


};

module.exports = {
  UploadFile,
  ValidExtension,
  GenerateFileName
};
