<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <v-container class="pa-2" fluid grid-list-md>
          <v-layout column>
            <v-flex v-for="(req, index) in webData" :key="index">
              <v-card mb-2>
                <v-card-text>
                  <div class="headline mb-2">
                    {{ req.method }}
                  </div>
                  <p>
                    {{ formatDate(req.created) }}
                  </p>
                <json-viewer v-if="req.resBody" :value="req.resBody" :expand-depth="2" copyable boxed></json-viewer>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import webData from "../../web-data.json";
import _ from 'lodash';
import moment from 'moment';

export default {
  computed: {
    webData() {
      return _.chain(webData)
        .sortBy('created')
        .reverse()
        .take(50)
        .value()
        .reverse();
    },
  },
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  }),
  methods: {
    formatDate(dt) {
      return moment(dt).fromNow();
    }
  },
};
</script>
