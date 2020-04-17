const express = require('express');
const router = express.Router();
const debug = require('debug')('old-fashioned-remote');
const cp = require('child_process');
const preset_commands = require('../common/preset_commands');

const check_group = (query, res) => {
  const group_name = query.group_name || '';
  if (!group_name) {
    res.status(404).render('error', { error: 'No group specified', detail: `URL should end in ?group_name=(the escaped group name here)` });
    return { check_group_error: true };
  }
  const group = preset_commands[group_name];
  if (!group) {
    res.status(404).render('error', { error: 'Group not found', detail: `Received name '${group_name}' but couldn't find it among presets` });
    return { check_group_error: true };
  }
  if (!group.commands) {
    res.status(404).render('error', { error: 'Group empty', detail: `Found group '${group_name}' but it has no commands defined` });
    return { check_group_error: true };
  }
  return { group_name, group };
};

router.route('/')

  /* GET remote control layout for a particular group */
  .get((req, res) => {
    const { group_name, group, check_group_error } = check_group(req.query, res);
    if (check_group_error) return;
    res.render('group', {
      keystroke_names: Object.keys(group.commands),
      group_name,
      title: `${group_name.match(/([A-Z])/g).join('')}-Remote`
    });
  })

  /* POST keystroke to simulate */
  .post((req, res) => {
    const keystroke_name = req.body.keystroke_name || '';
    if (keystroke_name === '') {
      return res.status(400).render('error', { error: 'No key sent' });
    }

    const { group_name, group, check_group_error } = check_group(req.query, res);
    if (check_group_error) return;
    if (!group.commands[keystroke_name]) {
      return res.status(400).render('error', { error: 'Key not allowed', detail: `Key not found in commands of group '${group_name}'` });
    }

    const window_name = (group.hasOwnProperty('window_name_override') // allow blanks
    ? group.window_name_override
    : group_name).replace(/"/g, '\\"');

    const window_search_and_activate = window_name
      ? `search "${window_name}" windowactivate --sync`
      : '';

    const final_command = `xdotool \
    ${window_search_and_activate} \
    key --clearmodifiers ${group.commands[keystroke_name]}`;

    debug(`Executing ${final_command}`);
    cp.exec(final_command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return res.status(400).render('error', { error: 'Exec call failed', detail: err });
      } else if (stderr.match('No such key name')) {
        console.error(stderr);
        return res.status(400).render('error', { error: 'Invalid keycode', detail: stderr });
      } else {
        debug(`Executed ${keystroke_name}`);
        return res.redirect(req.originalUrl);
      }
    });
  })
;

module.exports = router;