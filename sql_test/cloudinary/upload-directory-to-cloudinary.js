// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var cloudinary = require("cloudinary").v2;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var mysql = require("mysql");

// eslint-disable-next-line @typescript-eslint/no-var-requires
// require("dotenv").config();

// const directoryUploadName = "img";
// const startDirectory = "F:/_prgs/otus/ishop_database/img/";

const directoryUploadName = "podguz";
const startDirectory = "F:/_prgs/otus/ishop_database/podguz/";

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function* getFilesGen(dir) {
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      yield* getFilesGen(name);
    } else {
      yield name;
    }
  }
}

// console.log(getFiles("F:/_prgs/otus/ishop_database/img"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadFile(fname, folderP = directoryUploadName) {
  let basename = path.parse(fname);
  // Возвращает:
  // {
  //    root : "/",
  //    dir : "/home/user/dir",
  //    base : "file.txt",
  //    ext : ".txt",
  //    name : "file"
  // }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fname,
      { tags: folderP, public_id: basename.name, folder: folderP },
      function (err, image) {
        if (err) {
          console.warn(err);
        }
        console.log("uploaded ", basename.base);
        resolve(image);
      }
    );
  });
}

async function main() {
  var connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });

  async function insertImgToDb(uplObj) {
    return new Promise((resolve, reject) => {
      connection.query(
        "insert into cloudinary (cloudObject) values (?) ",
        [JSON.stringify(uplObj)],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  var generator = getFilesGen(startDirectory);
  var oneFile = generator.next();
  while (!oneFile.done) {
    let fname = oneFile.value;

    let uplObj = await uploadFile(fname, directoryUploadName);
    // console.log(uplObj);
    await insertImgToDb(uplObj);

    oneFile = generator.next();
  }

  connection.end();
}

main();

/*
var generator = getFilesGen(startDirectory);
var one = generator.next();
while (!one.done) {
  console.log(one.value);
  one = generator.next();
}
*/
