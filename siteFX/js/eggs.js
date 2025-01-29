document.addEventListener("DOMContentLoaded", function () {
	const eggContainer = document.createElement("div");
	eggContainer.style.position = "fixed";
	eggContainer.style.bottom = "0";
	eggContainer.style.left = "0";
	eggContainer.style.width = "100%";
	eggContainer.style.height = "100%";
	eggContainer.style.pointerEvents = "none";
	eggContainer.style.zIndex = "9999";
	document.body.appendChild(eggContainer);

	function createEgg() {
	  const egg = document.createElement("div");
	  egg.style.position = "absolute";
	  egg.style.left = `${Math.random() * 100}%`;
	  egg.style.bottom = "0";
	  egg.style.width = "30px";
	  egg.style.height = "40px";
	  egg.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
	  egg.style.borderRadius = "50%";
	  egg.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
	  egg.style.animation = `bounce ${Math.random() * 2 + 1}s ease infinite`;
	  eggContainer.appendChild(egg);
	}

	for (let i = 0; i < 10; i++) createEgg();

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-100px); }
	  }
	`;
	document.head.appendChild(style);
  });