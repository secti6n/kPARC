/ http://inferno.bell-labs.com/cm/cs/who/bwk/interps/pap.html
\cd /a/k/z

/ one million increments on initial state 0
i:0
\t:1000000 i+:1

/ ackermann's
\t:70 a:{$[x;a[x-1;$[y;a[x;y-1];1]];y+1]};a[3;4]

/ array indexed forwards and backwards
\t x(x;|x:!200000)

/ while(x>count string) join chop join ... on "abcdef"
\t:10 f:{$[500000>#x;f(i_x),(1+i:_.5*#x)#x:,/("123";x;"456";x;"789");x]};f"abcdef"

/ lookup hex strings in decimal strings
\t {+/^("0123456789abcdef"@16\'!x)?$!x}200000

f:"kj.txt"
f2:"f2.txt"
f2 0:$100000#-123.456; /numbers

/ write read file
\t f 0:0:f

/ (lines;words;chars) file
\t (#x;+/(+/>':~^:)'x:`\x;#x:1:f)

/ write reverse read file
\t f2 0:|0:f2

/ sum float-from-ascii file
\t +/"f"$0:f2

\
/ approximate times on 100MHZ pentium
t:( 2   10    .15  2.2  1  3.5  3.2   4   5.7 /k
     .3  1    .8   5   25 80   50   125  15 /java
    3   40   8     1    6  4   15     8  10. /perl
  100 1000 100    20   12 80   15    70  50.  ) /tcl
+/'t


the 9 tests are loops, text-processing and text file io.

even though k avoids all these
 loops - rare, e.g. none in kdb+.
 text  - we prefer data. binary is better.
 stdio - we prefer mmap to read/write.

k is faster (sum of times)
 k(32) perl(95) java(300) tcl(1400+)

k is shorter (lines of code)
 k(9) awk(66) perl(96) tcl(105) scheme(170) vb(200) java(350)

