exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('productos').del()
        .then(function() {
            // Inserts seed entries
            return knex('productos').insert([{
                    nombre: 'manualidad',
                    descripcion: 'manualidad hecha con plastico y carton',
                    precio: 20.80,
                    tipo: 'manualidad',
                    imagen: 1
                },
                {
                    nombre: 'manualidad',
                    descripcion: 'florero hecho con carton',
                    precio: 30.20,
                    tipo: 'manualidad',
                    imagen: 2
                }
            ]);
        });
};