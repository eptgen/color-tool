
export default function renderBeforeAfter(palettesFound, currentPalettes, firstClicked, secondClicked, getNesColor, getTextColor) {

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
	
	return (
		<div style={{display: "inline-block", "float": "left", "paddingLeft": "5px", "marginLeft": "20px", height: "500px", width: "800px", border: "1px solid #ccc", "overflow-y": "auto"}}>

			<div id="loc" style={{"float": "left"}}>
			<section id="subtitle1">Location</section>

			{palettesFound.map(getPaletteLoc())}

			</div>

			<div id="before" style={{display: "inline-block", "float": "left", "paddingLeft": "15px"}}>
				<section id="subtitle1" style={{"paddingLeft": "70px"}}>Before</section>

				{palettesFound.map(getPaletteElement(true))}

			</div>

			<div id="after" style={{display: "inline-block", "float": "left", "paddingLeft": "10px"}}>
				<section id="subtitle1" style={{"paddingLeft": "70px"}}>After</section>

				{currentPalettes.map(getPaletteElement(false))}

			</div>
		</div>
	);

}