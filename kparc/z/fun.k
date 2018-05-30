/life
a:{3=s-x&4=s:2(+-1+/':)/x}
x:4$(" *";"  *";"***";"") /glider
` 0:'" *"4 a\"*"=x;       /glide4

/fibonacci
f:|+\
5 f\1 1

/euclid
e:|!\
3 e\24 40

/collatz
c:(~2!)(-2!)/1+3*
c\'1+2*!4

/permutations
n:{?<:'+!x#x}          / brute odometer
o:(>,)/'+!1+!:         / modify odometer 
p:(,/@\:)/,\(,<<:)'=:  / iterate
p 3

/combinations
b:(&/>':)#+!#                      / brute odometer
c:{|,/x(y,''1+,\)/+,+,y:|!y-x-:1}  / iterate
c[2;5]

/sieve
x,1_&&/80#'!:'x:2 3 5 7

/graph traverse ^':{?x,/a x}\
a:(,/p)@=,/|p:+(`a`b;`b`c;`c`d;`d`e;`c`f;`a`w;`d`w) / pair programmers
(,/n)!&#:'n:^':{?x,/a x}\,`w                        / ward/erdos number

\

http://c2.com/cgi-bin/wiki?WardNumberInManyProgrammingLanguages

