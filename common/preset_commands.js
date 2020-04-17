module.exports = {
  // We could use ⏯️ but some older phones (e.g. Android 5.1.1) won't show it, hence ▶️ instead
  'Netflix': {
    commands: {
      '-': 'Escape',        '+': 'f',             '🔊': 'Up',
      '⇤': 'XF86Back',      '▶️': 'Return',        '🔉': 'Down',
      '⏪': 'Left',         '⏩': 'Right',        '🔇': 'm',
    },
  },
  'YouTube': {
    commands: {
      '⇤': 'shift+p',       '⇥': 'shift+n',       '🔊': 'Up',
      'CC': 'c',            '▶️': 'k',             '🔉': 'Down',
      '⏪': 'j',            '⏩': 'l',            '🔇': 'm',
    },
  },
  'Amazon Prime Video': {
    window_name_override: 'Prime Video',
    commands: {
      '⇤': 'Escape',        '+': 'f',              '🔊': 'Up',
      'CC': 'c',            '▶️': 'space',          '🔉': 'Down',
      '⏪': 'Left',         '⏩': 'Right',         '🔇': 'm',
    },
  },
  'Generic / Music Player': {
    window_name_override: '',
    commands: {
      '⇤': 'XF86AudioPrev', '⇥': 'XF86AudioNext',  '🔊': 'XF86AudioRaiseVolume',
      '🔀': 'r',            '▶️': 'XF86AudioPlay',  '🔉': 'XF86AudioLowerVolume',
      '⏪': 'Left',         '⏩': 'Right',         '🔇': 'XF86AudioMute',
    },
  },
};