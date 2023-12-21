<template>
  <q-list>
    <q-item-label
      class="menu-header"
      header>
      {{ $t('menu.title') }}
    </q-item-label>

    <template
      v-for="entry in menuEntries"
      :key="entry.translationKey">
      <q-item clickable>
        <q-icon
          class="menu-icon"
          :name="`fa-solid fa-${entry.icon}`" />
        <RouterLink
          class="menu-link text-body2"
          :to="entry.to">
          {{ $t(entry.translationKey) }}
        </RouterLink>
      </q-item>
    </template>
    <q-item
      v-if="store.showCreatePage"
      clickable>
      <q-icon
        class="menu-icon"
        name="fa-solid fa-file-plus" />
      <RouterLink
        class="menu-link text-body2"
        to="/create">
        {{ $t('menu.create') }}
      </RouterLink>
    </q-item>
    <q-item class="fixed-bottom">
      <q-icon
        class="footer-menu-icon"
        name="fas fa-language" />
      <div class="footer-menu-link">
        <q-select
          v-model="$i18n.locale"
          outlined
          dense
          class="language-select"
          :options="
            languages
              .filter((l) => $i18n.availableLocales.includes(l.isoName))
              .map((l) => {
                return {label: l.nativeName, value: l.isoName};
              })
          "
          emit-value
          map-options
          :label="t('settings.languageTitle')" />
      </div>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';
import languages from 'quasar/lang/index.json';
import {MessageSchema, MessageLanguages} from 'src/boot/i18n';
import {useStore} from 'src/stores/store';
import {watch} from 'vue';
import {useI18n} from 'vue-i18n';

const q = useQuasar();
const {t, locale} = useI18n<{message: MessageSchema}, MessageLanguages>();
const store = useStore();

const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs');

watch(locale, (value) => {
  store.userSettings.language = value as MessageLanguages;
  langList[`../../node_modules/quasar/lang/${value}.mjs`]().then((lang) => {
    q.lang.set(lang.default);
  });
});

const menuEntries = [
  {
    to: '/',
    translationKey: 'menu.home',
    icon: 'home'
  },
  {
    to: '/immunization',
    translationKey: 'menu.immunizations',
    icon: 'syringe'
  },
  {
    to: '/rules',
    translationKey: 'menu.rules',
    icon: 'gears'
  },
  {
    to: '/create',
    translationKey: 'menu.create',
    icon: 'plus'
  },
  {
    to: '/about',
    translationKey: 'menu.about',
    icon: 'circle-info'
  }
];
</script>

<style scoped lang="scss">
.menu-header {
  background-color: $primary;
  text-align: center;
  color: $onPrimary;
  font-weight: bold;
}
.q-item {
  padding: 0;
  min-height: unset;
}
.menu-icon {
  background-color: $primary;
  color: $onPrimary;
  display: block;
  height: 4em;
  width: 2em;
  padding: 0 0.4em;
}

.footer-menu-icon {
  background-color: $light-page;
  color: $onLight-page;
  display: block;
  height: 4em;
  width: 2em;
  padding: 0 0.4em;
}
.menu-link {
  background-color: $light-page;
  color: $onLight-page;
  display: flex;
  width: 100%;
  text-decoration: none;
  padding: 1em 0.5em;
  height: 4em;
  align-items: center;
}

.footer-menu-link {
  background-color: $light-page;
  color: $onLight-page;
  display: flex;
  width: 100%;
  text-decoration: none;
  padding: 1em 0.5em;
  height: 4em;
  align-items: center;
}
.q-item:hover .menu-icon {
  background-color: $light-page;
  color: $onLight-page;
}
.q-item:hover .menu-link {
  background-color: $primary;
  color: $onPrimary;
}
.router-link-exact-active {
  font-weight: bold;
}
.language-select {
  background-color: $onPrimary;
  width: 100%;
}
</style>
