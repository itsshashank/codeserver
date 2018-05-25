/*
executing program
time firejail --net=none --private=<folder> timeout <time in seconds>s <command to execute>

command to execute depends on language
python3 -python3 filename

java-
javac filename.java
java classname <-this in firejail

c++/c-
g++ -lm filename /gcc -lm filename
./a.out <-this in firejail
*/
'use strict';

let cli=require("child_process");

exports=function execute(filename,cwd,)
{

}
