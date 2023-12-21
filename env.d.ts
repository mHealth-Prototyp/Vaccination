/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    FHIR_4_CONTENT_TYPE: string;
    BASE_URL: string;
    MESSAGE_ENDPOINT: string;
    DEFAULT_TIMEOUT: string;
    SOURCE_ENDPOINT: string;
    TARGET_ENDPOINT: string;
    IS_2FA_ENABLED: string;
    DEFAULT_RULE_URL: string;
  }
}
