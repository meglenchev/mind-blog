import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export function generateAuthToken(user) {
    // Create Token
    const payload = {
        id: user.id, 
        email: user.email
    };

    return jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
}