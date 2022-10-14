<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './components/Home/Home.svelte';
  import SettingsScreen from './components/Settings/SettingsScreen.svelte';

  export let url = '';
</script>

<Router {url}>
  <Route path="/"><Home /></Route>
  <Route path="/settings"><SettingsScreen /></Route>
</Router>
