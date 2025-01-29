document.addEventListener("DOMContentLoaded", function () {
	const ghostContainer = document.createElement("div");
	ghostContainer.style.position = "fixed";
	ghostContainer.style.top = "0";
	ghostContainer.style.left = "0";
	ghostContainer.style.width = "100%";
	ghostContainer.style.height = "100%";
	ghostContainer.style.pointerEvents = "none";
	ghostContainer.style.zIndex = "9999";
	document.body.appendChild(ghostContainer);

function createGhost() {
	const ghost = document.createElement("div");
	ghost.textContent = "👻";
	ghost.style.position = "absolute";
	ghost.style.fontSize = `${Math.random() * 40 + 20}px`;
	ghost.style.left = `${Math.random() * 100}%`;
	ghost.style.top = `${Math.random() * 100}%`;
	ghost.style.opacity = "0.8";
	ghost.style.animation = `float ${Math.random() * 5 + 3}s ease-in-out infinite alternate`;
	ghostContainer.appendChild(ghost);
}

for (let i = 0; i < 10; i++) createGhost();

const style = document.createElement("style");
style.innerHTML = `
	@keyframes float {
		from { transform: translateY(0); }
		to { transform: translateY(-20px); }
	}
`;
document.head.appendChild(style);
});