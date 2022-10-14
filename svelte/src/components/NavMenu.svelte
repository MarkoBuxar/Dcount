<script>
  import {
    mdiAccountBoxMultiple,
    mdiChevronDown,
    mdiCloseThick,
    mdiCog,
    mdiHome,
    mdiMenu,
    mdiPlus,
    mdiThemeLightDark,
  } from '@mdi/js';

  import {
    Button,
    Icon,
    List,
    NavigationDrawer,
    Subheader,
    Menu,
    ListItem,
    Divider,
    Overlay,
    Dialog,
    TextField,
  } from 'svelte-materialify';
  import { Link, Router } from 'svelte-routing';
  import { sockets } from '../Sockets';
  import { save, theme, saveList } from '../Stores';

  function toggleTheme() {
    if ($theme === 'light') $theme = 'dark';
    else $theme = 'light';
  }

  let active = false;
  let subMenuActive = false;
  let dialogOpen = false;
  let dialogTextField = '';

  function close() {
    active = false;
    subMenuActive = false;
  }
  function open() {
    active = true;
  }

  function closeSubMenu() {
    subMenuActive = false;
  }

  function openSubMenu() {
    sockets.Instance.socket.emit('getSaves');
    subMenuActive = true;
  }

  function openCreatePopup() {
    dialogOpen = true;
  }

  function closeCreatePopup() {
    dialogOpen = false;
    dialogTextField = '';
  }

  function selectSave() {
    sockets.Instance.socket.emit('selectSave', { save: this.innerText });
  }

  function createNewSave() {
    if (!dialogTextField) return;
    console.log(dialogTextField);
    sockets.Instance.socket.emit('createSave', { name: dialogTextField });
    closeCreatePopup();
  }
</script>

<Button class="float-left ma-2" style="z-index: 2" on:click={open} fab>
  <Icon path={mdiMenu} />
</Button>

<Router>
  <NavigationDrawer absolute {active}>
    <List>
      <Subheader>
        <div style="width:100%" class="d-flex flex-row justify-space-between">
          <Button on:click={close} icon x-large
            ><Icon path={mdiCloseThick} /></Button
          >
          <Menu on:close={closeSubMenu} on:open={openSubMenu}>
            <div slot="activator">
              <Button
                outlined
                style="width: 170px; justify-content: space-between"
                >{$save}
                <Icon path={mdiChevronDown} rotate={subMenuActive ? 180 : 0} />
              </Button>
            </div>
            <List style="width: 170px">
              {#each $saveList as saveItem}
                <ListItem on:click={selectSave}>
                  <span slot="prepend">
                    <Icon path={mdiAccountBoxMultiple} />
                  </span>
                  {saveItem.name}
                </ListItem>
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
      </Subheader>
      <Divider />
      <div class="dc-side-menu-items">
        <Link to="/">
          <ListItem>
            <span class="ml-1" slot="prepend">
              <Icon path={mdiHome} />
            </span>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/settings">
          <ListItem>
            <span class="ml-1" slot="prepend">
              <Icon path={mdiCog} />
            </span>
            Settings
          </ListItem>
        </Link>
      </div>
    </List>
    <span class="ma-2" slot="append">
      <Button text on:click={toggleTheme}>
        <Icon path={mdiThemeLightDark} />
      </Button>
    </span>
  </NavigationDrawer>
</Router>
<Overlay index={1} {active} on:click={close} absolute />

<Dialog class="pa-4 text-center" bind:active={dialogOpen}>
  <div class="dc-splits-dialog-title pa-3 mb-7">
    <h3>Create new save</h3>
  </div>
  <div class="dc-splits-dialog-textField mb-7">
    <TextField outlined counter={30} bind:value={dialogTextField}
      >Save Name</TextField
    >
  </div>

  <div class="dc-splits-dialog-buttons d-flex flex-row justify-end">
    <Button outlined class="red-text" on:click={closeCreatePopup}>Cancel</Button
    >
    <Button outlined class="green-text ml-2" on:click={createNewSave}
      >Create</Button
    >
  </div>
</Dialog>
