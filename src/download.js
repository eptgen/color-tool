var fileDownload = require("js-file-download");

export default function renderDownload(currentPalettes, filename, filebytes) {
	
	var makeDownload = (str, name) => {
		// Copy over all the values into an array so the data doesn't get
		// corrupted
		var u8 = new Uint8Array(str.length)
		
		for(var i = 0; i < str.length; i++){
		  u8[i] = str.charCodeAt(i)
		}
	
		fileDownload(new Blob([u8], {type: "application/octet-stream"}), name);
	}
	
	var downloadRom = () => {
		var result = "";
		
		var sortedPalettes = JSON.parse(JSON.stringify(currentPalettes));
		sortedPalettes.sort((a, b) => a.loc - b.loc);
		// console.log(sortedPalettes);
		
		var lastInd = 0;
		for (var i = 0; i < sortedPalettes.length; i++) {
			var ind = sortedPalettes[i].loc;
			result += filebytes.substring(lastInd, ind);
			for (var j = 0; j < sortedPalettes[i].data.length; j++) {
				result += String.fromCharCode(sortedPalettes[i].data[j])
			}
			lastInd = ind + sortedPalettes[i].data.length; // starting from where the last palette ended
			console.log(result.length);
		}
		// console.log(lastInd);
		result += filebytes.substring(lastInd);
		// console.log(result.length);
		
		makeDownload(result, filename);
	}
	
	var makeHexString = (num, len) => {
		var result = "";
		var currentNum = num;
		for (var i = 0; i < len; i++) {
			var byt = currentNum % 256;
			result = String.fromCharCode(byt) + result;
			currentNum /= 256;
		}
		return result;
	}
	
	var downloadDiff = () => {
		var result = "PATCH";
		
		for (var i = 0; i < currentPalettes.length; i++) {
			var loc = currentPalettes[i].loc;
			var len = currentPalettes[i].data.length;
			result += makeHexString(loc, 3);
			result += makeHexString(len, 2);
			for (var j = 0; j < len; j++) {
				result += String.fromCharCode(currentPalettes[i].data[j]);
			}
		}
		
		result += "EOF";
		
		makeDownload(result, filename + ".ips");
	}
	
	var download = () => {
		// downloadRom();
		downloadDiff();
	}
	
	return (<button onClick={download}><i class="fa fa-search"></i>Download to Your Device</button>)
}