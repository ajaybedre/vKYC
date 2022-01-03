const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
require("dotenv").config();

const ATLAS_URI = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const userSchema = new Schema({
  aadhaarNumber: {
    type: String,
    required: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
  aadharImageHash: {
    type: String,
    required: true,
  },
  panImageHash: {
    type: String,
    required: true,
  },
  selfieHash: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  location: {
    type: String,
  },
  isKYCVerified: {
    type: Boolean,
  },
  bank: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.json({ "Hello World!": "Hi" });
});

app.post("/submit-docs", (req, res) => {
    const user = new User({
        aadhaarNumber: req.body.aadhaarNumber,
        panNumber: req.body.panNumber,
        aadharImageHash: req.body.aadharImageHash,
        panImageHash: req.body.panImageHash,
        ipAddress: req.body.ipAddress,
        selfieHash: req.body.selfieHash,
        location: req.body.location,
        isKYCVerified: false,
        bank: req.body.bank,
    });
    
    user.save().then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

app.post('/check-kyc', async (req, res) => {
    const aadhaarNumber = req.body.aadhaarNumber;
    const user = await User.findOne({ aadhaarNumber: aadhaarNumber });
    if (user) {
        res.send(user);
    } else {
        res.send({
            message: 'User not found'
        });
    }
});

mongoose
  .connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error));

//creating and running server
app.listen(port, () => console.log(`server started on port ${port}`));
