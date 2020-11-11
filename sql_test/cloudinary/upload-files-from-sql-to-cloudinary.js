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
          console.warn("Cloudinaery error :", err);
        }
        console.log("uploaded ", basename.base);
        resolve(image);
      }
    );
  });
}

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
        console.log("Записано в бд : ", results.insertId);
        resolve(results);
      }
    );
  });
}

function getNextFiles(startId, cntItem) {
  return new Promise((resolve, reject) => {
    connection.query(
      "select id, pict_fname, URL\n" +
        "from goods_pictures\n" +
        "where pict_dir = 'podguz'\n" +
        "  and URL is null\n" +
        "  and id > ?\n" +
        "order by id\n" +
        "limit ?",
      [startId, cntItem],
      function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      }
    );
  });
}

const COUNT_PARALLELS = 10;
async function sqlLoop() {
  let startId = 0;

  let count_files_recieved = 0;
  do {
    let results = await getNextFiles(startId, COUNT_PARALLELS);
    count_files_recieved = results.length;
    let promiseUploadSet = [];
    for (let key of results) {
      // console.log(key);
      startId = startId < key.id ? key.id : startId;
      let fname = startDirectory + key.pict_fname;
      if (fs.statSync(fname).isFile()) {
        // console.log(fname);
        promiseUploadSet.push(uploadFile(fname, directoryUploadName));
      }
    }
    let uploadedObj = await Promise.all(promiseUploadSet); // массив загруженных объектов
    promiseUploadSet = [];
    for (let key of uploadedObj) {
      await insertImgToDb(key);
      // console.log(" Записано в бд : ", key.public_id);
    }

    console.log("startId : ", startId);
  } while (count_files_recieved === COUNT_PARALLELS);
  // } while (false);

  connection.end();
}

sqlLoop();
// connection.end();
