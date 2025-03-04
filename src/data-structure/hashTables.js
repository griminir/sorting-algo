"use strict";
// hash tables are called objects in javascript, hashmaps in java, dictionaries in python and assosiative arrays in php
// insert O(1)
// lookup O(1)
// delete O(1)
// other operations are containskey O(1) and containsvalue O(n)
function findFirstNonRepeatedChar(input) {
    let map = new Map();
    let string = input.toLowerCase();
    for (let i = 0; i < string.length; i++) {
        if (map.has(string[i])) {
            let value = map.get(string[i]);
            map.set(string[i], value + 1);
        }
        else {
            map.set(string[i], 1);
        }
    }
    for (let [key, value] of map) {
        if (value === 1) {
            return key;
        }
    }
    return null;
}
const result = findFirstNonRepeatedChar('a green apple'); // g
console.log(result);
// sets are like arrays but they cannot have duplicates
// sets work like hash tables but only have keys
function removeDuplicates(input) {
    return [...new Set(input)];
}
const result2 = removeDuplicates([1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9, 9]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(result2);
function findFirstRepeatedChar(input) {
    let set = new Set();
    let string = input.toLowerCase();
    for (let i = 0; i < string.length; i++) {
        if (set.has(string[i])) {
            return string[i];
        }
        else {
            set.add(string[i]);
        }
    }
    return null;
}
const result3 = findFirstRepeatedChar('green apple'); // e
console.log(result3);
// open addressing: our hash1 is key % table.length
// - linear probing (hash1 +1) % table.length
// - quadratic probing (hash1 + i^2) % table.length
// - double hashing (hash1 + i * hash2) % table.length
// popular second hash: hash2(key) = prime - (key % prime)
// where prime is a prime number smaller than the table size
// example of double hashing key is 11, table size is 5
// hash1: key % table.length = 11 % 5 = 1
// index 1 is taken, so we use double hashing
// hash2: prime - (key % prime) = 3 - (11 % 3) = 1
// hash1 + taken index * hash2 % table.length = (1 + 1 * 1) % 5 = 2
class Entry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class HomemadeHashTable {
    constructor(size) {
        this.table = new Array(size).fill(null);
    }
    put(key, value) {
        let index = this.hash1(key);
        if (this.table[index] === null) {
            this.table[index] = new Entry(key, value);
        }
        else if (this.table[index].key === key) {
            this.table[index].value = value;
        }
        else {
            let i = 1;
            while (i < this.table.length) {
                let newIndex = (index + i * this.hash2(key)) % this.table.length;
                if (this.table[newIndex] === null) {
                    this.table[newIndex] = new Entry(key, value);
                    return;
                }
                else if (this.table[newIndex].key === key) {
                    this.table[newIndex].value = value;
                    return;
                }
                i++;
            }
            throw new Error('hash table is full');
        }
    }
    get(key) {
        let index = this.hash1(key);
        if (this.table[index] !== null && this.table[index].key === key) {
            return this.table[index].value;
        }
        else {
            let i = 1;
            while (i < this.table.length) {
                let newIndex = (index + i * this.hash2(key)) % this.table.length;
                if (this.table[newIndex] !== null &&
                    this.table[newIndex].key === key) {
                    return this.table[newIndex].value;
                }
                i++;
            }
        }
        return null;
    }
    remove(key) {
        let index = this.hash1(key);
        if (this.table[index] !== null && this.table[index].key === key) {
            this.table[index] = null;
        }
        else {
            let i = 1;
            while (i < this.table.length) {
                let newIndex = (index + i * this.hash2(key)) % this.table.length;
                if (this.table[newIndex] !== null &&
                    this.table[newIndex].key === key) {
                    return;
                }
                i++;
            }
        }
    }
    hash1(key) {
        return key % this.table.length;
    }
    hash2(key) {
        let prime = 3;
        return prime - (key % prime);
    }
}
let selfmadeHashTable = new HomemadeHashTable(5);
selfmadeHashTable.put(1, 'apple');
selfmadeHashTable.put(2, 'banana');
selfmadeHashTable.put(3, 'cherry');
selfmadeHashTable.put(4, 'pineapple');
selfmadeHashTable.put(15, 'date');
selfmadeHashTable.put(1, 'grape');
selfmadeHashTable.remove(1);
console.log(selfmadeHashTable.get(1)); // grape was removed
console.log(selfmadeHashTable.get(2)); // banana
console.log(selfmadeHashTable.get(3)); // cherry
console.log(selfmadeHashTable.get(4)); // pineapple
console.log(selfmadeHashTable.get(15)); // date
console.log(selfmadeHashTable.get(5)); // null asking for something that does not exsist
selfmadeHashTable.put(5, 'kiwi');
console.log(selfmadeHashTable.get(5)); // kiwi
selfmadeHashTable.remove(15);
console.log(selfmadeHashTable);
