document.addEventListener("DOMContentLoaded", function () {
	const blossomContainer = document.createElement("div");
	blossomContainer.style.position = "fixed";
	blossomContainer.style.top = "0";
	blossomContainer.style.left = "0";
	blossomContainer.style.width = "100%";
	blossomContainer.style.height = "100%";
	blossomContainer.style.pointerEvents = "none";
	blossomContainer.style.zIndex = "9999";
	document.body.appendChild(blossomContainer);

	function createBlossom() {
	  const blossom = document.createElement("div");
	  blossom.textContent = "🌸";
	  blossom.style.position = "absolute";
	  blossom.style.fontSize = `${Math.random() * 20 + 20}px`;
	  blossom.style.left = `${Math.random() * 100}%`;
	  blossom.style.top = "-10%";
	  blossom.style.animation = `fallBlossom ${Math.random() * 5 + 4}s linear infinite`;
	  blossom.style.opacity = Math.random();
	  blossomContainer.appendChild(blossom);

	  blossom.addEventListener("animationend", () => blossom.remove());
	}

	setInterval(createBlossom, 300);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes fallBlossom {
		0% { transform: translateY(0) rotate(0); }
		100% { transform: translateY(110vh) rotate(360deg); }
	  }
	`;
	document.head.appendChild(style);
  });