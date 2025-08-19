import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const JWT_SECRET: Secret = 'jfdsghdsgfgfg';

export function generateToken(payload: object, expiresIn: string | number = '1h'): string {
    const options: SignOptions = { expiresIn: 1000 * 60 * 60 * 4 }; // default to 4 hours
    return jwt.sign(payload, JWT_SECRET, options); 
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}
