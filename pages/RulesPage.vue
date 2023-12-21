<template>
  <q-page class="full-width justify-center content-start">
    <q-card
      flat
      bordered>
      <q-card-section class="card-title">{{ $t('rulesPage.title') }} </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="description">
          <p>{{ t('rulesPage.description') }}</p>
          <p>{{ t('rulesPage.linkDescription') }}</p>
          <ul>
            <li
              v-for="(link, i) in links"
              :key="i">
              <a
                :href="link.url"
                target="_blank">
                {{ link.display[locale] }}
              </a>
            </li>
          </ul>
        </div>

        <q-list
          bordered
          class="rounded-borders settings-stepper">
          <q-expansion-item
            expand-separator
            :label="t('rulesPage.fetchTitle')"
            :caption="t('rulesPage.fetchLabel')">
            <q-card>
              <p>{{ t('rulesPage.fetchDescription') }}</p>
              <p v-if="fetchSuccess">{{ t('rulesPage.fetchSuccess', {rules: getRules().length}) }}</p>
              <q-card-section class="fetch-section">
                <q-input
                  v-model="rulesUrl"
                  :disable="loading"
                  outlined
                  :class="{success: fetchSuccess, error: fetchError}"
                  :label="t('rulesPage.fetchHint')" />
                <q-btn
                  :disable="loading || !rulesUrl"
                  :loading="loading"
                  @click="fetchRules">
                  {{ t('rulesPage.fetchButton') }}
                </q-btn>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            :class="{error: editError}"
            :label="t('rulesPage.editTitle')"
            :caption="t('rulesPage.editLabel')">
            <q-card>
              <p>{{ t('rulesPage.editDescription') }}</p>
              <q-card-section class="edit-section">
                <q-input
                  v-model="rulesText"
                  autogrow
                  outlined
                  type="textarea" />
                <div class="button-area">
                  <q-btn @click="resetRules">
                    {{ t('rulesPage.resetButton') }}
                  </q-btn>
                  <q-btn @click="saveText">
                    {{ t('rulesPage.editButton') }}
                  </q-btn>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card
      flat
      bordered>
      <q-card-section class="card-title">Erklärung</q-card-section>
      <q-card-section
        ><p
          class="intro-text"
          v-html="t('rulesPage.introText')" />
      </q-card-section>
      <q-card-section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          contentStyleType="text/css"
          height="657px"
          preserveAspectRatio="none"
          style="width: 50vw; height: 47.6777vw; background: #ffffff"
          version="1.1"
          viewBox="0 0 689 657"
          zoomAndPan="magnify">
          <defs />
          <g>
            <ellipse
              cx="322"
              cy="20"
              fill="#222222"
              rx="10"
              ry="10"
              style="stroke: #222222; stroke-width: 1" />
            <polygon
              fill="#F1F1F1"
              points="284.5,152.3711,359.5,152.3711,371.5,164.3711,359.5,176.3711,284.5,176.3711,272.5,164.3711,284.5,152.3711"
              style="stroke: #181818; stroke-width: 0.5" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="75"
              x="284.5"
              y="168.1792">
              type of entry
            </text>
            <rect
              fill="#F1DDF0"
              height="33.9688"
              rx="12.5"
              ry="12.5"
              style="stroke: #181818; stroke-width: 0.5"
              width="157"
              x="11"
              y="211.9805"
              @click="setDisplay('patient')" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="55"
              x="25"
              y="233.1191"
              @click="setDisplay('patient')">
              generate
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              text-decoration="underline"
              textLength="41"
              x="84"
              y="233.1191"
              @click="setDisplay('patient')">
              patient
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="29"
              x="129"
              y="233.1191"
              @click="setDisplay('patient')">
              facts
            </text>
            <rect
              fill="#DFEAF4"
              height="33.9688"
              rx="12.5"
              ry="12.5"
              style="stroke: #181818; stroke-width: 0.5"
              width="183"
              x="206.5"
              y="211.9805"
              @click="setDisplay('vaccination')" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="55"
              x="220.5"
              y="233.1191"
              @click="setDisplay('vaccination')">
              generate
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              text-decoration="underline"
              textLength="67"
              x="279.5"
              y="233.1191"
              @click="setDisplay('vaccination')">
              vaccination
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="29"
              x="350.5"
              y="233.1191"
              @click="setDisplay('vaccination')">
              facts
            </text>
            <rect
              fill="#E1F4E2"
              height="33.9688"
              rx="12.5"
              ry="12.5"
              style="stroke: #181818; stroke-width: 0.5"
              width="138"
              x="453"
              y="211.9805"
              @click="setDisplay('risk')" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="55"
              x="467"
              y="233.1191"
              @click="setDisplay('risk')">
              generate
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              text-decoration="underline"
              textLength="22"
              x="526"
              y="233.1191"
              @click="setDisplay('risk')">
              risk
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="29"
              x="552"
              y="233.1191"
              @click="setDisplay('risk')">
              facts
            </text>
            <polygon
              fill="#F1F1F1"
              points="322,293.668,322,293.668,334,305.668,322,317.668,322,317.668,310,305.668,322,293.668"
              style="stroke: #181818; stroke-width: 0.5" />
            <rect
              fill="#F1F1F1"
              height="33.9688"
              rx="12.5"
              ry="12.5"
              style="stroke: #181818; stroke-width: 0.5"
              width="137"
              x="253.5"
              y="98.4023" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="117"
              x="263.5"
              y="119.541">
              iterate over entries
            </text>
            <polygon
              fill="#F1F1F1"
              points="246.5,337.668,397.5,337.668,409.5,349.668,397.5,361.668,246.5,361.668,234.5,349.668,246.5,337.668"
              style="stroke: #181818; stroke-width: 0.5" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="151"
              x="246.5"
              y="353.4761">
              while entries unprocessed
            </text>
            <polygon
              fill="#F1F1F1"
              points="185.5,50,458.5,50,470.5,62,458.5,74,185.5,74,173.5,62,185.5,50"
              style="stroke: #181818; stroke-width: 0.5" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="21"
              x="326"
              y="84.2104">
              yes
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              text-decoration="underline"
              textLength="171"
              x="185.5"
              y="65.8081">
              Vaccination Record Document
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="98"
              x="360.5"
              y="65.8081">
              new or changed?
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="14"
              x="470.5"
              y="59.4058">
              no
            </text>
            <polygon
              fill="#F1F1F1"
              points="322,381.668,334,393.668,322,405.668,310,393.668,322,381.668"
              style="stroke: #181818; stroke-width: 0.5" />
            <rect
              fill="#F1F1F1"
              height="33.9688"
              rx="12.5"
              ry="12.5"
              style="stroke: #181818; stroke-width: 0.5"
              width="213"
              x="215.5"
              y="474.0703" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="189"
              x="229.5"
              y="495.209">
              generate new depending Facts
            </text>
            <polygon
              fill="#F1F1F1"
              points="226.5,425.668,417.5,425.668,429.5,437.668,417.5,449.668,226.5,449.668,214.5,437.668,226.5,425.668"
              style="stroke: #181818; stroke-width: 0.5" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="21"
              x="326"
              y="459.8784">
              yes
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              text-decoration="underline"
              textLength="31"
              x="226.5"
              y="441.4761">
              Rules
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="64"
              x="261.5"
              y="441.4761">
              changed or
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              text-decoration="underline"
              textLength="29"
              x="329.5"
              y="441.4761">
              Facts
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="55"
              x="362.5"
              y="441.4761">
              changed?
            </text>
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="14"
              x="429.5"
              y="435.0737">
              no
            </text>
            <polygon
              fill="#F1F1F1"
              points="322,528.0391,334,540.0391,322,552.0391,310,540.0391,322,528.0391"
              style="stroke: #181818; stroke-width: 0.5" />
            <rect
              fill="#FEFFE1"
              height="33.9688"
              rx="12.5"
              ry="12.5"
              style="stroke: #181818; stroke-width: 0.5"
              width="168"
              x="238"
              y="572.0391"
              @click="setDisplay('depending')" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="12"
              lengthAdjust="spacing"
              textLength="148"
              x="248"
              y="593.1777"
              @click="setDisplay('depending')">
              display depending Facts
            </text>
            <ellipse
              cx="322"
              cy="636.0078"
              fill="none"
              rx="10"
              ry="10"
              style="stroke: #222222; stroke-width: 1.5" />
            <line
              style="stroke: #222222; stroke-width: 2.5"
              x1="315.8128"
              x2="328.1872"
              y1="629.8206"
              y2="642.195" />
            <line
              style="stroke: #222222; stroke-width: 2.5"
              x1="328.1872"
              x2="315.8128"
              y1="629.8206"
              y2="642.195" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="272.5"
              x2="89.5"
              y1="164.3711"
              y2="164.3711" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="89.5"
              x2="89.5"
              y1="164.3711"
              y2="211.9805" />
            <polygon
              fill="#181818"
              points="85.5,201.9805,89.5,211.9805,93.5,201.9805,89.5,205.9805"
              style="stroke: #181818; stroke-width: 1" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="93"
              x="93.5"
              y="191.9839">
              Patient resource
            </text>
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="371.5"
              x2="522"
              y1="164.3711"
              y2="164.3711" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="522"
              x2="522"
              y1="164.3711"
              y2="211.9805" />
            <polygon
              fill="#181818"
              points="518,201.9805,522,211.9805,526,201.9805,522,205.9805"
              style="stroke: #181818; stroke-width: 1" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="107"
              x="526"
              y="191.9839">
              Condition resource
            </text>
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="176.3711"
              y2="188.2409" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="298"
              y1="188.2409"
              y2="188.2409" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="298"
              x2="298"
              y1="188.2409"
              y2="211.9805" />
            <polygon
              fill="#181818"
              points="294,201.9805,298,211.9805,302,201.9805,298,205.9805"
              style="stroke: #181818; stroke-width: 1" />
            <text
              fill="#000000"
              font-family="sans-serif"
              font-size="11"
              lengthAdjust="spacing"
              textLength="131"
              x="302"
              y="192.9839">
              Immunization resource
            </text>
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="89.5"
              x2="89.5"
              y1="245.9492"
              y2="305.668" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="89.5"
              x2="310"
              y1="305.668"
              y2="305.668" />
            <polygon
              fill="#181818"
              points="300,301.668,310,305.668,300,309.668,304,305.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="522"
              x2="522"
              y1="245.9492"
              y2="305.668" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="522"
              x2="334"
              y1="305.668"
              y2="305.668" />
            <polygon
              fill="#181818"
              points="344,301.668,334,305.668,344,309.668,340,305.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="298"
              x2="298"
              y1="245.9492"
              y2="278.668" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="298"
              x2="322"
              y1="278.668"
              y2="278.668" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="278.668"
              y2="293.668" />
            <polygon
              fill="#181818"
              points="318,283.668,322,293.668,326,283.668,322,287.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="132.3711"
              y2="152.3711" />
            <polygon
              fill="#181818"
              points="318,142.3711,322,152.3711,326,142.3711,322,146.3711"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="409.5"
              x2="645"
              y1="349.668"
              y2="349.668" />
            <polygon
              fill="#181818"
              points="641,273.668,645,263.668,649,273.668,645,269.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="645"
              x2="645"
              y1="115.3867"
              y2="349.668" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="645"
              x2="390.5"
              y1="115.3867"
              y2="115.3867" />
            <polygon
              fill="#181818"
              points="400.5,111.3867,390.5,115.3867,400.5,119.3867,396.5,115.3867"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="317.668"
              y2="337.668" />
            <polygon
              fill="#181818"
              points="318,327.668,322,337.668,326,327.668,322,331.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="74"
              y2="98.4023" />
            <polygon
              fill="#181818"
              points="318,88.4023,322,98.4023,326,88.4023,322,92.4023"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="470.5"
              x2="663"
              y1="62"
              y2="62" />
            <polygon
              fill="#181818"
              points="659,251.1758,663,261.1758,667,251.1758,663,255.1758"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="663"
              x2="663"
              y1="62"
              y2="393.668" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="663"
              x2="334"
              y1="393.668"
              y2="393.668" />
            <polygon
              fill="#181818"
              points="344,389.668,334,393.668,344,397.668,340,393.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="361.668"
              y2="381.668" />
            <polygon
              fill="#181818"
              points="318,371.668,322,381.668,326,371.668,322,375.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="30"
              y2="50" />
            <polygon
              fill="#181818"
              points="318,40,322,50,326,40,322,44"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="449.668"
              y2="474.0703" />
            <polygon
              fill="#181818"
              points="318,464.0703,322,474.0703,326,464.0703,322,468.0703"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="429.5"
              x2="441.5"
              y1="437.668"
              y2="437.668" />
            <polygon
              fill="#181818"
              points="437.5,481.0547,441.5,491.0547,445.5,481.0547,441.5,485.0547"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="441.5"
              x2="441.5"
              y1="437.668"
              y2="540.0391" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="441.5"
              x2="334"
              y1="540.0391"
              y2="540.0391" />
            <polygon
              fill="#181818"
              points="344,536.0391,334,540.0391,344,544.0391,340,540.0391"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="508.0391"
              y2="528.0391" />
            <polygon
              fill="#181818"
              points="318,518.0391,322,528.0391,326,518.0391,322,522.0391"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="405.668"
              y2="425.668" />
            <polygon
              fill="#181818"
              points="318,415.668,322,425.668,326,415.668,322,419.668"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="552.0391"
              y2="572.0391" />
            <polygon
              fill="#181818"
              points="318,562.0391,322,572.0391,326,562.0391,322,566.0391"
              style="stroke: #181818; stroke-width: 1" />
            <line
              style="stroke: #181818; stroke-width: 1"
              x1="322"
              x2="322"
              y1="606.0078"
              y2="626.0078" />
            <polygon
              fill="#181818"
              points="318,616.0078,322,626.0078,326,616.0078,322,620.0078"
              style="stroke: #181818; stroke-width: 1" />
            <!--SRC=[TP4nRuCm48LtViL9MM1hganqgAg2fMvLXgwMPHzW5Sx8Da7qr_SeA3GeyMBBT_xUyxqGbO-9hI2LyajfRKb5wmZEg9qtK3WzT4XHIY0SmNdGZQ8QpMi6iK62TCAG9G0UUrGHSXlHguZWBkY17tgBuONhymgZZRg1D4uzDrH_vIbRYm1Q1OGKFja0LvWOtE0rRWq01t4i2l6KGusqw4ZPB_tii58wNiMkl8-k6yZ-BD-w2or4-IPEDz3BDeg7u7T7nZwcbaTnAfzlgDw6xpqEoInpsOOuDhPbWMLRPmW3zTvf305Dbc0xEo379_PGhVcTXnO3yzU8vhIa5BFOThdFxP-_EM333fX8DOZ5v5xf84eXoYFaneQ-LTET5sH-0G00]-->
          </g>
        </svg>
        <q-card
          v-if="displayBox"
          :class="['info-popup']">
          <q-card-section :class="['title', displayBox.type]"
            >{{ displayBox.title }}
            <span
              class="close-x"
              @click="displayBox = undefined"
              >×</span
            ></q-card-section
          >
          <pre
            >{{ displayBox.content }}
          </pre>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {MessageLanguages, MessageSchema} from 'src/boot/i18n';
import {Rule, useRuleEngine} from 'src/services/rules';
import axios from 'axios';
import {ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n<{message: MessageSchema}, MessageLanguages>();
const {getRules, setRules, facts, resultingFacts} = useRuleEngine();

const links = [
  {
    url: 'https://github.com/m-onyshchuk/stugna',
    display: {
      de: 'Github stugna-es: Hier finden Sie die Dokumentation zum Format der Regeln',
      fr: 'Github stugna-es: vous trouverez ici la documentation sur le format des règles'
    }
  },
  {
    url: 'https://www.bag.admin.ch/bag/de/home/das-bag/organisation/ausserparlamentarische-kommissionen/eidgenoessische-kommission-fuer-impffragen-ekif/impfempfehlungen.html',
    display: {
      de: 'BAG: Impfempfehlungen der EKIF',
      fr: 'OFSP: Recommandations de vaccination de la CFV'
    }
  }
];

let rulesText = ref<string>(JSON.stringify(getRules(), null, 2));
let rulesUrl = ref(process.env.DEFAULT_RULE_URL);
let loading = ref(false);
let editError = ref(false);
let fetchError = ref(false);
let fetchSuccess = ref(false);

interface InfoBox {
  type: string;
  title: string;
  content: string;
}
let displayBox = ref<InfoBox>();
const PATIENT_FACTS = ['gender', 'age'];
const RISK_FACTS = ['r1237021005', 'r1237022003', 'r1237024002'];
const VACCINATION_FACTS = ['v68225_completed', 'v68225_last_dose', 'd840539006_completed', 'd840539006_last_dose', 'd840539006_number_of_doses'];
const DEPENDING_FACTS = resultingFacts.value.map((rf) => rf.name).splice(0, 3);

function setDisplay(type: string) {
  console.log(facts.value);
  let content = {};
  switch (type) {
    case 'patient':
      content = facts.value.filter((f) => PATIENT_FACTS.includes(f.name));
      break;
    case 'vaccination':
      content = facts.value.filter((f) => VACCINATION_FACTS.includes(f.name));
      break;
    case 'risk':
      content = facts.value.filter((f) => RISK_FACTS.includes(f.name));
      break;
    case 'depending':
      content = facts.value.filter((f) => DEPENDING_FACTS.includes(f.name));
      break;
  }
  displayBox.value = {
    title: t('rulesPage.infoTitle.' + type),
    type: type,
    content: JSON.stringify(content, null, 2)
  };
}

watch(rulesUrl, (n, o) => {
  if (n != o) {
    fetchError.value = fetchSuccess.value = false;
  }
});

watch(rulesText, (n, o) => {
  if (n != o) {
    editError.value = false;
  }
});

function parseRules(rules: string | Rule[]) {
  try {
    const parsed = typeof rules == 'string' ? JSON.parse(rules) : rules;
    setRules(parsed);
    rulesText.value = JSON.stringify(getRules(), null, 2);
  } catch (e) {
    editError.value = true;
    console.warn('Error when parsing rules', e, rules);
  }
}

function resetRules() {
  editError.value = false;
  rulesText.value = JSON.stringify(getRules(), null, 2);
}

function saveText() {
  editError.value = false;
  parseRules(rulesText.value);
}

function fetchRules() {
  fetchError.value = false;
  fetchSuccess.value = false;
  loading.value = true;
  axios
    .request({
      method: 'get',
      maxBodyLength: Infinity,
      url: rulesUrl.value,
      headers: {}
    })
    .then((response) => {
      parseRules(response.data);
      if (!editError.value) {
        fetchSuccess.value = true;
      } else {
        editError.value = false;
        fetchError.value = true;
      }
    })
    .catch((error) => {
      editError.value = false;
      fetchError.value = true;
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
<style scoped lang="scss">
.description {
  margin: 3em;
}
.error {
  background-color: $warning;
}
.success {
  background-color: $positive;
}
.settings-stepper {
  margin: 3em;
}
.fetch-section {
  display: flex;
  label {
    width: calc(95% - 15em);
    margin-right: 5%;
  }
  button {
    width: 15em;
  }
}
.info-popup {
  font-size: 0.7em;
  width: 30vw;
  top: 3em;
  right: 1em;
  position: absolute;
  overflow: auto;
  pre {
    margin: 0.5em;
  }
  .title {
    font-size: 1.2em;
    padding: 0.7em;
  }
}
.vaccination {
  background-color: #dfeaf4;
}
.patient {
  background-color: #f1ddf0;
}
.risk {
  background-color: #e1f4e2;
}
.depending {
  background-color: #feffe1;
}
.edit-section {
  .button-area {
    margin: 1em 20% 0;
    display: flex;
    justify-content: space-between;
  }
}
.close-x {
  position: absolute;
  right: 0.5em;
  font-size: 2em;
  top: -0.1em;
  cursor: default;
}
</style>
