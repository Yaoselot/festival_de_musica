import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function crop() {
    const inputFolder = 'src/img/full';
    const outputFolder = 'public/img/gallery/thumb';
    const width = 300;
    const height = 200;

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }

    const images = fs.readdirSync(inputFolder).filter(file =>
        /\.(jpg)$/i.test(path.extname(file))
    );

    await Promise.all(
        images.map(file => {
            const inputFile = path.join(inputFolder, file);
            const outputFile = path.join(
                outputFolder,
                file.replace('.jpg', '.webp')
            );

            return sharp(inputFile)
                .resize(width, height, {
                    fit: 'cover',
                    position: 'centre'
                })
                .webp({ quality: 80 })
                .toFile(outputFile);
        })
    );
}

crop()
    .catch(console.error)