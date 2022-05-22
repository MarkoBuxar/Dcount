<script>
  import { Card, Col, Row } from 'svelte-materialify';

  import Count from './Count.svelte';
  import {
    count,
    splitCount,
    save,
    split,
    splitsEnabled,
    splitChartData,
    dayChartData,
  } from '../../Stores';
  import Graph from '../Graphs/Graph.svelte';
</script>

<div class="dc-main-container">
  <div class="dc-content dc-dashboard d-flex align-center justify-center">
    <Col>
      <Row class="justify-space-around">
        <Count count={$count} save={$save} missingText={'No Save'} />
        {#if $splitsEnabled}
          <Count
            count={$splitCount}
            save={$split}
            missingText={'No Split'}
            toggleable
          />
        {/if}
      </Row>
      <Row>
        <Graph chartData={$dayChartData} />
        <Graph chartData={$splitChartData} />
        <Card class="dc-card-container flex-grow-1">
          <Col class="d-flex flex-column align-center">
            <div class="dc-card-title">123123</div>
            <div class="dc-card-count">123123123123</div>
          </Col>
        </Card>
      </Row>
    </Col>
  </div>
</div>

<style>
  .dc-dashboard {
    overflow: hidden;
  }
</style>
