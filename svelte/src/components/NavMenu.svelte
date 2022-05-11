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
  } from 'svelte-materialify';
  import { Link, Router } from 'svelte-routing';
  import { save, theme } from '../Stores';

  function toggleTheme() {
    if ($theme === 'light') $theme = 'dark';
    else $theme = 'light';
  }

  let active = false;

  function close() {
    active = false;
  }
  function open() {
    active = true;
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
          <Menu>
            <div slot="activator">
              <Button
                outlined
                style="width: 170px; justify-content: space-between"
                >{$save}
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
