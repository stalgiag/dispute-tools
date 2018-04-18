/* eslint max-len: 0 */
/* eslint max-len: 0 */

const { US_STATES } = require('..');
const Field = require('./validations');
const { debtAmount: { group: debtAmounts } } = require('./shared-fields');

const { zip, email, ssn, phone, text, date } = Field.FieldValidation;

module.exports = {
  disputeProcess: 1,
  nowWhat: `
    Thank you for disputing your credit report. Your dispute will be sent to the agencies you specified. The dispute process can take up to 30 days. You should hear a response directly from each of the agencies.
    <br><br>
    We will prompt you to report the results of your dispute so we can make sure Debt Collective member's rights are respected and that errors are promptly removed.
  `,
  options: {
    none: {
      title: 'Gather Materials',
      description:
        'This is a tool for anyone who believes there is an error on their credit report. The purpose of the tool is to help you write a dispute letter to the credit reporting agencies that the Debt Collective will submit on your behalf. Before you begin, you should get a copy of your credit report and note all of the errors that you want to dispute.',
      steps: [
        {
          type: 'form',
          name: 'personal-information-form',
          title: 'Personal Information',
          description: 'Here we need some personal, school and employment information.',
          fieldSets: [
            debtAmounts,
            {
              title: 'Personal Information',
              fields: [
                [
                  new Field({
                    name: 'name',
                    label: 'Your Full Name',
                    columnClassName: 'md-col-8',
                    validations: text,
                  }),
                  new Field({
                    name: 'dob',
                    label: 'Your date of birth?',
                    type: 'date',
                    columnClassName: 'md-col-4',
                    validations: date,
                  }),
                ],
                [
                  new Field({
                    name: 'ssn',
                    label: 'Your SSN',
                    columnClassName: 'md-col-12',
                    validations: ssn,
                  }),
                ],
                [
                  new Field({
                    name: 'address',
                    label: 'Your Mailing Address',
                    validations: text,
                  }),
                ],
                [
                  new Field({
                    name: 'city',
                    label: 'Your City',
                    columnClassName: 'md-col-5',
                    validations: text,
                  }),
                  new Field({
                    name: 'state',
                    label: 'Your State',
                    columnClassName: 'md-col-4',
                    type: 'dropdown',
                    options: US_STATES,
                    validations: [`oneOf:${US_STATES.join(', ')}:false`],
                  }),
                  new Field({
                    name: 'zip-code',
                    label: 'Your Zip Code',
                    columnClassName: 'md-col-3',
                    validations: zip,
                  }),
                ],
                [
                  new Field({
                    name: 'email',
                    label: 'Your email',
                    columnClassName: 'md-col-6',
                    validations: email,
                  }),
                  new Field({
                    name: 'phone',
                    label: 'Your telephone',
                    columnClassName: 'md-col-6',
                    validations: phone,
                  }),
                ],
                [
                  new Field({
                    title:
                      'Please select which credit reporting agency or agencies you would like your dispute to go to',
                    type: 'group',
                    name: 'agencies',
                    validations: ['oneOf: Experian, Equifax, TransUnion :true'],
                    fields: [
                      [
                        {
                          name: 'agencies',
                          label: 'Experian',
                          type: 'checkbox',
                          attributes: {
                            value: 'Experian',
                          },
                        },
                      ],
                      [
                        {
                          name: 'agencies',
                          label: 'Equifax',
                          type: 'checkbox',
                          attributes: {
                            value: 'Equifax',
                          },
                        },
                      ],
                      [
                        {
                          name: 'agencies',
                          label: 'TransUnion',
                          type: 'checkbox',
                          attributes: {
                            value: 'TransUnion',
                          },
                        },
                      ],
                    ],
                  }),
                ],
              ],
            },
          ],
        },
        {
          type: 'information',
          name: 'credit-dispute-letter',
          title: 'Credit Report Dispute Letter',
          description:
            'With your previous information we’ll fill this letter for you, you will receive copies at the end.',
          footer:
            'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
        },
        {
          type: 'upload',
          name: 'picture-id-uploader',
          multiple: false,
          optional: false,
          mimeTypes: ['image/jpeg', 'image/png'],
          maxFileSize: 5242880,
          title: 'Picture ID',
          description: 'Please attach a photo of your picture ID. ',
          uploadButtonText: 'Upload file',
          footerNotes: 'JPEG, PNG format',
        },
        {
          type: 'upload',
          name: 'credit-errors-uploader',
          multiple: true,
          optional: false,
          mimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
          maxFileSize: 5242880,
          title: 'Credit report errors',
          description: 'Please attach a document highlighting credit report errors.',
          uploadButtonText: 'Upload files',
          footerNotes: 'JPEG, PNG, PDF format',
        },
      ],
    },
  },
};