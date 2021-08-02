import ReactFileReader from 'react-file-reader';
var $ = require("jquery");

function App() {
	var sixtyFourToString = sixtyfour => {
		var raw = atob(sixtyfour);
		var result = "";
		
		for (var i = 0; i < raw.length; i++) {
			result += String.fromCharCode(raw.charCodeAt(i));
		}
		
		return result;
	}
	
	var trim = sixtyfour => {
		return sixtyfour.slice(sixtyfour.search(",") + 1);
	}
	
	var paletteHeaderMatch = (romString, ind) => {
		if (romString.charCodeAt(ind) != 0x3F) {
			return [];
		}
		if (romString.length <= ind + 2) {
			return [];
		}
		
		var begin = romString.charCodeAt(ind + 1);
		var count = romString.charCodeAt(ind + 2);
		var result = [0x3F, begin, count];
		
		if (romString.length <= ind + count + 2) {
			return [];
		}
		
		if (begin + count > 0x20) {
			return [];
		}
		
		if (count < 1) {
			return [];
		}
		
		for (var i = 0; i < count; i++) {
			var byt = romString.charCodeAt(ind + i + 3);
			if (byt > 0x3F) {
				return [];
			}
			result.push(byt);
		}
		
		return result;
	}
	
	var findPalettes = romString => {
		// return array of `paletteResult` objects, each element in the array corresponds to a different
		// 3F palette
		
		var result = [];
		
		for (var i = 0; i < romString.length; i++) {
			var headerMatch = paletteHeaderMatch(romString, i);
			if (headerMatch) {
				result.push({
					loc: i,
					data: headerMatch
				})
			}
		}
		
		return result;
	}
	
	var getPaletteElement = (palette, prgEnd) => {
		var result = $("<p>");
		result.html(palette.data.join(" "));
		if (palette.loc > prgEnd) {
			result.css("color", "red");
		}
		
		return result;
	}
	
	var handleFiles = file => {
		var sixtyfour = trim(file.base64);
		var filestring = sixtyFourToString(sixtyfour);
		var filename = file.fileList.item(0).name;
		// console.log(sixtyfour);
		
		// console.log(filestring);
		
		var prgOffset = (filestring.charCodeAt(4)) * 16384;
		var trainerOffset = ((filestring.charCodeAt(6) / 4) % 2) * 512;
		var header = 16;
		var prgEnd = prgOffset + trainerOffset + header;
		
		var palettes = findPalettes(filestring);
		
		for (var i = 0; i < palettes.length; i++) {
			var paletteDiv = $("#palettes");
			var paletteElement = getPaletteElement(palettes[i], prgEnd);
			paletteDiv.append(paletteElement);
		}
	}
	
	return (
		<div>
			<ReactFileReader fileTypes="" base64={true} multiple={false} handleFiles={handleFiles}>
				<button className='btn'>Upload</button><br/>
			</ReactFileReader>
			<p id="desc"></p>
			<div id="palettes">
			</div>
		</div>
	);
}

export default App;
