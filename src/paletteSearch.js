
import reverseVals from './testFunction';

export default function renderSearch(searchTermsRef, setCurrentPalettes, getNesColor, getTextColor, searchResults, setSearchResults) {
	
	var search = () => {
		const vals = searchTermsRef.current.value;
		if (vals === '') return;
		reverseVals(vals);
		console.log(reverseVals(vals));
		searchTermsRef.current.value = null;
	}
	
	return (<>
		<input id="search" ref={searchTermsRef} type="text" placeholder="Search Palettes..." name="search" />
		<button onClick={search}><i class="fa fa-search"></i>Go</button>
		</>
	);
};