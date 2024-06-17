import jwt from "jsonwebtoken";

export const verifyToken = async function (req, res, next) {
  try {
    // Extract token from the cookies.
    const token =
      req.cookies.UserAuth || req.headers["authorization"].split("=")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access user information",
      });
    }
    // Extract public key from environment variable
    const publicKey = process.env.SECRET_TOKEN;

    // Check if the public key exists.
    if (!publicKey) {
      return res.status(500).json({
        success: false,
        message: "Server error: Public key not provided",
      });
    }

    // Verifying the extracted token using extracted public key.
    const decodedToken = jwt.verify(token, publicKey);

    // Extract email from the decoded token and add it to reqbody.
    req.body.email = decodedToken.email;

    // Proceed to the next middleware.
    next();
  } catch (error) {
    console.log("Verification Token Error: " + error.message);
    // Return an err response if token verification fails.
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
