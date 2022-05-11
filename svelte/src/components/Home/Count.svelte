<script>
  import { Card, Col, Switch } from 'svelte-materialify';
  import { count, save } from '../../Stores';

  export let toggleable = false;
  export let enabled;
</script>

<Card class="dc-card-container flex-grow-1">
  <Col class="d-flex flex-column align-center">
    {#if toggleable}
      <div class="dc-splits-enable-switch">
        <Switch bind:enabled value="1" />
      </div>
    {/if}

    <div class="dc-card-title">{$save}</div>
    <div class="dc-card-count">{$count}</div>
  </Col>
</Card>

<style global>
  .dc-card-container {
    margin: 25px;
    text-align: center;
    display: flex;
  }

  .dc-card-title {
    font-size: 48px;
    margin-bottom: 12px;
  }

  .dc-card-count {
    font-size: 36px;
  }

  .dc-splits-enable-switch {
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin: 4px;
  }
</style>
