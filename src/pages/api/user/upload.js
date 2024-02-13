import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import path from 'path';

const upload = multer({ dest: './public/users/uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            upload.single('image')(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).end('Error uploading file.');
                }

                const tempPath = req.file.path;
                const targetPath = path.join('./public/users/uploads/', `${uuidv4()}-${req.file.originalname}`);

                await fs.rename(tempPath, targetPath);

                const relativePath = path.relative('./public', targetPath);

                res.status(200).json({ imageUrl: `/${relativePath}` });
            });
        } catch (error) {
            console.error(error);
            res.status(500).end('Server error');
        }
    } else {
        res.status(405).end('Method Not Allowed');
    }
}
