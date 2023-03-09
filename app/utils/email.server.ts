import * as SendInBlue from '@sendinblue/client';

const emailAPi = new SendInBlue.TransactionalEmailsApi();
const sendSmtpEmail = new SendInBlue.SendSmtpEmail();

if (process.env.SENDINBLUE_API_KEY) {
  emailAPi.setApiKey(SendInBlue.TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY);
}

export default { emailAPi, sendSmtpEmail };
