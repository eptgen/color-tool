import ReactFileReader from 'react-file-reader';
import { useState, useRef } from 'react';
import "./breakpoints.css";
import './styles.css';
import reverseVals from './testFunction';

var $ = require("jquery");

function App() {
	const [palettesFound, setPalettesFound] = useState([]);
	const [currentPalettes, setCurrentPalettes] = useState([]);
	const [el, setEl] = useState(null);
	const [filebytes, setFilebytes] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const searchTermsRef = useRef();

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
		if (romString.charCodeAt(ind) !== 0x3F) {
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
			if (headerMatch.length !== 0) {
				result.push({
					loc: i,
					data: headerMatch
				})
			}
		}

		return result;
	}

	var nesColors = [	"#545354", "#071e70", "#090f8a", "#2c0381", "#3e0660", "#540c30", "#4c0e06", "#371a04",
						"#232a07", "#183a0b", "#183f0c", "#153b0a", "#12313a", "#010100", "#010100", "#010100",
						"#989698", "#214abd", "#3032e2", "#5523db", "#7c20a9", "#932562", "#8c2d27", "#703f13",
						"#565919", "#3d701d", "#367a20", "#337433", "#2b6575", "#000001", "#000001", "#010100",
						"#edeeec", "#6098e6", "#797ce5", "#a666e4", "#d35ee5", "#da62b1", "#dc7169", "#ca8c3a",
						"#a1aa35", "#87c23b", "#73cd46", "#68c976", "#5fb1ca", "#3b3b3d", "#000000", "#010100",
						"#edeeec", "#afcbe9", "#bcbde8", "#cfb3e8", "#ebaeec", "#ebaed4", "#e4b6b2", "#dfc597",
						"#ccd183", "#bddd84", "#b4e099", "#a8e1b8", "#abd5e2", "#a0a1a0", "#000001", "#010100"];

	var textColors = [	"white", "white", "white", "white", "white", "white", "white", "white",
						"white", "white", "white", "white", "white", "white", "white", "white",
						"white", "white", "white", "white", "white", "white", "white", "white",
						"white", "white", "white", "white", "white", "white", "white", "white",
						"black", "white", "white", "white", "white", "white", "white", "white",
						"white", "white", "white", "white", "white", "white", "white", "white",
						"black", "black", "black", "black", "black", "black", "black", "black",
						"black", "black", "black", "black", "black", "black", "white", "white"];

	var getNesColor = byt => {
		return nesColors[byt];
	}

	var getTextColor = byt => {
		return textColors[byt];
	}

	var firstClicked = (e, paletteNum, colorNum) => {
		setEl([paletteNum, colorNum]);
	}

	var secondClicked = (e, color) => {
		// console.log(palettesFound);
		setCurrentPalettes(before => {
			var result = [...before];
			// console.log(result);
			result[el[0]].data[el[1] + 3] = color;
			return result;
		});
	}

	var getPickerElement = num => {
		return (
		<div onClick={e => secondClicked(e, num)} className="grid-item2" style={{backgroundColor: getNesColor(num), color: getTextColor(num)}}>
			{num.toString(16).toUpperCase().padStart(2, "0")}
		</div>);
	}

	var getPaletteElement = isBefore => {
		return ((palette, paletteNum) => {
			var paletteData = palette.data;
			return (
				<div className="grid-container3">
				{
					paletteData.filter((e, i) => i >= 3).map((color, colorNum) => {
						var clickHandle = (e => {});
						if (!isBefore) {
							clickHandle = (e => firstClicked(e, paletteNum, colorNum));
						}
						return (<div onClick={clickHandle} className="grid-item2" style={{backgroundColor: getNesColor(color), color: getTextColor(color)}}>
							{color.toString(16).toUpperCase().padStart(2, "0")}
						</div>)
					})
				}
				</div>
			);
		});
	}

	var getPaletteLoc = pal => {
		return ((palette, paletteNum) => {
			var paletteLoc = palette.loc;
			return (
				<div className="grid-container3">
				{paletteLoc}
			</div>)
		}
		)
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
		setFilebytes(filestring);
		palettes = palettes.filter(palette => palette.loc <= prgEnd);
		// console.log(palettes.length);

		var stringCopy = JSON.stringify(palettes);
		setPalettesFound(JSON.parse(stringCopy));
		setCurrentPalettes(JSON.parse(stringCopy));
	}

	var download = () => {
	}

	var search = () => {
		const vals = searchTermsRef.current.value;
		if (vals === '') return;
		reverseVals(vals);
		console.log(reverseVals(vals));
		searchTermsRef.current.value = null;
	}

	var auto = "auto";
	var border = "border";
	var color = "color";
	var display = "display";
	var height = "height";
	var left = "left";
	var monospace = "monospace";
	var right = "right";
	var width = "width";

	/*
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
	*/

	return (<>
	<header>
        <section id="logo" style={{"textAlign": "center"}}>NES Color Tool</section>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="bbgames.html">Blackbox Games</a></li>
                <li><a href="tool.html">Our Tool</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section id="main-content">Step-By-Step Process</section>

    <section id="description"><p>Welcome to Our Tool!</p></section>

    <section id="subtitle">1. Search/File Upload</section>

    <section id="description">
        <p>Get started by uploading the game file you want to alter. If you don’t have one or just want to experiment, search through and choose one of our available homebrew games!</p>
    </section>

    <div style={{float: left, "paddingLeft": "100px"}}>
        <form class="example" style={{"display": "inline-block"}}>
        <input type="text" placeholder="Search Games.." name="search" />
        <button type="submit"><i class="fa fa-search"></i>Go</button>
        </form>

		<p style= {{"fontFamily": "monospace", "paddingLeft": "100px"}}>Results Found</p>
        <ol style= {{"fontFamily": monospace, "fontSize": "15px"}}>
            <li>game #1 (clickable to upload)</li>
            <li>game #2</li>
            <li>game #3</li>
        </ol>
    </div>

    <div style={{float: "left", "paddingLeft": "100px", "paddingTop": "5px"}}>
        <p style= {{"fontFamily": "monospace"}}>or</p>
    </div>

    <div style={{float: "left", "paddingLeft": "100px", "paddingTop": "17px"}}>
		<ReactFileReader fileTypes="" base64={true} multiple={false} handleFiles={handleFiles}>
			<label htmlFor="actual-btn" style= {{"fontFamily": "monospace"}}>Choose File</label>
		</ReactFileReader>
    </div>

    <section id="subtitle" style={{"paddingTop": "80px"}}>2. Customization</section>

    <section id="description">
        <p>Interact with our before and after display of the 4 background and 4 sprite palettes in your game. Click on the specific index of the color you want to change in the ‘after’ column. Then, explore the color grid containing all possible NES colors used in games and choose one to switch your chosen index to.</p>
    </section>

    <section id="subtitle1">NES Color Grid</section>

	<div style={{display: "inline-block", "float": left, "paddingLeft": "5px", "marginLeft": "20px", height: "500px", width: "800px", border: "1px solid #ccc", "overflow-y": auto}}>

		<div id="loc" style={{float: left}}>
		<section id="subtitle1">Location</section>

		{palettesFound.map(getPaletteLoc())}

		</div>

	<div id="loc" style={{display: "inline-block", float: left, "paddingLeft": "15px"}}>
	<section id="subtitle1" style={{"paddingLeft": "70px"}}>Location</section>

	{palettesFound.map(getPaletteElement(true))}

    <div id="before" style={{display: "inline-block", float: left, "paddingLeft": "15px"}}>
		<section id="subtitle1" style={{"paddingLeft": "70px"}}>Before</section>

		{palettesFound.map(getPaletteElement(true))}

    </div>

    <div id="after" style={{display: "inline-block", float: left, "paddingLeft": "10px"}}>
		<section id="subtitle1" style={{"paddingLeft": "70px"}}>After</section>

		{currentPalettes.map(getPaletteElement(false))}

    </div>
	</div>

    <form class="example" style={{"display": "inline-block"}}>
        <button type="submit" onClick={download}><i class="fa fa-search"></i>Save</button>
    </form>

    <div class="grid-container2" style={{"float": right, "paddingRight": "100px"}}>
		{[...Array(64).keys()].map(getPickerElement)}
    </div>

    <form class="example" style={{"display": "inline-block"}}>
        <button type="submit"><i class="fa fa-search"></i>Apply</button>
    </form>

	<input id="search" ref={searchTermsRef} type="text" placeholder="Search Palettes..." name="search" />
	<button onClick={search}><i class="fa fa-search"></i>Go</button>

    <section id="subtitle" style={{"paddingTop": "300px"}}>3. Testing Screen</section>

    <section id="description">
        <p>Get a chance to test and play your color-hacked game! If you find any abnormalities or any unchanged colors, continue customizing. Otherwise, continue your download! </p>
    </section>

    <section id="subtitle">4. Download</section>

    <section id="description">
        <p>Choose either option to save your new game! If you choose to download to our database, it would allow other users access and play your game. Thank you!</p>
    </section>

    <form class="example" style={{"display": "inline-block"}}>
        <button type="submit"><i class="fa fa-search"></i>Download to Your Device</button>
        <button type="submit"><i class="fa fa-search"></i>Download to Our Database</button>
    </form>

    <footer>
            Summer Research, 2021.
    </footer>
	</>);

}

export default App;
