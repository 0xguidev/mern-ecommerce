import express from 'express';
import multer, { diskStorage } from 'multer';
import path from 'node:path';

const router = express.Router();
const storage = diskStorage({
  destination: 'backend/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(`${req.file.path}`);
});

export default router;
