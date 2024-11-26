import jwt from "jsonwebtoken";

const EnsureAuthenticated = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized, token is required" });
    }

    // Split the Bearer scheme and the token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, token is wrong or expired" });
    }
};

export { EnsureAuthenticated };
