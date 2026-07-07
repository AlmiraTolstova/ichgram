import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createUpload = (folder) => {
  const uploadPath = path.join(__dirname, "..", "uploads", folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadPath);
    },

    filename(req, file, cb) {
      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);

      cb(null, uniqueName);
    },
  });

  return multer({
    storage,
    fileFilter(req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Можно загружать только изображения"));
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
};

export const uploadPost = createUpload("images");
export const uploadAvatar = createUpload("avatars");
