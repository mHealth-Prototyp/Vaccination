import {utilsKey} from 'src/services/keys';
import {inject} from 'vue';

export function useUtilsInject() {
  const resolved = inject(utilsKey);
  if (!resolved) {
    throw new Error('Key was not provided.');
  }

  return resolved;
}
