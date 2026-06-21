import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function convertImages() {
    const inputFolder = 'src/img/content';
    const avifFolder = 'public/img/content/avif';
    const webpFolder = 'public/img/content/webp';
    
    [webpFolder, avifFolder].forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    });

    const images = fs.readdirSync(inputFolder).filter(file =>
        /\.(jpg)$/i.test(path.extname(file))
    );

    await Promise.all(
        images.flatMap(file => {
            const inputFile = path.join(inputFolder, file);
            const fileName = path.parse(file).name;

            return [
                sharp(inputFile)
                    .avif({ quality:60 })
                    .toFile(path.join(avifFolder, `${fileName}.avif`)),
                
                sharp(inputFile)
                    .webp({ quality:80 })
                    .toFile(path.join(webpFolder, `${fileName}.webp`))
            ];
        })
    );
}

convertImages()
    .then(() => console.log('conversion terminada'))
    .catch(console.error);