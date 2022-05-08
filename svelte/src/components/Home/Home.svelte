<script>
  import { Col, Row, Switch } from 'svelte-materialify';

  import Count from './Count.svelte';
  import SplitSelector from './SplitSelector.svelte';

  export let count;
  export let save;
  let splitEnabled = false;
</script>

<div class="dc-main-container ">
  <div class="dc-content d-flex align-center justify-center">
    <Row class="justify-space-around">
      <Count {count} {save} />
      {#if splitEnabled}
        <Col class="dc-split-col">
          <SplitSelector />
          <Count {count} {save} toggleable />
        </Col>
      {/if}
    </Row>
  </div>
</div>

<style>
  .dc-main-container {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  :global(.dc-split-col) {
    padding: 0 !important;
  }

  :global(.dc-split-col) > :global(.dc-card-container) {
    max-width: 100% !important;
  }
</style>
