const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const config = require("../config");
const db = require("../fileDB");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/", (req, res) => {
    const products = db.getItems();
    res.send(products);
});

router.post("/", upload.single("image"), (req, res) => {
    const product = req.body;
    if (req.file) {
        product.image = req.file.filename;
    }
    const response = db.addItem(product);
    res.send(response);
});

module.exports = router;