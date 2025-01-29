document.addEventListener("DOMContentLoaded", function () {
	const confettiContainer = document.createElement("div");
	confettiContainer.style.position = "fixed";
	confettiContainer.style.top = "0";
	confettiContainer.style.left = "0";
	confettiContainer.style.width = "100%";
	confettiContainer.style.height = "100%";
	confettiContainer.style.pointerEvents = "none";
	confettiContainer.style.zIndex = "9999";
	document.body.appendChild(confettiContainer);

	function createConfetti() {
	  const confetti = document.createElement("div");
	  confetti.style.position = "absolute";
	  confetti.style.width = `${Math.random() * 10 + 5}px`;
	  confetti.style.height = `${Math.random() * 10 + 5}px`;
	  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
	  confetti.style.top = "0";
	  confetti.style.left = `${Math.random() * 100}%`;
	  confetti.style.opacity = "0.8";
	  confetti.style.animation = `fallConfetti ${Math.random() * 3 + 2}s linear`;
	  confettiContainer.appendChild(confetti);

	  confetti.addEventListener("animationend", () => confetti.remove());
	}

	setInterval(createConfetti, 100);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes fallConfetti {
		0% { transform: translateY(0); }
		100% { transform: translateY(110vh) rotate(${Math.random() * 360}deg); }
	  }
	`;
	document.head.appendChild(style);
  });