document.addEventListener("DOMContentLoaded", function () {
	const musicContainer = document.createElement("div");
	musicContainer.style.position = "fixed";
	musicContainer.style.top = "0";
	musicContainer.style.left = "0";
	musicContainer.style.width = "100%";
	musicContainer.style.height = "100%";
	musicContainer.style.pointerEvents = "none";
	musicContainer.style.zIndex = "9999";
	document.body.appendChild(musicContainer);

	const notes = ["🎵", "🎶", "🎷", "🎸", "🎹", "🥁"];

	function createMusicNote() {
	  const note = document.createElement("div");
	  note.textContent = notes[Math.floor(Math.random() * notes.length)];
	  note.style.position = "absolute";
	  note.style.fontSize = `${Math.random() * 20 + 20}px`;
	  note.style.left = `${Math.random() * 100}%`;
	  note.style.bottom = "-10%";
	  note.style.animation = `floatMusic ${Math.random() * 5 + 4}s ease-in infinite`;
	  musicContainer.appendChild(note);

	  note.addEventListener("animationend", () => note.remove());
	}

	setInterval(createMusicNote, 400);

	const style = document.createElement("style");
	style.innerHTML = `
	  @keyframes floatMusic {
		0% { transform: translateY(0); opacity: 1; }
		100% { transform: translateY(-100vh); opacity: 0; }
	  }
	`;
	document.head.appendChild(style);
  });