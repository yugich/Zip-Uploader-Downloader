const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadFolder = path.join(__dirname, 'uploads/');
const uploadFolderImages = path.join(uploadFolder, 'images');


fs.existsSync(uploadFolder) || fs.mkdirSync(uploadFolder);
// Custom storage engine to keep original file names
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


const app = express();
const PORT = process.env.PORT || 3000;

/*var http = require('http');

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    console.log("My public IP address is: " + ip);
  });
});*/


app.use(express.static('public'));

// Route for handling ZIP file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file && path.extname(req.file.originalname) === '.zip') {
        res.json({ message: 'File uploaded successfully', file: req.file });
    } else {
        res.status(400).send('Only .zip files are allowed');
    }
});


app.get('/storage', (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading files');
        } else {
            // Filtra apenas arquivos ZIP
            const zipFiles = files.filter(file => path.extname(file) === '.zip');

            // Converte os nomes dos arquivos em números de versão e encontra o máximo
            const maxVersionFile = zipFiles.reduce((maxFile, file) => {
                const maxVersion = maxFile.split('.').slice(0, -1).join('.');
                const currentVersion = file.split('.').slice(0, -1).join('.');
                return currentVersion > maxVersion ? file : maxFile;
            }, zipFiles[0]);

            // Envia o arquivo com a maior versão
            res.sendFile(path.join(uploadFolder, maxVersionFile));
        }
    });
});

app.get('/latest-version', (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading files');
        } else {
            // Filtra apenas arquivos ZIP
            const zipFiles = files.filter(file => path.extname(file) === '.zip');

            // Se não houver arquivos zip, envia uma resposta adequada
            if (zipFiles.length === 0) {
                return res.status(404).send('No ZIP files found');
            }

            // Converte os nomes dos arquivos em números de versão e encontra o máximo
            const maxVersionFile = zipFiles.reduce((maxFile, file) => {
                const maxVersion = maxFile.split('.').slice(0, -1).join('.');
                const currentVersion = file.split('.').slice(0, -1).join('.');
                return currentVersion > maxVersion ? file : maxFile;
            }, zipFiles[0]);

            // Remove a extensão .zip do nome do arquivo
            const fileNameWithoutExtension = maxVersionFile.replace('.zip', '');

            // Retorna o nome do arquivo sem a extensão .zip
            res.send(fileNameWithoutExtension);
        }
    });
});



// Serve files from the upload folder under '/storage'
app.use('/storage', express.static(uploadFolder));

app.listen(PORT, () => {
    console.log('Listening at http://localhost:' + PORT);
});


