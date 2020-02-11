exports.up = function(knex, Promise) {
    return knex.schema.createTable('productos', function(prod) {
        prod.increments('id').notNullable();
        prod.string('nombre').notNullable();
        prod.string('descripcion').notNullable();
        prod.string('precio').notNullable();
        prod.string('tipo').notNullable();
        prod.integer('imagen').notNullable().references('id').inTable('imagen').onDelete('cascade');;
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('productos');
};