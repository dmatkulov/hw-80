import multer from 'multer';
import {promises as fs} from 'fs';
import path from 'path';
import config from './config';
import {randomUUID} from 'crypto';

const imageStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, {recursive: true});
    callback(null, config.publicPath);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const filename = path.join('images', randomUUID() + extension);
    callback(null, filename);
  }
});

export const imageUpload = multer({storage: imageStorage});