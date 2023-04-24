  // get the start time of the quiz from the server using an API call
  fetch('/api/quiz/start-time')
    .then(response => response.json())
    .then(data => {
      const startTime = new Date(data.startTime);
      const now = new Date();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      let timeRemaining = '<%= quiz.timeLimit %>';

      // subtract the elapsed time from the initial time remaining
      const parts = timeRemaining.split(':');
      let minutes = parseInt(parts[0], 10);
      let seconds = parseInt(parts[1], 10);
      const totalSeconds = minutes * 60 + seconds - elapsedSeconds;
      minutes = Math.floor(totalSeconds / 60);
      seconds = totalSeconds % 60;
      timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} sec`;

      // display the initial time remaining on the page
      document.getElementById('timeRemaining').textContent = timeRemaining;

      // update the time remaining every second
      const intervalId = setInterval(() => {
        // calculate the new time remaining
        const parts = timeRemaining.split(':');
        let minutes = parseInt(parts[0], 10);
        let seconds = parseInt(parts[1], 10);
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} sec`;

        // update the time remaining on the page
        document.getElementById('timeRemaining').textContent = timeRemaining;

        // check if time is up
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          // add code to handle time up event here
        }
      }, 1000);
    });
