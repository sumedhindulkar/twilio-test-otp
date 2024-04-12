import * as jwt from 'jsonwebtoken';

export const generateToken = (payload: object, secretKey: string): string => {
  return jwt.sign(payload, secretKey, {
    expiresIn: '30d',
  });
};

export const verifyToken = (
  token: string,
  secretKey: string
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        // Token verification failed
        resolve(false);
      } else {
        // Token verification successful
        resolve(true);
      }
    });
  });
};
