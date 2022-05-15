<script>
  import { mdiAccountBoxMultiple, mdiChevronDown, mdiPlus } from '@mdi/js';

  import {
    Button,
    Card,
    Col,
    Icon,
    List,
    ListItem,
    Menu,
    Switch,
  } from 'svelte-materialify';

  export let count;
  export let save;

  export let toggleable = false;
  export let enabled;
  let menuOpen = false;

  let menuBtnClass =
    'dc-splits-list-button d-flex flex-row justify-space-between';

  function openMenu() {
    menuOpen = true;
  }

  function closeMenu() {
    menuOpen = false;
  }
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
                {save}
              </span>
              <Icon path={mdiChevronDown} />
            </Button>
          </div>
          <List style="width: 170px">
            <ListItem>
              <span slot="prepend">
                <Icon path={mdiAccountBoxMultiple} />
              </span>
              Option 2</ListItem
            >
            <ListItem>
              <span slot="prepend">
                <Icon path={mdiPlus} />
              </span>
              New
            </ListItem>
          </List>
        </Menu>
      </div>
      <div class="dc-splits-enable-switch">
        <Switch bind:enabled value="1" />
      </div>
    {/if}

    <div class="dc-card-title">{save}</div>
    <div class="dc-card-count">{count}</div>
  </Col>
</Card>

<style global>
  .dc-card-container {
    margin: 10px;
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
    margin: 5px;
  }

  .dc-splits-list {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 5px;
    background: #1e1e1e;
  }

  .dc-splits-list-button {
    min-width: 40px !important;
    width: 40px;
    transition: width 0.4s ease-in-out;
    z-index: 1;
  }

  .dc-splits-list-button:hover,
  .dc-splits-list-button.active {
    width: 170px;
  }

  .dc-splits-list-button i {
    transition: transform 0.2s ease-in-out, left 0.4s ease-in-out;
    /* transform: translateX(-75px); */
    left: -75px;
  }

  .dc-splits-list-button:hover i {
    transform: translateX(0px);
    left: 0px;
  }

  .dc-splits-list-button.active i {
    transform: translateX(0px) rotate(180deg);
    left: 0px;
  }

  .dc-splits-list-button-text {
    /* display: none; */
    transition: transform 0.4s ease-in-out;
    transform: translateX(-80px);
  }
  .dc-splits-list-button:hover .dc-splits-list-button-text,
  .dc-splits-list-button.active .dc-splits-list-button-text {
    transform: translateX(0px);
    /* display: block; */
  }
</style>
