// eslint-disable-next-line @typescript-eslint/no-var-requires
var cloudinary = require("cloudinary").v2;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*
let url1 = cloudinary.image("img/100", {
  secure: true,
  transformation: [
    { width: 200, height: 200, crop: "thumb" },
    { radius: 80 },
    { format: "WebP" },
  ],
});

 */

console.log(
  cloudinary.image(
    "https://res.cloudinary.com/dljazkzna/image/upload/v1604677920/img/100.jpg",
    {
      width: 300,
      crop: "scale",
      format: "webp",
      type: "fetch",
      quality: "auto",
    }
  )
);

console.log(
  cloudinary.image(
    "https://res.cloudinary.com/dljazkzna/image/upload/v1604677920/img/100.jpg",
    {
      width: 300,
      crop: "scale",
      format: "webp",
      type: "fetch",
      quality: "auto",
      dpr: "1.0",
    }
  )
);

console.log(
  cloudinary.image(
    "https://res.cloudinary.com/dljazkzna/image/upload/v1604677920/img/100.jpg",
    {
      width: 300,
      crop: "scale",
      format: "png",
      type: "fetch",
      quality: "auto",
    }
  )
);
