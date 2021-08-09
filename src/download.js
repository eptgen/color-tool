var fileDownload = require("js-file-download");

export default function renderDownload(currentPalettes, filename, filebytes) {

	var download = () => {
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
		
		// Copy over all the values into an array so the data doesn't get
		// corrupted
		var u8 = new Uint8Array(result.length)
		
		for(var i = 0; i < result.length; i++){
		  u8[i] = result.charCodeAt(i)
		}
	
		fileDownload(new Blob([u8], {type: "application/octet-stream"}), filename);
	}
	
	return (<button onClick={download}><i class="fa fa-search"></i>Download to Your Device</button>)
}