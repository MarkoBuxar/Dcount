<script>
  import { Col, Row } from 'svelte-materialify';

  import Count from './Count.svelte';
  import { splits } from '../../Stores';
</script>

<div class="dc-main-container">
  <div class="dc-content d-flex align-center justify-center">
    <Row class="justify-space-around">
      <Count />
      {#if $splits}
        <Count toggleable />
      {/if}
    </Row>
  </div>
</div>
