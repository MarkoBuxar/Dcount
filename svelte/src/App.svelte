<script>
  import { MaterialApp } from 'svelte-materialify';
  import NavMenu from './components/NavMenu.svelte';
  import Routes from './routes.svelte';
  import { theme, editMode, count } from './Stores';

  var socket = io();

  let state = {};

  socket.on('count', function (data) {
    $count = data;
  });

  socket.on('edit', function (data) {
    updateEditStatus(data);
  });

  function toggleEditStatus() {
    socket.emit('toggleEdit', {});
  }

  function updateEditStatus(data) {
    $editMode = data;
  }
</script>

<main class="dc-content">
  <MaterialApp theme={$theme}>
    <NavMenu />
    <Routes {...state} />
  </MaterialApp>
</main>

<style global>
  .dc-main-container {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .dc-split-col {
    padding: 0 !important;
  }

  .dc-content {
    width: 100%;
    height: 100%;
  }

  .dc-side-menu-items > a {
    text-decoration: none;
  }

  .s-list-item__content {
    padding: 0 !important;
  }
</style>
