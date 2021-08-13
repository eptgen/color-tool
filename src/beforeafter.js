
export default function renderBeforeAfter(palettesFound, currentPalettes, firstClicked, secondClicked, getNesColor, getTextColor) {

	var getPaletteElement = (palette, paletteNum, isBefore) => {
			var paletteData = palette.data;
			return (
				<div className="grid-container3">
				{
					paletteData.map((color, colorNum) => {
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
		};

	var getPaletteLoc = (palette, paletteNum) => {
			var paletteLoc = palette.loc;
			// console.log(currentPalettes);
			return (
				<div className="grid-container4">
				{paletteLoc.toString(16).toUpperCase().padStart(4, "0")}
			</div>)
	}


	function getRow(palette, index) {
		return (
			<tr>
				<td style={{"paddingLeft":"10px", "border":"1px solid black"}}>
				<div class="loc">
					{getPaletteLoc(palette, index)}
				</div></td>
				<td style={{"padding":"10px", "border":"1px solid black"}}>
				<div class="before">
					{getPaletteElement(palettesFound[index], index, true)}
				</div></td>
				<td style={{"border":"1px solid black", "paddingRight":"10px"}}>
				<div class="after">
					{getPaletteElement(palette, index, false)}
				</div></td>
			</tr>
		)
	}

	return (
		<div style={{display: "inline-block", "float": "left", "paddingLeft": "5px", "marginLeft": "20px", height: "629px", width: "680px", border: "1px solid #ccc", "overflow-y": "auto"}}>
			<table id="titles" style={{"border-collapse":"collapse"}}>
				<tr>
					<th><section id="subtitle1" style={{"paddingLeft": "40px", "paddingRight": "40px", "paddingBottom": "10px"}}>Location</section></th>
					<th><section id="subtitle1" style={{"paddingLeft": "90px", "paddingRight": "90px", "paddingBottom": "10px"}}>Before</section></th>
					<th><section id="subtitle1" style={{"paddingLeft": "90px", "paddingRight": "90px", "paddingBottom": "10px"}}>After</section></th>
				</tr>
				{currentPalettes.map(getRow)}
			</table>
		</div>
	);

}
