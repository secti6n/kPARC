/ http://challenge.greplin.com

/ longest substring match reverse
a:"..oranynartionso..struggledherehaveconsec..increaseddevotion.."
/{{x~|x}#x':a}'4+!6

/ sum prime factors of 1+firstprimefib > 227000
f:{$[x<4;,2;r,1_x^r*!:'-_-x%r:f@-_-%x]};p:f 1000000  / primes<x
+/p*~p!\:1+*{227000>*x*(x:*x)in p}(|+\)/1 1

/ count subsets with max=sum remaining x:1 2 3 4 6
x:3 4 9 14 15 19 28 37 47 50 54 56 59 61 70 73 78 81 92 95 97 99
+/-1+(1{(y,x)+x,y:&y}/x)x

\
/other solutions:
+/(2*|/s)=+/s:x*!2+&#x
+/(2*|/'s)=+/'s:(,!0){x,x,'y}/x

