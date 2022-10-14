import { KBMhooks } from '../kbmhooks';

export function toggleEdit(socket) {
  socket.on('toggleEdit', (data) => {
    KBMhooks.toggleEditMode(data);
  });
}
