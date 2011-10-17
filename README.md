WDCNZ 2011
==========

Apocalypse Node
---------------

These are my slides and all the example code I had in my talk. Most of the code in my slide deck are runnable node scripts.

The deck has been built using [Sencha Touch](http://www.sencha.com/products/touch/). While I know that sounds weird there is a reason...

How to use
----------

Either download the zip or clone this repository:

	git clone --depth 1 git://github.com/storminwalker/WDCNZ-2011

If you just want to look at the slides then that's cool. Just open /public/index.html into Chrome (sorry - it has some funky code that I only tested in Chrome). They will also render nicely onto an iPad - it's fixed to ~1024 x ~700 so while it will render on an iPhone it won't look very good.

Now if you want to see something cool...

### Install node

If you have a Mac & have [homebrew](https://github.com/mxcl/homebrew/wiki/installation) installed type the following:

    brew install node

If you don't have a Mac then go here for instructions:

[https://github.com/joyent/node/wiki/Installation](https://github.com/joyent/node/wiki/Installation)

I haven't tested this code using 0.5 (unstable) so it's currently targeting 0.4.x.

### Run the server

Open terminal and type:

	node server.js
	
This will start the server on localhost at port 8080.

Go to your Chrome browser and go to http://localhost:8080/ to see it working. You will notice the url changing to #/1 - the slide deck has back button support built in. 

Now go to the same site on an iPad (obviously you will need to use the external IP address of your machine e.g., http://192.168.1.100:8080) - but this time put the url as: http://192.168.1.100:8080/#/admin/1). That will make the iPad a clicker! 

Now as you swipe through the slide deck on your iPad (because it's Sencha Touch so it just works), you will see the slide deck on your desktop machine slide along with it! (Works going back and forwards).

Basically it's just using a simple socket.io server that broadcasts the page of the "admin" to anyone listening (so if you change the url to /#/admin/31 for instance the app on screen will go straight to Page 31 as well).

This is the one demo I wanted to show working during my presentation but due to the way the WiFi worked at WDCNZ I couldn't make it work.

### Run the server

All my code samples are in /examples (each js file has how you run it commented out in the file - so that you don't need to figure it out).