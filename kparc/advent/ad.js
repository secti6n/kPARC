var window = { AdventOfCode: {} };
window.AdventOfCode.Day10 = function (input) {
	var nextInput = '';
	var fortyLength = 0;

	for (var x = 0; x < 40; x++) {
		var currentDigit = input[0];
		var currentCount = 0;

		for (var i = 0; i < input.length; i++) {
			if (currentDigit != input[i]) {
				nextInput += currentCount + '' + currentDigit;
				currentDigit = input[i];
				currentCount = 1;
			} else {
				currentCount++;
			}
		}

		nextInput += currentCount + '' + currentDigit;
		input = nextInput;
		nextInput = '';
	}

	return [input.length, 0];
};
window.AdventOfCode.Day11 = function (input) {
	var increase = /(abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/;
	var repeat = /(.)\1.*(.)\2/; // BUG: this will match same repeating letters
	var illegal = /[iol]/;
	var answers = [];

	while (true) {
		input = (parseInt(input, 36) + 1).toString(36).replace(/0/g, 'a');

		if (!illegal.test(input) && increase.test(input) && repeat.test(input)) {
answers=answers.concat([input]);if(answers.length==2)return answers;}}
};
window.AdventOfCode.Day12 = function (input) {
	input = JSON.parse(input);

	var SumAllNumbers = function SumAllNumbers(input, skip) {
		var result = 0;

		if (typeof input === 'object') {
			if (!Array.isArray(input)) {
				var keys = Object.keys(input);
				var dirtyResult = [];

				for (var i = 0; i < keys.length; i++) {
					var value = input[keys[i]];

					// Ignore any object (and all of its children) which has any property with the value "red".
					if (value === skip) {
						return 0;
					}

					dirtyResult.push(value);
				}

				input = dirtyResult;
			}

			result = input.reduce(function (a, b) {
				return a + SumAllNumbers(b, skip);
			}, 0);
		} else if (typeof input === 'number') {
			result = input;
		}

		return result;
	};

	var answers = [SumAllNumbers(input, 'kebab'), SumAllNumbers(input, 'red')];

	return answers;
};
'use strict';

window.AdventOfCode.Day13 = function (input) {
	var permutator = function permutator(inputArr) {
		var results = [];

		function permute(arr, memo) {
			var cur;memo = memo || [];

			for (var i = 0; i < arr.length; i++) {
				cur = arr.splice(i, 1);
				if (arr.length === 0) {
					results.push(memo.concat(cur));
				}
				permute(arr.slice(), memo.concat(cur));
				arr.splice(i, 0, cur[0]);
			}

			return results;
		}

		return permute(inputArr);
	};

	// Silly javascript quirks
	var mod = function mod(n, m) {
		return (n % m + m) % m;
	};

	input = input.replace(/\./g, '').split('\n');
	var travelPaths = {};
	var cities = {};

	for (var i = 0; i < input.length; i++) {
		var data = input[i].split(' ');

		if (!cities[data[0]]) {
			cities[data[0]] = true;
			travelPaths[data[0]] = {};
		}

		travelPaths[data[0]][data[10]] = data[2] === 'lose' ? -data[3] : +data[3];
	}

	cities = Object.keys(cities);

	var CalculateHappiness = function CalculateHappiness() {
		var permuted = permutator(cities);
		var bestHappiness = 0;

		for (var i = 0; i < permuted.length; i++) {
			var distance = 0;

			for (var x = 0; x < cities.length; x++) {
				distance += travelPaths[permuted[i][x]][permuted[i][mod(x - 1, cities.length)]];
				distance += travelPaths[permuted[i][x]][permuted[i][mod(x + 1, cities.length)]];
			}

			if (bestHappiness < distance) {
				bestHappiness = distance;
			}
		}

		return bestHappiness;
	};

	var answerOne = CalculateHappiness();

	travelPaths['You'] = {};

	for (i = 0; i < cities.length; i++) {
		travelPaths[cities[i]]['You'] = 0;
		travelPaths['You'][cities[i]] = 0;
	}

	cities.push('You');

	var answerTwo = CalculateHappiness();

	return [answerOne, answerTwo];
};
'use strict';

window.AdventOfCode.Day14 = function (input) {
	var seconds = 2503;

	input = input.split('\n').map(function (a) {
		var match = a.match(/^(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/);

		return {
			speed: +match[2],
			time: +match[3],
			mustRest: +match[4],
			travellingFor: 0,
			distance: 0,
			resting: 0,
			points: 0
		};
	});

	var farthestDeer = 0;
	var mostPoints = 0;

	while (seconds-- > 0) {
		var i,
		    deer,
		    leading = 0;

		for (i = 0; i < input.length; i++) {
			deer = input[i];

			if (deer.resting) {
				deer.resting--;
			} else {
				deer.distance += deer.speed;

				if (++deer.travellingFor === deer.time) {
					deer.resting = deer.mustRest;
					deer.travellingFor = 0;
				}
			}

			if (leading < deer.distance) {
				leading = deer.distance;
			}
		}

		for (i = 0; i < input.length; i++) {
			deer = input[i];

			if (deer.distance === leading) {
				deer.points++;
			}

			if (!seconds) {
				if (farthestDeer < deer.distance) {
					farthestDeer = deer.distance;
				}

				if (mostPoints < deer.points) {
					mostPoints = deer.points;
				}
			}
		}
	}

	return [farthestDeer, mostPoints];
};
'use strict';

window.AdventOfCode.Day15 = function (input) {
	input = input.split('\n').map(function (a) {
		var b = a.match(/.+: .+ (-?\d+), .+ (-?\d+), .+ (-?\d+), .+ (-?\d+), .+ (-?\d+)/);

		return [+b[1], +b[2], +b[3], +b[4], +b[5]];
	});

	var totalScore = 0;
	var totalScore500 = 0;

	for (var a = 0; a <= 100; a++) for (var b = 0; b <= 100 - a; b++) for (var c = 0; c <= 100 - a - b; c++) {
		var d = 100 - a - b - c;

		var cap = input[0][0] * a + input[1][0] * b + input[2][0] * c + input[3][0] * d;
		var dur = input[0][1] * a + input[1][1] * b + input[2][1] * c + input[3][1] * d;
		var fla = input[0][2] * a + input[1][2] * b + input[2][2] * c + input[3][2] * d;
		var tex = input[0][3] * a + input[1][3] * b + input[2][3] * c + input[3][3] * d;
		var cal = input[0][4] * a + input[1][4] * b + input[2][4] * c + input[3][4] * d;

		if (cap <= 0 || dur <= 0 || fla <= 0 || tex <= 0) {
			continue;
		}

		var score = cap * dur * fla * tex;

		if (totalScore < score) {
			totalScore = score;
		}

		if (totalScore500 < score && cal === 500) {
			totalScore500 = score;
		}
	}

	return [totalScore, totalScore500];
};
'use strict';

window.AdventOfCode.Day16 = function (input) {
	var thingsYouRemember = {
		children: '3',
		cats: '7',
		samoyeds: '2',
		pomeranians: '3',
		akitas: '0',
		vizslas: '0',
		goldfish: '5',
		trees: '3',
		cars: '2',
		perfumes: '1'
	};

	input = input.replace(/[,:]/g, '').split('\n').map(function (aunt) {
		return aunt.split(' ');
	});

	var dayOne = input.filter(function (aunt) {
		return thingsYouRemember[aunt[2]] == aunt[3] && thingsYouRemember[aunt[4]] == aunt[5] && thingsYouRemember[aunt[6]] == aunt[7];
	});

	var filterPartTwo = function filterPartTwo(what, count) {
		if (what === 'cats' || what === 'trees') {
			return thingsYouRemember[what] < count;
		}

		if (what === 'pomeranians' || what === 'goldfish') {
			return thingsYouRemember[what] > count;
		}

		return thingsYouRemember[what] == count;
	};

	var dayTwo = input.filter(function (aunt) {
		return filterPartTwo(aunt[2], aunt[3]) && filterPartTwo(aunt[4], aunt[5]) && filterPartTwo(aunt[6], aunt[7]);
	});

	return [dayOne[0][1], dayTwo[0][1]];
};
// https://github.com/dankogai/js-combinatorics
"use strict";

(function (h, l) {
	global.Combinatorics = l();
})(undefined, function () {
	var h = function h(b, a) {
		var c,
		    d = 1;b < a && (c = b, b = a, a = c);for (; a--;) d *= b--;return d;
	},
	    l = function l(b, a) {
		return h(b, a) / h(a, a);
	},
	    t = function t(b) {
		return h(b, b);
	},
	    u = function u(b, a) {
		var c = 1;if (a) c = t(a);else {
			for (a = 1; c < b; c *= ++a);c > b && (c /= a--);
		}for (var d = [0]; a; c /= a--) d[a] = Math.floor(b / c), b %= c;return d;
	},
	    f = function f(b, a) {
		Object.keys(a).forEach(function (c) {
			Object.defineProperty(b, c, { value: a[c] });
		});
	},
	    g = function g(b, a) {
		Object.defineProperty(b, a, { writable: !0 });
	},
	    n = function n(b) {
		var a,
		    c = [];for (this.init(); a = this.next();) c.push(b ? b(a) : a);this.init();return c;
	},
	    m = { toArray: n, map: n, forEach: function forEach(b) {
			var a;for (this.init(); a = this.next();) b(a);this.init();
		}, filter: function filter(b) {
			var a,
			    c = [];for (this.init(); a = this.next();) b(a) && c.push(a);this.init();return c;
		} },
	    q = function q(b, a, c) {
		a || (a = b.length);if (1 > a) throw new RangeError();if (a > b.length) throw new RangeError();var d = (1 << a) - 1,
		    e = l(b.length, a),
		    p = 1 << b.length;
		a = function () {
			return e;
		};b = Object.create(b.slice(), { length: { get: a } });g(b, "index");f(b, { valueOf: a, init: function init() {
				this.index = d;
			}, next: function next() {
				if (!(this.index >= p)) {
					for (var b = 0, a = this.index, c = []; a; a >>>= 1, b++) a & 1 && c.push(this[b]);a = this.index;b = a & -a;a += b;this.index = a | ((a & -a) / b >> 1) - 1;return c;
				}
			} });f(b, m);b.init();return "function" === typeof c ? b.map(c) : b;
	},
	    r = function r(b) {
		b = b.slice();var a = t(b.length);b.index = 0;b.next = function () {
			if (!(this.index >= a)) {
				for (var b = this.slice(), d = u(this.index, this.length), e = [], p = this.length - 1; 0 <= p; --p) e.push(b.splice(d[p], 1)[0]);this.index++;return e;
			}
		};return b;
	},
	    v = function v(b) {
		for (var a = 0, c = 1; c <= b; c++) var d = h(b, c), a = a + d;return a;
	},
	    w = Array.prototype.slice,
	    n = Object.create(null);f(n, { C: l, P: h, factorial: t, factoradic: u, cartesianProduct: function cartesianProduct() {
			if (!arguments.length) throw new RangeError();var b = w.call(arguments),
			    a = b.reduce(function (b, a) {
				return b * a.length;
			}, 1),
			    c = function c() {
				return a;
			},
			    d = b.length,
			    b = Object.create(b, { length: { get: c } });if (!a) throw new RangeError();g(b, "index");f(b, { valueOf: c, dim: d, init: function init() {
					this.index = 0;
				}, get: function get() {
					if (arguments.length === this.length) {
						for (var b = [], a = 0; a < d; a++) {
							var c = arguments[a];if (c >= this[a].length) return;b.push(this[a][c]);
						}return b;
					}
				}, nth: function nth(a) {
					for (var b = [], c = 0; c < d; c++) {
						var f = this[c].length,
						    g = a % f;b.push(this[c][g]);a -= g;a /= f;
					}return b;
				}, next: function next() {
					if (!(this.index >= a)) {
						var b = this.nth(this.index);this.index++;return b;
					}
				} });f(b, m);b.init();return b;
		}, combination: q, permutation: function permutation(b, a, c) {
			a || (a = b.length);if (1 > a) throw new RangeError();if (a > b.length) throw new RangeError();
			var d = h(b.length, a),
			    e = Object.create(b.slice(), { length: { get: function get() {
						return d;
					} } });g(e, "cmb");g(e, "per");f(e, { valueOf: function valueOf() {
					return d;
				}, init: function init() {
					this.cmb = q(b, a);this.per = r(this.cmb.next());
				}, next: function next() {
					var a = this.per.next();if (!a) {
						a = this.cmb.next();if (!a) return;this.per = r(a);return this.next();
					}return a;
				} });f(e, m);e.init();return "function" === typeof c ? e.map(c) : e;
		}, permutationCombination: function permutationCombination(b, a) {
			var c = v(b.length),
			    d = Object.create(b.slice(), { length: { get: function get() {
						return c;
					} } });g(d, "cmb");
			g(d, "per");g(d, "nelem");f(d, { valueOf: function valueOf() {
					return c;
				}, init: function init() {
					this.nelem = 1;this.cmb = q(b, this.nelem);this.per = r(this.cmb.next());
				}, next: function next() {
					var a = this.per.next();if (!a) {
						a = this.cmb.next();if (!a) {
							this.nelem++;if (this.nelem > b.length) return;this.cmb = q(b, this.nelem);a = this.cmb.next();if (!a) return;
						}this.per = r(a);return this.next();
					}return a;
				} });f(d, m);d.init();return "function" === typeof a ? d.map(a) : d;
		}, power: function power(b, a) {
			var c = 1 << b.length,
			    d = function d() {
				return c;
			},
			    e = Object.create(b.slice(), { length: { get: d } });
			g(e, "index");f(e, { valueOf: d, init: function init() {
					e.index = 0;
				}, nth: function nth(a) {
					if (!(a >= c)) {
						for (var b = 0, d = []; a; a >>>= 1, b++) a & 1 && d.push(this[b]);return d;
					}
				}, next: function next() {
					return this.nth(this.index++);
				} });f(e, m);e.init();return "function" === typeof a ? e.map(a) : e;
		}, baseN: function baseN(b, a, c) {
			a || (a = b.length);if (1 > a) throw new RangeError();var d = b.length,
			    e = Math.pow(d, a),
			    h = function h() {
				return e;
			},
			    k = Object.create(b.slice(), { length: { get: h } });g(k, "index");f(k, { valueOf: h, init: function init() {
					k.index = 0;
				}, nth: function nth(c) {
					if (!(c >= e)) {
						for (var f = [], g = 0; g < a; g++) {
							var h = c % d;f.push(b[h]);c -= h;c /= d;
						}return f;
					}
				}, next: function next() {
					return this.nth(this.index++);
				} });f(k, m);k.init();return "function" === typeof c ? k.map(c) : k;
		}, VERSION: "0.5.0" });return n;
});

window.AdventOfCode.Day17 = function (input) {
	input = input.split('\n').map(Number);

	var smallestAmountRequired = Number.MAX_VALUE;
	var partOne = Combinatorics.power(input).filter(function (list) {
		var sum = list.reduce(function (a, b) {
			return a + b;
		}, 0);

		if (sum === 150) {
			if (smallestAmountRequired > list.length) {
				smallestAmountRequired = list.length;
			}

			return true;
		}

		return false;
	});

	var partTwo = partOne.filter(function (a) {
		return a.length === smallestAmountRequired;
	});

	return [partOne.length, partTwo.length];
};
'use strict';

window.AdventOfCode.Day18 = function (input) {
	input = input.split('\n').map(function (row) {
		row = row.split('').map(function (cell) {
			return cell === '#';
		});

		row.unshift(0);
		row.push(0);

		return row;
	});

	var size = input.length;

	input.unshift([]);
	input.push([]);

	function countNeighbors(grid, x, y) {
		var count = 0;

		for (var y1 = y - 1; y1 < y + 2; y1++) {
			for (var x1 = x - 1; x1 < x + 2; x1++) {
				if ((x1 != x || y1 != y) && grid[x1][y1]) {
					count += 1;
				}
			}
		}

		return count;
	}

	function nextGeneration(grid) {
		var newGrid = [];

		for (var y = 1; y <= size; y++) {
			newGrid[y] = [];

			for (var x = 1; x <= size; x++) {
				var neighbors = countNeighbors(grid, y, x);

				newGrid[y][x] = neighbors === 3 || neighbors === 2 && grid[y][x];
			}
		}

		newGrid[0] = [];
		newGrid[size + 1] = [];

		return newGrid;
	}

	var inputPartTwo = JSON.parse(JSON.stringify(input));

	for (var i = 0; i < 100; i++) {
		input = nextGeneration(input);
		inputPartTwo = nextGeneration(inputPartTwo);

		inputPartTwo[1][1] = 1;
		inputPartTwo[1][size] = 1;
		inputPartTwo[size][1] = 1;
		inputPartTwo[size][size] = 1;
	}

	var partOne = 0;
	var partTwo = 0;

	for (i = 1; i <= size; i++) {
		for (var y = 1; y <= size; y++) {
			partOne += input[i][y];
			partTwo += inputPartTwo[i][y];
		}
	}

	return [partOne, partTwo];
};
'use strict';

window.AdventOfCode.Day19 = function (input) {
	input = input.split('').reverse().join('').split('\n');

	var molecule = input.shift();
	input.shift(); // empty line

	input = input.map(function (a) {
		return a.split(' >= ');
	});

	var uniqueNewMolecules = {};
	var i, y;

	for (i = 0; i < molecule.length; i++) {
		for (y = 0; y < input.length; y++) {
			if (molecule.substr(i, input[y][1].length) === input[y][1]) {
				uniqueNewMolecules[molecule.slice(0, i) + input[y][0] + molecule.slice(i + input[y][1].length)] = true;
			}
		}
	}

	var steps = 0;
	var lookup = {};
	var replaced = false;

	input = input.map(function (a) {
		lookup[a[0]] = a[1];

		return a[0];
	});

	var regexp = new RegExp('(' + input.join('|') + ')', 'g');
	var replaceCallback = function replaceCallback(matched) {
		replaced = true;

		steps++;

		return lookup[matched];
	};

	do {
		replaced = false;
		molecule = molecule.replace(regexp, replaceCallback);
	} while (replaced);

	return [Object.keys(uniqueNewMolecules).length, steps];
};
'use strict';

window.AdventOfCode.Day1 = function (input) {
	var floor = 0;
	var position = -1;

	// Santa starts on the ground floor (floor 0) and then
	// follows the instructions one character at a time.
	for (var i = 0; i < input.length; i++) {
		// An opening parenthesis, (, means he should go up one floor.
		if (input[i] === '(') {
			floor++;
		}
		// A closing parenthesis, ), means he should go down one floor.
		else {
				floor--;
			}

		// Now, given the same instructions, find the position of the first
		// character that causes him to enter the basement (floor -1).
		// The first character in the instructions has position 1,
		// the second character has position 2, and so on.
		if (floor === -1 && position < 0) {
			// ) causes him to enter the basement at character position 1.
			// ()()) causes him to enter the basement at character position 5.
			// This is 1-indexed.
			position = i + 1;
		}
	}

	return [floor, position];
};
"use strict";

window.AdventOfCode.Day20 = function (input) {
	input = +input;

	var i, j;
	var n = 1E6; // Assume no one got input that produced an answer higher than 1mil
	var houses = {};
	var housesPartTwo = {};

	for (i = 1; i < n; i++) {
		for (j = i; j < n; j += i) {
			houses[j] = (houses[j] || 0) + i * 10;

			if (houses[j] >= input) {
				break;
			}
		}

		var lazyElfs = 0;
		for (j = i; lazyElfs < 50; j += i) {
			housesPartTwo[j] = (housesPartTwo[j] || 0) + i * 11;

			if (housesPartTwo[j] >= input) {
				break;
			}

			lazyElfs++;
		}
	}

	for (i = 1; i < input; i++) {
		if (houses[i] >= input) {
			break;
		}
	}

	for (j = 1; j < input; j++) {
		if (housesPartTwo[j] >= input) {
			break;
		}
	}

	return [i, j];
};
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

window.AdventOfCode.Day21 = function (input) {
	'use strict';

	var Entity = (function () {
		function Entity(health, damage, armor) {
			_classCallCheck(this, Entity);

			this.Health = health;
			this.DamagePoints = damage;
			this.ArmorPoints = armor;
		}

		_createClass(Entity, [{
			key: 'TakeDamage',
			value: function TakeDamage(entity) {
				return this.Health / Math.max(1, entity.DamagePoints - this.ArmorPoints);
			}
		}]);

		return Entity;
	})();

	var Player = (function (_Entity) {
		_inherits(Player, _Entity);

		function Player() {
			_classCallCheck(this, Player);

			_get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, 100, 0, 0);

			this.Weapon = null;
			this.Armor = null;
			this.RingLeft = null;
			this.RingRight = null;
		}

		_createClass(Player, [{
			key: 'RecalculateStats',
			value: function RecalculateStats() {
				this.DamagePoints = 0;
				this.ArmorPoints = 0;

				if (this.Weapon) {
					this.DamagePoints += this.Weapon.Damage;
				}

				if (this.Armor) {
					this.ArmorPoints += this.Armor.Armor;
				}

				if (this.RingLeft) {
					this.DamagePoints += this.RingLeft.Damage;
					this.ArmorPoints += this.RingLeft.Armor;
				}

				if (this.RingRight) {
					this.DamagePoints += this.RingRight.Damage;
					this.ArmorPoints += this.RingRight.Armor;
				}
			}
		}, {
			key: 'GoldSpent',
			get: function get() {
				var gold = 0;

				if (this.Weapon) {
					gold += this.Weapon.Cost;
				}

				if (this.Armor) {
					gold += this.Armor.Cost;
				}

				if (this.RingLeft) {
					gold += this.RingLeft.Cost;
				}

				if (this.RingRight) {
					gold += this.RingRight.Cost;
				}

				return gold;
			}
		}]);

		return Player;
	})(Entity);

	var Boss = (function (_Entity2) {
		_inherits(Boss, _Entity2);

		function Boss() {
			_classCallCheck(this, Boss);

			_get(Object.getPrototypeOf(Boss.prototype), 'constructor', this).apply(this, arguments);
		}

		return Boss;
	})(Entity);

	var Item = function Item(name, cost, damage, armor) {
		_classCallCheck(this, Item);

		//this.Name = name;
		this.Cost = cost;
		this.Damage = damage;
		this.Armor = armor;
	};

	var Shop = function Shop() {
		_classCallCheck(this, Shop);

		this.Weapons = [new Item('Dagger', 8, 4, 0), new Item('Shortsword', 10, 5, 0), new Item('Warhammer', 25, 6, 0), new Item('Longsword', 40, 7, 0), new Item('Greataxe', 74, 8, 0)];

		this.Armor = [null, // Armor is optional, stored in shop for easier iteration
		new Item('Leather', 13, 0, 1), new Item('Chainmail', 31, 0, 2), new Item('Splintmail', 53, 0, 3), new Item('Bandedmail', 75, 0, 4), new Item('Platemail', 102, 0, 5)];

		this.Rings = [null, // Rings are optional, stored in shop for easier iteration
		new Item('Damage +1 ', 25, 1, 0), new Item('Damage +2 ', 50, 2, 0), new Item('Damage +3 ', 100, 3, 0), new Item('Defense +1', 20, 0, 1), new Item('Defense +2', 40, 0, 2), new Item('Defense +3', 80, 0, 3)];
	};

	var Game = (function () {
		function Game(input) {
			_classCallCheck(this, Game);

			this.Shop = new Shop();
			this.Player = new Player();
			this.Boss = new Boss(+input[0], +input[1], +input[2]);

			this.CheapestWin = Number.MAX_VALUE;
			this.CostlyLoss = 0;
		}

		_createClass(Game, [{
			key: 'Simulate',
			value: function Simulate() {
				var _this = this;

				var i = 0;

				//			for( let weapon of this.Shop.Weapons )
				this.Shop.Weapons.forEach(function (weapon) {
					_this.Player.Weapon = weapon;

					//				for( let armor of this.Shop.Armor )
					_this.Shop.Armor.forEach(function (armor) {
						_this.Player.Armor = armor;

						//					for( let ringLeft of this.Shop.Rings )
						_this.Shop.Rings.forEach(function (ringLeft) {
							_this.Player.RingLeft = ringLeft;

							//						for( let ringRight of this.Shop.Rings )
							_this.Shop.Rings.forEach(function (ringRight) {
								// Can't buy two rings of same type
								if (ringLeft === ringRight) {
									return;
								}

								_this.Player.RingRight = ringRight;

								_this.Battle();
							});
						});
					});
				});
			}
		}, {
			key: 'Battle',
			value: function Battle() {
				this.Player.RecalculateStats();

				if (this.Player.TakeDamage(this.Boss) >= this.Boss.TakeDamage(this.Player)) {
					if (this.CheapestWin > this.Player.GoldSpent) {
						this.CheapestWin = this.Player.GoldSpent;
					}
				} else if (this.CostlyLoss < this.Player.GoldSpent) {
					this.CostlyLoss = this.Player.GoldSpent;
				}
			}
		}]);

		return Game;
	})();

	var game = new Game(input.match(/([0-9]+)/g));

	game.Simulate();

	return [game.CheapestWin, game.CostlyLoss];
};
'use strict';

window.AdventOfCode.Day23 = function (input) {
	var parser = /([a-z]+) ([+-]?[a-z0-9]+)(?:, ([+-]?[0-9]+))?/;

	input = input.split('\n').map(function (a) {
		return a.match(parser);
	});

	var Execute = function Execute(startingRegister) {
		var registers = { a: startingRegister, b: 0 };
		var offset = 0;

		while (input.length > offset) {
			var instruction = input[offset];

			switch (instruction[1]) {
				// hlf r sets register r to half its current value, then continues with the next instruction.
				case 'hlf':
					registers[instruction[2]] /= 2;

					break;

				// tpl r sets register r to triple its current value, then continues with the next instruction.
				case 'tpl':
					registers[instruction[2]] *= 3;

					break;

				// inc r increments register r, adding 1 to it, then continues with the next instruction.
				case 'inc':
					registers[instruction[2]] += 1;

					break;

				// jmp offset is a jump; it continues with the instruction offset away relative to itself.
				case 'jmp':
					offset += +instruction[2] - 1;

					break;

				// jie r, offset is like jmp, but only jumps if register r is even ("jump if even").
				case 'jie':
					if (registers[instruction[2]] % 2 === 0) {
						offset += +instruction[3] - 1;
					}

					break;

				// jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).
				case 'jio':
					if (registers[instruction[2]] === 1) {
						offset += +instruction[3] - 1;
					}

					break;
			}

			offset++;
		}

		return registers.b;
	};

	return [Execute(0), Execute(1)];
};
// https://github.com/dankogai/js-combinatorics
"use strict";

(function (h, l) {
	global.Combinatorics = l();
})(undefined, function () {
	var h = function h(b, a) {
		var c,
		    d = 1;b < a && (c = b, b = a, a = c);for (; a--;) d *= b--;return d;
	},
	    l = function l(b, a) {
		return h(b, a) / h(a, a);
	},
	    t = function t(b) {
		return h(b, b);
	},
	    u = function u(b, a) {
		var c = 1;if (a) c = t(a);else {
			for (a = 1; c < b; c *= ++a);c > b && (c /= a--);
		}for (var d = [0]; a; c /= a--) d[a] = Math.floor(b / c), b %= c;return d;
	},
	    f = function f(b, a) {
		Object.keys(a).forEach(function (c) {
			Object.defineProperty(b, c, { value: a[c] });
		});
	},
	    g = function g(b, a) {
		Object.defineProperty(b, a, { writable: !0 });
	},
	    n = function n(b) {
		var a,
		    c = [];for (this.init(); a = this.next();) c.push(b ? b(a) : a);this.init();return c;
	},
	    m = { toArray: n, map: n, forEach: function forEach(b) {
			var a;for (this.init(); a = this.next();) b(a);this.init();
		}, filter: function filter(b) {
			var a,
			    c = [];for (this.init(); a = this.next();) b(a) && c.push(a);this.init();return c;
		} },
	    q = function q(b, a, c) {
		a || (a = b.length);if (1 > a) throw new RangeError();if (a > b.length) throw new RangeError();var d = (1 << a) - 1,
		    e = l(b.length, a),
		    p = 1 << b.length;
		a = function () {
			return e;
		};b = Object.create(b.slice(), { length: { get: a } });g(b, "index");f(b, { valueOf: a, init: function init() {
				this.index = d;
			}, next: function next() {
				if (!(this.index >= p)) {
					for (var b = 0, a = this.index, c = []; a; a >>>= 1, b++) a & 1 && c.push(this[b]);a = this.index;b = a & -a;a += b;this.index = a | ((a & -a) / b >> 1) - 1;return c;
				}
			} });f(b, m);b.init();return "function" === typeof c ? b.map(c) : b;
	},
	    r = function r(b) {
		b = b.slice();var a = t(b.length);b.index = 0;b.next = function () {
			if (!(this.index >= a)) {
				for (var b = this.slice(), d = u(this.index, this.length), e = [], p = this.length - 1; 0 <= p; --p) e.push(b.splice(d[p], 1)[0]);this.index++;return e;
			}
		};return b;
	},
	    v = function v(b) {
		for (var a = 0, c = 1; c <= b; c++) var d = h(b, c), a = a + d;return a;
	},
	    w = Array.prototype.slice,
	    n = Object.create(null);f(n, { C: l, P: h, factorial: t, factoradic: u, cartesianProduct: function cartesianProduct() {
			if (!arguments.length) throw new RangeError();var b = w.call(arguments),
			    a = b.reduce(function (b, a) {
				return b * a.length;
			}, 1),
			    c = function c() {
				return a;
			},
			    d = b.length,
			    b = Object.create(b, { length: { get: c } });if (!a) throw new RangeError();g(b, "index");f(b, { valueOf: c, dim: d, init: function init() {
					this.index = 0;
				}, get: function get() {
					if (arguments.length === this.length) {
						for (var b = [], a = 0; a < d; a++) {
							var c = arguments[a];if (c >= this[a].length) return;b.push(this[a][c]);
						}return b;
					}
				}, nth: function nth(a) {
					for (var b = [], c = 0; c < d; c++) {
						var f = this[c].length,
						    g = a % f;b.push(this[c][g]);a -= g;a /= f;
					}return b;
				}, next: function next() {
					if (!(this.index >= a)) {
						var b = this.nth(this.index);this.index++;return b;
					}
				} });f(b, m);b.init();return b;
		}, combination: q, permutation: function permutation(b, a, c) {
			a || (a = b.length);if (1 > a) throw new RangeError();if (a > b.length) throw new RangeError();
			var d = h(b.length, a),
			    e = Object.create(b.slice(), { length: { get: function get() {
						return d;
					} } });g(e, "cmb");g(e, "per");f(e, { valueOf: function valueOf() {
					return d;
				}, init: function init() {
					this.cmb = q(b, a);this.per = r(this.cmb.next());
				}, next: function next() {
					var a = this.per.next();if (!a) {
						a = this.cmb.next();if (!a) return;this.per = r(a);return this.next();
					}return a;
				} });f(e, m);e.init();return "function" === typeof c ? e.map(c) : e;
		}, permutationCombination: function permutationCombination(b, a) {
			var c = v(b.length),
			    d = Object.create(b.slice(), { length: { get: function get() {
						return c;
					} } });g(d, "cmb");
			g(d, "per");g(d, "nelem");f(d, { valueOf: function valueOf() {
					return c;
				}, init: function init() {
					this.nelem = 1;this.cmb = q(b, this.nelem);this.per = r(this.cmb.next());
				}, next: function next() {
					var a = this.per.next();if (!a) {
						a = this.cmb.next();if (!a) {
							this.nelem++;if (this.nelem > b.length) return;this.cmb = q(b, this.nelem);a = this.cmb.next();if (!a) return;
						}this.per = r(a);return this.next();
					}return a;
				} });f(d, m);d.init();return "function" === typeof a ? d.map(a) : d;
		}, power: function power(b, a) {
			var c = 1 << b.length,
			    d = function d() {
				return c;
			},
			    e = Object.create(b.slice(), { length: { get: d } });
			g(e, "index");f(e, { valueOf: d, init: function init() {
					e.index = 0;
				}, nth: function nth(a) {
					if (!(a >= c)) {
						for (var b = 0, d = []; a; a >>>= 1, b++) a & 1 && d.push(this[b]);return d;
					}
				}, next: function next() {
					return this.nth(this.index++);
				} });f(e, m);e.init();return "function" === typeof a ? e.map(a) : e;
		}, baseN: function baseN(b, a, c) {
			a || (a = b.length);if (1 > a) throw new RangeError();var d = b.length,
			    e = Math.pow(d, a),
			    h = function h() {
				return e;
			},
			    k = Object.create(b.slice(), { length: { get: h } });g(k, "index");f(k, { valueOf: h, init: function init() {
					k.index = 0;
				}, nth: function nth(c) {
					if (!(c >= e)) {
						for (var f = [], g = 0; g < a; g++) {
							var h = c % d;f.push(b[h]);c -= h;c /= d;
						}return f;
					}
				}, next: function next() {
					return this.nth(this.index++);
				} });f(k, m);k.init();return "function" === typeof c ? k.map(c) : k;
		}, VERSION: "0.5.0" });return n;
});

window.AdventOfCode.Day24 = function (input) {
	input = input.split('\n').map(function (a) {
		return +a;
	});

	Array.prototype.sum = function () {
		return this.reduce(function (a, b) {
			return a + b;
		}, 0);
	};

	var Solve = function Solve(parts) {
		var sumToMatch = input.sum() / parts;

		var Calculate = function Calculate(list, group) {
			for (var i = 1; i <= list.length; i++) {
				var newList = Combinatorics.combination(list, i).filter(function (a) {
					return sumToMatch === a.sum();
				});

				for (var y = newList.length - 1; y > 0; y--) {
					if (group === 2) {
						return true;
					}

					var sum = Calculate(list.filter(function (a) {
						return newList[y].indexOf(a) === -1;
					}), group - 1);

					if (group < parts) {
						return sum;
					}

					if (sum) {
						return newList[y].reduce(function (a, b) {
							return a * b;
						}, 1);
					}
				}
			}
		};

		return Calculate(input, parts);
	};

	return [0, Solve(4)];
};
"use strict";

var bigInt = (function (e) {
	"use strict";function o(e, t) {
		this.value = e, this.sign = t, this.isSmall = !1;
	}function u(e) {
		this.value = e, this.sign = e < 0, this.isSmall = !0;
	}function a(e) {
		return -r < e && e < r;
	}function f(e) {
		return e < 1e7 ? [e] : e < 1e14 ? [e % 1e7, Math.floor(e / 1e7)] : [e % 1e7, Math.floor(e / 1e7) % 1e7, Math.floor(e / 1e14)];
	}function l(e) {
		c(e);var n = e.length;if (n < 4 && O(e, i) < 0) switch (n) {case 0:
				return 0;case 1:
				return e[0];case 2:
				return e[0] + e[1] * t;default:
				return e[0] + (e[1] + e[2] * t) * t;}return e;
	}function c(e) {
		var t = e.length;while (e[--t] === 0);e.length = t + 1;
	}function h(e) {
		var t = new Array(e),
		    n = -1;while (++n < e) t[n] = 0;return t;
	}function p(e) {
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}function d(e, n) {
		var r = e.length,
		    i = n.length,
		    s = new Array(r),
		    o = 0,
		    u = t,
		    a,
		    f;for (f = 0; f < i; f++) a = e[f] + n[f] + o, o = a >= u ? 1 : 0, s[f] = a - o * u;while (f < r) a = e[f] + o, o = a === u ? 1 : 0, s[f++] = a - o * u;return o > 0 && s.push(o), s;
	}function v(e, t) {
		return e.length >= t.length ? d(e, t) : d(t, e);
	}function m(e, n) {
		var r = e.length,
		    i = new Array(r),
		    s = t,
		    o,
		    u;for (u = 0; u < r; u++) o = e[u] - s + n, n = Math.floor(o / s), i[u] = o - n * s, n += 1;while (n > 0) i[u++] = n % s, n = Math.floor(n / s);return i;
	}function g(e, n) {
		var r = e.length,
		    i = n.length,
		    s = new Array(r),
		    o = 0,
		    u = t,
		    a,
		    f;for (a = 0; a < i; a++) f = e[a] - o - n[a], f < 0 ? (f += u, o = 1) : o = 0, s[a] = f;for (a = i; a < r; a++) {
			f = e[a] - o;if (!(f < 0)) {
				s[a++] = f;break;
			}f += u, s[a] = f;
		}for (; a < r; a++) s[a] = e[a];return c(s), s;
	}function y(e, t, n) {
		var r, i;return O(e, t) >= 0 ? r = g(e, t) : (r = g(t, e), n = !n), r = l(r), typeof r == "number" ? (n && (r = -r), new u(r)) : new o(r, n);
	}function b(e, n, r) {
		var i = e.length,
		    s = new Array(i),
		    a = -n,
		    f = t,
		    c,
		    h;for (c = 0; c < i; c++) h = e[c] + a, a = Math.floor(h / f), h %= f, s[c] = h < 0 ? h + f : h;return s = l(s), typeof s == "number" ? (r && (s = -s), new u(s)) : new o(s, r);
	}function w(e, n) {
		var r = e.length,
		    i = n.length,
		    s = r + i,
		    o = h(s),
		    u = t,
		    a,
		    f,
		    l,
		    p,
		    d;for (l = 0; l < r; ++l) {
			p = e[l];for (var v = 0; v < i; ++v) d = n[v], a = p * d + o[l + v], f = Math.floor(a / u), o[l + v] = a - f * u, o[l + v + 1] += f;
		}return c(o), o;
	}function E(e, n) {
		var r = e.length,
		    i = new Array(r),
		    s = t,
		    o = 0,
		    u,
		    a;for (a = 0; a < r; a++) u = e[a] * n + o, o = Math.floor(u / s), i[a] = u - o * s;while (o > 0) i[a++] = o % s, o = Math.floor(o / s);return i;
	}function S(e, t) {
		var n = [];while (t-- > 0) n.push(0);return n.concat(e);
	}function x(e, t) {
		var n = Math.max(e.length, t.length);if (n <= 400) return w(e, t);n = Math.ceil(n / 2);var r = e.slice(n),
		    i = e.slice(0, n),
		    s = t.slice(n),
		    o = t.slice(0, n),
		    u = x(i, o),
		    a = x(r, s),
		    f = x(v(i, r), v(o, s));return v(v(u, S(g(g(f, u), a), n)), S(a, 2 * n));
	}function T(e, n, r) {
		return e < t ? new o(E(n, e), r) : new o(w(n, f(e)), r);
	}function N(e) {
		var n = e.length,
		    r = h(n + n),
		    i = t,
		    s,
		    o,
		    u,
		    a,
		    f;for (u = 0; u < n; u++) {
			a = e[u];for (var l = 0; l < n; l++) f = e[l], s = a * f + r[u + l], o = Math.floor(s / i), r[u + l] = s - o * i, r[u + l + 1] += o;
		}return c(r), r;
	}function C(e, n) {
		var r = e.length,
		    i = n.length,
		    s = t,
		    o = h(n.length),
		    u = n[i - 1],
		    a = Math.ceil(s / (2 * u)),
		    f = E(e, a),
		    c = E(n, a),
		    p,
		    d,
		    v,
		    m,
		    g,
		    y,
		    b;f.length <= r && f.push(0), c.push(0), u = c[i - 1];for (d = r - i; d >= 0; d--) {
			p = s - 1, f[d + i] !== u && (p = Math.floor((f[d + i] * s + f[d + i - 1]) / u)), v = 0, m = 0, y = c.length;for (g = 0; g < y; g++) v += p * c[g], b = Math.floor(v / s), m += f[d + g] - (v - b * s), v = b, m < 0 ? (f[d + g] = m + s, m = -1) : (f[d + g] = m, m = 0);while (m !== 0) {
				p -= 1, v = 0;for (g = 0; g < y; g++) v += f[d + g] - s + c[g], v < 0 ? (f[d + g] = v + s, v = 0) : (f[d + g] = v, v = 1);m += v;
			}o[d] = p;
		}return f = L(f, a)[0], [l(o), l(f)];
	}function k(e, n) {
		var r = e.length,
		    i = n.length,
		    s = [],
		    o = [],
		    u = t,
		    a,
		    f,
		    c,
		    h,
		    p;while (r) {
			o.unshift(e[--r]);if (O(o, n) < 0) {
				s.push(0);continue;
			}f = o.length, c = o[f - 1] * u + o[f - 2], h = n[i - 1] * u + n[i - 2], f > i && (c = (c + 1) * u), a = Math.ceil(c / h);do {
				p = E(n, a);if (O(p, o) <= 0) break;a--;
			} while (a);s.push(a), o = g(o, p);
		}return s.reverse(), [l(s), l(o)];
	}function L(e, n) {
		var r = e.length,
		    i = h(r),
		    s = t,
		    o,
		    u,
		    a,
		    f;a = 0;for (o = r - 1; o >= 0; --o) f = a * s + e[o], u = p(f / n), a = f - u * n, i[o] = u | 0;return [i, a | 0];
	}function A(e, n) {
		var r,
		    i = Q(n),
		    s = e.value,
		    a = i.value,
		    c;if (a === 0) throw new Error("Cannot divide by zero");if (e.isSmall) return i.isSmall ? [new u(p(s / a)), new u(s % a)] : [G[0], e];if (i.isSmall) {
			if (a === 1) return [e, G[0]];if (a == -1) return [e.negate(), G[0]];var h = Math.abs(a);if (h < t) {
				r = L(s, h), c = l(r[0]);var d = r[1];return e.sign && (d = -d), typeof c == "number" ? (e.sign !== i.sign && (c = -c), [new u(c), new u(d)]) : [new o(c, e.sign !== i.sign), new u(d)];
			}a = f(h);
		}var v = O(s, a);if (v === -1) return [G[0], e];if (v === 0) return [G[e.sign === i.sign ? 1 : -1], G[0]];s.length + a.length <= 200 ? r = C(s, a) : r = k(s, a), c = r[0];var m = e.sign !== i.sign,
		    g = r[1],
		    y = e.sign;return typeof c == "number" ? (m && (c = -c), c = new u(c)) : c = new o(c, m), typeof g == "number" ? (y && (g = -g), g = new u(g)) : g = new o(g, y), [c, g];
	}function O(e, t) {
		if (e.length !== t.length) return e.length > t.length ? 1 : -1;for (var n = e.length - 1; n >= 0; n--) if (e[n] !== t[n]) return e[n] > t[n] ? 1 : -1;return 0;
	}function M(e) {
		var t = e.abs();if (t.isUnit()) return !1;if (t.equals(2) || t.equals(3) || t.equals(5)) return !0;if (t.isEven() || t.isDivisibleBy(3) || t.isDivisibleBy(5)) return !1;if (t.lesser(25)) return !0;
	}function H(e) {
		return (typeof e == "number" || typeof e == "string") && +Math.abs(e) <= t || e instanceof o && e.value.length <= 1;
	}function B(e, t, n) {
		t = Q(t);var r = e.isNegative(),
		    i = t.isNegative(),
		    s = r ? e.not() : e,
		    o = i ? t.not() : t,
		    u = [],
		    a = [],
		    f = !1,
		    l = !1;while (!f || !l) s.isZero() ? (f = !0, u.push(r ? 1 : 0)) : r ? u.push(s.isEven() ? 1 : 0) : u.push(s.isEven() ? 0 : 1), o.isZero() ? (l = !0, a.push(i ? 1 : 0)) : i ? a.push(o.isEven() ? 1 : 0) : a.push(o.isEven() ? 0 : 1), s = s.over(2), o = o.over(2);var c = [];for (var h = 0; h < u.length; h++) c.push(n(u[h], a[h]));var p = bigInt(c.pop()).negate().times(bigInt(2).pow(c.length));while (c.length) p = p.add(bigInt(c.pop()).times(bigInt(2).pow(c.length)));return p;
	}function I(e) {
		var n = e.value,
		    r = typeof n == "number" ? n | j : n[0] + n[1] * t | F;return r & -r;
	}function q(e, t) {
		return e = Q(e), t = Q(t), e.greater(t) ? e : t;
	}function R(e, t) {
		return e = Q(e), t = Q(t), e.lesser(t) ? e : t;
	}function U(e, t) {
		e = Q(e).abs(), t = Q(t).abs();if (e.equals(t)) return e;if (e.isZero()) return t;if (t.isZero()) return e;var n = G[1],
		    r,
		    i;while (e.isEven() && t.isEven()) r = Math.min(I(e), I(t)), e = e.divide(r), t = t.divide(r), n = n.multiply(r);while (e.isEven()) e = e.divide(I(e));do {
			while (t.isEven()) t = t.divide(I(t));e.greater(t) && (i = t, t = e, e = i), t = t.subtract(e);
		} while (!t.isZero());return n.isUnit() ? e : e.multiply(n);
	}function z(e, t) {
		return e = Q(e).abs(), t = Q(t).abs(), e.divide(U(e, t)).multiply(t);
	}function W(e, n) {
		e = Q(e), n = Q(n);var r = R(e, n),
		    i = q(e, n),
		    s = i.subtract(r);if (s.isSmall) return r.add(Math.round(Math.random() * s));var a = s.value.length - 1,
		    f = [],
		    c = !0;for (var h = a; h >= 0; h--) {
			var d = c ? s.value[h] : t,
			    v = p(Math.random() * d);f.unshift(v), v < d && (c = !1);
		}return f = l(f), r.add(typeof f == "number" ? new u(f) : new o(f, !1));
	}function V(e) {
		var t = e.value;return typeof t == "number" && (t = [t]), t.length === 1 && t[0] <= 35 ? "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t[0]) : "<" + t + ">";
	}function $(e, t) {
		t = bigInt(t);if (t.isZero()) {
			if (e.isZero()) return "0";throw new Error("Cannot convert nonzero numbers to base 0.");
		}if (t.equals(-1)) return e.isZero() ? "0" : e.isNegative() ? new Array(1 - e).join("10") : "1" + new Array(+e).join("01");var n = "";e.isNegative() && t.isPositive() && (n = "-", e = e.abs());if (t.equals(1)) return e.isZero() ? "0" : n + new Array(+e + 1).join(1);var r = [],
		    i = e,
		    s;while (i.isNegative() || i.compareAbs(t) >= 0) {
			s = i.divmod(t), i = s.quotient;var o = s.remainder;o.isNegative() && (o = t.minus(o).abs(), i = i.next()), r.push(V(o));
		}return r.push(V(i)), n + r.reverse().join("");
	}function J(e) {
		if (a(+e)) {
			var t = +e;if (t === p(t)) return new u(t);throw "Invalid integer: " + e;
		}var r = e[0] === "-";r && (e = e.slice(1));var i = e.split(/e/i);if (i.length > 2) throw new Error("Invalid integer: " + f.join("e"));if (i.length === 2) {
			var s = i[1];s[0] === "+" && (s = s.slice(1)), s = +s;if (s !== p(s) || !a(s)) throw new Error("Invalid integer: " + s + " is not a valid exponent.");var f = i[0],
			    l = f.indexOf(".");l >= 0 && (s -= f.length - l - 1, f = f.slice(0, l) + f.slice(l + 1));if (s < 0) throw new Error("Cannot include negative exponent part for integers");f += new Array(s + 1).join("0"), e = f;
		}var h = /^([0-9][0-9]*)$/.test(e);if (!h) throw new Error("Invalid integer: " + e);var d = [],
		    v = e.length,
		    m = n,
		    g = v - m;while (v > 0) d.push(+e.slice(g, v)), g -= m, g < 0 && (g = 0), v -= m;return c(d), new o(d, r);
	}function K(e) {
		return a(e) ? new u(e) : J(e.toString());
	}function Q(e) {
		return typeof e == "number" ? K(e) : typeof e == "string" ? J(e) : e;
	}var t = 1e7,
	    n = 7,
	    r = 9007199254740992,
	    i = f(r),
	    s = Math.log(r);o.prototype.add = function (e) {
		var t,
		    n = Q(e);if (this.sign !== n.sign) return this.subtract(n.negate());var r = this.value,
		    i = n.value;return n.isSmall ? new o(m(r, Math.abs(i)), this.sign) : new o(v(r, i), this.sign);
	}, o.prototype.plus = o.prototype.add, u.prototype.add = function (e) {
		var t = Q(e),
		    n = this.value;if (n < 0 !== t.sign) return this.subtract(t.negate());var r = t.value;if (t.isSmall) {
			if (a(n + r)) return new u(n + r);r = f(Math.abs(r));
		}return new o(m(r, Math.abs(n)), n < 0);
	}, u.prototype.plus = u.prototype.add, o.prototype.subtract = function (e) {
		var t = Q(e);if (this.sign !== t.sign) return this.add(t.negate());var n = this.value,
		    r = t.value;return t.isSmall ? b(n, Math.abs(r), this.sign) : y(n, r, this.sign);
	}, o.prototype.minus = o.prototype.subtract, u.prototype.subtract = function (e) {
		var t = Q(e),
		    n = this.value;if (n < 0 !== t.sign) return this.add(t.negate());var r = t.value;return t.isSmall ? new u(n - r) : b(r, Math.abs(n), n >= 0);
	}, u.prototype.minus = u.prototype.subtract, o.prototype.negate = function () {
		return new o(this.value, !this.sign);
	}, u.prototype.negate = function () {
		var e = this.sign,
		    t = new u(-this.value);return t.sign = !e, t;
	}, o.prototype.abs = function () {
		return new o(this.value, !1);
	}, u.prototype.abs = function () {
		return new u(Math.abs(this.value));
	}, o.prototype.multiply = function (e) {
		var n,
		    r = Q(e),
		    i = this.value,
		    s = r.value,
		    u = this.sign !== r.sign,
		    a;if (r.isSmall) {
			if (s === 0) return G[0];if (s === 1) return this;if (s === -1) return this.negate();a = Math.abs(s);if (a < t) return new o(E(i, a), u);s = f(a);
		}return i.length + s.length > 4e3 ? new o(x(i, s), u) : new o(w(i, s), u);
	}, o.prototype.times = o.prototype.multiply, u.prototype._multiplyBySmall = function (e) {
		return a(e.value * this.value) ? new u(e.value * this.value) : T(Math.abs(e.value), f(Math.abs(this.value)), this.sign !== e.sign);
	}, o.prototype._multiplyBySmall = function (e) {
		return e.value === 0 ? G[0] : e.value === 1 ? this : e.value === -1 ? this.negate() : T(Math.abs(e.value), this.value, this.sign !== e.sign);
	}, u.prototype.multiply = function (e) {
		return Q(e)._multiplyBySmall(this);
	}, u.prototype.times = u.prototype.multiply, o.prototype.square = function () {
		return new o(N(this.value), !1);
	}, u.prototype.square = function () {
		var e = this.value * this.value;return a(e) ? new u(e) : new o(N(f(Math.abs(this.value))), !1);
	}, o.prototype.divmod = function (e) {
		var t = A(this, e);return { quotient: t[0], remainder: t[1] };
	}, u.prototype.divmod = o.prototype.divmod, o.prototype.divide = function (e) {
		return A(this, e)[0];
	}, u.prototype.over = u.prototype.divide = o.prototype.over = o.prototype.divide, o.prototype.mod = function (e) {
		return A(this, e)[1];
	}, u.prototype.remainder = u.prototype.mod = o.prototype.remainder = o.prototype.mod, o.prototype.pow = function (e) {
		var t = Q(e),
		    n = this.value,
		    r = t.value,
		    i,
		    s,
		    o;if (r === 0) return G[1];if (n === 0) return G[0];if (n === 1) return G[1];if (n === -1) return t.isEven() ? G[1] : G[-1];if (t.sign) return G[0];if (!t.isSmall) throw new Error("The exponent " + t.toString() + " is too large.");if (this.isSmall && a(i = Math.pow(n, r))) return new u(p(i));s = this, o = G[1];for (;;) {
			r & !0 && (o = o.times(s), --r);if (r === 0) break;r /= 2, s = s.square();
		}return o;
	}, u.prototype.pow = o.prototype.pow, o.prototype.modPow = function (e, t) {
		e = Q(e), t = Q(t);if (t.isZero()) throw new Error("Cannot take modPow with modulus 0");var n = G[1],
		    r = this.mod(t);while (e.isPositive()) {
			if (r.isZero()) return G[0];e.isOdd() && (n = n.multiply(r).mod(t)), e = e.divide(2), r = r.square().mod(t);
		}return n;
	}, u.prototype.modPow = o.prototype.modPow, o.prototype.compareAbs = function (e) {
		var t = Q(e),
		    n = this.value,
		    r = t.value;return t.isSmall ? 1 : O(n, r);
	}, u.prototype.compareAbs = function (e) {
		var t = Q(e),
		    n = Math.abs(this.value),
		    r = t.value;return t.isSmall ? (r = Math.abs(r), n === r ? 0 : n > r ? 1 : -1) : -1;
	}, o.prototype.compare = function (e) {
		if (e === Infinity) return -1;if (e === -Infinity) return 1;var t = Q(e),
		    n = this.value,
		    r = t.value;return this.sign !== t.sign ? t.sign ? 1 : -1 : t.isSmall ? this.sign ? -1 : 1 : O(n, r) * (this.sign ? -1 : 1);
	}, o.prototype.compareTo = o.prototype.compare, u.prototype.compare = function (e) {
		if (e === Infinity) return -1;if (e === -Infinity) return 1;var t = Q(e),
		    n = this.value,
		    r = t.value;return t.isSmall ? n == r ? 0 : n > r ? 1 : -1 : n < 0 !== t.sign ? n < 0 ? -1 : 1 : n < 0 ? 1 : -1;
	}, u.prototype.compareTo = u.prototype.compare, o.prototype.equals = function (e) {
		return this.compare(e) === 0;
	}, u.prototype.eq = u.prototype.equals = o.prototype.eq = o.prototype.equals, o.prototype.notEquals = function (e) {
		return this.compare(e) !== 0;
	}, u.prototype.neq = u.prototype.notEquals = o.prototype.neq = o.prototype.notEquals, o.prototype.greater = function (e) {
		return this.compare(e) > 0;
	}, u.prototype.gt = u.prototype.greater = o.prototype.gt = o.prototype.greater, o.prototype.lesser = function (e) {
		return this.compare(e) < 0;
	}, u.prototype.lt = u.prototype.lesser = o.prototype.lt = o.prototype.lesser, o.prototype.greaterOrEquals = function (e) {
		return this.compare(e) >= 0;
	}, u.prototype.geq = u.prototype.greaterOrEquals = o.prototype.geq = o.prototype.greaterOrEquals, o.prototype.lesserOrEquals = function (e) {
		return this.compare(e) <= 0;
	}, u.prototype.leq = u.prototype.lesserOrEquals = o.prototype.leq = o.prototype.lesserOrEquals, o.prototype.isEven = function () {
		return (this.value[0] & 1) === 0;
	}, u.prototype.isEven = function () {
		return (this.value & 1) === 0;
	}, o.prototype.isOdd = function () {
		return (this.value[0] & 1) === 1;
	}, u.prototype.isOdd = function () {
		return (this.value & 1) === 1;
	}, o.prototype.isPositive = function () {
		return !this.sign;
	}, u.prototype.isPositive = function () {
		return this.value > 0;
	}, o.prototype.isNegative = function () {
		return this.sign;
	}, u.prototype.isNegative = function () {
		return this.value < 0;
	}, o.prototype.isUnit = function () {
		return !1;
	}, u.prototype.isUnit = function () {
		return Math.abs(this.value) === 1;
	}, o.prototype.isZero = function () {
		return !1;
	}, u.prototype.isZero = function () {
		return this.value === 0;
	}, o.prototype.isDivisibleBy = function (e) {
		var t = Q(e),
		    n = t.value;return n === 0 ? !1 : n === 1 ? !0 : n === 2 ? this.isEven() : this.mod(t).equals(G[0]);
	}, u.prototype.isDivisibleBy = o.prototype.isDivisibleBy, o.prototype.isPrime = function () {
		var t = M(this);if (t !== e) return t;var n = this.abs(),
		    r = n.prev(),
		    i = [2, 3, 5, 7, 11, 13, 17, 19],
		    s = r,
		    o,
		    u,
		    a,
		    f;while (s.isEven()) s = s.divide(2);for (a = 0; a < i.length; a++) {
			f = bigInt(i[a]).modPow(s, n);if (f.equals(G[1]) || f.equals(r)) continue;for (u = !0, o = s; u && o.lesser(r); o = o.multiply(2)) f = f.square().mod(n), f.equals(r) && (u = !1);if (u) return !1;
		}return !0;
	}, u.prototype.isPrime = o.prototype.isPrime, o.prototype.isProbablePrime = function (t) {
		var n = M(this);if (n !== e) return n;var r = this.abs(),
		    i = t === e ? 5 : t;for (var s = 0; s < i; s++) {
			var o = bigInt.randBetween(2, r.minus(2));if (!o.modPow(r.prev(), r).isUnit()) return !1;
		}return !0;
	}, u.prototype.isProbablePrime = o.prototype.isProbablePrime, o.prototype.next = function () {
		var e = this.value;return this.sign ? b(e, 1, this.sign) : new o(m(e, 1), this.sign);
	}, u.prototype.next = function () {
		var e = this.value;return e + 1 < r ? new u(e + 1) : new o(i, !1);
	}, o.prototype.prev = function () {
		var e = this.value;return this.sign ? new o(m(e, 1), !0) : b(e, 1, this.sign);
	}, u.prototype.prev = function () {
		var e = this.value;return e - 1 > -r ? new u(e - 1) : new o(i, !0);
	};var _ = [1];while (_[_.length - 1] <= t) _.push(2 * _[_.length - 1]);var D = _.length,
	    P = _[D - 1];o.prototype.shiftLeft = function (e) {
		if (!H(e)) throw new Error(String(e) + " is too large for shifting.");e = +e;if (e < 0) return this.shiftRight(-e);var t = this;while (e >= D) t = t.multiply(P), e -= D - 1;return t.multiply(_[e]);
	}, u.prototype.shiftLeft = o.prototype.shiftLeft, o.prototype.shiftRight = function (e) {
		var t;if (!H(e)) throw new Error(String(e) + " is too large for shifting.");e = +e;if (e < 0) return this.shiftLeft(-e);var n = this;while (e >= D) {
			if (n.isZero()) return n;t = A(n, P), n = t[1].isNegative() ? t[0].prev() : t[0], e -= D - 1;
		}return t = A(n, _[e]), t[1].isNegative() ? t[0].prev() : t[0];
	}, u.prototype.shiftRight = o.prototype.shiftRight, o.prototype.not = function () {
		return this.negate().prev();
	}, u.prototype.not = o.prototype.not, o.prototype.and = function (e) {
		return B(this, e, function (e, t) {
			return e & t;
		});
	}, u.prototype.and = o.prototype.and, o.prototype.or = function (e) {
		return B(this, e, function (e, t) {
			return e | t;
		});
	}, u.prototype.or = o.prototype.or, o.prototype.xor = function (e) {
		return B(this, e, function (e, t) {
			return e ^ t;
		});
	}, u.prototype.xor = o.prototype.xor;var j = 1 << 30,
	    F = (t & -t) * (t & -t) | j,
	    X = function X(e, t) {
		var n = G[0],
		    r = G[1],
		    i = e.length;if (2 <= t && t <= 36 && i <= s / Math.log(t)) return new u(parseInt(e, t));t = Q(t);var o = [],
		    a,
		    f = e[0] === "-";for (a = f ? 1 : 0; a < e.length; a++) {
			var l = e[a].toLowerCase(),
			    c = l.charCodeAt(0);if (48 <= c && c <= 57) o.push(Q(l));else if (97 <= c && c <= 122) o.push(Q(l.charCodeAt(0) - 87));else {
				if (l !== "<") throw new Error(l + " is not a valid character");var h = a;do a++; while (e[a] !== ">");o.push(Q(e.slice(h + 1, a)));
			}
		}o.reverse();for (a = 0; a < o.length; a++) n = n.add(o[a].times(r)), r = r.times(t);return f ? n.negate() : n;
	};o.prototype.toString = function (t) {
		t === e && (t = 10);if (t !== 10) return $(this, t);var n = this.value,
		    r = n.length,
		    i = String(n[--r]),
		    s = "0000000",
		    o;while (--r >= 0) o = String(n[r]), i += s.slice(o.length) + o;var u = this.sign ? "-" : "";return u + i;
	}, u.prototype.toString = function (t) {
		return t === e && (t = 10), t != 10 ? $(this, t) : String(this.value);
	}, o.prototype.valueOf = function () {
		return +this.toString();
	}, o.prototype.toJSNumber = o.prototype.valueOf, u.prototype.valueOf = function () {
		return this.value;
	}, u.prototype.toJSNumber = u.prototype.valueOf;var G = function G(e, t) {
		return typeof e == "undefined" ? G[0] : typeof t != "undefined" ? +t === 10 ? Q(e) : X(e, t) : Q(e);
	};for (var Y = 0; Y < 1e3; Y++) G[Y] = new u(Y), Y > 0 && (G[-Y] = new u(-Y));return G.one = G[1], G.zero = G[0], G.minusOne = G[-1], G.max = q, G.min = R, G.gcd = U, G.lcm = z, G.isInstance = function (e) {
		return e instanceof o || e instanceof u;
	}, G.randBetween = W, G;
})();typeof module != "undefined" && module.hasOwnProperty("exports") && (module.exports = bigInt);

window.AdventOfCode.Day25 = function (input) {
	input = input.match(/([0-9]+)/g);

	var row = +input[0];
	var column = +input[1];

	var firstCode = 20151125;
	var multiplier = 252533;
	var divider = 33554393;

	var exp = (row + column - 2) * (row + column - 1) / 2 + column - 1;
	var answer = bigInt(multiplier).modPow(exp, divider) * firstCode % divider;

	return [answer, 'Merry Christmas!'];
};
'use strict';

window.AdventOfCode.Day2 = function (input) {
	input = input.split('\n');

	var completeArea = 0;
	var completeRibbon = 0;

	for (var i = 0; i < input.length; i++) {
		// They have a list of the dimensions (length l, width w, and height h)
		// of each present, and only want to order exactly as much as they need.
		var present = input[i].split('x').sort(function (a, b) {
			return a - b;
		});

		var sides = [present[0] * present[1], // l*w
		present[1] * present[2], // w*h
		present[2] * present[0] // h*l
		];

		// Find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l.
		var area = 2 * sides[0] + 2 * sides[1] + 2 * sides[2];

		// The elves also need a little extra paper for each present:
		// the area of the smallest side.
		completeArea += area + sides[0];

		// The ribbon required to wrap a present is the shortest distance
		// around its sides, or the smallest perimeter of any one face.
		// Each present also requires a bow made out of ribbon as well;
		// the feet of ribbon required for the perfect bow is equal to
		// the cubic feet of volume of the present.
		var ribbon = 2 * present[0] + 2 * present[1];

		var bow = present[0] * present[1] * present[2];

		completeRibbon += ribbon + bow;
	}

	return [completeArea, completeRibbon];
};
'use strict';

window.AdventOfCode.Day3 = function (input) {
	var GetUniqueHouses = function GetUniqueHouses(numberOfSantas) {
		var uniqueHousesCount = 1;
		var uniqueHouses = {
			'0x0': 1
		};

		for (var santa = 0; santa < numberOfSantas; santa++) {
			// Santa is delivering presents to an infinite two-dimensional grid of houses.
			var x = 0,
			    y = 0;

			// Then an elf at the North Pole calls him via radio and tells him where to move next.
			for (var i = santa; i < input.length; i += numberOfSantas) {
				switch (input[i]) {
					case '^':
						x++;break;
					case 'v':
						x--;break;
					case '>':
						y++;break;
					case '<':
						y--;break;
				}

				var coord = x + 'x' + y;

				if (!uniqueHouses[coord]) {
					uniqueHousesCount++;

					uniqueHouses[coord] = 1;
				}
			}
		}

		return uniqueHousesCount;
	};

	return [GetUniqueHouses(1), GetUniqueHouses(2)];
};
"use strict";

window.AdventOfCode.Day4 = function (input) {
	return [0, 0];
};
'use strict';

window.AdventOfCode.Day5 = function (input) {
	input = input.split('\n');

	// It contains at least three vowels (aeiou only),
	// like aei, xazegov, or aeiouaeiouaeiou.
	var regexVowels = /[aeiou]/g;

	// It contains at least one letter that appears twice in a row,
	// like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
	var regexDoubleLetter = /(.)\1+/;

	// It does not contain the strings ab, cd, pq, or xy,
	// even if they are part of one of the other requirements.
	var regexNaughtyParts = /(ab|cd|pq|xy)/;

	// It contains a pair of any two letters that appears at least
	// twice in the string without overlapping, like xyxy (xy) or
	// aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
	var regexRepeat = /(..).*\1/;

	// It contains at least one letter which repeats with exactly one
	// letter between them, like xyx, abcdefeghi (efe), or even aaa.
	var regexSpaced = /(.).\1/;

	var PartOneFilter = function PartOneFilter(word) {
		var match = word.match(regexVowels);

		return match !== null && match.length >= 3 && regexDoubleLetter.test(word) && !regexNaughtyParts.test(word);
	};

	var PartTwoFilter = function PartTwoFilter(word) {
		return regexRepeat.test(word) && regexSpaced.test(word);
	};

	return [input.filter(PartOneFilter).length, input.filter(PartTwoFilter).length];
};
'use strict';

window.AdventOfCode.Day6 = function (input) {
	input = input.split('\n');

	// Because your neighbors keep defeating you in the holiday house
	// decorating contest year after year, you've decided
	// to deploy one million lights in a 1000x1000 grid.
	var grid = [];

	// var row = Array( 1000 ).fill( 0 );
	// var grid = Array( 1000 ).fill( row );
	// This would be a nice solution, right?
	// But Array.fill just uses the same array reference, instead of cloning

	var i, y;

	for (i = 0; i < 1000; i++) {
		grid[i] = [];

		for (y = 0; y < 1000; y++) {
			grid[i][y] = {
				status: 0,
				brightness: 0
			};
		}
	}

	var regex = /^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/;

	for (i = 0; i < input.length; i++) {
		var operation = input[i].match(regex);

		// Using + to convert it to a number
		var x1 = +operation[2];
		var y1 = +operation[3];
		var x2 = +operation[4];
		var y2 = +operation[5];
		operation = operation[1];

		for (var i1 = x1; i1 <= x2; i1++) {
			for (var i2 = y1; i2 <= y2; i2++) {
				// The instructions include whether to turn on, turn off,
				// or toggle various inclusive ranges given as coordinate pairs.
				switch (operation) {
					case 'turn on':
						{
							grid[i1][i2].status = 1;
							grid[i1][i2].brightness += 1;

							break;
						}
					case 'turn off':
						{
							grid[i1][i2].status = 0;

							if (grid[i1][i2].brightness > 0) {
								grid[i1][i2].brightness -= 1;
							}

							break;
						}
					case 'toggle':
						{
							grid[i1][i2].status ^= 1;
							grid[i1][i2].brightness += 2;

							break;
						}
				}
			}
		}
	}

	var turnedOnLights = 0,bright=0;

	for (i = 0; i < grid.length; i++) {
		// Using .reduce is nice, but not worth the double iteration
		for (y = 0; y < grid[i].length; y++) {
			turnedOnLights += grid[i][y].status;
			bright += grid[i][y].brightness;

		}
	}

	return [turnedOnLights, bright];
};
'use strict';

window.AdventOfCode.Day7 = function (input) {
	// Split all operations by space
	input = input.split('\n').map(function (a) {
		return a.split(' ');
	});

	// Pre-sort the input to avoid multiple iterations
	input.sort(function (a, b) {
		// Get the output wire
		a = a[a.length - 1];
		b = b[b.length - 1];

		// Wire 'a' must end at the end of instructions
		if (a === 'a') {
			return 1;
		} else if (b === 'a') {
			return -1;
		}

		if (a.length === b.length) {
			return a > b ? 1 : -1;
		}

		return a.length - b.length;
	});

	var Solve = function Solve(wires) {
		var GetValue = function GetValue(value) {
			if (value in wires) {
				return wires[value];
			}

			return +value;
		};

		var SetWire = function SetWire(wire, value) {
			// Can't assign same wire twice,
			// this becomes a problem when overriding b
			if (wire in wires) {
				return;
			}

			wires[wire] = value & 0xFFFF;
		};

		for (var i = 0; i < input.length; i++) {
			var operation = input[i];

			switch (operation.length) {
				// 123 -> x means that the signal 123 is provided to wire x.
				case 3:
					// ["123", "->", "x"]
					SetWire(operation[2], GetValue(operation[0]));

					break;

				// NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
				case 4:
					// ["NOT", "x", "->", "h"]
					SetWire(operation[3], ~GetValue(operation[1]));

					break;

				// x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
				case 5:
					// ["x", "AND", "y", "->", "d"]
					switch (operation[1]) {
						case 'AND':
							SetWire(operation[4], GetValue(operation[0]) & GetValue(operation[2]));break;
						case 'OR':
							SetWire(operation[4], GetValue(operation[0]) | GetValue(operation[2]));break;
						case 'LSHIFT':
							SetWire(operation[4], GetValue(operation[0]) << GetValue(operation[2]));break;
						case 'RSHIFT':
							SetWire(operation[4], GetValue(operation[0]) >> GetValue(operation[2]));break;
					}

					break;
			}
		}

		return wires['a'] || 0;
	};

	var solution1 = Solve({});
	var solution2 = Solve({ b: solution1 });

	return [solution1, solution2];
};
'use strict';

window.AdventOfCode.Day8 = function (input) {
	input = input.split('\n');

	var totalLength = 0;
	var cleanLength = 0;
	var encodedLength = 0;

	for (var i = 0; i < input.length; i++) {
		var str = input[i];
		var escaping = false;

		totalLength += str.length;
		encodedLength += str.length + 4;

		for (var x = 1; x < str.length - 1; x++) {
			var char = str[x];

			if (escaping) {
				escaping = false;

				if (char === 'x') {
					x += 2;
				} else {
					encodedLength++;
				}
			} else if (char === '\\') {
				encodedLength++;

				escaping = true;

				continue;
			}

			cleanLength++;
		}
	}

	return [totalLength - cleanLength, encodedLength - totalLength];
};
'use strict';

window.AdventOfCode.Day9 = function (input) {
	var permutator = function permutator(inputArr) {
		var results = [];

		function permute(arr, memo) {
			var cur;memo = memo || [];

			for (var i = 0; i < arr.length; i++) {
				cur = arr.splice(i, 1);
				if (arr.length === 0) {
					results.push(memo.concat(cur));
				}
				permute(arr.slice(), memo.concat(cur));
				arr.splice(i, 0, cur[0]);
			}

			return results;
		}

		return permute(inputArr);
	};

	input = input.split('\n');
	var travelPaths = {};
	var cities = {};

	for (var i = 0; i < input.length; i++) {
		var data = input[i].split(' ');

		if (!cities[data[0]]) {
			cities[data[0]] = true;
			travelPaths[data[0]] = {};
		}

		if (!cities[data[2]]) {
			cities[data[2]] = true;
			travelPaths[data[2]] = {};
		}

		travelPaths[data[0]][data[2]] = +data[4];
		travelPaths[data[2]][data[0]] = +data[4];
	}

	var permuted = permutator(Object.keys(cities));
	var shortestDistance = Number.MAX_VALUE;
	var longestDistance = 0;

	for (i = 0; i < permuted.length; i++) {
		var distance = 0;

		for (var x = 1; x < permuted[i].length; x++) {
			distance += travelPaths[permuted[i][x - 1]][permuted[i][x]];
		}

		if (shortestDistance > distance) {
			shortestDistance = distance;
		}

		if (longestDistance < distance) {
			longestDistance = distance;
		}
	}

	return [shortestDistance, longestDistance];
};
"use strict";

var fs = require('fs');
for (var i = 1; i < 26; i++) {
  var f = window.AdventOfCode["Day" + i];if (!f) continue;console.log(i + " " + f(fs.readFileSync("p" + i, { encoding: "utf8" }).replace(/\n$/, "")));
}
