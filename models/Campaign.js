/* globals Class, Krypton, Campaign */

const Campaign = Class('Campaign').inherits(Krypton.Model)({
  tableName: 'Campaigns',
  validations: {
    title: ['required'],
  },
  attributes: [
    'id',
    'collectiveId',
    'title',
    'description',
    'createdAt',
    'updatedAt',
  ],
});

module.exports = Campaign;
