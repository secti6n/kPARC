/ sparse matrix multiply (matrix table dict)

tf:{select x:y,y:x,z from x}
tt:{select z$v by x,y from(+`x`a`v!.+x;+`a`y`z!.+y)}

/select x.z$y.z by x.x,y.y from x,y where x.y=y.x
/select x.z$y.z by x.x,y.y from (x;y)on x.y=y.x

tm:{+`x`y`z!(&#:'i;,/i;,/x@'i:(&~0=)'x)}
mt:{./[(1+|/'x)#0**v;+x@:`x`y;v:(x:+x)`z]}

u:tf t:tm m:(2 0;1 3;0 1)
u:tf t:+`x`y`z!("iif";",")0:"a1.csv"
\t tt[t;u]

dt:{. exec y!z by x from x}
td:{+`x`y`z!+,/(!#x),''{(!x),'. x}'x}
df:{dt tf td x}
e:df d:dt t
\t d$e



