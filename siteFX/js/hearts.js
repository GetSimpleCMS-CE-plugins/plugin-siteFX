document.addEventListener("DOMContentLoaded", function () {
	const heartsContainer = document.createElement("div");
	heartsContainer.style.position = "fixed";
	heartsContainer.style.top = "0";
	heartsContainer.style.left = "0";
	heartsContainer.style.width = "100%";
	heartsContainer.style.height = "100%";
	heartsContainer.style.pointerEvents = "none";
	heartsContainer.style.zIndex = "9999";
	document.body.appendChild(heartsContainer);

	function createHeart() {
	  const heart = document.createElement("div");
	  heart.textContent = "❤️";
	  heart.style.position = "absolute";
	  heart.style.fontSize = `${Math.random() * 20 + 20}px`;
	  heart.style.left = `${Math.random() * 100}%`;
	  heart.style.bottom = "-10%";
	  heart.style.animation = `floatUp ${Math.random() * 5 + 3}s ease-in infinite`;
	  heartsContainer.appendChild(heart);

	  heart.addEventListener("animationend", () => heart.remove());
	}

	setInterval(createHeart, 400);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes floatUp {
		0% { transform: translateY(0); opacity: 1; }
		100% { transform: translateY(-100vh); opacity: 0; }
	  }
	`;
	document.head.appendChild(style);
  });