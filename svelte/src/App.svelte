<script>
  import { MaterialApp } from 'svelte-materialify';
  import NavMenu from './components/NavMenu.svelte';
  import Routes from './routes.svelte';

  let state = {
    count: 0,
    editMode: false,
    save: 'default',
    theme: 'dark',
  };

  var socket = io();

  socket.emit('test');

  socket.on('count', function (data) {
    state.count = data;
  });

  socket.on('edit', function (data) {
    updateEditStatus(data);
  });

  function toggleEditStatus() {
    socket.emit('toggleEdit', {});
  }

  function toggleTheme() {
    // todo: save theme to cookies
    if (state.theme === 'light') state.theme = 'dark';
    else state.theme = 'light';
  }

  function updateEditStatus(data) {
    state.editMode = data;
  }
</script>

<main class="dc-content">
  <MaterialApp theme={state.theme}>
    <NavMenu {toggleTheme} save={state.save} />
    <Routes {...state} />
  </MaterialApp>
</main>

<style global>
  .dc-content {
    width: 100%;
    height: 100%;
  }

  .dc-side-menu-items > a {
    text-decoration: none;
  }
</style>
