let snake = document.getElementById('snake');
    let food = document.getElementById('food');
    let snakeBody = [{ left: 0, top: 0 }, { left: 20, top: 0 }]; // تم تعديل جسم الدودة ليبدأ بكرتين
    let foodLeft = 0;
    let foodTop = 0;
    let snakeLeft = snakeBody[0].left;
    let snakeTop = snakeBody[0].top;
    let direction = 'right';
    let gameInterval;
    let score = 0;


    

    function startGame() {
  const playerNameInput = document.getElementById('playerName');
  const playerName = playerNameInput.value.trim();

  if (playerName === '') {
    alert('Please enter your name to start the game!');
  } else {
    // عرض اسم اللاعب في المستطيل المخصص له
    const playerNameDisplay = document.getElementById('playerNameDisplay');
    playerNameDisplay.textContent = playerName;

    // إخفاء صفحة البداية وبدء اللعبة
    document.querySelector('.start-page').style.display = 'none';
    // بدء اللعبة بعد كتابة اسم اللاعب
    gameInterval = setInterval(moveSnake, 150);
    generateFood();
  }
}


  function endGame() {
  clearInterval(gameInterval);

  document.querySelector('.game-area').classList.add('shake');

  setTimeout(() => {
    document.querySelector('.game-area').classList.remove('shake');
    document.querySelector('.game-over').style.display = 'block';
  }, 400);

  document.getElementById('gameOverScore').innerText = score;
}


  function restartGame() {
  // إعادة تهيئة المتغيرات
  snakeBody = [{ left: 0, top: 0 }, { left: 20, top: 0 }];
  snakeLeft = snakeBody[0].left;
  snakeTop = snakeBody[0].top;
  direction = 'right';
  score = 0;

  // تحديث عرض النقاط إلى القيمة الافتراضية
  document.getElementById('score').innerText = score;

  // إعادة عرض شاشة البداية
  document.querySelector('.start-page').style.display = 'flex';

  // إخفاء شاشة "Game Over"
  document.querySelector('.game-over').style.display = 'none';
}


    function generateFood() {
      foodLeft = Math.floor(Math.random() * 29) * 20;
      foodTop = Math.floor(Math.random() * 19) * 20;
      food.style.left = foodLeft + 'px';
      food.style.top = foodTop + 'px';
    }

    function eatFood() {
      if (snakeLeft === foodLeft && snakeTop === foodTop) {
        score++;
        document.getElementById('score').innerText = score;

        // 👇 animation
        let scoreBox = document.querySelector('.score');
        scoreBox.classList.add('score-pop');
        setTimeout(() => {
          scoreBox.classList.remove('score-pop');
        }, 300);

        let newBlock = {
          left: snakeBody[snakeBody.length - 1].left,
          top: snakeBody[snakeBody.length - 1].top
        };

        snakeBody.push(newBlock);
        generateFood();
      }
    }


    function moveSnake() {
      switch (direction) {
        case 'right':
          snakeLeft += 20;
          break;
        case 'left':
          snakeLeft -= 20;
          break;
        case 'up':
          snakeTop -= 20;
          break;
        case 'down':
          snakeTop += 20;
          break;
      }

      if (snakeLeft < 0 || snakeLeft >= 900 || snakeTop < 0 || snakeTop >= 650) {
        endGame();
        return;
      }

      snake.style.left = snakeLeft + 'px';
      snake.style.top = snakeTop + 'px';

      for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = { ...snakeBody[i - 1] };
      }

      snakeBody[0] = { left: snakeLeft, top: snakeTop };

      for (let i = 1; i < snakeBody.length; i++) {
        if (snakeLeft === snakeBody[i].left && snakeTop === snakeBody[i].top) {
          endGame();
          return;
        }
      }

      eatFood();
      updateSnake();
    }

    function updateSnake() {
      // تم إزالة محتويات الدودة السابقة
      document.querySelectorAll('.snake').forEach(segment => segment.remove());

      // تكوين جسم الدودة الجديد مع الكرتين الأولى
      for (let i = 0; i < snakeBody.length; i++) {
        const segment = document.createElement('div');
        segment.classList.add('snake');
        segment.style.width = '20px';
        segment.style.height = '20px';
        segment.style.backgroundColor = '#000';
        segment.style.position = 'absolute';
        segment.style.left = snakeBody[i].left + 'px';
        segment.style.top = snakeBody[i].top + 'px';
        segment.style.borderRadius = '50%';
        document.querySelector('.game-area').appendChild(segment);
      }
    }

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          if (direction !== 'left') {
            direction = 'right';
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            direction = 'left';
          }
          break;
        case 'ArrowUp':
          if (direction !== 'down') {
            direction = 'up';
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            direction = 'down';
          }
          break;
      }
    });
    startGame();
    