const {
  mailers: { contactEmail },
} = require('$config/config');
const DebtCollectiveMessage = require('./DebtCollectiveMessage');

/**
 * Sends contact us emails to the Debt Collective organizers
 */
class ForAdmin extends DebtCollectiveMessage {
  /**
   * @param {string} message Message for the Debt Collective organizers
   * @param {string} email The email address of the visitor contacting the Debt Collective
   * @param {string} name The name of the visitor contact the Debt Collective
   */
  constructor(message, email, name) {
    super('ContactUsEmail.ForAdmin', {
      to: ForAdmin.to,
      from: `${name} <${email}>`,
      subject: `${name} has sent a message using the Contact Us form`,
    });

    this.locals = {
      message,
      name,
    };
  }
}

ForAdmin.to = `The Debt Collective Organizers <${contactEmail}>`;

/**
 * Wraps the ForVisitor and ForAdmin emails to make sending both cleaner
 */
class ContactUsEmail {
  /**
   * @param {string} message Message for the Debt Collective organizers
   * @param {string} email The email address of the visitor contacting the Debt Collective
   * @param {string} name The name of the visitor contact the Debt Collective
   */
  constructor(message, email, name) {
    this.forAdmin = new ForAdmin(message, email, name);
  }

  send() {
    return this.forAdmin.send();
  }

  toString() {
    return `${this.forAdmin.toString()}`;
  }
}

ContactUsEmail.ForAdmin = ForAdmin;

module.exports = ContactUsEmail;
