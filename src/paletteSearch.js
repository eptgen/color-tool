
import stringSearch from './byteSearch';

export default function renderSearch(searchTermsRef, setCurrentPalettes, getNesColor, getTextColor, searchResults, setSearchResults, filebytes) {
	
	var addToSearchResults = palette => {
		setSearchResults(currentSearchResults => {
			var result = [...currentSearchResults]
			result.push(palette);
			return result;
		});
	}
	
	var search = () => {
		const vals = searchTermsRef.current.value;
		if (vals === '') return;
		var searchRes = stringSearch(vals, filebytes);
		console.log(searchRes);
		
		for (var i = 0; i < searchRes.length; i++) {
			var paletteData = [0, 0, 0];
			var toAdd = {loc: searchRes[i].loc}
			var splitted = searchRes[i].data.split(" ");
			for (var j = 0; j < splitted.length; j++) {
				paletteData.push(parseInt(splitted[j], 16));
			}
			toAdd.data = paletteData;
			addToSearchResults(toAdd);
		}
		
		searchTermsRef.current.value = null;
	};
	
	var renderResult = palette => {
		return (
			<li><input type="checkbox" class="search-checkbox" /><div class="grid-container3">
				{palette.data.filter((e, i) => i >= 3).map((color, colorNum) => {
					return (<div className="grid-item2" style={{backgroundColor: getNesColor(color), color: getTextColor(color)}}>
						{color.toString(16).toUpperCase().padStart(2, "0")}
					</div>);
				})}
            </div></li>
		);
	};
	
	var addNum = num => {
	}
	
	var add = () => {
	};
	
	var addAll = () => {
	};
	
	return (<>
		<input id="search" ref={searchTermsRef} type="text" placeholder="Search Palettes..." name="search" />
		<button onClick={search}><i class="fa fa-search"></i>Go</button>
		<p style={{"font-family": "monospace", "padding-left": "100px"}}>Results Found</p>
        <ol style={{"font-family": "monospace", "font-size": "15px"}}>
			{searchResults.map(renderResult)}
        </ol>
    
		<button onClick={add}><i class="fa fa-search"></i>Add</button>
	
		<button onClick={addAll}><i class="fa fa-search"></i>Add All</button>
		</>
	);
};