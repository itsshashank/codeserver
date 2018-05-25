
#!/bin/bash
#TODO
#before compile check if already exist
cd $4
jaexe() {
    javac $1
    local file=${1/.java*/}
    echo "java $file"
}

cexe(){
    gcc -lm $1
    echo "./a.out"
}

cppexe(){
    g++ -lm $1
    echo "./a.out"
}

python3exe(){
    echo "python3 $1"
}

case $1 in
    java)
        execu=$(jaexe $2)
        t=4
        ;;
    python3)
        execu=$(python3exe $2)
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