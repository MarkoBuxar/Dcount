<script>
  import {
    MaterialApp,
    Button,
    NavigationDrawer,
    ListItem,
    Divider,
    List,
    Icon,
    Overlay,
    Subheader,
    Menu,
  } from 'svelte-materialify';
  import {
    mdiMenu,
    mdiCloseThick,
    mdiHome,
    mdiCog,
    mdiThemeLightDark,
    mdiChevronDown,
    mdiPlus,
    mdiAccountBoxMultiple,
  } from '@mdi/js';

  export let count = 0;
  export let editMode = false;
  export let currSave = 'default';
  let theme = 'dark';

  var socket = io();

  socket.emit('test');

  socket.on('count', function (data) {
    count = data;
  });

  socket.on('edit', function (data) {
    updateEditStatus(data);
  });

  function toggleEditStatus() {
    socket.emit('toggleEdit', {});
  }

  function toggleTheme() {
    if (theme === 'light') theme = 'dark';
    else theme = 'light';
  }

  function updateEditStatus(data) {
    editMode = data;
  }

  let active = false;

  function close() {
    active = false;
  }
  function open() {
    active = true;
  }
</script>

<main class="dc-content">
  <MaterialApp {theme}>
    <Button class="float-left ma-2" on:click={open} fab>
      <Icon path={mdiMenu} />
    </Button>

    <div class="dc-content d-flex align-center justify-center">
      <NavigationDrawer absolute {active}>
        <List>
          <Subheader>
            <div
              style="width:100%"
              class="d-flex flex-row justify-space-between"
            >
              <Button on:click={close} icon x-large
                ><Icon path={mdiCloseThick} /></Button
              >
              <Menu>
                <div slot="activator">
                  <Button
                    outlined
                    style="width: 170px; justify-content: space-between"
                    >{currSave}
                    <Icon path={mdiChevronDown} />
                  </Button>
                </div>
                <List style="width: 170px">
                  <ListItem>
                    <span slot="prepend">
                      <Icon path={mdiAccountBoxMultiple} />
                    </span>
                    Option 1</ListItem
                  >
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
          </Subheader>
          <Divider />
          <ListItem>
            <span class="ml-1" slot="prepend">
              <Icon path={mdiHome} />
            </span>
            Home
          </ListItem>
          <ListItem>
            <span class="ml-1" slot="prepend">
              <Icon path={mdiCog} />
            </span>
            Settings
          </ListItem>
          <ListItem on:click={toggleTheme}>
            <span class="ml-1" slot="prepend">
              <Icon path={mdiThemeLightDark} />
            </span>
            Dark mode
          </ListItem>
        </List>
      </NavigationDrawer>
      <Overlay index={1} {active} on:click={close} absolute />

      <h1>count: {count}</h1>
    </div>
  </MaterialApp>
</main>

<style>
  .dc-content {
    width: 100%;
    height: 100%;
  }
</style>
