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
	
	var handleFiles = file => {
		var sixtyfour = trim(file.base64);
		var filestring = sixtyFourToString(sixtyfour);
		var filename = file.fileList.item(0).name;
		// console.log(sixtyfour);
		
		// console.log(filestring);
		
		var printString = "There are " + filestring.charCodeAt(4) + " PRG block(s) and " + filestring.charCodeAt(5) + " CHR block(s) in \"" + filename + "\".";
		console.log(printString);
		document.getElementById("desc").innerHTML = printString;
	}
	
	return (
		<div>
			<ReactFileReader fileTypes="" base64={true} multiple={false} handleFiles={handleFiles}>
				<button className='btn'>Upload</button><br/>
			</ReactFileReader>
			<p id="desc"></p>
		</div>
	);
}

export default App;
