import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

export const upload = multer({ storage: storage });


// So by this code , we are defining that store file in diskStorage temporaly , the saved file will be inside , public/temp folder , and give the filename , it's original name.
