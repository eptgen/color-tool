// Byte search functionality for color-tool

// Generate all permutations of a list
function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

// Returns n-1 elements of a list of length n.
function decrement(list) {
  var result = [];
  for (let i = 0; i < list.length; i++) {
    let copied = [...list];
    delete copied[i]
    result.push(copied);
  }
  return result;
}

// convert filebytes to readable hex string
var readBytes = filebytes => {
  var hexstring = [];
  for (var i = 0; i < filebytes.length; i++) {
    hexstring.push(filebytes.charCodeAt(i).toString(16).padStart(2, '0'));
    }
    return hexstring.join(' ');
}

export default function stringSearch(terms, filebytes) {
  var termList = terms.toLowerCase().split(' ');
  var filestring = readBytes(filebytes);
  var searchArray = [];
  var output = [];

  var exactMatch = termList.join(' ');
  var revMatch = termList.reverse().join(' ');
  searchArray.push(exactMatch, revMatch);

  // Decrement search
  if (termList.length >= 2) {
    var decMatch = decrement(termList);
    for (const d in decMatch) {
      searchArray.push(decMatch[d].filter(el => {
        return el !== null && el !== '';
      }).join(' '));
    }
  }

  // Permute search
  if (termList.length <= 4) {
    var permMatch = permute(termList);
    for (const p in permMatch) {
      searchArray.push(permMatch[p].join(' '));
    }
  }

  let newSearch = [...new Set(searchArray)]; // remove duplicates
  for (var i = 0; i < newSearch.length; i++) {
    var match = filestring.indexOf(newSearch[i]);
    output.push({
      loc: ((match/3)-3),
      data: newSearch[i].split(' ').map(function(num) {
        return parseInt(num, 16);
      })
    })
    while (match > -1) {
      match = filestring.indexOf(newSearch[i], match+1);
      output.push({
        loc: ((match/3)-3),
        data: newSearch[i].split(' ').map(function(num) {
          return parseInt(num, 16);
        })
      })
    }
    output.pop();
  }
  return output;
}
