<script>
  import { Divider, Row } from 'svelte-materialify';
  import Count from '../Home/Count.svelte';
  import Settings from './Settings.svelte';
  import { count, save } from '../../Stores';
</script>

<div class="dc-main-container d-flex align-center justify-center">
  <div class="dc-content-half d-flex flex-column justify-center">
    <div>
      <Count count={$count} save={$save} />
    </div>
  </div>

  <Divider vertical inset />
  <div class="dc-content-half">
    <Settings />
  </div>
</div>

<style global>
  .dc-content-half {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }

  .dc-content-half .dc-card-container {
    width: 100%;
  }
</style>
