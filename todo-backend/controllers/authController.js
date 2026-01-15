const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// without var, let and const, the declared variable would be
// globally scoped.

/**
 * Creates a brand new user in the database.
 * @param {object} req - The Express qrequest object.
 * @param {object} res - The Express response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Errors} if the user cannot be create {their first name or last name are of invalid format}
 * @example
 *  router.post("/register", authController.register);
 * Reference: https://jsdoc.app/about-getting-started
 */
const register = async (req, res) => {
    try {
        // 1. destructure data from the request
        const { firstName, lastName, email, password } = req.body;
        console.log("backend reached!");
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // 2. check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // 3. hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. create the user
        const userId = await User.create(
            firstName,
            lastName,
            email,
            hashedPassword
        );

        // 5. respond
        res.status(201).json({
            message: "User registered successfully",
            userId: userId,
        });
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({
            error: "Server error. Failed to create the user.",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }

        // 2. compare passwords
        // bcrypt.compare(plainText, hash) returns true/false
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // 3. Generate token (the badge)
        // payload: what info is hidden inside the token? (usually just the userID)
        const payload = {
            id: user.id,
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // token expires in 1 hour
        );
        // Reference: https://www.jwt.io/
        // token = part1.part2.part3
        // where each part is base64-encoded, and
        // part1: the JWT header
        // {
        // alg: HS256 // the algorithm used to sign the JWT. https://datatracker.ietf.org/doc/html/rfc7518#section-3.1
        // typ: JWT   // the media type of this complete JWT https://datatracker.ietf.org/doc/html/rfc7519#section-5.1
        // }
        // part2: the payload
        // {
        // id: the user_id (in this case)
        // iat: the time at which the JWT was issued. https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
        // exp: the expiration time on or after which the JWT must not be accepted for processing.
        // }

        // res.json({
        //     message: "Login successfully",
        //     token: token,
        // });
        // To switch to Cookies, we need to change how the backend sends the token and how hot frotnend receives it.
        // Send token as an HTTP-only Cookie
        res.cookie("token", token, {
            httpOnly: true, // Block any JS code on the browser from access and modifying the token
            secure: process.env.NODE_ENV === "production", // only sends over HTTPs in production
            sameSite: "strict", // prevent CSRF attacks
            maxAge: 3600000, // 1 hour (in milliseconds)
        });

        res.json({
            message: "Login successfully",
            user: {
                id: user.id,
                first_name: user.first_name,
            },
        });
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ error: "Server error" });
    }
};

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // expiration date to the past to delete it
        sameSite: "strict",
    });
    res.status(200).json({
        message: "Logged out successfully",
    });
};

module.exports = { register, login, logout };
// should wrap the functions inside {} (because later on, we may need to add more and we can't assign more than 1 value to module.exports)
// This is actually shorthand for: module.exports = { register: register };
