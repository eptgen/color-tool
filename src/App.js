import ReactFileReader from 'react-file-reader';


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
	
	var handleFiles = files => {
		var sixtyfour = trim(files.base64);
		var filestring = sixtyFourToString(sixtyfour);
		// console.log(sixtyfour);
		
		// console.log(filestring);
		
		var printString = "There are " + filestring.charCodeAt(4) + " PRG block(s) and " + filestring.charCodeAt(5) + " CHR block(s) in this ROM.";
		console.log(printString);
		document.getElementById("desc").innerHTML = printString;
	}
	
	return (
		<div>
			<ReactFileReader fileTypes="" base64={true} multiple={false} handleFiles={handleFiles}>
				<button className='btn'>Upload</button><br/>
				<p id="desc"></p>
			</ReactFileReader>
		</div>
	);
}

export default App;
