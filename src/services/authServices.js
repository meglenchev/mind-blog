import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/tokenUtils.js";

export default {
    getOne(userId) {
       return User.findById(userId).select({
            email: true
        });
    },
    async register(username, email, password, rePassword) {
        const userExists = await User.exists({ email });

        if (userExists) {
            throw new Error('User already exists!');
        }

        if (password !== rePassword) {
            throw new Error('Passwords are not the same!');
        }

        const user = await User.create({ username, email, password });

        return generateAuthToken(user);
    },
    async login(email, password) {
        const user = await User.findOne({email});

        // Validate User
        if (!user) {
            throw new Error('Invalid user or password!');
        }

        // Validate Password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invaid user or password!');
        }

        return generateAuthToken(user);
    }
}