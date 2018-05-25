#must run the evaluation code and 
set -o xtrace
function javaexe(){
    #javaexe filename
    javac $1
    local file=${1/.java*/}
    echo "java $file"
}

function cexe(){
    gcc -lm $1
    echo "./a.out"
}

function cppexe(){
    g++ -lm $1
    echo "./a.out"
}

function pythonexe(){
    echo "python3 $1"
}

case $1 in
    java)
        execu=$(javaexe $2)
        t=4
        ;;
    python3)
        execu=$(pythonexe $2)
        t=10
        ;;
    cpp)
        execu=$(cppexe $2)
        t=2
        ;;
    c)
        execu=$(cexe $2)
        t=2
        ;;
    *)
        echo "invalid language!"
        exit
        ;;
    esac
tmp="<a.txt"
exe="$execu $tmp"
time firejail --net=none --private=$(pwd) timeout ${t}s $exe
