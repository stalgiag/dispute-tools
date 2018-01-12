exports.up = knex =>
  knex.schema.table('Collectives', t => {
    t.string('description', 1024).defaultTo(null);
    t.text('manifest').defaultTo(null);
  });

exports.down = knex =>
  knex.schema.table('Collectives', t => {
    t.dropColumn('description');
    t.dropColumn('manifest');
  });
