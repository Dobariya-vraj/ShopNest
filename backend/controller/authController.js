const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};


// =============================
// Register User
// =============================
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // OTP expires after 10 minutes
        const otpExpire = new Date(
            Date.now() + 10 * 60 * 1000
        );

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verified: false,
            verificationOtp: otp,
            verificationOtpExpire: otpExpire
        });

        // Email message
        const message = `
Welcome to ShopNest, ${name}!

Your account has been successfully created.

Your OTP for email verification is:

${otp}

This OTP will expire in 10 minutes.

Please use this OTP to verify your email.
        `;

        // Send email
        await sendEmail(
            email,
            "Welcome to ShopNest - Email Verification",
            message
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified,
            message: "Registration successful. Please verify your email using the OTP."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// =============================
// Verify Email
// =============================
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Already verified
        if (user.verified) {
            return res.status(400).json({
                message: "Email is already verified"
            });
        }

        // Check OTP
        if (
            user.verificationOtp !== otp ||
            !user.verificationOtpExpire ||
            user.verificationOtpExpire < new Date()
        ) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }

        // Verify user
        user.verified = true;

        // Remove OTP after successful verification
        user.verificationOtp = undefined;
        user.verificationOtpExpire = undefined;

        await user.save();

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// =============================
// Login User
// =============================
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (
            user &&
            (await bcrypt.compare(password, user.password))
        ) {

            // Check email verification
            if (!user.verified) {
                return res.status(401).json({
                    message: "Please verify your email before login"
                });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });

        } else {
            res.status(400).json({
                message: "Invalid email or password"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// =============================
// Get All Users
// =============================
const getUsers = async (req, res) => {
    try {
        const users = await User
            .find()
            .select("-password -verificationOtp");

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    user.role = 'admin';

    await user.save();

    res.json({
      message: 'User promoted to admin successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};
// =============================
// Remove Admin Role
// =============================
const removeAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Don't allow admin to remove their own admin role
        if (req.user._id.toString() === user._id.toString()) {
            return res.status(400).json({
                message: "You cannot remove your own admin role"
            });
        }

        user.role = "user";

        await user.save();

        res.status(200).json({
            message: "Admin role removed successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error("Remove Admin Error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    getUsers,
    makeAdmin,
    removeAdmin
};