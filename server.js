var express = require('express');
let bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var port = 3000;
var knex = require('./db/knex');
var jwt = require('jsonwebtoken');

var app = express()
app.use(bodyParser.json({ limit: '100mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

var JWT_SECRET = '123456';

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//METODOS
//SELECT PRODUCTOS
app.get('/getProductos', function(req, res) {
    // let tabla = req.body.tabla
    // let campo = req.body.datos
    // knex.select().from('pedidos')    
    knex.select().table('productos')
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//GET PASTELES
//POR REVISAR
app.get('/getPasteles', function(req, res) {
    // let tabla = req.body.tabla
    // let campo = req.body.datos
    knex.table('pasteles').innerJoin('imagen', 'pasteles.imagen', '=', 'imagen.id')
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})
//////////////////////////////////////////////////////////////////

//POST LOGEO
app.post('/login', function(req, res) {
    console.log(req.body)
    let usuario = req.body.usuario
    let password = req.body.password
    console.log(usuario)
    knex('usuarioLogin').where({usuario: usuario})
        .then(resultado => {
            console.log(resultado)
            // if(!resultado.usuario) return res.status(404).send({mensaje: 'Su nombre de usuario es incorrecto'});
            if (resultado.length) {
                // if(!resultado.usuario) return res.status(404).send({mensaje: 'Su nombre de usuario es incorrecto'});
                bcrypt.compare(password, resultado[0].password).then(ok => {
                    if (ok) {
                        // resultado[0].password = '********ll';
                        console.log(resultado[0])
                        let tokenC = jwt.sign(resultado[0], 'hdfkasjhfjasdhlajhsldfjha');

                        console.log(tokenC);
                        return res.status(200).json({
                            ok: true,
                            datos: resultado,
                            token: tokenC,
                            mensaje: `Existen ${resultado.length} registros en la consulta`,
                            mensaje2: `Haz iniciado sesion`
                        })
                    } else {
                        return res.status(200).json({
                            ok: false,
                            datos: null,
                            mensaje: `Contraseña incorrecta`
                        })
                    }
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})



//INSERT USUARIO REGISTRO - TOKEN
app.post('/agregarUsuario', function(req, res) {
    let usuario = req.body.usuario;
    let password = '';
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let correo = req.body.correo;
    let telefono = req.body.telefono
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        password = hash;
        console.log(password)
        return knex('usuarioLogin').insert({
                usuario: usuario,
                password: password,
                nombre : nombre,
                apellido : apellido,
                correo: correo,
                telefono: telefono
            })
            .then(resultado => {
                return res.status(200).json({
                    ok: true,
                    datos: resultado,
                    mensaje: `Existen ${resultado.length} registros en la consulta`
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${error}`
                })
            })
    })

})


//INSERT IMAGEN
app.post('/agregarImagen', function(req, res) {
    return knex('imagen').insert(req.body)
        .then(resultado => {
            knex('imagen').where({
                contenidoImagen: req.body.contenidoImagen
            }).select('id').then(r => {
                return res.status(200).json({
                    ok: true,
                    datos: r
                })
            })

        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })

})


//INSERTAR PRODUCTO
app.post('/agregarProducto', function(req, res) {
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let tipo = req.body.tipo;
    let imagen = req.body.imagen;
    return knex.raw(`insert into productos (nombre, descripcion, precio, tipo, imagen) values(?, ?, ?, ?, ?)`, [`${nombre}`, `${descripcion}`, `${precio}`, `${tipo}`, `${imagen}`])
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})


//DELETE PEDIDOS
app.delete('/eliminar/:id', function(req, res) {
    // let tabla = req.body.tabla
    knex('pedidos').where({ "id": req.params.id }).del()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//POST RECICLADORA
app.post('/agregarRecicladora', function(req, res) {
    let nombre = req.body.nombre;
    let latitud = req.body.latitud;
    let longitud = req.body.longitud;
    return knex.raw(`insert into recicladoras (nombre, latitud, longitud) values(?, ?, ?)`, [`${nombre}`, `${latitud}`, `${longitud}`])
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
                mensaje: `Existen ${resultado.length} registros en la consulta`
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
})

//PUERTO
app.listen(port, function() {
    console.log("El servidor se ejecuta en el puerto: ", port);
})

