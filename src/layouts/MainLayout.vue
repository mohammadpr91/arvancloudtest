<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          <span class="text-h5">
            Arvan Challange
          </span>
          <span class="q-ml-md text-subtitle1">
            Welcome {{ $store.state.userConf.userName }}
          </span>
        </q-toolbar-title>
        <q-btn
          label="Logout"
          outline
          color="info"
          @click="logOut()"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <p class="q-my-lg q-ml-md text-h6 text-white">Post</p>
      <q-list v-for="(item, index) in menu_items" :key="index">
        <q-item
          v-if="!item.child"
          :to="item.path"
          exact-active-class="active-item-slider"
          exact
          clickable
          class="q-pl-xl"
        >
          <q-item-section class="text-subtitle1 text-white">
            {{ Object.values(item.label)[0] }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      styleObject: {
        color: 'var(--arv-dark-sky-blue)'
      }
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch("userConf/logOut")
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    menu_items() {
      return [
        {
          icon: "",
          label: { name: "All Articles" },
          path: "/",
        },
        {
          icon: "",
          label: { name: "New Article" },
          path: "/newArticle",
        },
      ]
    }
  }
}
</script>
<style lang="scss">
  .q-toolbar {
    min-height: 60px;
  }
  .q-layout__section--marginal {
    background-color: var(--arv-charcoal-gray);
  }
  .q-drawer {
    background-color: var(--arv-water-blue);
  }
  .active-item-slider {
    background-color: rgba(255, 255, 255, 0.15);
  }
</style>
