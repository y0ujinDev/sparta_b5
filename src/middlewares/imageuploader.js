import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import crypto from 'crypto'


dotenv.config();

const { REGION, ACCESSKEYID, SECRETACCESSKEY } = process.env;

const s3 = new aws.S3({
    region: REGION,
    accessKeyId: ACCESSKEYID,
    secretAccessKey: SECRETACCESSKEY,
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

const fileFilter = (req, file, next) => {
    console.log('File:', file);

    const extArray = file.originalname.split('.');
    const ext = extArray[extArray.length - 1].toLowerCase();
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedExtensions.includes(`.${ext}`) && allowedMimeTypes.includes(file.mimetype)) {
        next(null, true);
    } else {
        console.error('Invalid file:', file.originalname);
        next(new Error('Invalid file type or extension. Only image files are allowed!'), false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'sssclass-menu-image', // 여기에 자신의 S3 버킷 이름을 넣어주세요.
        acl: 'public-read',
        key: (req, file, cb) => {
            console.log('file',file)
            let uuid = crypto.randomUUID();
            const extArray = file.originalname.split('.');
            const ext = extArray[extArray.length - 1].toLowerCase();
            cb(null, `product_image/${uuid}.${ext}`);
        },
    }),
});

export default upload;
