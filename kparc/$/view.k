/a(data) b(begin) c(cut) d(dimension) e(edit) f(find) g(finds) i(insert) 
/j(index) k(select) n(name) q(syntax) s(scroll) t(text) u(undo) w(window)
c::a$"\n";b::0,1+c;d::(#c),|/-':b;i::x,j-b x:b'j;h:{c[x]&y+b x};j::*|k
t::(a x;q[x]|/7 4 4*~(k'x;2!(,/g)'x;^(j 9'a)?x:h\:/s+!:'1+w));q::n 9'a

J:{k::2#0|x&-1+#a};s::i&s|i-w-2;S:{s::0|x&d-w};px:{S s+w*x};wx:{S s+4*x}
l:{h/0|x&d-1};f:"";g::a$,f;cf:{cg f::0'"^"};cg:{J(g,1#g)1+g'k};cc:{9'*k_a}
K:{J$[H;|\(*k),x;x]};lx:{K j+x};ux:{K l i+x,0};hx:{K l i+d*x};mx:{K l s+_x%F}

A:{r::a::$[#x;1:x;,"\n"];n::x;J@#u::()};co:{A@0'""};cs:{n::$[#n;n;0'""]1:a;r::a}
A@*x;w::_W%F;x::(r~a)_"*",n;y::F*i-s;z::(2'(0;W;F*s;F*d);1'0,t)






