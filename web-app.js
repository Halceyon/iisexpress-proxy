/* eslint-disable no-console */

const express = require('express'),
        path = require('path'),
        history = require('connect-history-api-fallback');

// setup web interface
const app = new express();
app.use(history());
app.use(express.static(path.resolve(__dirname,'dist')));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})