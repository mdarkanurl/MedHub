import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const accessToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};


export const refreshToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: "1y" }
    );
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
