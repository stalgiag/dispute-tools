/* global Krypton, Class, CONFIG, AttachmentsProcessor, AWS, S3Uploader */
const path = require('path');
const stream = require('stream');
const gm = require('gm').subClass({
  imageMagick: process.env.GM === 'true' || false,
});
const { assignDefaultConfig, buildFullPaths } = require('../lib/AWS');
const { US_STATES } = require('../lib/data');

const Account = Class('Account')
  .inherits(Krypton.Model)
  .includes(Krypton.Attachment)({
    tableName: 'Accounts',
    states: US_STATES,
    validations: {
      userId: ['required'],
      fullname: ['required'],
      state: [
        'required',
        {
          rule(val) {
            if (Account.states.indexOf(val) === -1) {
              throw new Error("The Account's state is invalid.");
            }
          },
          message: "The Account's state is invalid.",
        },
      ],
      zip: [
        'required',
        {
          rule(val) {
            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val) === false) {
              throw new Error("The Account's zip code is invalid.");
            }
          },
          message: "The Account's zip code is invalid.",
        },
      ],
      phone: ['maxLength:20'],
    },
    attributes: [
      'id',
      'userId',
      'fullname',
      'bio',
      'city',
      'state',
      'zip',
      'latitude',
      'longitude',
      'phone',
      'socialLinks',
      'imagePath',
      'imageMeta',
      'private',
      'disputesPrivate',
      'createdAt',
      'updatedAt',
    ],
    attachmentStorage: new Krypton.AttachmentStorage.S3(
    assignDefaultConfig({
      maxFileSize: 5242880,
      acceptedMimeTypes: [/image/],
    })
  ),

    prototype: {
      bio: '',
      imageMeta: {},
      socialLinks: {},

      init(config) {
        Krypton.Model.prototype.init.call(this, config);

        this.hasAttachment({
          name: 'image',
          versions: {
            small(readStream) {
              return gm(readStream)
              .resize(64, null)
              .gravity('Center')
              .crop(64, 64, 0, 0)
              .setFormat('jpg')
              .stream();
            },
            smallGrayscale(readStream) {
              return gm(readStream)
              .resize(64, null)
              .type('Grayscale')
              .gravity('Center')
              .crop(64, 64, 0, 0)
              .setFormat('jpg')
              .stream();
            },
            smallRedSquare(readStream) {
              const passThrough = new stream.PassThrough();

              gm(readStream)
              .resize(64, null)
              .type('Grayscale')
              .crop(64, 64, 0, 0)
              .stream()
              .pipe(passThrough);

              return gm(passThrough)
              .gravity('Center')
              .composite(path.join(process.cwd(), 'lib/assets', '64_red-square.png'))
              .setFormat('jpg')
              .stream();
            },
            medium(readStream) {
              return gm(readStream)
              .resize(256, null)
              .gravity('Center')
              .crop(256, 256, 0, 0)
              .setFormat('jpg')
              .stream();
            },
            mediumGrayscale(readStream) {
              return gm(readStream)
              .resize(256, null)
              .type('Grayscale')
              .gravity('Center')
              .crop(256, 256, 0, 0)
              .setFormat('jpg')
              .stream();
            },
            mediumRedSquare(readStream) {
              const passThrough = new stream.PassThrough();

              gm(readStream)
              .resize(256, null)
              .type('Grayscale')
              .crop(256, 256, 0, 0)
              .stream()
              .pipe(passThrough);

              return gm(passThrough)
              .gravity('Center')
              .composite(path.join(process.cwd(), 'lib/assets', '256_red-square.png'))
              .setFormat('jpg')
              .stream();
            },
          },
        });

        this.image.urls = buildFullPaths(this.image);
      },
    },
  });

module.exports = Account;
