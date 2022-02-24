const express = require("express");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./utils/userModel");
const candidateModel = require("./utils/candModel");
const testModel = require("./utils/testModel");

const router = express.Router();

cloudinary.config({
  cloud_name: "dry8nywub",
  api_key: "629241972579982",
  api_secret: "Pc2-culzxkssn7oX8SIZoMLR6vc"
});

router.get("/voter", async (req, res) => {
  try {
    const getVoters = await userModel.find();
    res
      .status(200)
      .json({ message: "found voters successfully", data: getVoters });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.get("/voter/:id", async (req, res) => {
  try {
    const getVoters = await userModel.findById(req.params.id);
    res.status(200).json({ message: "successful", data: getVoters });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.patch("/voter/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const getVoters = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name
      },
      { new: true }
    );
    res.status(200).json({ message: "updated successfully", data: getVoters });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.delete("/voter/:id", async (req, res) => {
  try {
    await userModel.findByIdAndRemove(req.params.id, req.body);
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage }).single("avatar");

router.post("/voter/register", upload, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const image = await cloudinary.uploader.upload(req.file.path);

    const getVoters = await userModel.create({
      name,
      email,
      password: hash,
      avatar: image.secure_url
    });
    res.status(200).json({ message: "created successfully", data: getVoters });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.post("/voter/signin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      const checkPassword = await bcrypt.compare(password, checkEmail.password);
      if (checkPassword) {
        const { password, ...info } = checkEmail._doc;

        const token = jwt.sign(
          {
            _id: checkEmail._id,
            name: checkEmail.name,
            email: checkEmail.email,
            isAdmin: checkEmail.isAdmin
          },
          "THSIISWhatIConsiderAStheToekNNNN",
          { expiresIn: "2d" }
        );

        res
          .status(200)
          .json({ message: "created successfully", data: { ...info, token } });
      } else {
        res.status(400).json({ message: `error Password not found` });
      }
    } else {
      res.status(400).json({ message: `error Email not found` });
    }
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

const verified = (req, res, next) => {
  const checkAuth = req.headers.authorization;
  if (checkAuth) {
    const token = checkAuth.split(" ")[1];
    jwt.verify(token, "THSIISWhatIConsiderAStheToekNNNN", (err, payload) => {
      if (err) {
        res.status(400).json({ message: `error found: ${err.message}` });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(400).json({ message: `error at Token level` });
  }
};

router.post("/candidate/create", verified, upload, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { name, point, position } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      const getCandidates = await candidateModel.create({
        name,
        position,
        point,
        avatar: image.secure_url
      });
      res
        .status(200)
        .json({ message: "created successfully", data: getCandidates });
    }
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.post("/candidate/create24", verified, upload, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { name } = req.body;
      const getCandidates = await testModel.create({
        name
      });
      res
        .status(200)
        .json({ message: "found all successfully", data: getCandidates });
    }
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.get("/candidate", async (req, res) => {
  try {
    const getCandidates = await candidateModel.find();
    res
      .status(200)
      .json({ message: "found all successfully", data: getCandidates });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.get("/candidate/:id", async (req, res) => {
  try {
    const getCandidates = await candidateModel.findById(req.params.id);
    res
      .status(200)
      .json({ message: "found individual successfully", data: getCandidates });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

router.patch("/candidate/:id", async (req, res) => {
  try {
    const getCandidates = await candidateModel.findByIdAndUpdate(
      req.params.id,
      {
        point: req.body.point
      },
      { new: true }
    );
    res.status(200).json({
      message: "updated individual point successfully",
      data: getCandidates
    });
  } catch (err) {
    res.status(400).json({ message: `error found: ${err.message}` });
  }
});

module.exports = router;
