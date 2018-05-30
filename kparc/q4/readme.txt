4 queries on trillion row nyse taq data. http://kparc.com/q4/q4.txt

SUMMARY

q is 10 times faster than other COLSTORE (and 100 times faster than ROWSTORE).
q has much lower overhead(10-1000 times faster) and much less RAM use (10 times). 
q scales better. q uses ssd and dsk better. (better locality)

SMALL day (40Million rows) times in milliseconds.

                Q1      Q2      Q3      Q4   RAM(GB)    ETL   DSK(GB)
q               17      12      36       3      .2       40      1.0

COLSTORE
vertical       500     140     150    8900     2.1       52       .5
greenplum     4600     180     200     DNF     5.5       73      4.6
impala        4800    1190    1000     DNF     4.0       22       .3
big3accel     4200    1600    2300     DNF     3.4       20      1.0  

ROWSTORE
postgres      7100    1500    1900     DNF     1.5      200      4.0
big3rdbms     6400    2200    3100     DNF     5.0       60      2.0  
mongodb       8900    1700    5800     DNF     9.0      922     10.0   
spark/shark  34000    7400    8400     DNF    50.0      156      2.4

RAM is memory usage for queries. in all cases all query data is cached in RAM (no disk access).
ETL is seconds to load 2003.09.10 (34M quotes and 5M trades) and index on sym. (partition on date)
OVERHEAD is milliseconds for fast query, e.g. q can do 100,000 different queries per second per cpu.
most database software thrash on Q1 and cannot do Q4 (asof join) on big tables. DNF is did not finish.

SCALE UP  (640Million rows: 1 big day)

q              290      33     130      29
impala       45000    2250    1880     DNF
greenplum    56000     900    1000     DNF

SCALE OUT (10Billion rows: 16 big days)

q              820      70     180      70
impala    10000000   18000   27000     DNF



