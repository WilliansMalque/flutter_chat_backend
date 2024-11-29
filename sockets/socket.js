const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {

    // Obtener el token JWT del cliente
    const [valido, uid] = comprobarJWT(client.handshake.query['x-token'] || client.handshake.headers['x-token']);

    // Verificar autenticación
    if (!valido) return client.disconnect();

    // Obtener el fcmToken del cliente, si existe
    const fcmToken = client.handshake.query['fcm-token'] || client.handshake.headers['fcm-token'];

    // Cliente autenticado
    usuarioConectado(uid, fcmToken);

    // Ingresar al usuario a una sala específica
    client.join(uid);

    client.on('usuario-conectado', async(payload) => {
        io.emit('usuario-conectado', payload);
    });

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        io.emit('usuario-desconectado', uid);
        console.log('Cliente desconectado!!');
    });

});
