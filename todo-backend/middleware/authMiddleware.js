const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // 1. Get the token from the HTTP Headers (The Envelope)
    // const authHeader = req.headers.authorization;
    // xxxxx Grab token from cookies instead of headers
    const token = req.cookies.token;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     return res
    //         .status(401)
    //         .json({ error: "No token, authorization denied" });
    // }
    if (!token) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        // console.log("header = ", authHeader);
        // 2. Extract the actual token string (remove "Bearer " from the string)
        // The client sends: "Bearer eyJhbGci..."
        // We split by space (' ') and take the second part ([1])
        // const token = authHeader.split(" ")[1];

        // 3. Verify the token using the SAME secret key we used to sign it
        // This checks the "Wax Seal"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the user data (id: 1) to the request object
        req.user = decoded;

        // res.status(201).json({messgae: "Success 🚀"});
        // 5. Allow the request to proceed
        next();
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = { protect };
