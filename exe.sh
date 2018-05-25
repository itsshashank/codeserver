#TODO
#before compile check if already exist
function javaexe(){
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
for i in $(seq 0 $3)
do
    out=$(time firejail --quiet --net=none --private=$4 timeout ${t}s $execu<$i.txt)
    echo "$out">$i.out
done