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


export { subtract_arrays, add_arrays, avg_arrays, neg_half_array, _1_multiply_array, _1_add_array }