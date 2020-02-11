
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarioLogin', function(ul){
        ul.increments('id').notNullable();
        ul.string('usuario').notNullable();
        ul.string('password').notNullable();
        ul.string('nombre').notNullable();
        ul.string('apellido').notNullable();
        ul.string('correo').notNullable();
        ul.string('telefono').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarioLogin');
};
