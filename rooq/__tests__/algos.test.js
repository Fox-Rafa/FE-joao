//const [subtract_arrays, add_arrays, avg_arrays, neg_half_array, _1_multiply_array, _1_add_array] = require('../new_algos/algebra')


function subtract_arrays(a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] - b[i]
  }
  return (a)
}

function add_arrays(a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] + b[i]
  }
  return (a)
}

function avg_arrays(a, b, c) {
  for (let i = 0; i < a.length; i++) {
    a[i] = (a[i] + b[i] + c[i]) / 3.0
  }
  return (a)
}

function neg_half_array(a) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] * -0.5
  }
  return (a)
}

function _1_multiply_array(a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] * b
  }
  return (a)
}

function _1_add_array(a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] + b
  }
  return (a)
}

console.log(subtract_arrays([4], [5]), [-1])
console.log(subtract_arrays([4, 5], [5, 6]), [-1, -1])
console.log(subtract_arrays([4, 8, 12], [5, 6, 7]), [-1, 2, 5])
console.log(subtract_arrays([4, 8, 12], [5, 6, 0.000001]), [-1, 2, 11.999999])
console.log()
console.log()
console.log(add_arrays([4], [5]), [9])
console.log(add_arrays([4, 5], [5, 6]), [9, 11])
console.log(add_arrays([4, 8, 12], [5, 6, 7]), [9, 14, 19])
console.log(add_arrays([4, 8, 12], [5, 6, 0.000001]), [9, 14, 12.000001])
console.log()
console.log()
// console.log(avg_arrays([4], [10]), [7])
// console.log(avg_arrays([4, 5], [10, 6]), [7, 5.5])
// console.log(avg_arrays([4, 8, 12], [5, 6, 7.3]), [4.5, 7, 9.65])
// console.log(avg_arrays([4, 8, 12], [5, 6, 0.000001]), [4.5, 7, 6.0000005])
// console.log()
// console.log()
console.log(neg_half_array([4]), [-2])
console.log(neg_half_array([4, 8, 12.123121]), [-4, -4, -6.0615605])
console.log()
console.log()
console.log(_1_multiply_array([4], 3), [12])
console.log(_1_multiply_array([4, 8, 12.123121], 12.31), [49.24, 98.48, 149.23561951])
console.log()
console.log()
console.log(_1_add_array([4], -3), [1])
console.log(_1_add_array([4, 8, 12.123121], 12.1), [16.1, 20.1, 24.223121])