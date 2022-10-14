<script>
  import { Card, Col } from 'svelte-materialify';
  import Chart from 'svelte-frappe-charts';

  export let chartData;
  export let type;
  export let height;

  console.log(chartData);
</script>

<Card
  class="dc-card-container flex-grow-1 dc-chart"
  style="--height: {height}px"
>
  {#if !chartData}
    <Col class="d-flex flex-column align-center justify-center">
      <div class="dc-card-title">No Data</div>
    </Col>
  {:else}
    <Chart
      height={height ? height : '200'}
      data={chartData}
      type={type ? type : 'bar'}
    />
  {/if}
</Card>

<style global>
  .dc-chart {
    min-height: var(--height);
  }

  .dc-chart > div {
    width: 100%;
  }
</style>
