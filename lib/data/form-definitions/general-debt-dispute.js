/* eslint max-len: 0 */

const { US_STATES } = require('..');
const Field = require('./validations');
const { debtAmount: { group: debtAmounts } } = require('./shared-fields');

const { text, zip } = Field.FieldValidation;

module.exports = {
  disputeProcess: 1,
  nowWhat: `
  Thank for your disputing your debt! We can't tell you how long it will take for you to hear a response from the debt collector, since each collector handles disputes differently. We will prompt you to notify us when you get a reply. We are watching what happens with these disputes very closely so that we can find out which creditors are breaking the law and so we can find ways to work collectively to challenge them.
  `,
  options: {
    none: {
      title: 'Gather Materials',
      description: `This dispute is for all types of debt in collections except student loans.
      <br><br>
      A little known fact of the debt collections industry is that the vast majority of collectors can’t prove they own our debts. If they can’t prove it, then why should we pay? Demanding proof of ownership is the first step to getting debt collectors off our backs.`,
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
                    validations: text,
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
                    columnClassName: 'md-col-4',
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
                    columnClassName: 'md-col-4',
                    validations: zip,
                  }),
                ],
                [
                  new Field({
                    name: 'agency-name',
                    label: 'Name of collection agency or law firm',
                    validations: text,
                  }),
                  new Field({
                    name: 'agency-address',
                    label: 'Collection agency’s or law firm’s mailing address',
                    validations: text,
                  }),
                ],
                [
                  new Field({
                    name: 'agency-city',
                    label: 'Collection agency’s or law firm’s City',
                    columnClassName: 'md-col-4',
                    validations: text,
                  }),
                  new Field({
                    name: 'agency-state',
                    label: 'Collection agency’s or law firm’s State',
                    columnClassName: 'md-col-4',
                    type: 'dropdown',
                    options: US_STATES,
                    validations: [`oneOf:${US_STATES.join(', ')}:false`],
                  }),
                  new Field({
                    name: 'agency-zip-code',
                    label: 'Collection agency’s or law firm’s Zip Code',
                    columnClassName: 'md-col-4',
                    validations: zip,
                  }),
                ],
              ],
            },
          ],
        },
        {
          type: 'information',
          name: 'info-dispute-letter',
          title: 'General Debt Dispute Letter',
          description:
            'With your previous information we’ll fill this letter for you, you will receive copies at the end.',
          footer:
            'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
        },
        {
          type: 'upload',
          name: 'collection-notice-uploader',
          multiple: false,
          optional: false,
          mimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
          maxFileSize: 5242880,
          title: 'Collection notice',
          description:
            'Attach a digital copy of the collection notice you received in the mail. You can take a photo of the notice with your phone or scan it into your computer.',
          uploadButtonText: 'Upload file',
          footerNotes: 'JPEG, PNG, PDF format',
        },
      ],
    },
  },
};