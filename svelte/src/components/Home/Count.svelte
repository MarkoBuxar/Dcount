<script>
  import { mdiAccountBoxMultiple, mdiChevronDown, mdiPlus } from '@mdi/js';

  import {
    Button,
    Card,
    Col,
    Dialog,
    Icon,
    List,
    ListItem,
    Menu,
    Switch,
    TextField,
  } from 'svelte-materialify';
  import { splitList, splitActive } from '../../Stores';
  import { sockets } from '../../Sockets';

  export let count;
  export let save;
  export let missingText;

  export let toggleable = false;
  let menuOpen = false;
  let dialogOpen = false;
  let dialogTextField;

  let menuBtnClass = 'dc-splits-list-button';

  function openMenu() {
    sockets.Instance.socket.emit('getSplits');
    menuOpen = true;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function openCreatePopup() {
    dialogOpen = true;
  }

  function closeCreatePopup() {
    dialogOpen = false;
    dialogTextField = '';
  }

  function selectSplit() {
    sockets.Instance.socket.emit('selectSplit', { split: this.innerText });
  }

  function createNewSplit() {
    if (!dialogTextField) return;
    sockets.Instance.socket.emit('createSplit', { name: dialogTextField });
    closeCreatePopup();
  }

  splitActive.subscribe((val) => {
    sockets.Instance.socket.emit('toggleSplit', { state: val });
  });
</script>

<Card class="dc-card-container flex-grow-1">
  <Col class="d-flex flex-column align-center justify-center">
    {#if toggleable}
      <div class="dc-splits-list">
        <Menu on:close={closeMenu} on:open={openMenu}>
          <div slot="activator">
            <Button
              class={menuOpen ? menuBtnClass + ' active' : menuBtnClass}
              text
            >
              <span class="dc-splits-list-button-text">
                {save ? save : 'split'}
              </span>
              <Icon path={mdiChevronDown} />
            </Button>
          </div>
          <List style="width: 170px">
            {#each $splitList as split}
              <ListItem on:click={selectSplit}>
                <span slot="prepend">
                  <Icon path={mdiAccountBoxMultiple} />
                </span>
                {split.split}</ListItem
              >
            {/each}

            <ListItem on:click={openCreatePopup}>
              <span slot="prepend">
                <Icon path={mdiPlus} />
              </span>
              New
            </ListItem>
          </List>
        </Menu>
      </div>

      {#if save}
        <div class="dc-splits-enable-switch">
          <Switch bind:checked={$splitActive} value="1" />
        </div>
      {/if}
    {/if}

    {#if !save}
      <div class="dc-card-title">{missingText}</div>
    {:else}
      <div class="dc-card-title">{save}</div>
      <div class="dc-card-count">{count}</div>
    {/if}
  </Col>
</Card>

<Dialog class="pa-4 text-center" bind:active={dialogOpen}>
  <div class="dc-splits-dialog-title pa-3 mb-7">
    <h3>Create new split</h3>
  </div>
  <div class="dc-splits-dialog-textField mb-7">
    <TextField outlined counter={30} bind:value={dialogTextField}
      >Split Name</TextField
    >
  </div>

  <div class="dc-splits-dialog-buttons d-flex flex-row justify-end">
    <Button outlined class="red-text" on:click={closeCreatePopup}>Cancel</Button
    >
    <Button outlined class="green-text ml-2" on:click={createNewSplit}
      >Create</Button
    >
  </div>
</Dialog>

<style global>
  .dc-card-container {
    margin: 10px;
    text-align: center;
    display: flex;
    width: calc(50% - 20px);
  }

  .dc-card-title {
    font-size: 48px;
    margin-bottom: 12px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .dc-card-count {
    font-size: 36px;
  }

  .dc-splits-enable-switch {
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin: 5px;
  }

  .dc-splits-list {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 5px;
    background: #1e1e1e;
  }

  .theme--light .dc-splits-list {
    background: #ffffff;
  }

  .dc-splits-list .s-btn__content {
    width: 100%;
  }

  .dc-splits-list-button {
    min-width: 40px !important;
    width: 40px;
    transition: width 0.4s ease-in-out;
    z-index: 1;
    padding: 0;
  }

  .dc-splits-list-button:hover,
  .dc-splits-list-button.active {
    width: 170px;
  }

  .dc-splits-list-button i {
    transition: transform 0.2s ease-in-out;
    right: 0;
  }

  .dc-splits-list-button.active i {
    transform: rotate(180deg);
  }

  .dc-splits-list-button-text {
    text-align: start;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
