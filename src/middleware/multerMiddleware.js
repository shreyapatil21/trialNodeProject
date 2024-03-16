import multer from 'multer';

// file=> multer ke pas hota hai
// cb=> call back
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      console.log("REquest in multerMiddleware: ",req);
      cb(null, file.originalname);
    }
  });
  
const fileFilter = (_req, file, cb) => {
  // Check file type or any other criteria
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // Accept the file
  } else {
      cb(new Error('Invalid file type'), false); // Reject the file
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
      fileSize: 1024 * 1024 * 5 // 5 MB file size limit
  }
});

export { upload };
// export const upload = multer({ 
//     storage, 
// })