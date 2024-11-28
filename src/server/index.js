import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer'; 
import pool from './db.js'; // Importar el pool de conexiones
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });  

const upload = multer({ storage: multer.memoryStorage() });
const accessKeyId = process.env.AWS_ACCESS_KEY_ID; 
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_NAME_BUCKET; 
const regionAWS = process.env.AWS_REGION; 


const s3Client = new S3Client({
  region: regionAWS,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); 


const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};

app.post('/upload', upload.single('videoFile'), async (req, res) => {
  const color_received = req.body.color;
  const videoFile = req.file;
  const deviceName = req.body.device;

  const color = hexToRgb(color_received); 

  console.log(`Received request to upload video: ${videoFile.originalname}, color: ${color}`); // Use originalname instead of name

  const url = "https://mediapopa.s3.amazonaws.com/" + videoFile.originalname;


  const params = {
    Bucket: bucket,
    Key: videoFile.originalname, 
    Body: videoFile.buffer, 
    ContentType: videoFile.mimetype, 
  };

  try {
    const command = new PutObjectCommand(params);
    const s3Response = await s3Client.send(command);
    console.log('Archivo subido a S3:', s3Response);

    pool.query('UPDATE Media SET nombreVideo = ?, colorRGB = ?, nombreDevice = ? WHERE id = 1', [url, color, deviceName], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Data inserted successfully!', id: result.insertId });
    });

  } catch (error) {
    console.error('Error al subir el archivo a S3:', error);
    res.status(500).json({ error: 'Error al subir el archivo a S3.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
