<script>
  import { Divider, Row } from 'svelte-materialify';
  import Count from '../Home/Count.svelte';
  import Settings from './Settings.svelte';
</script>

<div class="dc-main-container d-flex align-center justify-center">
  <div class="dc-content-half d-flex flex-column justify-center">
    <div>
      <Count />
    </div>
  </div>

  <Divider vertical inset />
  <div class="dc-content-half">
    <Settings />
  </div>
</div>

<style>
  .dc-content-half {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }
</style>
