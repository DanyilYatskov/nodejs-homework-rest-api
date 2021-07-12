const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');

const serverURL = `http://localhost:${process.env.PORT}/`;

function createVarificationEmailTemplate(verifyToken, name) {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Rest-API',
      link: serverURL,
    },
  });
  const template = {
    body: {
      name,
      intro: 'Welcome to Rest-API!',
      action: {
        instructions: 'To get started with Rest-API, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `${serverURL}${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  const emailBody = mailGenerator.generate(template);
  return emailBody;
}

async function sendVarificationEmail(verifyToken, email, name) {
  const emailBody = createVarificationEmailTemplate(verifyToken, name);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: 'noreply@rest-api.com', // Change to your verified sender
    subject: 'Verification E-mail',
    html: emailBody,
  };
  await sgMail.send(msg);
}

module.exports = { sendVarificationEmail };
