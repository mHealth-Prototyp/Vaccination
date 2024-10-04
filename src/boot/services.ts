import {Quasar} from 'quasar';
import {boot} from 'quasar/wrappers';
import {useStore} from 'src/stores/store';
import {Ref} from 'vue';
import {i18n} from './i18n';

const langList = import.meta.glob('../../node_modules/quasar/lang/*.js');

export default boot(async ({router}) => {
  router.beforeEach((to) => {
    const store = useStore();

    (i18n.global.locale as Ref<string>).value = store.userSettings.language;

    try {
      langList[`../../node_modules/quasar/lang/${store.userSettings.language}.js`]().then((lang) => {
        Quasar.lang.set(lang.default);
      });
    } catch (e) {
      console.warn('Could not load language file to quasar', e);
    }

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
