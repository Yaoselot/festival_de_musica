import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function convertImages() {

    const inputFolder = 'src/img/full';

    const folders = {
        full: {
            jpg: 'public/img/gallery/full/jpg',
            webp: 'public/img/gallery/full/webp',
            avif: 'public/img/gallery/full/avif'
        },
        thumb: {
            jpg: 'public/img/gallery/thumb/jpg',
            webp: 'public/img/gallery/thumb/webp',
            avif: 'public/img/gallery/thumb/avif'
        }
    };

    Object.values(folders).forEach(group => {
        Object.values(group).forEach(folder => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
        });
    });

    const images = fs.readdirSync(inputFolder).filter(file =>
        ['.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())
    );

    await Promise.all(
        images.flatMap(file => {

            const inputFile = path.join(inputFolder, file);
            const fileName = path.parse(file).name;

            return [
                // FULL JPG
                sharp(inputFile)
                    .jpeg({ quality: 90 })
                    .toFile(path.join(folders.full.jpg, `${fileName}.jpg`)),

                // FULL WEBP
                sharp(inputFile)
                    .webp({ quality: 80 })
                    .toFile(path.join(folders.full.webp, `${fileName}.webp`)),

                // FULL AVIF
                sharp(inputFile)
                    .avif({ quality: 60 })
                    .toFile(path.join(folders.full.avif, `${fileName}.avif`)),

                // THUMB JPG
                sharp(inputFile)
                    .resize({ width: 300 })
                    .jpeg({ quality: 80 })
                    .toFile(path.join(folders.thumb.jpg, `${fileName}.jpg`)),

                // THUMB WEBP
                sharp(inputFile)
                    .resize({ width: 300 })
                    .webp({ quality: 80 })
                    .toFile(path.join(folders.thumb.webp, `${fileName}.webp`)),

                // THUMB AVIF
                sharp(inputFile)
                    .resize({ width: 300 })
                    .avif({ quality: 60 })
                    .toFile(path.join(folders.thumb.avif, `${fileName}.avif`))
            ];
        })
    );
}

convertImages()
    .then(() => console.log('Conversión terminada'))
    .catch(console.error);