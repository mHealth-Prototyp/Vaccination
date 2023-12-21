<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="fa-solid fa-bars"
          @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-h6 text-weight-medium"> {{ $t('common.appName') }}</q-toolbar-title>
        <q-chip
          v-if="store.userIsLogged"
          id="logout"
          class="text-body2 text-weight-medium"
          color="secondary"
          text-color="onSecondary"
          icon-right="fa-solid fa-right-from-bracket"
          clickable
          @click="logout">
          {{ `${store.user.firstName} ${store.user.lastName}` }}
        </q-chip>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered>
      <DrawerMenuItems />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DrawerMenuItems from 'src/components/DrawerMenuItems.vue';
import {useStore} from 'src/stores/store';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  store.logout();
  router.go(0);
}
</script>

<style scoped lang="scss">
#logout:hover {
  cursor: pointer;
}
</style>
