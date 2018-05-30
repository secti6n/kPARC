/$q b.Q -s 16
\l taq
.Q.MAP[]
D:(1|system"s")#date

S:asc 100#idesc exec count i by sym from select sym from trade where date=first D

\t {select last bid by sym from quote where date=x,sym in S}peach D
\t {select max price by sym,ex from trade where date=x,sym in S}peach D
\t {select sum size by sym,time.hh from trade where date=x,sym in S}peach D
\t {select from aj[`time;select time,price from trade where date=x,sym=`CSCO;select time,bid from quote where date=x,sym=`CSCO]where price<bid}peach D

