exports.up = knex =>
  knex.schema.createTable('Campaigns', t => {
    t.uuid('id').primary();
    t
      .uuid('collective_id')
      .notNullable()
      .references('id')
      .inTable('Collectives')
      .onDelete('CASCADE');
    t.string('title').notNullable();
    t.text('description');
    t.integer('user_count').defaultTo(0);
    t.timestamps();
  });

exports.down = knex => knex.schema.dropTable('Campaigns');
