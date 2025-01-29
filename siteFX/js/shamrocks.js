document.addEventListener("DOMContentLoaded", function () {
	const shamrocksContainer = document.createElement("div");
	shamrocksContainer.style.position = "fixed";
	shamrocksContainer.style.top = "0";
	shamrocksContainer.style.left = "0";
	shamrocksContainer.style.width = "100%";
	shamrocksContainer.style.height = "100%";
	shamrocksContainer.style.pointerEvents = "none";
	shamrocksContainer.style.zIndex = "9999";
	document.body.appendChild(shamrocksContainer);

	function createShamrock() {
	  const shamrock = document.createElement("div");
	  shamrock.textContent = "☘️";
	  shamrock.style.position = "absolute";
	  shamrock.style.fontSize = `${Math.random() * 30 + 20}px`;
	  shamrock.style.left = `${Math.random() * 100}%`;
	  shamrock.style.top = "-10%";
	  shamrock.style.animation = `floatDown ${Math.random() * 5 + 4}s linear infinite`;
	  shamrocksContainer.appendChild(shamrock);

	  shamrock.addEventListener("animationend", () => shamrock.remove());
	}

	setInterval(createShamrock, 500);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes floatDown {
		0% { transform: translateY(0); opacity: 1; }
		100% { transform: translateY(110vh); opacity: 0; }
	  }
	`;
	document.head.appendChild(style);
  });