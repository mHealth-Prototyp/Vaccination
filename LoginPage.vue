<template>
  <q-page class="full-width row justify-center content-start">
    <div style="overflow: auto">
      <q-card
        flat
        bordered>
        <q-card-section class="card-title">
          {{ t('login.welcome1') }}
        </q-card-section>
        <q-separator />
        <q-card-section v-if="!code">
          <p class="text-body2">
            {{ t('login.welcome2') }}
          </p>
          <q-form
            class=""
            style="text-align: center">
            <q-input
              v-model="emailAddress"
              class="q-my-md"
              outlined
              type="email"
              :label="t('login.emailAddressLabel')">
              <q-tooltip>
                {{ t('login.possibleLogins') }}
                <ul class="hint-link-items">
                  <li
                    v-for="l of ACCEPTED_LOGINS.filter((l) => l.emailAddress !== 'dev@on.ly')"
                    :key="l.emailAddress">
                    {{ l.emailAddress + ' | ' + l.password }}<br />{{ '(' + getLoginDescription(l) + ')' }}
                  </li>
                </ul>
              </q-tooltip>
            </q-input>
            <q-input
              v-model="password"
              class="q-my-md"
              outlined
              type="password"
              :label="t('login.passwordLabel')">
            </q-input>
            <q-btn
              id="login-button"
              unelevated
              color="primary"
              text-color="onPrimary"
              type="submit"
              :loading="processing"
              :label="t('login.loginLabel')"
              :disable="processing || password === '' || emailAddress === ''"
              @click="login" />
          </q-form>
          <p
            v-if="invalidPassword"
            class="text-body2 warning">
            {{ t('login.invalidPassword') }}
          </p>
        </q-card-section>
        <q-card-section v-else>
          <p class="text-body2">
            {{ t('login.enterCode1') }}
            <span class="phonenumber">{{ obscurePhoneNumber() }}</span>
            {{ t('login.enterCode2') }}
          </p>
          <span
            href="#"
            class="text-body2 resend-link"
            @click="sendCode()"
            >{{ t('login.resend') }}</span
          >
          <q-form
            id="code-form"
            style="text-align: center">
            <q-input
              v-model="codeInput"
              class="q-my-md"
              outlined
              type="text"
              :label="t('login.codeLabel')"
              autofocus />
            <q-btn
              id="code-button"
              unelevated
              color="primary"
              text-color="onPrimary"
              type="submit"
              :loading="processing"
              :label="t('login.checkLabel')"
              :disable="processing || codeInput === ''"
              @click="checkCode" />
          </q-form>
          <p
            v-if="invalidCode"
            class="text-body2 warning">
            {{ t('login.invalidCode') }}
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';
import ACCEPTED_LOGINS from 'src/assets/acceptedLogins.json';
import {MessageSchema} from 'src/boot/i18n';
import {useUtilsInject} from 'src/composables/composables';
import {defaultUser} from 'src/models/defaults';
import {Login} from 'src/models/types';
import {useStore} from 'src/stores/store';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute, useRouter} from 'vue-router';

const $q = useQuasar();
const {t, locale} = useI18n<{message: MessageSchema}>();
const router = useRouter();
const route = useRoute();

const store = useStore();

const emailAddress = ref('');
const password = ref('');
const matchedUser = ref(defaultUser);
const processing = ref(false);
const invalidPassword = ref(false);
const code = ref<string | null>(null);
const codeInput = ref('');
const invalidCode = ref(false);

const {epdUtils} = useUtilsInject();

function getLoginDescription(login: Login): string {
  return login.description[locale.value.substring(0, 2) as 'de' | 'fr'];
}

function login(e: Event) {
  e.preventDefault();
  const match = ACCEPTED_LOGINS.find((login) => login.emailAddress === emailAddress.value);
  if (match && match.password === password.value) {
    matchedUser.value = match;
    if (process.env.IS_2FA_ENABLED === 'TRUE') {
      sendCode();
    } else {
      apply();
    }
  } else {
    invalidPassword.value = true;
  }
}

function apply() {
  processing.value = true;
  epdUtils
    .useITI78({given: matchedUser.value.firstName, family: matchedUser.value.lastName})
    .then((patientResources) => {
      if (patientResources.length === 0) {
        $q.notify({
          message: t('common.error'),
          caption: t('login.loginError'),
          type: 'negative',
          position: 'top-right'
        });
        console.error('No corresponding patient found on EPD Playground for ' + matchedUser.value.firstName + ' ' + matchedUser.value.lastName + '.');
        processing.value = false;
      } else {
        store.$patch({
          user: matchedUser.value,
          userResource: patientResources[0]
        });
        router.push({path: route.redirectedFrom?.path ?? '/'});
      }
    })
    .catch((error) => {
      $q.notify({
        message: t('common.error'),
        caption: t('login.loginError'),
        type: 'negative',
        position: 'top-right'
      });
      console.error('Something went wrong logging in', error);
      processing.value = false;
    });
}

function sendCode() {
  generateCode(4);
  $q.notify({
    message: t('login.messageTitle') + matchedUser.value.mobilePhoneNumber,
    caption: t('login.messageText') + code.value,
    position: 'top-right'
  });
}

function generateCode(length: number) {
  const randomNumber = Math.floor(Math.random() * Math.pow(10, length)).toString();
  code.value = '0'.repeat(randomNumber.length - length) + randomNumber;
}

function checkCode(e: Event) {
  e.preventDefault();
  if (code.value === codeInput.value && matchedUser.value) {
    apply();
  } else {
    invalidCode.value = true;
  }
}

function obscurePhoneNumber(): string {
  return (
    matchedUser.value?.mobilePhoneNumber.substring(0, 2) +
    '• ••• ' +
    matchedUser.value?.mobilePhoneNumber.substring(matchedUser.value?.mobilePhoneNumber.length - 5, matchedUser.value?.mobilePhoneNumber.length)
  );
}
</script>

<style scoped lang="scss">
#code-form > input {
  width: 5em;
  font-size: 2em;
}
.warning {
  color: $warning;
  text-align: center;
  margin-top: 1.5em;
}
li .phonenumber {
  white-space: nowrap;
  font-weight: bold;
}
.resend-link {
  text-decoration: underline;
  cursor: pointer;
  color: $secondary;
}
.resend-link:hover {
  text-decoration: none;
  color: $primary;
}
.hint-link-items {
  padding-left: 1em;
}
</style>
