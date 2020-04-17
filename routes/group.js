const express = require('express');
const router = express.Router();
const debug = require('debug')('old-fashioned-remote');
const cp = require('child_process');
const preset_commands = require('../common/preset_commands');

/* POST keystroke to simulate */
router.post('/', function(req, res, next) {

  const keystroke_name = req.body.keystroke_name;
  const keystroke_code = preset_commands['YouTube'].commands[keystroke_name];
  const final_command = `xdotool \
  search "YouTube" \
  windowactivate --sync \
  key --clearmodifiers ${keystroke_code}`;

  debug(`Executing ${final_command}`);
  cp.exec(final_command, (err, stdout, stderr) => {
    debug(`Executed ${keystroke_name}`);
    return res.redirect(req.originalUrl);
  });
});

router.get('/', function(req, res, next) {
  const group_name = req.query.group_name || '';
  const group = preset_commands[group_name];

  return res.render('group', {
    keystroke_names: Object.keys(group.commands),
    group_name,
    title: `${group_name.match(/([A-Z])/g).join('')}-Remote`
  });
});

module.exports = router;
