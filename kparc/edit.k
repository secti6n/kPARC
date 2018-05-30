c::a$"\n"         / cuts
b::0,1+c          / begins
d::(#c),|/-':b    / dims
i::x,j-b x:b'j    / x y
j::*|k            / insertion(from interval k)
s::i&s|i-w-2      / scroll
f:""              / findstring
g::a$f            / find intervals

J:{c[x]&y+b x}                  / j from x y
K:{k::2#0|x&-1+#a}              / k interval set
L:{K(;|\(*k),)[H]x}             / k set j
M:{L@J/0|x&d-1}                 / k set x y
S:{s::0|x&d-w}                  / s set
E:{a::?[a;x;y];K(*x)+#y}        / a edit
U:{u,:,(+\(*k),#x;*k_a);E[k]x}  / u undo update and edit

/ callbacks
lx:{L j+x}        / left right
ux:{M i+x,0}      / up down
hx:{M i+d*x}      / home end
mx:{M s+_x%F}     / mouse
px:{S s+w*x}      / page up down
wx:{S s+4*x}      / wheel up down

kx:kr:U                      / key and return
kb:{$[=/k;K j-1 0;];U""}     / backspace
co:{A@0'""}                  / ^Open
cs:{n::$[#n;n;0'""]1:a;r::a} / ^Save
cd:{K j+!2;U""}              / ^Delete
cf:{cg f::0'"^"}             / ^Find
cg:{K(g,1#g)1+g'k}           / ^Getnext
cz:{$[#u;E/_`u;]}            / ^Zundo

cx:{U cc`}                   / ^X/cut
cc:{9'*k_a}                  / ^C/copy
cv:{U@9'`}                   / ^V/paste

/ initialize text(a) name(n)
A:{r::a::$[#x;1:x;,"\n"];n::x;K@#u::()}
A@*x

q::n 9'a         / syntax coloring

w::_W%F          / window
x::(r~a)_"*",n   / title
y::F*i-s         / caret

/ draw bars and text
z::(2'(0;W;F*s;F*d);1'0,(a x;q[x]|/7 4 4*~(k'x;2!(,/g)'x;^(j 9'a)?x:J\:/s+!:'1+w)))
