function start(state, game) {
  game.createWizard(state.wizard);
  window.requestAnimationFrame((timestamp) => gameLoop(state, game, timestamp));
}

function gameLoop(state, game, timestamp) {
  const { wizard } = state;
  const { wizardElement } = game;

  game.scoreScreen.textContent = `${state.score}: points!`;
  if (state.keys.KeyD) {
    wizard.posX = Math.min(
      wizard.posX + wizard.speed,
      game.gameScreen.offsetWidth - wizard.height
    );
  }
  if (state.keys.KeyW) {
    wizard.posY = Math.max(wizard.posY - wizard.speed, 0);
  }
  if (state.keys.KeyA) {
    wizard.posX = Math.max(wizard.posX - wizard.speed, 0);
  }
  if (state.keys.KeyS) {
    wizard.posY = Math.min(
      wizard.posY + wizard.speed,
      game.gameScreen.offsetHeight - wizard.height
    );
  }
  if (state.keys.Space) {
    game.wizardElement.style.backgroundImage = 'url("/images/wizard-fire.png")';

    if (timestamp > state.fireball.nextSpawnTimestamp) {
      game.createFireball(wizard, state.fireball);
      state.fireball.nextSpawnTimestamp = timestamp + state.fireball.fireRate;
    }
  } else {
    game.wizardElement.style.backgroundImage = 'url("/images/wizard.png")';
  }

  if (timestamp > state.bugStats.nextSpawnTimestamp) {
    game.createBug(state.bugStats);
    state.bugStats.nextSpawnTimestamp =
      timestamp + Math.random() * state.bugStats.maxSpownInterval;
  }
  let bugElements = document.querySelectorAll(".bug");
  bugElements.forEach((bug) => {
    let posX = parseInt(bug.style.left);

    if (detectColision(wizardElement, bug)) {
      state.gameOver = true;
    }
    if (state.score % 1000 == 0) {
      state.bugStats.speed++;
    }

    if (posX > 0) {
      bug.style.left = posX - state.bugStats.speed + "px";
    } else {
      bug.remove();
    }
  });

  document.querySelectorAll(".fireball").forEach((fireball) => {
    let posX = parseInt(fireball.style.left);

    bugElements.forEach((bug) => {
      if (detectColision(bug, fireball)) {
        state.score += state.killScore;
        bug.remove();
        fireball.remove();
      }
    });

    if (posX > game.gameScreen.offsetWidth) {
      fireball.remove();
    } else {
      fireball.style.left = posX + state.fireball.speed + "px";
    }
  });

  wizardElement.style.left = wizard.posX + "px";
  wizardElement.style.top = wizard.posY + "px";

  if (state.gameOver) {
    game.gameScreen.classList.add("hidden");
    game.gameOverScreen.classList.remove("hidden");
    let totalPointsElement = document.querySelector(".total-points")
    totalPointsElement.textContent = state.score + ' points!'
  } else {
    state.score += state.scoreRate;
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
  }
}

function detectColision(objectA, objectB) {
  let first = objectA.getBoundingClientRect();
  let second = objectB.getBoundingClientRect();

  let hesCollision = !(
    first.top > second.bottom ||
    first.bottom < second.top ||
    first.right < second.left ||
    first.left > second.right
  );
  return hesCollision;
}
