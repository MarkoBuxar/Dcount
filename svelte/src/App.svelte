<script>
  import { MaterialApp } from 'svelte-materialify';
  import { sockets } from './Sockets';
  import NavMenu from './components/NavMenu.svelte';
  import Routes from './routes.svelte';
  import { theme } from './Stores';

  let s = new sockets(io);
  s.init();

  let state = {};
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
