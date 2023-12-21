import {Quasar} from 'quasar';
import {boot} from 'quasar/wrappers';
import {useStore} from 'src/stores/store';
import {Ref} from 'vue';
import {i18n} from './i18n';

const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs');

export default boot(async ({router}) => {
  router.beforeEach((to) => {
    const store = useStore();

    (i18n.global.locale as Ref<string>).value = store.userSettings.language;

    langList[`../../node_modules/quasar/lang/${store.userSettings.language}.mjs`]().then((lang) => {
      Quasar.lang.set(lang.default);
    });

    if (to.meta.requiresAuth && !store.userIsLogged) {
      return {
        path: '/login',
        query: {redirect: to.fullPath}
      };
    }

    if (to.path === '/login' && store.userIsLogged) {
      return {
        path: '/'
      };
    }
  });
});
