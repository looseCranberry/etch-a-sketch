const leftButton = 0;
const rightButton = 2;
const boXXy = document.getElementsByClassName("boxxy")[0];
boXXy.addEventListener("contextmenu", (e) => e.preventDefault());

let rainbow = false;
let etching = false;
let drawing = false;
let erasing = false;
let puzzling = false;
let darkening = false;

const rainbowMode = document.getElementById("rainbow");
rainbowMode.addEventListener("change", () => {
	if (rainbowMode.checked) {
		rainbow = true;
		fgColor.setAttribute("disabled", "true");
		bgColor.setAttribute("disabled", "true");
	} else {
		rainbow = false;
		fgColor.removeAttribute("disabled");
		bgColor.removeAttribute("disabled");
	}
});

/* Make sure mouseup is handled everywhere */
window.onmouseup = () => {
	drawing = false;
	erasing = false;
};

function getRainbow() {
	return `rgb(${Math.floor(Math.random() * 255) + 1},${
		Math.floor(Math.random() * 255) + 1
	},${Math.floor(Math.random() * 255) + 1})`;
}

function reset(override) {
	const boxxys = boXXy.querySelectorAll(".boxxyBox");
	boxxys.forEach((b) => {
		if (b.getAttribute("clicked") == "true") {
			if (override) {
				b.style.backgroundColor = backColor.value;
				b.setAttribute("clicked", "false");
			}
		} else {
			b.style.backgroundColor = backColor.value;
			b.setAttribute("clicked", "false");
		}
	});
}

function fill() {
	for (let i = 0; i < 20 ** 2; i++) {
		let box = document.createElement("div");
		box.className = "boxxyBox";
		boXXy.appendChild(box);
	}

	init();
}

function init() {
	let boxes = boXXy.querySelectorAll(".boxxyBox");
	boxes.forEach((d) => {
		d.addEventListener("dragstart", (e) => {
			console.log("Drag Intercept");
			e.preventDefault();
		});
		d.addEventListener("mousedown", (e) => {
			if (e.button == leftButton) {
				drawing = true;
				d.setAttribute("clicked", "true");
				if (rainbow) {
					d.style.backgroundColor = getRainbow();
				} else if (darkening) {
					let rgb = d.style.backgroundColor;
					console.log(rgb);
				} else {
					d.style.backgroundColor = foreColor.value;
				}
			} else if (e.button == rightButton) {
				erasing = true;
				d.style.backgroundColor = backColor.value;
				d.setAttribute("clicked", "false");
			}
		});
		d.addEventListener("mouseover", () => {
			if (drawing || etching) {
				if (rainbow) {
					d.style.backgroundColor = getRainbow();
				} else {
					d.style.backgroundColor = foreColor.value;
				}
				d.setAttribute("clicked", "true");
			} else if (erasing) {
				d.style.backgroundColor = backColor.value;
				d.setAttribute("clicked", "false");
			}
		});
	});
}

function scrambler() {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	let boxies = Array.from(boxxies);
	boxies = shuffle(boxies);
	boXXy.innerHTML = "";
	for (let x = 0; x < boxies.length; x++) {
		boXXy.appendChild(boxies[x]);
	}
}

// Fisher-Yates Shuffle
function shuffle(arr) {
	let curr = arr.length;
	let insert = 0;
	while (curr != 0) {
		insert = Math.floor(Math.random() * curr--);
		[arr[curr], arr[insert]] = [arr[insert], arr[curr]];
	}
	return arr;
}

function flipX(dim) {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	let boxies = Array.from(boxxies);
	let inner = 0;
	let outer = 0;
	for (let y = 0; y < 20; y++) {
		inner = dim * y;
		outer = inner + dim - 1;
		for (let x = 0; x < dim / 2; x++) {
			[boxies[inner], boxies[outer]] = [boxies[outer], boxies[inner]];
			inner++;
			outer--;
		}
	}

	boXXy.innerHTML = "";
	for (let x = 0; x < boxies.length; x++) {
		boXXy.appendChild(boxies[x]);
	}
}

function flipY(dim) {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	let boxies = Array.from(boxxies);
	let inner = 0;
	let outer = 0;
	for (let y = 0; y < 20; y++) {
		inner = y;
		outer = dim * (dim - 1) + inner;
		for (let x = 0; x < dim / 2; x++) {
			[boxies[inner], boxies[outer]] = [boxies[outer], boxies[inner]];
			inner += dim;
			outer -= dim;
		}
	}

	boXXy.innerHTML = "";
	for (let x = 0; x < boxies.length; x++) {
		boXXy.appendChild(boxies[x]);
	}
}

function rotl(dim) {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	let boxies = Array.from(boxxies);
	let newArr = [];
	let neoZero = dim - 1;
	let index = neoZero;
	let neoIndex = 0;

	for (let y = 0; y < 20; y++) {
		for (let x = 0; x < 20; x++) {
			newArr[neoIndex++] = boxies[index];
			index = index + dim;
		}
		index = neoZero - y - 1;
	}

	boXXy.innerHTML = "";
	for (let x = 0; x < boxies.length; x++) {
		boXXy.appendChild(newArr[x]);
	}
}

function rotr(dim) {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	let boxies = Array.from(boxxies);
	let newArr = [];
	let neoZero = dim * (dim - 1);
	let index = neoZero;
	let neoIndex = 0;

	for (let y = 0; y < 20; y++) {
		for (let x = 0; x < 20; x++) {
			console.log(neoIndex + " = " + index);
			newArr[neoIndex++] = boxies[index];
			index = index - dim;
		}

		index = neoZero + y + 1;
	}

	boXXy.innerHTML = "";
	for (let x = 0; x < boxies.length; x++) {
		boXXy.appendChild(newArr[x]);
	}
}

const fgColor = document.getElementById("foreColor");
const bgColor = document.getElementById("backColor");
bgColor.addEventListener("change", () => {
	reset();
});

function modeChange(opt) {
	if (opt.toUpperCase() == "SKETCHPAD") {
		etching = false;
		fgColor.removeAttribute("disabled");
		bgColor.removeAttribute("disabled");
	}
	if (opt.toUpperCase() == "ETCH-A-SKETCH") {
		etching = true;
		fgColor.removeAttribute("disabled");
		bgColor.removeAttribute("disabled");
	}
	if (opt.toUpperCase() == "PUZZLE") {
		etching = false;
		fgColor.setAttribute("disabled", "true");
		bgColor.setAttribute("disabled", "true");
	}
}

function rgbExtract(rgbString) {
	rgbString = rgbString.substr(4);
	let rgbArray = rgbString.split("");
	rgbString = "";
	rgbArray.pop();
	let rgbPop = "";
	let r, g, b;
	for (let x = 0; x < 3; x++) {
		while (rgbPop != "," && rgbArray.length > 0) {
			rgbPop = rgbArray.shift();
			rgbString += rgbPop;
		}

		if (x < 1) {
			r = Number.parseInt(rgbString);
		} else if (x < 2) {
			g = Number.parseInt(rgbString);
		} else {
			b = Number.parseInt(rgbString);
		}

		rgbPop = "";
		rgbString = "";
	}

	return [r, g, b];
}

function darken() {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	boxxies.forEach((boxy) => {
		let color = boxy.style.backgroundColor;
		if (color == "" || color == null || color == undefined) {
			return;
		}
		color = rgbExtract(color);
		if (color[0] - 4 > 0) color[0] -= 4;
		if (color[1] - 4 > 0) color[1] -= 4;
		if (color[2] - 4 > 0) color[2] -= 4;
		color = `rgb(${color[0]},${color[1]},${color[2]})`;
		boxy.style.backgroundColor = color;
	});
}

function lighten() {
	let boxxies = boXXy.querySelectorAll(".boxxyBox");
	boxxies.forEach((boxy) => {
		let color = boxy.style.backgroundColor;
		if (color == "" || color == null || color == undefined) {
			return;
		}
		color = rgbExtract(color);
		if (color[0] + 4 < 256) color[0] += 4;
		if (color[1] + 4 < 256) color[1] += 4;
		if (color[2] + 4 < 256) color[2] += 4;
		color = `rgb(${color[0]},${color[1]},${color[2]})`;
		boxy.style.backgroundColor = color;
	});
}
