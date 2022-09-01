const router = require('express');
const apiRoutes = require('./api');


router.request('/api', apiRoutes);

router.request((req, res) => {
  res.status(404).send('<h2>404 Error!</h2>');
});

module.exports = router; 