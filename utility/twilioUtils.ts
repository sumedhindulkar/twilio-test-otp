const twilioServiceId = process.env.TWILIO_SERVICE_ID;
const accountSid = process.env.TWILIO_SID_TEST;
const authToken = process.env.TWILIO_AUTH_TOKEN_TEST;

const client = require('twilio')(accountSid, authToken);

const phoneNumber = '+917045045719';

export const createAuth = async () => {
  try {
    const verification = await client.verify.v2
      .services(twilioServiceId)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    return verification;
  } catch (err) {
    return err;
  }
};

export const verifyOTP = async ({ code }: { code: string }) => {
  try {
    const verification_check = client.verify.v2
      .services(twilioServiceId)
      .verificationChecks.create({ to: phoneNumber, code });
    return verification_check;
  } catch (err) {
    return err;
  }
};
