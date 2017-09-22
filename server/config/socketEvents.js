export default (io) => {
	var users  = {};

	io.on('connection', function(socket) {
		socket.join('Lobby');
		console.log('User '+ socket.id + ' connected');

		socket.on('login', function(userName) {
			// users[socket.id] = userName;
			socket.emit('receiveSocket', { socketID: socket.id, userName })
		});

		socket.on('newMessage', function(msg) {
			socket.broadcast.to(msg.channelID).emit('new bc message', msg);
		});

		/*
		socket.on('leave channel', function(channel) {
			socket.leave(channel)
		});

		socket.on('join channel', function(channel) {
			socket.join(channel.name)
		});

		socket.on('new message', function(msg) {
			socket.broadcast.to(msg.channelID).emit('new bc message', msg);
		});

		socket.on('new channel', function(channel) {
			socket.broadcast.emit('new channel', channel)
		});

		socket.on('typing', function (data) {
			socket.broadcast.to(data.channel).emit('typing bc', data.user);
		});

		socket.on('stop typing', function (data) {
			socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
		});

		socket.on('new private channel', function(socketID, channel) {
			socket.broadcast.to(socketID).emit('receive private channel', channel);
		})
		*/
	});

}
