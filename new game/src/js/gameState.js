function initState() {
  const state = {
    player: "Zdravko",
    gameOver: false,
    score: 0,
    scoreRate: 1,
    killScore: 1000,

    wizard: {
      width: 82,
      height: 100,
      startX: 200,
      startY: 100,
      posX: 200,
      posY: 100,
      speed: 6,
    },

    bugStats: {
      width: 50,
      height: 50,
      nextSpawnTimestamp: 0,
      maxSpownInterval: 3000,
      speed: 2,
    },

    fireball: {
      width: 20,
      height: 20,
      speed: 12,
      nextSpawnTimestamp: 0,
      fireRate: 300,
    },

    keys: {
      KeyA: false,
      KeyS: false,
      KeyW: false,
      KeyD: false,
      Space: false,
    },
  };
  return state;
}
