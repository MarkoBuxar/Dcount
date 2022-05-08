<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './components/Home/Home.svelte';
  import Settings from './components/Settings.svelte';

  export let url = '';
  export let count;
  export let save;
</script>

<Router {url}>
  <Route path="/"><Home {count} {save} /></Route>
  <Route path="/settings"><Settings {save} /></Route>
</Router>
