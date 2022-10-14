export function test(socket) {
  socket.on('test', () => {
    console.log('socket test function');
  });
}
