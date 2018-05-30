/ smallest to the right that is >=
x:8 2 4 1 6 0 5 3 7 9
/ 9 3 5 3 7 3 7 7 9 0N

r:{x?1+x:<<x} / next rank

x?:-x:-10000

/ O(n*n)
f1:{{&/x@&x>*x}':(!#x)_\:x}
f2:{{&/y@&y>*y_:x}[x]':!#x}

/ O(n*log n) atom
f0:{x@{(y>)x/x y}[r x]':!#x}

/ O(n*log n) vector
g0:{x@{y x&y}[!#x]/r x}
g1:{x@{@[y;x;:;y y x:&x>y]}[!#x]/r x}
g2:{x@*|{y[x]:y y x@:&x>y x;(x;y)}//(!#x;r x)}
g3:{{#x}{n[x]:n n x@:&x>n x;x}/!#n::r x;x n}
g4:{i::!#x;x{#i}{x[i]:x x i@:&i>x i;x}/r x}

`0:{x," ",$."\\t:100 ",x," x"}'$`g0`g1`g2`g3`g4;

  