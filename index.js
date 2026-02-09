let colorContainer = document.querySelector(".color-container");

// Add click listeners to initial color items
document.querySelectorAll(".color-item").forEach((item) => {
	item.addEventListener("click", () => {
		copyOnClick(item);
	});
});

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();

	let html = "";
	const color = document.querySelector('input[type="color"]').value.slice(1);
	const colorMode = document.querySelector('select[name="color-mode"]').value;

	fetch(
		`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorMode}&count=5`,
	)
		.then((res) => res.json())
		.then((data) => {
			data.colors.forEach((color) => {
				html += `
					<div class="color-item" data-color="${color.hex.value}">
						<div id="color" style="background: ${color.hex.value}"></div>
						<div id="color-number">
							<p>${color.hex.value}</p>
						</div>
					</div>
				`;
			});
			colorContainer.innerHTML = html;

			// Add click event listeners after HTML is inserted
			document.querySelectorAll(".color-item").forEach((item) => {
				item.addEventListener("click", () => {
					copyOnClick(item);
				});
			});
		});
});

function copyOnClick(btn) {
	const colorValue = btn.dataset.color;
	navigator.clipboard.writeText(colorValue);
	console.log(colorValue);
}
