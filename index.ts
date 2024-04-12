import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import { generateToken, verifyToken } from './utility/jwtUtils';
const secretKey = process.env.JWT_SECRET || '';
import { createAuth, verifyOTP } from './utility/twilioUtils';
const app: Express = express();
const PORT = process.env.PORT || 4000;

app.get('/api', async (req: R bequest, res: Response) => {
  // res.json({ token: generateToken({ id: '123' }, secretKey) });
  await createAuth();
  res.json({ token: 'OTP' });
});

app.get('/api/verify', async (req: Request, res: Response) => {
  const { otp } = req.body;
  const verifiedCheck = await verifyOTP(otp);
  res.json({ OTP: verifiedCheck });
});

app.get('/api/v', async (req: Request, res: Response) => {
  const result = await verifyToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcxMjgwOTY3OCwiZXhwIjoxNzE1NDAxNjc4fQ.eHNGuSut6axHRijAvyN1ylLkdxOUuuxRrbEa1UD0kfk',
    secretKey
  );
  console.log(JSON.stringify(result));
  res.json({
    tokenVerify: result,
  });
});

app.listen(PORT, () => {
  console.log(`Running port on ${PORT}`);
});
