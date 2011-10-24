SenchaCon 2011
==============

Apocalypse Node
---------------

These are my slides and all the example code I used in my talk at SenchaCon 2011. Most of the code in my slide deck are runnable node scripts.

The deck has been built using [Sencha Touch](http://www.sencha.com/products/touch/). While I know that sounds weird there is a reason...

How to use
----------

Either download the zip or clone this repository:

	git clone --depth 1 git://github.com/storminwalker/SenchaCon-2011

If you just want to look at the slides then that's cool. Just open /public/index-local.html into Chrome (sorry - it has some funky code that I only tested in Chrome). They will also render nicely onto an iPad - it's fixed to ~1024 x ~700 so while it will render on an iPhone it won't look very good.

Now if you want to see something cool...

### Install node

If you have a Mac & have [homebrew](https://github.com/mxcl/homebrew/wiki/installation) installed type the following:

    brew install node

If you don't have a Mac then go here for instructions:

[https://github.com/joyent/node/wiki/Installation](https://github.com/joyent/node/wiki/Installation)

I haven't tested this code using 0.5 (unstable) so it's currently targeting 0.4.x.

### Run npm

First install npm if you haven't already:

	curl http://npmjs.org/install.sh | sh
	
Then run npm on the SenchaCon-2011 folder:

	npm install
	
This will install all the dependencies for the application using the package.json file.

You will need to also run npm install on any directory in the examples folder that have a package.json file.

### Run the server

Open terminal and type:

	node server.js
	
This will start the server on localhost at port 8008.

Go to your Chrome browser and go to http://localhost:8008/ to see it working. You will notice the url changing to #/1 - the slide deck has back button support built in. 

Now go to the same site on an iPad (obviously you will need to use the external IP address of your machine e.g., http://192.168.1.100:8008) - but this time put the url as: http://192.168.1.100:8008/#/admin/1). That will make the iPad a clicker! 

Now as you swipe through the slide deck on your iPad (because it's Sencha Touch so it just works), you will see the slide deck on your desktop machine slide along with it! (Works going back and forwards).

Basically it's just using a simple socket.io server that broadcasts the page of the "admin" to anyone listening (so if you change the url to /#/admin/31 for instance the app on screen will go straight to Page 31 as well).

### Run the examples

All my code samples are in /examples folder (most of the js files have how you run it commented out in the file - so that you don't need to figure it out).

If the folder has a package.json please run

	npm install
	
on that folder to install any dependencies.

You may also want to check out my other projects referenced in this talk:

[node-extjs](http://github.com/storminwalker/node-extjs)
[node-extjs-express](http://github.com/storminwalker/node-extjs)


