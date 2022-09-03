function initGameObjects() {
  const startScreen = document.querySelector(".start-screen");
  const gameScreen = document.querySelector(".game-screen");
  const scoreScreen = document.querySelector(".score");
  const gameOverScreen = document.querySelector(".game-over-screen");

  return {
    startScreen,
    gameScreen,
    scoreScreen,
    gameOverScreen,

    createWizard(initialState) {
      let wizardElement = document.createElement("div");
      wizardElement.classList.add("wizard");

      wizardElement.style.height = initialState.height + "px";
      wizardElement.style.width = initialState.width + "px";
      wizardElement.style.left = initialState.posX + "px";
      wizardElement.style.top = initialState.posY + "px";

      this.wizardElement = wizardElement;
      gameScreen.appendChild(wizardElement);

      return wizardElement;
    },

    createFireball(wizard, fireball) {
      let fireballElament = document.createElement("div");
      fireballElament.classList.add("fireball");
      fireballElament.style.left = wizard.posX + wizard.width + "px";
      fireballElament.style.top = wizard.posY + wizard.height / 3 + "px";
      fireballElament.style.width = fireball.width + "px";
      fireballElament.style.height = fireball.height + "px";
      gameScreen.appendChild(fireballElament);
    },

    createBug(stats) {
      const bugElement = document.createElement("div");
      bugElement.classList.add("bug");
      bugElement.style.width = stats.width + "px";
      bugElement.style.height = stats.height + "px";

      bugElement.style.left = gameScreen.offsetWidth - stats.width + "px";
      bugElement.style.top =
        Math.floor(
          Math.random() * gameScreen.offsetHeight - stats.height + 40
        ) + "px";

      gameScreen.appendChild(bugElement);
    },
  };
}
