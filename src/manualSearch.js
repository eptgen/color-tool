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

  var start = parseInt(address, 10);
  var end = start + parseInt(numBytes, 10);

  return hexList.slice(start, end).map(function(num) {
    return parseInt(num, 16);
  });
}
