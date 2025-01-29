document.addEventListener("DOMContentLoaded", function () {
	const leafContainer = document.createElement("div");
	leafContainer.style.position = "fixed";
	leafContainer.style.top = "0";
	leafContainer.style.left = "0";
	leafContainer.style.width = "100%";
	leafContainer.style.height = "100%";
	leafContainer.style.pointerEvents = "none";
	leafContainer.style.zIndex = "9999";
	document.body.appendChild(leafContainer);

	function createLeaf() {
	  const leaf = document.createElement("div");
	  leaf.textContent = "🍂";
	  leaf.style.position = "absolute";
	  leaf.style.fontSize = `${Math.random() * 20 + 20}px`;
	  leaf.style.left = `${Math.random() * 100}%`;
	  leaf.style.top = "-10%";
	  leaf.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;
	  leaf.style.opacity = Math.random();
	  leafContainer.appendChild(leaf);

	  leaf.addEventListener("animationend", () => leaf.remove());
	}

	setInterval(createLeaf, 300);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes fall {
		0% { transform: translateY(0) rotate(0); }
		100% { transform: translateY(110vh) rotate(360deg); }
	  }
	`;
	document.head.appendChild(style);
  });