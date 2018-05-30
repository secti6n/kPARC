from __future__ import print_function
import numpy as np
import hashlib
import re
import itertools
from itertools import groupby
import json
from operator import ge, le
from scipy.ndimage import generic_filter
import scipy.ndimage as ndimage
from collections import namedtuple
import collections
from functools import reduce
from itertools import combinations
from operator import mul
f = open('p1')
contents = f.read()
#print("Floor:", contents.count('(') - contents.count(')'))

# Part Two
change = {'(': 1, ')': -1}

floor = 0
position = 1
for c in contents:
    if c in change:
        floor += change[c]
    if floor == -1:
        print("Basement entered at position:", position)
        break
    position += 1

verbose = False

f = open('p2')

total_paper = 0
total_ribbon = 0
for line in f:
    if verbose:
        print("line:", line)
    l, w, d = line.split('x')
    l, w, d = int(l), int(w), int(d)
    if verbose:
        print("Dimensions:", l, w, d)

    # paper
    s1 = l * w
    s2 = l * d
    s3 = w * d
    extra = min(s1, s2, s3)
    paper_needed = 2*s1 + 2*s2 + 2*s3 + extra
    if verbose:
        print("Paper needed for present:", paper_needed)
    total_paper += paper_needed

    # ribbon
    ribbon = min(l+l+w+w, l+l+d+d, w+w+d+d)
    bow = l * w * d
    total_ribbon += (ribbon + bow)

print("Total paper needed:", total_paper, "  Total ribbin needed:", total_ribbon)


verbose = False

with open('p3') as f:
    directions = f.read().strip()


index_delta = {
    '^': (0, 1),
    'v': (0, -1),
    '>': (1, 0),
    '<': (-1, 0),
}

grid = np.zeros((1000, 1000), dtype='int32')
x = 500
y = 500
grid[x, y] = 1

for direction in directions:
    delta_x, delta_y = index_delta[direction]
    if verbose:
        print("direction:", direction)
        print("delta_x:", delta_x)
        print("delta_y", delta_y)
    x += delta_x
    y += delta_y
    grid[x, y] += 1

# print("Unique houses:", len(np.nonzero(grid)[0]))

verbose = False

with open('p3') as f:
    directions = f.read().strip()


index_delta = {
    '^': (0, 1),
    'v': (0, -1),
    '>': (1, 0),
    '<': (-1, 0),
}

grid = np.zeros((1000, 1000), dtype='int32')
santa_x = 500
santa_y = 500
robot_x = 500
robot_y = 500
grid[santa_x, santa_y] = 1

for i, direction in enumerate(directions):
    delta_x, delta_y = index_delta[direction]
    if verbose:
        print("direction:", direction)
        print("delta_x:", delta_x)
        print("delta_y", delta_y)
    if (i % 2) == 0:
        santa_x += delta_x
        santa_y += delta_y
        grid[santa_x, santa_y] += 1
    else:
        robot_x += delta_x
        robot_y += delta_y
        grid[robot_x, robot_y] += 1


print("Unique houses:", len(np.nonzero(grid)[0]))


puzzle_input = 'yzbqklnj'
def find_answer(secret_key):
    for i in xrange(10000000):
        message = secret_key + str(i)
        if hashlib.md5(message).hexdigest()[:5] == '00000':
            return i
    return None
def find_six_zeros(secret_key):
    for i in xrange(10000000):
        message = secret_key + str(i)
        if hashlib.md5(message).hexdigest()[:6] == '000000':
            return i
    return None

#print('abcdef:', find_answer('abcdef'))
#print('pqrstuv:', find_answer('pqrstuv'))
#print('puzzle input:', find_answer(puzzle_input), 'puzzle input:', find_six_zeros(puzzle_input))
#print('md5')


def is_nice(string):

    # Does NOT contain strings
    for s in ['ab', 'cd', 'pq', 'xy']:
        if s in string:
            return False

    # contains at least three vowels
    vowels = (string.count('a') + string.count('e') + string.count('i') +
              string.count('o') + string.count('u'))
    if vowels < 3:
        return False

    # contains at least one letter that appears twice in a row
    if any([string[i] == string[i+1] for i in range(len(string)-1)]):
        return True
    else:
        return False

test_strings = ['ugknbfddgicrmopn', 'aaa', 'jchzalrnumimnmhp',
                'haegwjzuvuyypxyu', 'dvszwmarrgswjxmb']
#for test_string in test_strings:
#    print(test_string, ":", is_nice(test_string))

f = open('p5')
nice_strings = 0
for line in f:
    if is_nice(line.strip()):
        nice_strings += 1
# print("Nice strings:", nice_strings)
f.close()


def is_nice(string):

    # repeats with exactly one letter between them
    if not any([string[i] == string[i+2] for i in range(len(string)-2)]):
        return False

    # pair appears at least twice
    if any([(string.count(string[i:i+2])>=2) for i in range(len(string)-2)]):
        return True
    return False

test_strings = [
    'qjhvhtzxzqqjkmpb',
    'xxyxx',
    'uurcxstgmygtbstg',
    'ieodomkazucvgmuy']

#for test_string in test_strings:
#    print(test_string, ":", is_nice(test_string))

f = open('p5')
nice_strings = 0
for line in f:
    if is_nice(line.strip()):
        nice_strings += 1
print("Nice strings:", nice_strings)
f.close()


verbose = False

grid = np.zeros((1000, 1000), 'int32')

f = open('p6')

for line in f:
    line = line.strip()
    lline = line.split()
    if verbose:
        print("line:", line)
        print("lline:", lline)

    # Turn on/off
    if lline[0] == 'turn':
        x1, y1 = lline[2].split(',')
        x2, y2 = lline[4].split(',')
        x1, x2, y1, y2 = int(x1), int(x2), int(y1), int(y2)
        if lline[1] == 'on':
            grid[x1:x2+1, y1:y2+1] = 1
        else:
            assert lline[1] == 'off'
            grid[x1:x2+1, y1:y2+1] = 0

    # Troggle
    else:
        assert lline[0] == 'toggle'
        x1, y1 = lline[1].split(',')
        x2, y2 = lline[3].split(',')
        x1, x2, y1, y2 = int(x1), int(x2), int(y1), int(y2)
        grid[x1:x2+1, y1:y2+1] = np.logical_not(grid[x1:x2+1, y1:y2+1])
    if verbose:
        print('x1, y1:', x1, y1)
        print('x2, y2:', x2, y2)
print(np.sum(grid))

f.close()



class Wire(object):

    def __init__(self, line):
        self._line = line
        self.parse_line(line)

    def parse_line(self, line):
        lline = line.split()
        self.output = lline[-1]

        left = lline[:-2]
        self.op = 'ASSIGN'
        for op in ['NOT', 'AND', 'OR', 'LSHIFT', 'RSHIFT']:
            if op in left:
                self.op = op
                left.remove(op)
        self.inputs = [int(i) if i.isdigit() else i for i in left]

    def reset(self):
        self.parse_line(self._line)

    def evaluate(self):
        if self.op == 'ASSIGN':
            return int(self.inputs[0])
        elif self.op == 'NOT':
            return int(65535 - self.inputs[0])
        elif self.op == 'AND':
            return int(self.inputs[0] & self.inputs[1])
        elif self.op == 'OR':
            return int(self.inputs[0] | self.inputs[1])
        elif self.op == 'LSHIFT':
            return int(self.inputs[0] << self.inputs[1])
        elif self.op == 'RSHIFT':
            return int(self.inputs[0] >> self.inputs[1])
        else:
            raise ValueError('invalid operator')

    def fill_inputs(self, signals):
        self.inputs = [signals[i] if i in signals else i for i in self.inputs]

    def iscomplete(self):
        return all([isinstance(i, int) for i in self.inputs])


with open('p7') as f:
    wires = [Wire(line) for line in f]
wires_copy = list(wires)


def evaluate_circuit(wires, signals):
    local_wires = list(wires)
    while len(local_wires) != 0:
        new_wires = []
        for wire in wires:
            if wire.iscomplete():
                signals[wire.output] = wire.evaluate()
            else:
                wire.fill_inputs(signals)
                new_wires.append(wire)
        local_wires = new_wires
    return signals


signals = evaluate_circuit(wires, {})
# print('a', signals['a'])

[wire.reset() for wire in wires]
wires = [wire for wire in wires if wire.output != 'b']
signals = evaluate_circuit(wires, {'b': signals['a']})
print('a', signals['a'])

verbose = False


def size_in_memory(string):
    assert string[0] == '"'
    assert string[-1] == '"'
    in_mem = string[1:-1]
    in_mem = in_mem.replace("\\\\", "x")
    in_mem = in_mem.replace("\\\"", "x")
    in_mem, _ = re.subn('\\\\x..', 'x', in_mem)
    return len(in_mem)


def size_escaped(string):
    escaped = string
    escaped = escaped.replace("\\", "\\\\")
    escaped = escaped.replace('"', '\\"')
    escaped = '"' + escaped + '"'
    return len(escaped)


f = open('p8')
# uncomment to run test strings
#f = ['""', '"abc"', '"aaa\\"aaa"', '"\\x27"']

total_chars_code = 0
total_chars_memory = 0
total_chars_escaped = 0

for line in f:
    line = line.strip()

    chars = len(line)
    in_mem = size_in_memory(line)
    escaped = size_escaped(line)
    if verbose:
        print(line, chars, in_mem, escaped)

    total_chars_code += len(line)
    total_chars_memory += size_in_memory(line)
    total_chars_escaped += escaped

# print("total characters in string codes:", total_chars_code)
# print("total characters in memory:", total_chars_memory)
# print("total characters escaped", total_chars_escaped)
# print("")
# print("code - memory:", total_chars_code - total_chars_memory)
print("escaped - code:", total_chars_escaped - total_chars_code)

verbose = False


# read in the locations and distances from the file
#f = open('inputs/input09_test.txt')
f = open('p9')

path = {}
locations = []

for line in f:
    lline = line.split()
    city1 = lline[0]
    city2 = lline[2]
    distance = int(lline[4])

    path[city1 + city2] = distance
    path[city2 + city1] = distance

    locations.append(city1)
    locations.append(city2)
f.close()

locations = set(locations)  # find unique locations
if verbose:
    print(locations)
    print(path)


# find shortest route
shortest_route_length = 999999
for route in itertools.permutations(locations):
    route_length = 0
    for city1, city2 in zip(route[:-1], route[1:]):
        route_length += path[city1 + city2]
    if verbose:
        print(route, route_length)
    if route_length < shortest_route_length:
        shortest_route_length = route_length
# print("Shortest route length:", shortest_route_length)

# find longest route
longest_route_length = 0
for route in itertools.permutations(locations):
    route_length = 0
    for city1, city2 in zip(route[:-1], route[1:]):
        route_length += path[city1 + city2]
    if verbose:
        print(route, route_length)
    if route_length > longest_route_length:
        longest_route_length = route_length
print("Longest route length:", longest_route_length)

with open('p10') as f:
    s = f.read().strip()

# s = '1113122113'
for i in range(40):
    s = ''.join([str(len(list(g)))+k for k, g in groupby(s)])
print(len(s))

# Part Two, 10 additional application
#for i in range(10):
#    s = ''.join([str(len(list(g)))+k for k, g in groupby(s)])
#print(len(s))

letters = 'abcdefghijklmnopqrstuvwxyz'
doubles = [c+c for c in letters]
straights = [''.join(t) for t in zip(letters[:-2], letters[1:-1], letters[2:])]
next_letter = {c1: c2 for c1, c2 in zip(letters, letters[1:]+'a')}


def is_valid(s):
    # cannot contain i, o, or l
    if 'i' in s or 'o' in s or 'l' in s:
        return False
    # must include two different pairs of letters
    if sum([d in s for d in doubles]) < 2:
        return False
    # must include a straight of length 3 or greater
    if not any([d in s for d in straights]):
        return False
    return True


def next_password(s):
    s = s[:-1] + next_letter[s[-1]]  # increment the last letter
    for i in range(-1, -8, -1):
        if s[i] == 'a':  # increment n-1 letter is n letter changed to 'a'
            s = s[:i-1] + next_letter[s[i-1]] + s[i:]
        else:
            break
    return s

with open('p11') as f:
    password = f.read().strip()

while is_valid(password) == False:
    password = next_password(password)
print(password)

#password = next_password(password)
#while is_valid(password) == False:
#    password = next_password(password)
#print(password)


def sum_of_item(item, skip_red=False):

    if isinstance(item, list):
        return sum([sum_of_item(i, skip_red) for i in item])

    if isinstance(item, dict):
        if skip_red and 'red' in item.values():
            return 0
        return sum([sum_of_item(i, skip_red) for i in item.values()])

    if isinstance(item, unicode):
        return 0

    if isinstance(item, int):
        return item

with open('p12') as f:
    abacus = json.load(f)
# print(sum_of_item(abacus))
print(sum_of_item(abacus, skip_red=True))

verbose = False

happiness = {}
people = set()

#f = open('inputs/input13_test.txt')
f = open('p13')
for line in f:

    split_line = line.split()

    person1 = split_line[0]
    direction = split_line[2]
    amount = int(split_line[3])
    person2 = split_line[10][:-1]

    if verbose:
        print(person1, direction, amount, person2)

    people.add(person1)
    people.add(person2)

    if direction == 'lose':
        happiness[person1+person2] = -amount
    else:
        assert direction == 'gain'
        happiness[person1+person2] = amount
f.close()

if verbose:
    print(people)
    print(happiness)


def find_maximum_happiness(people, happiness):
    maximum_happiness = 0
    for arragement in itertools.permutations(people):
        happiness_gained = 0
        for person1, person2 in zip(arragement[:-1], arragement[1:]):
            happiness_gained += happiness[person1 + person2]
            happiness_gained += happiness[person2 + person1]
        # add happiness for first and last pair
        person1 = arragement[0]
        person2 = arragement[-1]
        happiness_gained += happiness[person1 + person2]
        happiness_gained += happiness[person2 + person1]
        maximum_happiness = max(maximum_happiness, happiness_gained)

        if verbose:
            print(arragement, happiness_gained)
    return maximum_happiness

# print(find_maximum_happiness(people, happiness))

# part b
for person in people:
    happiness['Self' + person] = 0
    happiness[person + 'Self'] = 0
people.add('Self')
print(find_maximum_happiness(people, happiness))


class Reindeer(object):

    def __init__(self, name, speed, flight_time, rest_time):
        self.name = name
        self.speed = int(speed)
        self.flight_time = int(flight_time)
        self.rest_time = int(rest_time)

    def dist(self, time):
        cycle_time = self.flight_time + self.rest_time
        cycles, remain = divmod(time, cycle_time)
        dist = cycles * self.speed * self.flight_time
        if remain > self.flight_time:
            dist += self.speed * self.flight_time
        else:
            dist += remain * self.speed
        return dist


if __name__ == "__main__":

    specs = re.findall(r'(\w+) can fly (\d+) .* (\d+) .* (\d+)',
                       open('p14').read())
    barn = [Reindeer(*spec) for spec in specs]

    # part one
    max([reindeer.dist(2503) for reindeer in barn])

    # part two
    for reindeer in barn:
        reindeer.points = 0
    for time in range(1, 2504):
        dists = [reindeer.dist(time) for reindeer in barn]
        max_dist = max(dists)
        for i, reindeer in enumerate(barn):
            if dists[i] == max_dist:
                reindeer.points += 1
    print('reindeer: ', max([reindeer.points for reindeer in barn]))

nums = re.compile(r'-?\d+')
a = open('p15').readlines()
(c0prop,c1prop,c2prop,c3prop) = tuple(map(lambda s:np.array(map(int,nums.findall(s))),a))

max_score = 0
max_500_score = 0
for c0 in range(101):
    for c1 in range(0, 101-c0):
        remain = 100 - c0 - c1
        c2 = np.arange(remain + 1)
        c3 = remain - c2

        sums_of_prop = (c0*c0prop + c1*c1prop +
                        np.outer(c2, c2prop) + np.outer(c3, c3prop))
        calories = sums_of_prop[:, -1]
        sums_of_prop = sums_of_prop[:, :-1]  # remove calories
        sums_of_prop[sums_of_prop < 0] = 0   # replace negatives with zeros

        max_score = max(np.prod(sums_of_prop, axis=1).max(), max_score)

        # part B, find all the cookies with 500 calories
        cal_500_prop = sums_of_prop[calories == 500]
        if len(cal_500_prop) == 0:
            continue
        max_500_score = max(np.prod(cal_500_prop, axis=1).max(), max_500_score)

# print(max_score)
print(max_500_score)

KNOWN = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1,
}

SPECIAL = {'cats': le, 'trees': le, 'pomeranians': ge, 'goldfish': ge}


def is_real_aunt_parta(things, values):
    for thing, value in zip(things, values):
        if KNOWN[thing] != int(value):
            return False
    return True


def is_real_aunt_partb(things, values):

    for special_thing, compare in SPECIAL.items():
        if special_thing in things:
            number_of_things = int(values.pop(things.index(special_thing)))
            things.remove(special_thing)
            if compare(number_of_things, KNOWN[special_thing]):
                return False

    return is_real_aunt_parta(things, values)


pattern = 'Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)'
for match in re.findall(pattern, open('p16').read()):
    num = match[0]
    things = list(match[1::2])
    values = list(match[2::2])

    if is_real_aunt_parta(things, values):
        pass
#        print("Part A:", num)

    if is_real_aunt_partb(things, values):
        print("Part B", num)


def sum_to(containers, goal, values_in_goal=0):
    """
    Find all sets of containers which sum to goal, store the number of
    containers used to reach the goal in the sizes variable.
    """
    if len(containers) == 0:
        return 0

    first = containers[0]
    remain = containers[1:]

    if first > goal:
        with_first = 0
    elif first == goal:
        sizes.append(values_in_goal + 1)
        with_first = 1
    else:
        with_first = sum_to(remain, goal-first, values_in_goal + 1)

    return with_first + sum_to(remain, goal, values_in_goal)


# example
# sizes = []
# containers = [20, 15, 10, 5, 5]
# sum_to(containers, 25)
# print(sum(min(sizes) == size for size in sizes))

# input data
sizes = []
with open('p17') as f:
    containers = [int(x) for x in f]
print(sum_to(containers, 150), sum(min(sizes) == size for size in sizes))


verbose = False


def state_of_light(neighbors):
    light = neighbors[4]
    on = np.sum(neighbors)
    if light:  # light is on
        if on == 3 or on == 4:  # 2 or 3 neighbors plus itself
            return 1
        else:
            return 0
    else:   # light is off
        if on == 3:
            return 1
        else:
            return 0


def print_grid(grid):
    for row in grid:
        print(''.join([['.', '#'][i] for i in row]))


def take_steps(grid, steps, partb=False):
    if verbose:
        print("Initial Grid")
        print_grid(grid)
    for i in range(steps):
        new_grid = generic_filter(
            grid, state_of_light, size=3, mode='constant')
        if partb:
            new_grid[0, 0] = 1
            new_grid[0, -1] = 1
            new_grid[-1, 0] = 1
            new_grid[-1, -1] = 1
        if verbose:
            print()
            print("After step", i+1)
            print_grid(new_grid)
        grid = new_grid
    return grid


# Example
example_grid = np.array([
    [0, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 0]])
# grid = take_steps(example_grid, 4)
# print(np.sum(grid))

input_grid = np.ones((100, 100), dtype='int')
for row_num, line in enumerate(open('p18')):
    row = [{'#': 1, '.': 0}[i] for i in line.strip()]
    input_grid[row_num, :] = row

# part a
grid = take_steps(input_grid, 100)
np.sum(grid)

# part b
grid = take_steps(input_grid, 100, partb=True)
print(np.sum(grid))


def find_all_replacements(base_molecule, match, replace):
    indices = [m.start() for m in re.finditer(match, base_molecule)]
    lm = len(match)
    return [base_molecule[:i]+replace+base_molecule[i+lm:] for i in indices]

molecules = set()
test_molecule = 'HOHOHO'
molecules.update(find_all_replacements(test_molecule, 'H', 'HO'))
molecules.update(find_all_replacements(test_molecule, 'H', 'OH'))
molecules.update(find_all_replacements(test_molecule, 'O', 'HH'))
# print(len(molecules))

# Part A
lines = [line for line in open('p19')]
base_molecule = lines[-1].strip()

molecules = set()
for line in lines:
    if '=>' not in line:
        continue
    match, _, replace = line.split()
    molecules.update(find_all_replacements(base_molecule, match, replace))
#print(len(set(molecules)))
"""
rules = {}
with open('p19') as f:
    rule_block, string = map(str.strip, f.read().split('\n\n'))
    lines = rule_block.split('\n')
    for line in lines:
        a, _, b = line.split()
        rules[b] = a

# Greedily sort by largest replacement
sorted_rules = sorted(rules.keys(), reverse=True, key=len)

# Recursively replace as much as possible, add up depth on the way back
def search_and_replace(s):
    if s == 'e':
        return 0
    return 1 + next(search_and_replace(s.replace(t, rules[t], 1))
                    for t in sorted_rules if t in s)

print search_and_replace(string)
"""
print(0)


BIG_NUM = 1000000  # try factors of 10 until solution found

with open('p20') as f:
    goal = int(f.readline())
houses_a = np.zeros(BIG_NUM)
houses_b = np.zeros(BIG_NUM)

for elf in xrange(1, BIG_NUM):
    houses_a[elf::elf] += 10 * elf
    houses_b[elf:(elf+1)*50:elf] += 11 * elf
print(np.nonzero(houses_a >= goal)[0][0], np.nonzero(houses_b >= goal)[0][0])

nums = re.compile(r'-?\d+')
with open('p21') as f:
    a = f.readlines()
    (BOSS_HIT_POINTS,BOSS_DAMAGE,BOSS_ARMOR) = tuple(map(lambda s:int(nums.findall(s)[0]),a))

Item = namedtuple('Item', ['name', 'cost', 'dmg', 'armor'])

WEAPONS = [
    Item('Dagger',        8,     4,       0),
    Item('Shortsword',   10,     5,       0),
    Item('Warhammer',    25,     6,       0),
    Item('Longsword',    40,     7,       0),
    Item('Greataxe',     74,     8,       0),
]
ARMOR = [
    Item('Nothing',       0,     0,       0),
    Item('Leather',      13,     0,       1),
    Item('Chainmail',    31,     0,       2),
    Item('Splintmail',   53,     0,       3),
    Item('Bandedmail',   75,     0,       4),
    Item('Platemail',   102,     0,       5),
]

RINGS = [
    Item('Nothing 1',     0,     0,       0),
    Item('Nothing 2',     0,     0,       0),
    Item('Damage +1',    25,     1,       0),
    Item('Damage +2',    50,     2,       0),
    Item('Damage +3',   100,     3,       0),
    Item('Defense +1',   20,     0,       1),
    Item('Defense +2',   40,     0,       2),
    Item('Defense +3',   80,     0,       3),
]


def does_player_win(player_hit, player_dmg, player_armor,
                    boss_hit, boss_dmg, boss_armor):

    boss_loss_per_turn = player_dmg - boss_armor
    if boss_loss_per_turn < 1:
        boss_loss_per_turn = 1
    player_loss_per_turn = boss_dmg - player_armor
    if player_loss_per_turn < 1:
        player_loss_per_turn = 1

    # the player goes first and gets n+1 turns
    n, remain = divmod(boss_hit, boss_loss_per_turn)
    if remain == 0:
        n -= 1
    if player_loss_per_turn * (n) >= player_hit:
        return False
    return True


min_cost = 999
max_cost = 0
for weapon in WEAPONS:
    for armor in ARMOR:
        for ring1 in RINGS:
            for ring2 in RINGS:

                # cannot own two of the same ring
                if ring1.name == ring2.name:
                    continue

                player_hit = 100
                player_dmg = weapon.dmg + ring1.dmg + ring2.dmg
                player_armor = armor.armor + ring1.armor + ring2.armor
                cost = weapon.cost + armor.cost + ring1.cost + ring2.cost

                if does_player_win(player_hit, player_dmg, player_armor,
                                   BOSS_HIT_POINTS, BOSS_DAMAGE, BOSS_ARMOR):
                    # part a, lowest cost items to win
                    min_cost = min(cost, min_cost)
                else:
                    # part b, highest cost items and still lose
                    max_cost = max(cost, max_cost)
# print(min_cost)
print(max_cost)



SPELL_COSTS = {
    'magic_missle': 53,
    'drain': 73,
    'shield': 113,
    'poison': 173,
    'recharge': 229,
}


def apply_effects(game):
    if game['shield_timer']:
        game['shield_timer'] = game['shield_timer'] - 1
        if game['shield_timer'] == 0:
            game['player_armor'] = 0
    if game['poison_timer']:
        game['boss_hp'] = game['boss_hp'] - 3
        game['poison_timer'] = game['poison_timer'] - 1
    if game['recharge_timer']:
        game['player_mana'] = game['player_mana'] + 101
        game['recharge_timer'] = game['recharge_timer'] - 1


def player_turn(game, spell):
    if spell == 'magic_missle':
        game['boss_hp'] = game['boss_hp'] - 4
    elif spell == 'drain':
        game['boss_hp'] = game['boss_hp'] - 2
        game['player_hp'] = game['player_hp'] + 2
    elif spell == 'shield':
        game['shield_timer'] = 6
        game['player_armor'] = game['player_armor'] + 7
    elif spell == 'poison':
        game['poison_timer'] = 6
    elif spell == 'recharge':
        game['recharge_timer'] = 5
    game['player_mana'] = game['player_mana'] - SPELL_COSTS[spell]


def boss_turn(game):
    dmg = max(game['boss_dmg'] - game['player_armor'], 1)
    game['player_hp'] = game['player_hp'] - dmg


def check_for_endgame(game, min_mana_spent):
    if game['boss_hp'] <= 0:
        min_mana_spent = min(game['mana_spent'], min_mana_spent)
        return 1, min_mana_spent
    if game['player_hp'] <= 0:
        return 2, min_mana_spent
    return 0, min_mana_spent


def find_minimal_mana(game, part_b):
    min_mana_spent = 9999999
    games = [game]
    while len(games):
        games, min_mana_spent = try_all_games(games, min_mana_spent, part_b)
    return min_mana_spent


def try_all_games(games, min_mana_spent, part_b):
    new_games = []
    for game in games:

        if part_b:
            game['player_hp'] = game['player_hp'] - 1
        endgame, min_mana_spent = check_for_endgame(game, min_mana_spent)
        if endgame:
            continue

        # apply player's turn effects
        apply_effects(game)
        endgame, min_mana_spent = check_for_endgame(game, min_mana_spent)
        if endgame:
            continue

        min_mana_spent = try_all_spells(game, min_mana_spent, new_games)

    return new_games, min_mana_spent


def try_all_spells(game, min_mana_spent, new_games):
    castable_spells = [spell for spell, cost in SPELL_COSTS.items()
                       if cost <= game['player_mana']]
    if game['shield_timer'] and 'shield' in castable_spells:
        castable_spells.remove('shield')
    if game['poison_timer'] and 'poison' in castable_spells:
        castable_spells.remove('poison')
    if game['recharge_timer'] and 'recharge' in castable_spells:
        castable_spells.remove('recharge')

    for spell in castable_spells:

        sub_game = game.copy()
        sub_game['spells_cast'] = list(sub_game['spells_cast']) + [spell]
        sub_game['mana_spent'] = sub_game['mana_spent']+SPELL_COSTS[spell]

        # players turn
        player_turn(sub_game, spell)
        endgame, min_mana_spent = check_for_endgame(sub_game, min_mana_spent)
        if endgame:
            continue

        # end early is too much mana spent
        if sub_game['mana_spent'] > min_mana_spent:
            continue

        # boss's turn
        apply_effects(sub_game)
        endgame, min_mana_spent = check_for_endgame(sub_game, min_mana_spent)
        if endgame:
            continue

        boss_turn(sub_game)
        endgame, min_mana_spent = check_for_endgame(sub_game, min_mana_spent)
        if endgame:
            continue

        new_games.append(sub_game)
    return min_mana_spent


initial_game = {
    'player_hp': 50,
    'player_mana': 500,
    'player_armor': 0,


    'shield_timer': 0,
    'poison_timer': 0,
    'recharge_timer': 0,

    'spells_cast': [],
    'mana_spent': 0,
}

nums = re.compile(r'-?\d+')
with open('p22') as f:
    initial_game['boss_hp'] = int(nums.findall(f.readline())[0])
    initial_game['boss_dmg'] = int(nums.findall(f.readline())[0])
    
find_minimal_mana(initial_game.copy(), part_b=False)
print(find_minimal_mana(initial_game.copy(), part_b=True))


verbose = False


class Computer(object):

    a = 0
    b = 0
    pointer = 0
    program = None

    def run_program(self, program, a=0):
        self.a = a
        self.b = 0
        self.pointer = 0
        self.program = program
        self.program_length = len(program)
        while self.pointer < self.program_length:
            instruction = self.program[self.pointer]
            self.execute_instruction(instruction)
        return

    def execute_instruction(self, instruction):
        command, register = instruction[0], instruction[1]

        if command == 'hlf':
            if register == 'a':
                self.a /= 2
            else:
                self.b /= 2
            self.pointer += 1

        elif command == 'tpl':
            if register == 'a':
                self.a *= 3
            else:
                self.b *= 3
            self.pointer += 1

        elif command == 'inc':
            if register == 'a':
                self.a += 1
            else:
                self.b += 1
            self.pointer += 1

        elif command == 'jmp':
            self.pointer += int(register)  # register is actually an offset

        elif command == 'jie':
            if {'a,': self.a, 'b,': self.b}[register] % 2 == 0:
                self.pointer += int(instruction[2])
            else:
                self.pointer += 1

        elif command == 'jio':
            if {'a,': self.a, 'b,': self.b}[register] == 1:
                self.pointer += int(instruction[2])
            else:
                self.pointer += 1
        else:
            raise ValueError("invalid instruction:", instruction)
        if verbose:
            print("After instructions: ", instruction)
            print("a:", self.a, "b:", self.b, "pointer:", self.pointer)
        return


# Example
computer = Computer()

example_program = [
    ['inc', 'a'],
    ['jio', 'a,', '+2'],
    ['tpl', 'a'],
    ['inc', 'a']
]

computer.run_program(example_program)
# print(computer.a)

# part a
program = [line.split() for line in open('p23')]
computer.run_program(program)
# print(computer.b)

# part b
computer.run_program(program, a=1)
print(computer.b)
#!/usr/bin/python
# -*- coding: utf-8 -*-

# author coolharsh55
# Harshvardhan J. Pandit

# store all packages
packages = []

# parse input to get list of packages
with open('p24', 'r') as f:
    for line in f.readlines():
        packages.append(int(line.strip()))

# number of package groups on the sleigh
NO_GROUPS = 4

# calculate the weight of each package group
# since all 3 weigh the same,
# 3 * weight(package_group) = weight(packages)
weight_package_group = sum(packages) // NO_GROUPS

# arbitrary high value for initial minimum quantum entanglement
# will get replaced with whatever first QE is calculated
ARBITRARY_HIGH_VALUE = 999999999999999
min_quantum_entanglement = ARBITRARY_HIGH_VALUE

for no_packages in range(2, len(packages)):
    for arrangement in combinations(packages, no_packages):
        # if the weight is equal,
        # check if the QE is lesser than stored min value
        if sum(arrangement) == weight_package_group:
            min_quantum_entanglement = min(
                min_quantum_entanglement,
                reduce(mul, arrangement))
    # if the min QE value has changed from ARBITRARY HIGH VALUE,
    # we've got the minimum QE value
    if min_quantum_entanglement < ARBITRARY_HIGH_VALUE:
        break

# print package with minimum quantum entanglement
print(min_quantum_entanglement)

def next_code(code):
    return code * 252533 % 33554393

# column and row for the input
nums = re.compile(r'-?\d+')
with open('p25') as f:
    a = f.readlines()
    (row,column) = tuple(map(int,nums.findall(a[0])))
    
# moving between column adds 2, 3, 4, ... to the code number
code_at_column_start = np.sum(np.arange(2, column + 1)) + 1
# moving down a column adds the column number, +1, +2 ...
code_number = code_at_column_start + np.sum(np.arange(column, column+row-1))

code = 20151125
for i in xrange(code_number - 1):
    code = next_code(code)
print(code)
"""
The MIT License (MIT)

Copyright (c) Jonathan J. Helmus 2015 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
