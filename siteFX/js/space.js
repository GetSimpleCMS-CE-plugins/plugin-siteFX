document.addEventListener("DOMContentLoaded", function () {
	const spaceContainer = document.createElement("div");
	spaceContainer.style.position = "fixed";
	spaceContainer.style.top = "0";
	spaceContainer.style.left = "0";
	spaceContainer.style.width = "100%";
	spaceContainer.style.height = "100%";
	spaceContainer.style.pointerEvents = "none";
	spaceContainer.style.zIndex = "9999";
	document.body.appendChild(spaceContainer);

	function createShootingStar() {
	  const star = document.createElement("div");
	  star.style.position = "absolute";
	  star.style.width = "4px";
	  star.style.height = "4px";
	  star.style.backgroundColor = "white";
	  star.style.borderRadius = "50%";
	  star.style.top = `${Math.random() * 100}%`;
	  star.style.left = `${Math.random() * 100}%`;
	  star.style.animation = `shootingStar ${Math.random() * 2 + 1}s linear`;
	  spaceContainer.appendChild(star);

	  star.addEventListener("animationend", () => star.remove());
	}

	function createPlanet() {
	  const planet = document.createElement("div");
	  planet.textContent = ["🪐", "🌕", "🌑", "⭐"][Math.floor(Math.random() * 4)];
	  planet.style.position = "absolute";
	  planet.style.fontSize = `${Math.random() * 20 + 30}px`;
	  planet.style.top = `${Math.random() * 100}%`;
	  planet.style.left = `${Math.random() * 100}%`;
	  planet.style.animation = `float ${Math.random() * 10 + 5}s infinite alternate`;
	  spaceContainer.appendChild(planet);
	}

	setInterval(createShootingStar, 300);
	setInterval(createPlanet, 2000);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes shootingStar {
		0% { transform: translate(0, 0); opacity: 1; }
		100% { transform: translate(100px, 100px); opacity: 0; }
	  }
	  @keyframes float {
		0% { transform: translateY(0); }
		100% { transform: translateY(20px); }
	  }
	`;
	document.head.appendChild(style);
  });