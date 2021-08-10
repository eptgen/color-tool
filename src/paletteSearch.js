
import stringSearch from './byteSearch';

export default function renderSearch(searchTermsRef, setCurrentPalettes, getNesColor, getTextColor, searchResults, setSearchResults, filebytes) {

	var search = () => {
		const terms = searchTermsRef.current.value;
		if (terms === '') return;
		stringSearch(terms, filebytes);
		console.log(stringSearch(terms, filebytes));
		searchTermsRef.current.value = null;
	}

	return (<>
		<input id="search" ref={searchTermsRef} type="text" placeholder="Search Palettes..." name="search" />
		<button onClick={search}><i class="fa fa-search"></i>Go</button>
		</>
	);
};
