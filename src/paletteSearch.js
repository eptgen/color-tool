
import stringSearch from './byteSearch';

var $ = require("jquery");

export default function renderSearch(searchTermsRef, setPalettesFound, setCurrentPalettes, getNesColor, getTextColor, searchResults, setSearchResults, filebytes) {
	
	var addToSearchResults = palette => {
		setSearchResults(currentSearchResults => {
			return [...currentSearchResults, palette];
		});
	}
	
	var search = () => {
		const vals = searchTermsRef.current.value;
		if (vals === '') return;
		var searchRes = stringSearch(vals, filebytes);
		console.log(searchRes);
		
		for (var i = 0; i < searchRes.length; i++) {
			var toAdd = searchRes[i];
			toAdd.loc += 3;
			addToSearchResults(toAdd);
		}
		searchTermsRef.current.value = null;
	};
	
	var renderResult = palette => {
		return (
			<li><input type="checkbox" class="search-checkbox" /><div class="grid-container3">
				{palette.data.map((color, colorNum) => {
					return (<div className="grid-item2" style={{backgroundColor: getNesColor(color), color: getTextColor(color)}}>
						{color.toString(16).toUpperCase().padStart(2, "0")}
					</div>);
				})}
            </div></li>
		);
	};
	
	var removeResult = num => {
		setSearchResults(prev => {
			var result = [...prev];
			result.splice(num, 1);
			return result;
		});
	};
	
	var removeChecks = () => {
		$(".search-checkbox").each((ind, el) => {
			el.checked = false;
		});
	}
	
	var addNum = num => {
		var toAdd = JSON.stringify(searchResults[num]);
		setPalettesFound(prev => {
			return [...prev, JSON.parse(toAdd)];
		});
		setCurrentPalettes(prev => {
			return [...prev, JSON.parse(toAdd)];
		});
		removeResult(num);
	};
	
	var removeNums = nums => {
		setSearchResults(prev => {
			return prev.filter((e, i) => {
				var res = !(nums.includes(i));
				console.log(nums);
				console.log(i);
				return res;
			});
		});
	};
	
	var add = () => {
		$(".search-checkbox").each((ind, el) => {
			var checked = el.checked;
			// console.log(checked);
			if (checked) {
				// console.log(ind);
				addNum(ind);
			}
		}, () => {
			removeChecks();
		});
	};
	
	var addAll = () => {
		for (var i = 0; i < searchResults.length; i++) {
			addNum(i);
		}
		removeChecks();
	};
	
	var remove = () => {
		var indices = [];
		$(".search-checkbox").each((ind, el) => {
			if (el.checked) {
				indices.push(ind);
			}
		});
		// console.log(indices);
		removeNums(indices);
		removeChecks();
	};
	
	var removeAll = () => {
		setSearchResults([]);
		removeChecks();
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
		<button onClick={remove}><i class="fa fa-search"></i>Remove</button>
		<button onClick={removeAll}><i class="fa fa-search"></i>Remove All</button>
		</>
	);
};
