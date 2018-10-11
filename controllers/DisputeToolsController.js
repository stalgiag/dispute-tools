/* globals Class */
const marked = require('marked');
const {
  authenticate,
  authorize,
  tests: { loggedIn },
} = require('$services/auth');
const DisputeTool = require('$models/DisputeTool');
const { NotFoundError } = require('$lib/errors');
const RestfulController = require('$lib/core/controllers/RestfulController');

const idRegex = /^1{8}-1{4}-[12346]{4}-1{4}-1{12}$/;

const DisputeToolsController = Class('DisputeToolsController').inherits(RestfulController)({
  beforeActions: [
    {
      before: [
        authenticate,
        authorize(loggedIn),
        async (req, res, next) => {
          try {
            const disputeTool = idRegex.test(req.params.id)
              ? await DisputeTool.findById(req.params.id)
              : await DisputeTool.findBySlug(req.params.id);

            if (disputeTool) {
              res.locals.disputeTool = disputeTool;
              next();
            } else {
              throw new NotFoundError();
            }
          } catch (e) {
            next(e);
          }
        },
      ],
      actions: ['show'],
    },
  ],
  prototype: {
    index(req, res, next) {
      DisputeTool.query()
        .orderBy('id', 'ASC')
        .then(disputeTools => {
          res.locals.disputeTools = new Array(5).fill(null);

          disputeTools.forEach(disputeTool => {
            const slugOrder = [
              'general-debt-dispute',
              'credit-report-dispute',
              'wage-garnishment-dispute',
              'tax-offset-dispute',
              'private-student-loan-dispute',
            ];

            const index = slugOrder.indexOf(disputeTool.slug);

            res.locals.disputeTools[index] = {
              id: disputeTool.id,
              name: disputeTool.name,
              excerpt: disputeTool.excerpt,
              about: marked(disputeTool.about),
              completed: disputeTool.completed,
              data: disputeTool.data,
              slug: disputeTool.slug,
            };
          });

          res.render('dispute-tools/index');
        })
        .catch(next);
    },

    show(req, res) {
      const disputeTool = res.locals.disputeTool;

      Object.keys(disputeTool.data.options).forEach(option => {
        const _option = disputeTool.data.options[option];

        if (_option.more) {
          _option.more = marked(_option.more);
        }
      });

      return res.render('dispute-tools/show');
    },

    dtr(req, res) {
      res.render('home/dtr.pug');
    },
  },
});

module.exports = new DisputeToolsController();
