// manually search for a block of bytes in the ROM

var readBytes = filebytes => {
  var hexList = [];
  for (var i = 0; i < filebytes.length; i++) {
    hexList.push(filebytes.charCodeAt(i).toString(16).padStart(2, '0'));
    }
    return hexList;
}

export default function manualSearch(address, numBytes, filebytes) {
  var hexList = readBytes(filebytes);

  var start = parseInt(address, 16);
  var end = start + parseInt(numBytes, 10);
  var vals = hexList.slice(start, end).map(function(num) {
    return parseInt(num, 16);
  });
  return {
      loc: start,
      data: vals
  }
}
