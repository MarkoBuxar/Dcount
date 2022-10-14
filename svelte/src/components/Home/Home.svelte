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
    hourChartData,
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
        <Graph height="180" chartData={$dayChartData} />
        {#if $splitsEnabled}
          <Graph height="180" chartData={$splitChartData} />
        {/if}
        <Graph height="160" chartData={$hourChartData} type={'line'} />
        <!--  <Card class="dc-card-container flex-grow-1">
          <Col class="d-flex flex-column align-center">
            <div class="dc-card-title">123123</div>
            <div class="dc-card-count">123123123123</div>
          </Col>
        </Card> -->
      </Row>
    </Col>
  </div>
</div>

<style>
  .dc-dashboard {
    overflow: hidden;
  }
</style>
