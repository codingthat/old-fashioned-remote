const express = require('express');
const router = express.Router();
const preset_commands = require('../common/preset_commands');

/* GET home page. */
router.get('/', function(req, res, next) {
  const group_names = Object.keys(preset_commands);
  res.render('index', {
    title: 'Which Remote?',
    group_names,
    portrait_css: `.group_bar {
      height: calc(100%/${Math.min(4, group_names.length)});
      line-height: calc(100vh/${Math.min(4, group_names.length)});
    }`,
    landscape_css: `.group_bar {
      height: calc(100%/${Math.min(2, group_names.length)});
      line-height: calc(100vh/${Math.min(2, group_names.length)});
    }`,
  });
});

module.exports = router;
