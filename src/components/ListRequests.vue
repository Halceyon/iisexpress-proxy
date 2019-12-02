<template>
   <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs6>
        <v-card
          class="mx-auto"
        >
          <v-toolbar
            color="light-blue"
            dark
          >

            <v-toolbar-title>Requests</v-toolbar-title>

            <v-spacer></v-spacer>

             <v-icon @click="clear">mdi-delete</v-icon>

          </v-toolbar>
          <v-list-item-group color="primary" v-model="selectedRequest">
            <v-list two-line subheader>
              <v-list-item
                v-for="(req, index) in items" :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="`${req.method}: ${req.url}`"></v-list-item-title>
                  <v-list-item-subtitle v-text="req.created"></v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>


            </v-list>
          </v-list-item-group>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card
          class="mx-auto"
        >
          <v-toolbar
            color="light-blue"
            dark
          >


            <v-toolbar-title>Response</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <json-viewer
              v-if="selectedResponse"
              :value="selectedResponse"
              :expand-depth=1
              copyable
              boxed
              sort></json-viewer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { find, sortBy, map } from 'lodash';
import moment from 'moment';
const WebSocket = require('isomorphic-ws');

export default {
  computed: {
    selected() {
      if (this.selectedRequest) {
        return this.proxyData[this.selectedRequest];
      }
      return null;
    },
    selectedResponse() {
      if (this.selected) {
        const req = this.proxyData[this.selectedRequest];
        const res = find(this.proxyData, p => p.id === req.id && p.type === 'response');
        return res;
      }
      return null;
    },
    items() {
      return sortBy(
        map(this.proxyData, d => {
          return {
            method: d.method,
            url: d.url,
            created: this.formatDate(d.created),
            originalDate: new Date(d.created).getTime(),
          };
        }),
        d => {
          return d.originalDate;
        }).reverse();
    },
  },
  data: () => ({
    proxyData: [],
    selectedRequest: null,
  }),
  methods: {
    formatDate(dt) {
      return moment(dt).fromNow();
    },
    clear() {
      this.proxyData = [];
    },
  },
  created () {
    const ws = new WebSocket('ws://localhost:8000');
    const self = this;
    ws.onmessage = function (e) {
        console.log(e);
        const msg = JSON.parse(e.data);
        console.log(msg);
        if (msg.type != 'system') {
          self.proxyData.push(msg);
        }
      };
  },
};
</script>
