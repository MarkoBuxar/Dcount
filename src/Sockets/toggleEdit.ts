import { KBMhooks } from '../kbmhooks';

export function toggleEdit(socket) {
  socket.on('toggleEdit', () => {
    KBMhooks.toggleEditMode();
  });
}
