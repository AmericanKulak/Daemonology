Functionalities
=====

**Daemon** is the base prototypal class for daemons.  Daemon defines the core functions: canHear and listen, and instantiates the list of CommandSchema. 

**CommandScheme** (inside Daemon.js) is the class used for defining Commands, and has two components: the regex used to determine if the command matches, and a string representation of the methodName to call.  When building a daemon, you will add multiple CommandSchemes to the Daemon's CommandSchema list.  The functions canDo and getTokens are used by the daemon's inherant function calls, and you will not likely have to call these functions.


**Jarvis** is a butler daemon.  He maintains a staff of other daemons, and when he is given a command, he will pass it on to any staff member he can find that can handle that command.

**Newsie** is an unfinished daemon that will amalgamate news articles about a topic into one article that tries to avoid duplicating information.  Additionally, it will keep a history on information shown so far, so that future reviews of the same topic will never show known information.

**Launchie** is a daemon that launches applications on the machine that it is running on.
