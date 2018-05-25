# CODE SERVER

used to execute code in a sandbox and match its output with the desired output

## DEPENDENCIES

- node.js

- firejail-for sandbox

- express- http server

- pg- shared database with website

## SETUP

-git clone the repo

```git clone <url>```

- install firejail

```sudo apt-get install firejail```

- make sure you have node.js installed

- add dependencies

```npm install --save express```

```npm install --save pg```

## EXECUTION

- start psql server, config its details in db.js

- to run server

```node index.js```