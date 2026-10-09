require('dotenv').config();

const express = require('express');
const apiRoutes = require('./route');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
  });
}

module.exports = app;
