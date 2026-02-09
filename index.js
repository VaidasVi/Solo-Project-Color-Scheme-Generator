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

	// Create and show "Copied!" message
	const message = document.createElement("div");
	message.textContent = "Copied to clipboard!";
	message.style.position = "fixed";
	message.style.top = "50%";
	message.style.left = "50%";
	message.style.transform = "translate(-50%, -50%)";
	message.style.background = "#3d4b60";
	message.style.color = "#ffffff";
	message.style.padding = "0.75rem 1.5rem";
	message.style.borderRadius = "6px";
	message.style.fontSize = "0.875rem";
	message.style.fontWeight = "500";
	message.style.zIndex = "1000";
	message.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
	document.body.appendChild(message);

	// Remove message after 1.5 seconds
	setTimeout(() => {
		message.remove();
	}, 1500);
}
