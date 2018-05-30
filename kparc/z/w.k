/ countgroup load words
w@:=#:'w:0:"/a/k/w.txt"
 
J:{(<':x)||<':|x:~^x}
E:{-1_&~(-1 1+b y)'0,b:+\^x}
F:{x E[x]y}

/ b(board) c(touch) d(letters)
a:"qusevir"
b:+("   zest        ";"     c         ";"a    am        ";"x    month     ";"l    pi        "
    "i     e        ";"khat  t        ";"e roadie   a   ";"      e    r   ";"      sandiest "
    "           i   ";"           club";"               ";"               ";"               ")

f:{$[&/^x;y;y@&y sm"?"|x]}
d:+{@[x;i;:;{$[2>#r:(f[x]w@#x)[;*<x];r;"[",r,"]"]}'F[x]'i:&J x]}'+b
c:(J'b)|+J'+b

/ word and letter Triples and Doubles
t:("   T  t ";"  d  D  ";" d  d   ";"T  t   D";"  d   d ";" D   t  ";"t   d   ";"   D    ")
t:2{+x,1_|x}/t;u:2 3 1"dt"?t;t:2 3 1"DT"?t

/ letter values
V:("0144214331:514214:11125483:"-"0")32!

/ score
S:{m:^b[x]y;s:(*/1|m*t[x]y)*+/(1|m*u[x]y)*V z;s++/t[x;y]*(u[x;y]*V z i)++/'V(+b)[y@:i:&`a>@:'d[x]y]F'x}

W:{x@&x in w@#*x}
H:{+((35*7=#z)+S[y;j]'r;y;*j;r:(W@@[a;&^a;:;]';)[k]f[,/d[y]z]x k:(#z)=#a@:j:E[a:b y](*z;*|z))}
G:{$[#i@:(&(x|/':c[z]i)>x|/':""~/:d[z]i:&^b z)+\:!x;,/H[y;z]'i;()]}

/ brute force all rows all cols
R:{,/G[x;1 W\{$[7>#a;,/(a,/:"abcdefghijklmnopqrstuvwxyz")[;x];a x]}cmb[-x]7]'!15}

/ 1 through 7 letters
\t x@:>x:,/R'1+!7
5#x

