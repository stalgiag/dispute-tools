/* eslint-disable max-len */

const US_STATES = require('datasets-us-states-names');

const LOAN_SERVICERS = [
  'Aspire Resources',
  'CornerStone',
  'ESA/EdFinancial',
  'FedLoan Servicing',
  'Granite State',
  'Great Lakes',
  'MOHELA',
  'Navient/Sallie Mae',
  'Nelnet',
  'OSLA',
  'VSAC',
  'ECMC',
  'AES',
  'Other',
  'I don\'t know',
];

const CORINTHIAN_SCHOOLS = [
  'Everest Jonesboro',
  'Everest Mesa',
  'Everest Phoenix',
  'Everest ONLINE - Phoenix',
  'Everest ONLINE - Tempe',
  'Everest Alhambra',
  'Everest Anaheim',
  'Everest City of Industry',
  'Heald Concord',
  'Heald Folsom',
  'WyoTech Fremont',
  'Heald Fresno',
  'Everest Gardena',
  'Heald Hayward',
  'Everest Hayward',
  'WyoTech Long Beach',
  'Everest Los Angeles',
  'Heald Modesto',
  'Everest Ontario - Metro',
  'Everest Ontario',
  'Heald Rancho Cordova',
  'Everest Reseda',
  'Heald Roseville',
  'Wyotech Sacramento (West)',
  'Heald Salinas',
  'Everest San Bernardino',
  'Heald San Francisco',
  'Heald San Jose',
  'Everest San Jose',
  'Everest Santa Ana',
  'Heald Stockton',
  'Everest Torrance',
  'Everest Aurora',
  'Everest Colorado Springs',
  'Everest Thornton',
  'Everest Brandon',
  'WyoTech Daytona Beach',
  'Everest ONLINE - Brandon',
  'Everest Jacksonville',
  'Everest Kendall*',
  'Everest Lakeland',
  'Everest Largo (formerly FMU)',
  'Everest Melbourne',
  'Everest North Miami*',
  'Everest Orange Park',
  'Everest Orlando North',
  'Everest Orlando South',
  'Everest  ONLINE - Orlando South',
  'Everest Pinellas (Largo)',
  'Everest Pompano Beach',
  'Everest ONLINE - Pompano',
  'Everest Tampa',
  'Everest ONLINE - Tampa',
  'Everest Decatur',
  'Everest Atlanta Greenbriar',
  'Everest  Jonesboro',
  'Everest Marietta',
  'Everest Norcross',
  'Heald Honolulu',
  'Everest Bedford Park',
  'Everest  Chicago',
  'Everest Burr Ridge',
  'Everest Melrose Park',
  'Everest Merrionette',
  'Everest North Aurora**',
  'Everest Skokie',
  'Everest Merrillville',
  'Everest Brighton**',
  'Everest Chelsea',
  'Everest Silver Spring',
  'Everest Dearborn',
  'Everest Detroit',
  'Everest Grand Rapids',
  'Everest Kalamazoo',
  'Everest Southfield',
  'Everest Eagan',
  'Everest Kansas City (MO)',
  'Everest Springfield',
  'Everest St Louis',
  'Everest South Plainfield',
  'Everest Henderson',
  'Everest Rochester',
  'Everest Columbus/Gahanna',
  'Everest Portland',
  'Everest Tigard',
  'Heald Portland',
  'Everest Ben Salem',
  'WyoTech Blairsville',
  'Everest Pittsburgh',
  'Everest Arlington',
  'Everest Austin',
  'Everest Bissonet',
  'Everest Dallas',
  'Everest Ft Worth II',
  'Everest Fort Worth North',
  'Everest Greenspoint',
  'Everest Houston Hobby',
  'Everest San Antonio',
  'Everest Salt Lake City',
  'Everest Chesapeake',
  'Everest Newport News',
  'Everest Tyson’s Corner aka Vienna',
  'Everest Bremerton',
  'Everest Everett',
  'Everest Renton',
  'Everest Seattle',
  'Everest Tacoma',
  'Everest Milwaukee',
  'Everest Cross Lanes',
  'WyoTech Laramie',
  'Everest Vancouver',
  'Everest Woodbridge DC',
];

const personalInformationFieldSets = [
  {
    title: 'About You',
    subtitle: 'Let\'s get stated',
    fields: [
      [
        {
          name: 'name',
          label: 'Your Name',
          columnClassName: '.two-thirds',
          validations: [
            'required',
            'alpha',
            'maxLength:128',
          ],
        },
        {
          name: 'ssn',
          label: 'Social Security # (Last 4)',
          columnClassName: '.one-thirds',
          validations: [
            'required',
            'number',
            'maxLength:4',
          ],
        },
      ],
      [
        {
          name: 'address1',
          label: 'Your Address',
          validations: [
            'required',
            'maxLength:128',
          ],
        },
      ],
      [
        {
          name: 'address2',
          label: 'Your Address 2',
          validations: [
            'maxLength:128',
          ],
        },
      ],
      [
        {
          name: 'email',
          label: 'Your email',
          placeholder: 'you@example.com',
          columnClassName: '.one-half',
          validations: [
            'required',
            'email',
            'maxLength:128',
          ],
        },
        {
          name: 'phone',
          label: 'Your telephone',
          placeholder: '(55) 555-5555-5555',
          columnClassName: '.one-half',
          validations: [
            'required',
            'alphaNumeric',
            'maxLength:16',
          ],
        },
      ],
    ],
  },
  {
    title: 'Your School',
    fields: [
      [
        {
          name: 'schoolName',
          label: 'Name of the school where you incurred the debt',
          validations: [
            'required',
            'maxLength:128',
          ],
        },
      ],
      [
        {
          name: 'guarrantyAgency',
          label: 'Name of Guarranty Agency',
          subLabel: 'Required for FFEL loan holders',
          columnClassName: '.one-half',
          validations: [
            'maxLength:128',
          ],
        },
        {
          name: 'guarrantyAgencyEmail',
          label: 'Guarranty Agency mailing address',
          subLabel: 'Required for FFEL loan holders',
          columnClassName: '.one-half',
          validations: [
            'email',
            'maxLength:128',
          ],
        },
      ],
    ],
  },
  {
    title: 'Employment',
    yesno: true,
    yesNoLabel: 'Are You Currently employed?',
    fields: [
      [
        {
          name: 'employer',
          label: 'Current Employer',
          columnClassName: '.two-thirds',
          validations: [
            'maxLength:128',
          ],
        },
        {
          name: 'employmentDate',
          type: 'date',
          label: 'Beggining Date',
          columnClassName: '.one-thirds',
          validations: [
            'date',
          ],
        },
      ],
      [
        {
          name: 'employerAddress',
          label: 'Employer Address',
          validations: [
            'maxLength:128',
          ],
        },
      ],
      [
        {
          name: 'employerPhone',
          label: 'Employer Phone',
          columnClassName: '.one-third',
          validations: [
            'maxLength:23',
          ],
        },
      ],
    ],
  },
];

const personalInformation = {
  type: 'form',
  name: 'personal-information-form',
  title: 'Personal Information',
  description: 'Here we need some personal, school and employment information.',
  fieldSets: personalInformationFieldSets,
};

const personalStatement = {
  type: 'upload',
  name: 'personal-statement-uploader',
  multiple: false,
  optional: false,
  mimeTypes: [/image/, 'application/pdf'],
  maxFileSize: 5242880,
  title: 'Personal Statement',
  description: 'In addition to providing evidence against the school, you can write a personal statement describing how your school lied to and defrauded you and upload it here.',
  uploadButtonText: 'Upload files',
};

const evidenceUploader = {
  type: 'upload',
  name: 'evidence-uploader',
  multiple: true,
  optional: true,
  mimeTypes: [/image/, 'application/pdf'],
  maxFileSize: 5242880,
  title: 'Evidence (Optional)',
  description: 'Complement your case by attaching any supporting documents.',
  uploadButtonText: 'Upload files',
};

exports.seed = (knex) => {
  const uuid = require('uuid');

  return knex('DisputeTools').del()
    .then(() => {
      const tools = [
        {
          name: 'Wage Garnishment Dispute',
          about: `### Wage Garnishment for Federal Student Loans Dispute

If your wages are being garnished or if you received a letter threatening wage garnishment, you have a lot in common with thousands of other people whose wages are seized every year. This is wrong, since no one should have to go into debt for education!

You can use this form to submit a dispute to the Department of Education (for Direct Loans) and to the guaranty agency (for FFEL loans). We streamlined this form for our members because the Department's form is unnecessarily complicated.

PLEASE NOTE: **Before you begin the wage garnishment dispute process, you should find out who owns your student loans.**

If you have Direct loans, we will send your dispute to the Department of Education. If you have FFEL loans, you will need to provide the name and address of the originator of your loan. If you don't know the name of the guarantor, you can call the Department of the Treasury and ask them for the name and address of your guarantor.<br/>
The number is: 1-800-304-3107.`,
          completed: 0,
          data: {
            options: {
              A: {
                title: 'I do not owe the full amount I am being billed for because I repaid some or all of this debt.',
                description: 'Why do you believe you already paid this debt? Attach a detailed statement and upload any documents that prove you paid.',
                steps: [
                  personalInformation,
                  personalStatement,
                  evidenceUploader,
                ],
              },
              B: {
                title: 'I should not have to pay this debt because I was lied to or defrauded by my school.',
                description: 'See the [[common cases]] of fraud.',
                more: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                steps: [
                  personalInformation,
                  personalStatement,
                  {
                    type: 'upload',
                    name: 'dtr-uploader',
                    multiple: false,
                    optional: true,
                    mimeTypes: ['application/pdf'],
                    maxFileSize: 5242880,
                    title: 'Defence to Repayment (Optional)',
                    description: 'Attach your <a href="/dispute-tools/defence-to-repayment" target="_blank" rel="noopener noreferrer">DTR</a> If you have previously filed.',
                    uploadButtonText: 'Upload files',
                  },
                  evidenceUploader,
                ],
              },
              C: {
                title: 'I did not have a high school diploma or GED when I enrolled at the school.',
                description: 'Attach any supporting documents.',
                steps: [
                  personalInformation,
                  {
                    type: 'information',
                    name: 'atb-form',
                    title: 'Ability to benefit / ATB Form',
                    description: 'With your previous information we already complete The ATB form for you, you will receive copies at the end.',
                    footer: 'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
                  },
                  personalStatement,
                  evidenceUploader,
                ],
              },
              D: {
                title: 'When I borrowed to attend I had a condition (physical, mental, age, criminal record) that prevented me from meeting State requirements. ',
                description: 'Write a statement explaining more about the <a href="http://www.studentloanborrowerassistance.org/loan-cancellation/school-related/false-certification/disqualifying-status/" target="_blank" rel="noopener noreferrer">condition</a> that prevented you from using your degree. And attach any supporting documents.',
                steps: [
                  personalInformation,
                  {
                    type: 'information',
                    name: 'signature-form',
                    title: 'Unauthorized Signature form',
                    description: 'With your previous information we will complete the Unauthorized Signature form for you, you will receive copies at the end.',
                    footer: 'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
                  },
                  evidenceUploader,
                ],
              },
              E: {
                title: 'I believe that an official at the school without my permission signed my name or used my personal identification data to obtain this loan illegally in my name. ',
                description: 'Provide as much information as you can about why you believe the loan was issued fraudulently.',
                steps: [
                  personalInformation,
                  personalStatement,
                  evidenceUploader,
                ],
              },
            },
          },
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tax Offset Dispute',
          about: `### Tax Offset for Federal Student Loans

If your taxes are being seized ("offset") or if you have been threatened with offset, you have a lot in common with thousands of other people whose taxes are offset each year. This is wrong, since no one should have to go into debt for education!

You can use this form to submit a dispute to the Department of Education. The Department's form is unnecessarily complicated. We have streamlined the process for our members. You can make sure your offset is placed on hold if you file this dispute by 65 days after the date you received the offset notice. You can also stop an offset that has already begun if you receive a favorable decision from the Department.

**What if I suspect that my taxes will be offset but I haven't received a notice?**

The Department of Education usually sends offset notices once per year in the summer. If you want to know whether your taxes will be offset as a result of a federal student loan, you can call the Bureau of the Fiscal Service at 1-800-304-3107. Making this call does not make it more likely that your taxes will be offset.`,
          completed: 0,
          data: {
            options: {
              A: {
                title: 'I do not owe the full amount shown because I repaid some or all of this debt.',
                description: 'Please attach any supporting documents proving that you paid, including checks or receipts.',
                steps: [
                  personalInformation,
                  evidenceUploader,
                ],
              },

              B: {
                title: 'I believe that this loan is not collectable because I was lied to or defrauded by my school.',
                description: 'Attach a statement describing how you were lied to or defrauded and any documents that support your case, including news articles or a copy of your Defence to Repayment form',
                steps: [
                  personalInformation,
                  personalStatement,
                  {
                    type: 'upload',
                    name: 'dtr-uploader',
                    multiple: false,
                    optional: true,
                    mimeTypes: ['application/pdf'],
                    maxFileSize: 5242880,
                    title: 'Defence to Repayment (Optional)',
                    description: 'Attach your DTR If you have previously filed.',
                    uploadButtonText: 'Upload files',
                  },
                  evidenceUploader,
                ],
              },
              C: {
                title: 'I did not have a high school diploma or GED when I enrolled at the school.',
                description: 'Attach any supporting documents.',
                steps: [
                  personalInformation,
                  {
                    type: 'information',
                    name: 'atb-form',
                    title: 'Ability to benefit / ATB Form',
                    description: 'With your previous information we already complete The ATB form for you, you will receive copies at the end.',
                    footer: 'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
                  },
                  personalStatement,
                  evidenceUploader,
                ],
              },
              D: {
                title: 'When I borrowed to attend my college I had a condition (physical, mental, age, criminal record) that prevented me from using my degree.',
                description: 'Write a statement explaining more about the <a href="http://www.studentloanborrowerassistance.org/loan-cancellation/school-related/false-certification/disqualifying-status/" target="_blank"  rel="noopener noreferrer">condition</a> that prevented you from using your degree. And attach any supporting documents.',
                steps: [
                  personalInformation,
                  {
                    type: 'information',
                    name: 'signature-form',
                    title: 'Unauthorized Signature form',
                    description: 'With your previous information we will complete the Unauthorized Signature form for you, you will receive copies at the end.',
                    footer: 'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
                  },
                  personalStatement,
                  evidenceUploader,
                ],
              },
              E: {
                title: 'I believe that an official at the school without my permission signed my name or used my personal identification data to obtain this loan illegally in my name.',
                description: 'Provide as much information as you can about why you believe the loan was issued fraudulently.',
                steps: [
                  personalInformation,
                  personalStatement,
                  evidenceUploader,
                ],
              },
            },
          },
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'General Debt Dispute Letter',
          about: `### General Debt Dispute Letter

#### for any defaulted personal debt

This tool is for anyone who is in default on a debt. If you have been contacted by a collector who bought your loan from the original lender, you can fill out this form. Most of the time, collectors can't prove they own your debt, so by disputing the loan you may be able to stop collections. Before you begin to use this tool, you should make sure you have the name and address of the collections agency that is attempting to collect from you.

**If you don't have the name and address of the collection agency, you will not be able to file this dispute.**`,
          completed: 0,
          data: {
            disputeProcess: 1,
            options: {
              none: {
                title: 'Gather Materials',
                description: 'A little known fact of the debt collections industry is that the vast majority of collectors can\'t prove they own our debts. If they can\'t prove it, then why should we pay? Demanding proof of ownership is the first step to getting debt collectors off our backs.',
                steps: [
                  {
                    type: 'form',
                    name: 'personal-information-form',
                    title: 'Personal Information',
                    description: 'Here we need some personal, school and employment information.',
                    fieldSets: [
                      {
                        title: 'About You',
                        fields: [
                          [
                            {
                              name: 'name',
                              label: 'Your Full Name',
                              validations: [
                                'required',
                                'alpha',
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'address1',
                              label: 'Your Address',
                              validations: [
                                'required',
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'address2',
                              label: 'Your Address 2',
                              validations: [
                                'maxLength:128',
                              ],
                            },
                            {
                              name: 'state',
                              label: 'Your State',
                              type: 'dropdown',
                              options: US_STATES,
                              validations: [
                                'required',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'letter-or-phonecall',
                              label: 'You received a letter or a phone call?',
                              type: 'dropdown',
                              options: [
                                'letter',
                                'phone',
                              ],
                              validations: [
                                'required',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'agency-address',
                              label: 'Collection agency\'s or law firm\'s address',
                              validations: [
                                'required',
                              ],
                            },
                          ],
                        ],
                      },
                    ],
                  },
                  {
                    type: 'information',
                    name: 'info-dispute-letter',
                    title: 'General Debt Dispute Letter',
                    description: 'With your previous information we’ll fill this letter for you, you will receive copies at the end.',
                    footer: 'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
                  },
                  {
                    type: 'upload',
                    name: 'collection-notice-uploader',
                    multiple: false,
                    optional: false,
                    mimeTypes: [/image/, 'application/pdf'],
                    maxFileSize: 5242880,
                    title: 'Collection notice',
                    description: 'Attach a digital copy of the collection notice you received in the mail. You can take a photo of the notice with your phone or scan it into your computer.',
                    uploadButtonText: 'Upload files',
                  },
                ],
              },
            },
          },
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          name: 'Credit Report Dispute Letter',
          about: `### Credit Report Dispute Letter

Before using this tool, you should get a copy of your credit report and review it for errors. Millions of us have errors on our credit reports, which make it harder to do basic things like get a job or rent an apartment. This is totally unfair and unacceptable!
Fight back! You can get a free copy of your credit report once per year at [annualcreditreport.com](http://annualcreditreport.com) or call 1-877-322-8228. For a list of common errors to look for, go [here](http://google.com).

Once you have determined that there are errors on your report, you can use this tool to ask for a correction. This tool will help you write a dispute letter to the three main credit reporting agencies. The Debt Collective will submit the letters your behalf. Consumer reporting agencies have 5 business days after completing an investigation to notify you of the results. Generally, they must investigate the dispute within 30 days of receiving it. For more information about the process, go [here](http://google.com).
`,
          completed: 0,
          data: {
            disputeProcess: 1,
            options: {
              none: {
                title: 'Gather Materials',
                description: 'A little known fact of the debt collections industry is that the vast majority of collectors can\'t prove they own our debts. If they can\'t prove it, then why should we pay? Demanding proof of ownership is the first step to getting debt collectors off our backs.',
                steps: [
                  {
                    type: 'form',
                    name: 'personal-information-form',
                    title: 'Personal Information',
                    description: 'Here we need some personal, school and employment information.',
                    fieldSets: [
                      {
                        title: 'About You',
                        fields: [
                          [
                            {
                              name: 'name',
                              label: 'Your Full Name',
                              validations: [
                                'required',
                                'alpha',
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'address1',
                              label: 'Your Address',
                              validations: [
                                'required',
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'address2',
                              label: 'Your Address 2',
                              validations: [
                                'maxLength:128',
                              ],
                            },
                            {
                              name: 'state',
                              label: 'Your State',
                              type: 'dropdown',
                              options: US_STATES,
                              validations: [
                                'required',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'email',
                              label: 'Your email',
                              placeholder: 'you@example.com',
                              columnClassName: '.one-half',
                              validations: [
                                'required',
                                'email',
                                'maxLength:128',
                              ],
                            },
                            {
                              name: 'phone',
                              label: 'Your telephone',
                              placeholder: '(55) 555-5555-5555',
                              columnClassName: '.one-half',
                              validations: [
                                'required',
                                'alphaNumeric',
                                'maxLength:16',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'dob',
                              type: 'date',
                              label: 'Date of Birth',
                              validations: [
                                'date',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'ssn',
                              label: 'Social Security #',
                              validations: [
                                'required',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'agencies',
                              label: 'Please select which credit reporting agency or agencies you would like your dispute to go to',
                              type: 'dropdown',
                              multiple: true,
                              options: [
                                'Experian',
                                'Equifax',
                                'TransUnion',
                              ],
                              validations: [
                                'required',
                              ],
                            },
                          ],
                        ],
                      },
                    ],
                  },
                  {
                    type: 'information',
                    name: 'credit-dispute-letter',
                    title: 'Credit Report Dispute Letter',
                    description: 'With your previous information we’ll fill this letter for you, you will receive copies at the end.',
                    footer: 'This is an auto-generated form, you need to fill the {link to open the previous form} first.',
                  },
                  {
                    type: 'upload',
                    name: 'picture-id-uploader',
                    multiple: false,
                    optional: false,
                    mimeTypes: [/image/],
                    maxFileSize: 5242880,
                    title: 'Picture ID',
                    description: 'Please attach a photo of your picture ID. ',
                    uploadButtonText: 'Upload files',
                  },
                  {
                    type: 'upload',
                    name: 'credit-errors-uploader',
                    multiple: true,
                    optional: true,
                    mimeTypes: [/image/, 'application/pdf'],
                    maxFileSize: 5242880,
                    title: 'Credit report errors (optional)',
                    description: 'lease attach a document highlighting credit report errors.',
                    uploadButtonText: 'Upload files',
                  },
                ],
              },
            },
          },
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          name: 'Defence to Repayment application',
          about: `### Defence to Repayment application

If your taxes are being seized ("offset") or if you have been threatened with offset, you have a lot in common with thousands of other people whose taxes are offset each year. This is wrong, since no one should have to go into debt for education!

You can use this form to submit a dispute to the Department of Education. The Department's form is unnecessarily complicated. We have streamlined the process for our members. You can make sure your offset is placed on hold if you file this dispute by 65 days after the date you received the offset notice. You can also stop an offset that has already begun if you receive a favorable decision from the Department.`,
          completed: 0,
          data: {
            disputeProcess: 1,
            options: {
              none: {
                title: 'Gather Materials',
                description: 'A little known fact of the debt collections industry is that the vast majority of collectors can\'t prove they own our debts. If they can\'t prove it, then why should we pay? Demanding proof of ownership is the first step to getting debt collectors off our backs.',
                signature: `
I have read and understand all of the information in this form.
I agree to provide, upon request, testimony, a sworn statement, or other documentation reasonably available to me that demonstrates to the satisfaction of the Department of Education or its designee that I meet the qualifications for borrower defense to repayment loan discharge.

All of the information I provided is true and complete to the best of my knowledge and I agree, if asked, to provide information reasonably available to me to the Department of Education that will verify the accuracy of my completed attestation.
I understand that the Department of Education has the authority to verify information reported on this application with other federal or state agencies or other entities. I authorize the Department of Education, along with its agents and contractors, to contact me regarding this request at the phone number above using automated dialing equipment or artificial or prerecorded voice or text messages.

I understand that if I purposely provided false or misleading information on this application, I may be subject to the penalties specified in 18 U.S. Code § 1001.
I certify that, if my defense is successful, upon request I will provide assistance and cooperation to the U.S. Department of Education (the Department) in any proceedings or enforcement actions against the school related to my defense or the conduct asserted herein.

                `,
                steps: [
                  {
                    type: 'form',
                    name: 'personal-information-form',
                    title: 'Personal Information',
                    description: 'Here we need some personal, school and employment information.',
                    fieldSets: [
                      {
                        title: 'About You',
                        fields: [
                          [
                            {
                              name: 'name',
                              label: 'Your Full Name',
                              validations: [
                                'required',
                                'alpha',
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'address1',
                              label: 'Your Address',
                              validations: [
                                'required',
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'city',
                              label: 'Your City',
                              validations: [
                                'maxLength:128',
                              ],
                            },
                            {
                              name: 'state',
                              label: 'Your State',
                              type: 'dropdown',
                              options: US_STATES,
                              validations: [
                                'required',
                              ],
                            },
                            {
                              name: 'zip',
                              label: 'Your Zip',
                              validations: [
                                'alphaDash',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'email',
                              label: 'Your email',
                              placeholder: 'you@example.com',
                              columnClassName: '.one-half',
                              validations: [
                                'required',
                                'email',
                                'maxLength:128',
                              ],
                            },
                            {
                              name: 'phone',
                              label: 'Your telephone',
                              placeholder: '(55) 555-5555-5555',
                              columnClassName: '.one-half',
                              validations: [
                                'required',
                                'alphaNumeric',
                                'maxLength:16',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'ssn',
                              label: 'Social Security # (Last 4)',
                              validations: [
                                'required',
                                'numeric',
                                'maxLength:4',
                              ],
                            },
                          ],
                        ],
                      },
                      {
                        title: 'Your Employment',
                        yesno: true,
                        label: 'Are you currently employed?',
                        fields: [
                          [
                            {
                              name: 'field-of-study',
                              label: 'Is your job in your field of study?',
                              type: 'yesno',
                              default: 'no',
                            },
                          ],
                        ],
                      },
                      {
                        title: 'Your loan',
                        fields: [
                          [
                            {
                              name: 'loan-servicer',
                              label: 'Who is your loan servicer?',
                              type: 'dropdown',
                              options: LOAN_SERVICERS,
                            },
                          ],
                          [
                            {
                              name: 'servicer-choosen',
                              label: 'Did you choose the lender of your federal student loans?',
                              subLabel: 'Most students did not choose their own federal student loan lender. You should only choose "yes" if you took out some or all of your loans before 2010, and you had the option to take out federal student loans from different lenders.',
                              type: 'yesno',
                              default: 'no',
                            },
                          ],
                        ],
                      },
                      {
                        title: 'Your school',
                        fields: [
                          [
                            {
                              name: 'is-corinthian',
                              label: 'Did you attended a Corinthian campus? (Everest, WyoTech, Heald)',
                              type: 'yesno',
                              default: 'no',
                              toggle: [
                                'school-name-list',
                                'school-name',
                                'school-address',
                                'school-city',
                                'school-state',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'school-name-list',
                              label: 'Which campus did you attend',
                              hidden: true,
                              type: 'dropdown',
                              options: CORINTHIAN_SCHOOLS,
                            },
                          ],
                          [
                            {
                              name: 'school-name',
                              label: 'School Name',
                              hidden: false,
                              validations: [
                                'maxLength:128',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'school-address',
                              label: 'School Address',
                              subLabel: 'If you can\'t remember your campus\'s address and don\'t have any records stating it, entering the name of your school into a search engine may turn up its address. If you can\'t find the address, you can enter just your school campus\'s state.',
                              hidden: false,
                              validations: [
                                'maxLength:256',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'school-city',
                              label: 'School City',
                              hidden: false,
                            },
                          ],
                          [
                            {
                              name: 'school-state',
                              label: 'School State',
                              hidden: false,
                              type: 'dropdown',
                              options: US_STATES,
                            },
                          ],
                          [
                            {
                              name: 'school-attendance[from]',
                              label: 'When did you attend school?: From',
                              placeholder: 'month, year',
                            },
                            {
                              name: 'school-attendance[to]',
                              label: 'To',
                              placeholder: 'month, year',
                            },
                          ],
                          [
                            {
                              name: 'school-program-name',
                              label: 'What was the name of your program?',
                              placeholder: 'e.g. Medical Assisting, Business Management',
                            },
                          ],
                          [
                            {
                              name: 'school-degree',
                              label: 'What type of degree were you working on? (Select your highest degree.)',
                              type: 'dropdown',
                              options: [
                                'Associates',
                                'Certificate',
                                'Bachelors',
                                'Masters',
                              ],
                            },
                          ],
                          [
                            {
                              name: 'school-program-completed',
                              label: 'Did you complete the program?',
                              type: 'yesno',
                              default: 'no',
                            },
                          ],
                        ],
                      },

                      {
                        title: 'Your experience',
                        subtitle: 'Now we’ll prompt you to describe different aspects of your experience with your school.',
                        fields: [
                          [
                            {
                              title: 'Job placement',
                              subtitle: 'Did your school lie to you or mislead you about your job prospects? This could include:',
                              text: `
  <ul>
    <li>Citing false or misleading statistics about job placement rates</li>
    <li>Promising inflated salaries</li>
    <li>Promising but failing to provide support in finding and landing a job.</li>
  </ul>
                              `,
                              yesno: true,
                              fields: [
                                [
                                  {
                                    name: 'job-placement-detail',
                                    label: 'Please explain in detail.',
                                    type: 'text',
                                  },
                                ],
                              ],
                            },
                          ],
                          [
                            {
                              title: 'Accreditation',
                              subtitle: 'Did your school mislead you about the quality of the education you would receive? This could include:',
                              text: `
  <ul>
    <li>Falsely claiming that the school had the proper accreditation to allow its graduates to take a particular licensing exam</li>
    <li>Falsely claiming that it offered the classes necessary to achieve employment and/or certification in a particular field</li>
    <li>Citing misleading statistics about the pass rate of students on required licensing or certification exams.</li>
  </ul>
                              `,
                              yesno: true,
                              fields: [
                                [
                                  {
                                    name: 'accreditation-detail',
                                    label: 'Please explain in detail.',
                                    type: 'text',
                                  },
                                ],
                              ],
                            },
                          ],
                          [
                            {
                              title: 'Eligibility',
                              subtitle: 'Did your school mislead you about whether you were eligible to benefit from the program? This could include:',
                              text: `
  <ul>
    <li>Enrolling you even though you did not have a high school diploma or GED</li>
    <li>Claiming that a felony record or disability would not stand in the way of employment in a particular field.</li>
  </ul>
                              `,
                              yesno: true,
                              fields: [
                                [
                                  {
                                    name: 'eligibility-detail',
                                    label: 'What did your school do? If any of the listed behaviours apply, please state which.',
                                    type: 'text',
                                  },
                                ],
                              ],
                            },
                          ],
                          [
                            {
                              title: 'Cost/payment',
                              subtitle: 'Did your school mislead you about how you would pay for the program? This could include:',
                              text: `
  <ul>
    <li>Understating the total cost of the program</li>
    <li>Signing loan paperwork without your permission</li>
    <li>Understating the amount of loans necessary</li>
    <li>Treating grants and loans as if they were the same thing</li>
    <li>Treating federal and private loans as if they were the same thing</li>
    <li>Refusing to disclose loan terms or allow review of loan documents</li>
  </ul>
                              `,
                              yesno: true,
                              fields: [
                                [
                                  {
                                    name: 'cost-payment-detail',
                                    label: 'What did your school do? If any of the listed behaviours apply, please state which.',
                                    type: 'text',
                                  },
                                ],
                              ],
                            },
                          ],
                          [
                            {
                              title: 'Illegal activity',
                              subtitle: 'Did your school mislead you about the extent of the illegal activities there, and the effect those activities would have on your school’s reputation and continued existence? This could include:',
                              text: `
  <ul>
    <li>The school shutting down in light of lawsuits or financial mismanagement</li>
    <li>Finding that having your school on a resume repels employers who have heard about its illegal practices</li>
  </ul>
                              `,
                              yesno: true,
                              fields: [
                                [
                                  {
                                    name: 'illegal-activity-detail',
                                    label: 'What did your school do? If any of the listed behaviours apply, please state which.',
                                    type: 'text',
                                  },
                                ],
                              ],
                            },
                          ],
                          [
                            {
                              title: 'Other',
                              subtitle: 'Did your school mislead you in other ways that you didn\'t already describe?',
                              yesno: true,
                              fields: [
                                [
                                  {
                                    name: 'other-detail',
                                    label: 'What did your school do? ',
                                    type: 'text',
                                  },
                                ],
                              ],
                            },
                          ],
                          [
                            {
                              title: 'Measure of injury',
                              subtitle: 'Now we\'ll ask you to explain how the conduct you’ve already described here by your school caused you harm and put you in debt. Because of this conduct, I\'ve suffered the following harm:',
                              fields: [
                                [
                                  {
                                    name: 'student-loan-checkbox',
                                    label: 'Student loan debt',
                                    type: 'checkbox',
                                  },
                                ],
                                [
                                  {
                                    name: 'credits-wont-transfer-checkbox',
                                    label: 'I couldn\'t enroll in another school because my credits wouldn\'t transfer.',
                                    type: 'checkbox',
                                  },
                                ],
                                [
                                  {
                                    name: 'more-student-loan-checkbox',
                                    label: 'I couldn\'t enroll in another school because I couldn\'t take out more student loan debt.',
                                    type: 'checkbox',
                                  },
                                ],
                                [
                                  {
                                    name: 'name-on-resume-checkbox',
                                    label: 'I had a hard time finding a job in my field because my school was on my resume',
                                    type: 'checkbox',
                                  },
                                ],
                                [
                                  {
                                    name: 'stress-checkbox',
                                    label: 'Other injury, including stress or emotional pain',
                                    type: 'checkbox',
                                  },
                                ],
                              ],
                            },
                          ],
                        ],
                      },
                    ],
                  },
                  evidenceUploader,
                ],
              },
            },
          },
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      return knex('DisputeTools').insert(tools.map((tool) => {
        return {
          id: uuid.v4(),
          name: tool.name,
          about: tool.about,
          completed: tool.completed,
          data: tool.data,
          created_at: tool.created_at,
          updated_at: tool.updated_at,
        };
      }));
    });
};
