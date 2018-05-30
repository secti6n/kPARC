/http://www.cs50.net/psets

/pset1
isbn:{~11!+/(1+!10)*10&x-"0"};isbn"080442957X"
chng:{+/@[x;1;_.5*1+(x:5 5 5\x)1]};chng 41
draw:{{-80$x#"*"}'(&24-x),2+!x}
/""0:,/draw 3

/pset2
a:&"@"<;r:{`c$b+26!y+x-b:"aA"x<"a"}
csr:{@[y;a y;r;x]};csr[13]"Be sure to drink your Ovaltine!"
ven:{@[y;a y;r;32!-1+(#a y)#x]};ven["FOOBAR"]"HELLO, WORLD"
old:{`one`two`three{("";"he played ",$x;"on my ",$y;"knick knack";"this old man")}'`thumb`shoe`knee}
/""0:,/old[]

/pset3
x:|$[2!m:*/d:2#n:3;!m;0 2 1,3_!m];p:{$[^x?t:. 0'"tile:";p x;t]}
f:{""0:,/'3$$t:d#x;t:,/0N,'t;@[x;i;:;|x i:x?0,p t(t?0)+,/-:\1,n+1]}
/(~(m!1+!m)~)f/x


/
pset4 sudoku
b:13 25;ei:{i::40;-b};ek:{r,:,3/_(r:!9 9)%3;$[^v[&|/r=r[;i]]?x;v[i]:x;]};eu:{i::81!i+-9 9 1 -1 x}
f:{1 2*1+x+_(x:9 9\x)%3};d:{1'f i;2''+(!#x;x:b#@[,/13#25#'"+|||",'7#'"-   ";b/f j;:;v j:&"0"<v])}
v:"200370009009200007001004002050000800008000900006000040900100500800007600400089001"
\

/
pset5 *.bmp[2file 18w 22h 34image]
d:"pset5/",;a[36_&2>3!!#a:1:d"clue.bmp"]:0x0;d["a.bmp"]1:a
f:{p:4*-4!3+;r:,/:/x#',:';@[54#y;i;:;1:x*d],r@(p[x*w]#r 0N 3#w#)'(0N;p w:3**d:0x0/0N 2#y i:18+!8)#54_y};d["s.bmp"]1:f[3]@1:d"smiley.bmp"
/x:,/'(&0xffd8ff~/3#'x)_x:0N 512#1:d"card.raw";n:(1_'$1000+!#x),\".jpg"
\

/pset6
d:0:"w.txt";w:{(&(>':b)i)_x i:&b:~"a{"bin x}
\t m:x@&^d?x:w@_1000#1:"kj.txt"
"words: ",($#x)," misspellings: ",$#m
