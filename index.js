fetch("https://www.thecolorapi.com/scheme?hex=0047AB&count=5")
	.then((res) => res.json())
	.then((data) => {
		data.colors.forEach((color) => {
			console.log(color.hex.value);
		});
	});
