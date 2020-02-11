
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recicladoras').del()
    .then(function () {
      // Inserts seed entries
      return knex('recicladoras').insert([
        { nombre: 'Grahan recicladora',
          latitud: '-0.3591006',
          longitud: '-78.5735619'
        },
        { nombre: 'Reciplast',
          latitud: '-0.2872311508913789',
          longitud: '-78.50975992988282'
        }
      ]);
    });
};
