\l view.k

/key(return back ^delete) 
kx:kr:{u,:,(j,j+#x;*k_a);e[k]x};kb:{$[=/k;J j-1 0;];kx""};cd:{J j+!2;kx""}

/edit(undo cut paste)
e:{a::?[a;x;y];J(*x)+#y};cz:{$[#u;e/_`u;]};cx:{kx cc`};cv:{kx@9'`}

/save
cs:{n::$[#n;n;0'""]1:a;r::a}
