const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const auth = require("../middleware/auth");
const { sendMail } = require("../../config/sendMail");
const { v4 } = require("uuid");
const authAdmin = require("../middleware/authAdmin");
const checkObjectId = require("../middleware/checkObjectId");

const User = require("../models/User");
const Profile = require("../models/Profile");

/**********************************************************************/
// @route   GET api/users
// @desc    return user authenticated
// @access  Private
/**********************************************************************/

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) res.json(user);
    else {
      res.status(401).send("User not found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route   GET api/users/usersadmin
// @desc    return user authenticated
// @access  Private
/**********************************************************************/

router.get("/usersadmin", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//delete user by admin
router.delete("/deleteuser/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "slider not found" });
    }
    await user.deleteOne();
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route   POST api/users/signup
// @desc    Register user
// @access  Public
/**********************************************************************/

router.post(
  "/signup",
  [
    check("firstname", "Firstname is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Validate result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({
        firstname,
        email,
        password,
        status: 1,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      // Return jsonwebtoken
      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;

        const mailInfo = {
          to: email,
          subject: "Welcome To BM",
          html: "<h1>BM Vous remercie.</h1>",
        };
        sendMail(mailInfo);

        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**********************************************************************/
// @route   POST api/users/signin
// @desc    Signin user & get token
// @access  Public
/**********************************************************************/

router.post("/signin", [check("email", "Please include a valid email").isEmail(), check("password", "Password is required").exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Return jsonwebtoken
    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**********************************************************************/
// @route   POST api/users/connect-fb
// @desc    connect fb & get token
// @access  Public
/**********************************************************************/

router.post("/connect-fb", [check("email", "Please include a valid email").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstname, lastname } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        firstname,
        lastname,
        email,
        password: "FACEBOOK_PASSWORD",
        status: 1,
      });
      await user.save();
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Return jsonwebtoken
    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/users/profile/me
// @desc    Get current users profile
// @access  Public
router.get("/profile/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["firstname", "lastname"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**********************************************************************/
// @route    POST api/users/profile
// @desc     Create or update user profile
// @access   Private
/**********************************************************************/

router.post(
  "/profile",
  [
    auth,
    [
      check("telephone", "Telephone is required").not().isEmpty(),

      check("line", "Address is required").not().isEmpty(),
      check("region", "Region is required").not().isEmpty(),
      check("city", "City is required").not().isEmpty(),
      check("zipcode", "Zipcode is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, gender, birth, telephone, line, region, city, zipcode } = req.body;

    const addresses = { line, region, city, zipcode };

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (gender) profileFields.gender = gender;
    if (birth) profileFields.birth = birth;
    if (telephone) profileFields.telephone = telephone;
    if (website) profileFields.website = website === "" ? "" : normalize(website, { forceHttps: false });

    profileFields.address = addresses;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
        return res.json(profile);
      }

      // CReate
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**********************************************************************/
// @route    GET /mail
// @desc     Test For mail
// @access   Public
/**********************************************************************/

router.get("/mail", async (req, res) => {
  const mailInfo = {
    to: "kammoun.anis1@gmail.com",
    subject: "Message From Node",
    html: "HTML Content 1",
  };
  const sendResult = await sendMail(mailInfo);
  if (sendResult) {
    res.send("Success send mail");
  } else {
    res.send("Error send mail");
  }
});

/**********************************************************************/
// @route   POST api/users/forget-password
// @desc    forget password and receive mail contain token
// @access  Public
/**********************************************************************/
router.post("/forget-password", [check("email", "Please include a valid email").isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Email does not exist" }] });
    }
    const resetid = v4();
    const payload = {
      email,
      resetid,
    };

    let user2 = await User.updateOne({ email }, { $set: { resetid } });
    console.log(user2);
    console.log(resetid);

    jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 3600 }, async (err, token) => {
      if (err) throw err;

      // res.json({ token });

      const mailInfo = {
        to: email,
        subject: "Forget Password",
        html: "<h1>Forget Password</h1><br/>Token : <a href='" + config.get("frontUrl") + "/reset-password/" + token + "'>Click here to reset password</a>",
      };
      const sendResult = await sendMail(mailInfo);
      if (sendResult) {
        res.send("Success send mail :" + token);
      } else {
        res.send("Error send mail");
      }
    });
  } catch (err) {
    console.error(err);
  }
});

/**********************************************************************/
// @route   POST api/users/reset-password
// @desc    reset password
// @access  Public
/**********************************************************************/

router.post("/reset-password", [check("password", "Password is required").exists(), check("token", "Token is required").exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { password, token } = req.body;
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const { email, resetid } = decoded;
    let user = await User.findOne({ email, resetid });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Token is no valid" }] });
    }

    const salt = await bcrypt.genSalt(10);
    passwordCrypted = await bcrypt.hash(password, salt);

    let update = await User.updateOne({ email, resetid }, { $set: { password: passwordCrypted, resetid: "" } });

    res.send({ update });
  } catch (err) {
    res.status(401).json({ msg: "Token is no valid" });
  }
});

//put user by admin
router.put("/updateuser/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;

  let UserFields = {};
  if (firstname) UserFields.firstname = firstname;
  if (lastname) UserFields.lastname = lastname;
  if (email) UserFields.email = email;
  try {
    const userupdated = await User.findByIdAndUpdate(id, { $set: UserFields }, { new: true });
    res.json(userupdated);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//update status user by admin
/**  activate user  */

router.put("/activate-status/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);
    if (user) {
      //Update
      user1 = await User.findByIdAndUpdate(id, { $set: { status: 1 } }, { new: true });
      res.json(user1);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/** desactivate user */
router.put("/desactivate-status/:id", [authAdmin, checkObjectId("id")], async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);
    if (user) {
      //Update
      user1 = await User.findByIdAndUpdate(id, { $set: { status: 0 } }, { new: true });
      res.json(user1);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
