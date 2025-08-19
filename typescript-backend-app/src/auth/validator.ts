import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const JWT_SECRET: Secret = 'jfdsghdsgfgfg'; // explicitly typed as Secret

export function generateToken(payload: object, expiresIn: string | number = '1h'): string {
    const options: SignOptions = { expiresIn: 1000 * 60 * 60 }; // default to 1 hour
    return jwt.sign(payload, JWT_SECRET, options);  // now types match
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET); // returns string | jwt.JwtPayload
}
