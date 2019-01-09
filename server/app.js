const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '../client/public');

app.use('/', express.static(publicPath));

// port 7666 so it won't clash if you're writing node apps ;-)
// 7666 from the old phone code for POMO (7-6-6-6)
const port = process.env.PORT || 7666

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(port, function () {
  console.log(`Started server on port ${port}!`);
});
