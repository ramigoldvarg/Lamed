var models = require('express').Router();
const fs = require('fs');

models.post('/', (req, res) => {
    let didErrorOcurred = false;
    let imageUrls = [];

    // Going through all the pictures
    for (let currFile in req.files) {
        let imagePath = req.files[currFile].path;
        let imagePathInServer = __dirname + "../../../../images/" + req.files[currFile].name;
        imageUrls.push('localhost:3000/images/' + req.files[currFile].name);

        // For saving the image
        const os = fs.createWriteStream(imagePathInServer);
        const is = fs.createReadStream(imagePath);

        // writing the file
        is.pipe(os);

        // Error writing the picture
        is.on('error', function(err) {
            if (err) {
                didErrorOcurred = true;
            }
        });
        
        // file end
        is.on('end', function() {
            //delete file from temp folder
            fs.unlink(imagePath, function(err) {
                if (err) {
                    didErrorOcurred = true;
                }
            });
        });
    }
    
    if (didErrorOcurred) {
        res.status(500).json({message: "התמונה לא נשמרה בשרת"});
    } else {
        res.status(200).json({message:"תן בראש ותשתמש בתמונות", imageUrls: imageUrls});
        // // res.sendFile(__dirname + "../../../../images/" + req.files["blured.jpg"].name)
        // var img = fs.readFileSync(__dirname + "../../../../images/" + req.files["blured.jpg"].name);
        // res.writeHead(200, {'Content-Type': 'image/jpeg' });
        // res.end(img, 'binary');
    }
});

models.get('/', (req,res) => {
    res.status(200).json({message:"good"});
})

module.exports = models;