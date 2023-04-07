import { Buffer } from 'buffer';

function b64_to_int(base64_string) {
  var buffer = Buffer.from(base64_string, 'base64');
  const len = buffer.length

  const arr = [];
  for (var i = 0; i < len; i += 2) {
    arr.push((buffer[i] << 8) + buffer[i + 1])
  }

  return (arr)
}


function b64_to_lg_int(base64_string) {
  var buffer = Buffer.from(base64_string, 'base64');

  const num = (buffer[3] << 24) + (buffer[2] << 16) + (buffer[1] << 8) + buffer[0]

  return (num)
}

function b64_to_flt(base64_string) {
  return (Buffer.from(base64_string, 'base64').readFloatLE(0))
}

function decodeLead(start, pckts) {
  var lead_arr = []
  for (let i = start; i < start + 250; i++) {
    lead_arr = lead_arr.concat(b64_to_int(pckts[i]))
  }

  return (lead_arr)
}

export { b64_to_int, b64_to_lg_int, b64_to_flt, decodeLead }