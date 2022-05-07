<script>
  export let name = 'asd';
  export let count = 0;
  export let editMode = false;

  var socket = io();

  socket.emit('test');

  socket.on('count', function (data) {
    count = data;
  });

  socket.on('edit', function (data) {
    updateEditStatus(data);
  });

  function toggleEditStatus() {
    socket.emit('toggleEdit', {});
  }

  function updateEditStatus(data) {
    editMode = data;
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <h1>{count}</h1>

  <h1>edit mode: {editMode}</h1>
  <button on:click={toggleEditStatus}> toggle edit mode </button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
