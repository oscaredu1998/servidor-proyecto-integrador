
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recicladoras', function(rec) {
      rec.increments('id').notNullable();
      rec.string('nombre').notNullable();
      rec.string('latitud').notNullable();
      rec.string('longitud').notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recicladoras');
};
