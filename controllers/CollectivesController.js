/* globals CONFIG, Class, RestfulController, Collective, DisputeTool, User, Campaign, Account, CollectiveBans */

const marked = require('marked');
const Promise = require('bluebird');

const CollectivesController = Class('CollectivesController').inherits(RestfulController)({
  beforeActions: [
  // Load Collectives
  {
    before(req, res, next) {
      Collective.query()
        .orderBy('created_at', 'DESC')
        .then((collectives) => {
          return Promise.all(collectives.map((c) => {
            const subquery = Campaign.query()
              .count('*')
              .where('collective_id', c.id);

            if (!req.user) {
              subquery
                .where('published', true)
                .where('active', true);
            } else {
              subquery.where('published', true);
            }

            return subquery.then(([result]) => {
              c.campaignCount = parseInt(result.count, 10);
              return c;
            });
          })).then(() => {
            req.collectives = collectives;
            res.locals.collectives = collectives;
            next();
          });
        })
      .catch(next);
    },
    actions: ['index'],
  },
  // Load Collective
  {
    before: '_loadCollective',
    actions: [
      'show',
      'join',
    ],
  },
  // Sum totalDebtAmount for all campaigns
  {
    before(req, res, next) {
      const campaingsIds = req.collective.campaigns.map(c => c.id);
      res.locals.totalDebtAmount = 0;

      return Campaign.knex()
        .select('debt_amount')
        .from('UsersCampaigns')
        .whereIn('campaign_id', campaingsIds)
        .then(results => {
          const total = results.reduce((p, c) =>
            ({ debt_amount: (p.debt_amount + c.debt_amount) }), { debt_amount: 0 });

          res.locals.totalDebtAmount = total.debt_amount || 0;

          return next();
        })
        .catch(next);
    },
    actions: ['show'],
  },
  // Check if user can create campaigns
  {
    before(req, res, next) {
      req.canCreateCampaigns = false;
      res.locals.canCreateCampaigns = false;

      if (!req.user) {
        return next();
      }

      return User.knex()
        .table('CollectiveAdmins')
        .where({
          collective_id: req.params.id,
          user_id: req.user.id,
        })
      .then((results) => {
        if (results.length !== 0) {
          req.canCreateCampaigns = true;
          res.locals.canCreateCampaigns = true;
        }

        return next();
      })
      .catch(next);
    },
    actions: ['show'],
  },
  // Check if user belongs to collective
  {
    before(req, res, next) {
      res.locals.belongsToCollective = false;

      if (!req.user) {
        return next();
      }

      return User.knex().table('UsersCollectives')
        .where({
          user_id: req.user.id,
          collective_id: req.params.id,
        })
      .then(result => {
        if (result.length > 0) {
          res.locals.belongsToCollective = true;
        }
        next();
      });
    },
    actions: ['show'],
  },
  // Attach accounts to users
  {
    before(req, res, next) {
      return Promise.each(req.collective.users, (user) => {
        return Account.query()
          .where('user_id', user.id)
          .then(([account]) => {
            user.account = account;
          });
      })
      .then(() => {
        next();
      })
      .catch(next);
    },
    actions: ['show'],
  },
  // Check if user belongs to campaigns
  {
    before(req, res, next) {
      if (!req.user) {
        return next();
      }

      const knex = Campaign.knex();

      return Promise.each(req.collective.campaigns, (campaign) => {
        return knex.table('UsersCampaigns')
          .where({
            user_id: req.user.id,
            campaign_id: campaign.id,
          })
        .then((results) => {
          campaign.userBelongsToCampaign = false;

          if (results.length > 0) {
            campaign.userBelongsToCampaign = true;
          }

          return Promise.resolve();
        });
      })
      .then(() => {
        return next();
      })
      .catch(next);
    },
    actions: ['show'],
  },
  // Check if user belongs to collectives
  {
    before(req, res, next) {
      if (!req.user) {
        return next();
      }

      const knex = Collective.knex();

      return Promise.each(req.collectives, (collective) => {
        collective.userBelongsToCollective = false;

        return knex.table('UsersCollectives')
          .where({
            user_id: req.user.id,
            collective_id: collective.id,
          })
        .then((_results) => {
          collective.userBelongsToCollective = false;

          if (_results.length > 0) {
            collective.userBelongsToCollective = true;
          }
        });
      })
      .then(() => {
        return next();
      })
      .catch(next);
    },
    actions: ['index'],
  },
  ],
  prototype: {
    _loadCollective(req, res, next) {
      Collective.query()
        .where({ id: req.params.id })
        .include('[tools, users.[account]]')
        .then(([collective]) => {
          collective.tools.forEach(tool => {
            tool.about = marked(tool.about);
          });

          if (collective.manifest) {
            collective.manifest = marked(collective.manifest);
          }

          return collective;
        })
      .then((collective) => {
        const query = Campaign.query();

        query.where({
          collective_id: req.params.id,
          published: true,
        });

        if ((req.user && (req.user.role === 'Admin')) ||
            (req.user && (req.user.role === 'CampaignManager') && req.canCreateCampaigns)) {
          query.orWhere({
            collective_id: req.params.id,
            published: false,
          });
        }

        query.then((campaigns) => {
          collective.campaigns = campaigns;

          collective.campaigns.forEach(campaign => {
            if (campaign.description) {
              campaign.description = marked(`${campaign.description.substring(0, 100)}...`);
            }
          });

          res.locals.collective = collective;
          req.collective = collective;
          return next();
        })
        .catch(next);
      })
      .catch(next);
    },

    index(req, res) {
      res.render('collectives/index');
    },

    show(req, res) {
      res.render('collectives/show');
    },

    join(req, res, next) {
      const knex = User.knex();

      Collective.transaction((trx) => {
        return knex
          .table('UsersCollectives')
          .transacting(trx)
          .insert({
            user_id: req.user.id,
            collective_id: req.collective.id,
          })
        .then(() => {
          req.collective.userCount++;

          return req.collective
            .transacting(trx)
            .save();
        })
        .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(() => {
        req.flash('success', `You have successfully joined ${req.collective.name}`);
        res.redirect(CONFIG.router.helpers.Collectives.show.url(req.params.id));
      })
      .catch(next);
    },
  },
});

module.exports = new CollectivesController();
