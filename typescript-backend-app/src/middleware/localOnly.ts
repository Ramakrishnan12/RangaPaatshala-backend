import { Request, Response, NextFunction } from 'express';

export function localOnly(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.connection.remoteAddress;
  // IPv4 localhost: 127.0.0.1, ::1 (IPv6 localhost)
  if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return next();
  }
  return res.status(403).json({ message: 'This API is only accessible from localhost.' });
}