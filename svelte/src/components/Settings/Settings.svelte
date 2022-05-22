<script>
  import {
    Checkbox,
    Col,
    Row,
    Select,
    Slider,
    Subheader,
    Switch,
    TextField,
  } from 'svelte-materialify';
  import { sockets } from '../../Sockets';
  import { splitsEnabled, hotkeys } from '../../Stores';

  const items = ['foo', 'bar', 'fizz', 'buzz'];
  let fontSize = 26;

  function hotkeyFocus() {
    console.log('clicked hotkeys');
    sockets.Instance.socket.emit('toggleEdit', true);
  }

  function hotkeyUnfocus() {
    sockets.Instance.socket.emit('toggleEdit', false);
    console.log('unfocused');
  }
</script>

<div class="dc-settings-title">
  <h3 class="ma-2">Settings</h3>
</div>

<div class="dc-settings-content d-flex flex-column justify-center ma-5">
  <div class="d-flex flex-column">
    <Row class="mb-3">
      <TextField outlined class="ma-2">Name</TextField>
      <TextField
        outlined
        class="ma-2"
        readonly
        value={$hotkeys.join(' + ')}
        on:blur={hotkeyUnfocus}
        on:focus={hotkeyFocus}>Hotkeys</TextField
      >
    </Row>

    <Row class="d-flex justify-space-between mb-3">
      <Select class="ma-2" outlined {items}>Font</Select>
      <div class="d-flex flex-row ml-2">
        <span class="d-flex flex-column justify-center">
          Enable <br /> Splits</span
        >
        <Switch class="ma-2 ml-5" bind:checked={$splitsEnabled} />
      </div>
    </Row>

    <Row class="mb-3">
      <div class="d-flex flex-column flex-grow-1">
        <Subheader>Text Size</Subheader>
        <Slider thumb bind:fontSize />
      </div>
      <div class="d-flex flex-column flex-grow-1 align-end">
        <Subheader>Text Colour</Subheader>
        <Checkbox class="mr-1" />
      </div>
    </Row>
  </div>
</div>

<style>
  .dc-settings-title {
    position: fixed;
    width: 50%;
    text-align: center;
  }

  .dc-settings-content {
    position: relative;
    height: 100%;
  }
</style>
