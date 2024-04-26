const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas, loadImage } = require('canvas');
const block=require('cors');

const app = express();
const port = 5808;
app.use(block());
app.use(bodyParser.json());

app.post('/decrypt', async (req, res) => {
    try {
        const base64String = req.body.base64_string;
        const decodedData = Buffer.from(base64String, 'base64');
        // Load the image using canvas
        const canvas = createCanvas(300, 150);
        const ctx = canvas.getContext('2d');
        const img = await loadImage(decodedData);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const decryptedImage = canvas.toDataURL();
        res.send({ decrypted_image: decryptedImage });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
