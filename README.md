Daemonology
===========

Node JS Framework for Daemons


Daemon Status
====
Launchie: Complete.  
 - Perhaps extend/make configurable the list of executable files.  
 - Maybe add a Search command.

Newsie: Incomplete.
 - Playing around with Lunr/RSS.
 - Goals
 -- Check RSS feed.
 -- Distill Articles.
 -- Add to history.
 -- HTML Output.


Tests
====
Note, This application will attempt to run chrome from 2 lines of code.  It tries to find chrome at C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe

If this is incorrect change ./lib/index.js on line 132 and Launchie.js on line 27.

Server
 - node app
 - Either open http://localhost:8787/jarvis in a browser, type "test command here"
 - Or POST http://localhost:8787/command with the body { "command" : "test command here" }

Launchie
 - Enter "launch www.google.com" as your test command.
 - Google will open in a new tab.

Newsie
 - Enter "fetch Test"
 - If the Server is not open, it will open.
 - Test will appear in bold at the top. 