
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usuarioLogin').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarioLogin').insert([
        { usuario: 'oscaredu22', 
          password: 'prueba1',
          nombre: 'Oscar',
          apellido: 'Salvador',
          correo: 'oem.salvador@hotmail.com',
          telefono: '3026216'
        },
        { usuario: 'davicho007', 
          password: 'hola',
          nombre: 'David',
          apellido: 'Quinaluisa',
          correo: 'defq.quinaluisa@yavirac.edu.ec',
          telefono: '09999999999'
        }
      ]);
    });
};
