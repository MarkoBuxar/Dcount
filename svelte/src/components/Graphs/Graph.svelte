<script>
  import { Card } from 'svelte-materialify';
  import Chart from 'svelte-frappe-charts';

  export let chartData;
</script>

<Card class="dc-card-container flex-grow-1 dc-chart">
  <Chart height="200" data={chartData} type="bar" />
</Card>

<style global>
  .dc-chart {
    max-height: 200px;
  }

  .dc-chart > div {
    width: 100%;
  }
</style>
