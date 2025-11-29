This code is published as part of [the corresponding blog article](https://www.toptal.com/express-js/remote-control-nodejs-back-end-tutorial) on the Toptal Engineering Blog.

Visit https://www.toptal.com/blog and subscribe to our newsletter to read great articles!

* * *

# What Does It Do, Exactly?

This runs a web server on your Linux-based laptop that can send pre-configured keystrokes to your browser windows (or untargeted).  By accessing it via your smartphone's web browser, you can conveniently control the volume and playback of your movie streaming and/or music listening:

![The "remote control layout selection" screen and the "generic / music player" remote control.](https://github.com/codingthat/old-fashioned-remote/blob/main/README-screenshots.png?raw=true)

# TL;DR

On your Linux-based computer:

1. Install [xdotool](https://www.semicomplete.com/projects/xdotool/#installing) and [Node.js](https://nodejs.org/en/download/package-manager/).
2. Clone this repo (`git clone https://github.com/codingthat/old-fashioned-remote.git`) and `cd` into the cloned directory.
3. Run `npm i` to install other project dependencies.
4. Find out your computer's local IP address (e.g. by running `hostname -I | awk '{print $1}'`).
5. Run `npm start` (and keep it running).
6. Open a music player, or have just one browser window open with `Netflix`, `YouTube`, or `Prime Video` in its title.

On your phone:

1. Connect to the same local network as your computer (via wifi).
2. Open your phone's web browser.
3. Go to `http://` (your local IP address) `:3000/` --- e.g. `http://192.168.1.102:3000/` if your IP is `192.168.1.102`.
4. Choose your remote control.
5. Voilà!  No need to get up to pause or turn up the quiet parts.
