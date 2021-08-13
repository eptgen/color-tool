
import stringSearch from './byteSearch';

var $ = require("jquery");

export default function renderSearch(searchTermsRef, palettesFound, currentPalettes, setPalettesFound, setCurrentPalettes, getNesColor, getTextColor, searchResults, setSearchResults, filebytes, prgEnd) {

	var addToSearchResults = palette => {
		setSearchResults(currentSearchResults => {
			return [...currentSearchResults, palette];
		});
	}

	var search = () => {
		const vals = searchTermsRef.current.value;
		if (vals === '') return;
		var searchRes = stringSearch(vals, filebytes);
		// console.log(searchRes);

		for (var i = 0; i < searchRes.length; i++) {
			var toAdd = searchRes[i];
			if (toAdd.loc <= prgEnd) {
				addToSearchResults(toAdd);
			}
		}
		searchTermsRef.current.value = null;
	};

	var renderResult = palette => {
		// console.log(palette);
		return (
			<li><input type="checkbox" class="search-checkbox" />
			<div className="grid-container4">
				Location: {palette.loc.toString(16).toUpperCase().padStart(4, "0")}
			</div>
			<div class="grid-container3">
				{palette.data.map((color, colorNum) => {
					return (
					<div className="grid-item2" style={{backgroundColor: getNesColor(color), color: getTextColor(color)}}>
						{color.toString(16).toUpperCase().padStart(2, "0")}
					</div>);
				})}
            </div></li>
		);
	};

	var removeChecks = () => {
		$(".search-checkbox").each((ind, el) => {
			el.checked = false;
		});
	}

	var removeNums = nums => {
		setSearchResults(prev => {
			return prev.filter((e, i) => {
				var res = !(nums.includes(i));
				// console.log(nums);
				// console.log(i);
				return res;
			});
		});
	};

	var addNums = nums => {
		var newPalettesFound = palettesFound;
		var newCurrentPalettes = currentPalettes;
		for (var i = 0; i < nums.length; i++) {
			var num = nums[i];
			var toAdd = JSON.stringify(searchResults[num]);
			// console.log(toAdd);

			newPalettesFound.push(JSON.parse(toAdd));
			newCurrentPalettes.push(JSON.parse(toAdd));
		}
		setPalettesFound(newPalettesFound);
		setCurrentPalettes(newCurrentPalettes);
		removeNums(nums);
	};

	var add = () => {
		var nums = [];
		$(".search-checkbox").each((ind, el) => {
			var checked = el.checked;
			// console.log(checked);
			if (checked) {
				// console.log(ind);
				nums.push(ind);
			}
		});
		removeChecks();
		addNums(nums);
	};

	var addAll = () => {
		var nums = [];
		for (var i = 0; i < searchResults.length; i++) {
			nums.push(i);
		}
		addNums(nums);
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
        <ol style={{"font-family": "monospace", "font-size": "15px"}}>
			{searchResults.map(renderResult)}
        </ol>

		<button onClick={add}>Add</button>
		<button onClick={addAll}>Add All</button>
		<button onClick={remove}>Remove</button>
		<button onClick={removeAll}>Remove All</button>
		</>
	);
};
