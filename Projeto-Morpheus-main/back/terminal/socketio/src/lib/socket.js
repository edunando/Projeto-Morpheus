// https://errorsandanswers.com/connecting-to-remote-ssh-server-via-node-js-html5-console/

import ssh2 from 'ssh2';

const SSHClient = ssh2.Client;

export async function loadSocket(io, config, channel) {

  io.on('connection', (socket) => {
    console.log('a user connected');
    
    const sshConnection = new SSHClient();

    const { host, username, password } = config;

    sshConnection
      .on('ready', function () {
        console.log(`connection channel ${channel}`);

        socket.emit(channel, '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');

        sshConnection.shell(function (err, stream) {
          if (err)
            return socket.emit(
              channel,
              '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n'
            );
          socket.on(channel, function (data) {
            stream.write(data);
          });
          stream
            .on('data', function (d) {
              socket.emit(channel, d.toString('binary'));
            })
            .on('close', function () {
              sshConnection.end();
            });
        });
      })
      .on('close', function () {
        socket.emit(channel, '\r\n*** SSH CONNECTION CLOSED ***\r\n');
      })
      .on('error', function (err) {
        socket.emit(
          channel,
          '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n'
        );
      })
      .connect({ host, username, password });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
