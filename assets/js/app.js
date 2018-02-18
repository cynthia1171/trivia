$('#start').click(function() {
  let nickname = $('#nick').val();
  if (nickname === '') {
    alert('debes ingresar nickname');
  }else {
    window.location = 'primera.html';
    getTrivia();
  }
});

function getTrivia() {
  fetch(`https://opentdb.com/api.php?amount=10&category=15`)
    .then(function (response) {
      // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function (categories) {
      var question = categories.results;
      question.forEach((data, index) => {
        $('#contenedor').append(`<h4>${data.question}</h4>`);
        //let categorie = categories.results[0];
        let arrAnswers = [];
        arrAnswers.push(data.correct_answer);
        $('#contenedor').append(`
            <li class="correct"><button>${arrAnswers}</button></li>
      `);
        let incorrect = data.incorrect_answers;
        incorrect.forEach((mala, i) => {
          $('#contenedor').append(`
            <li class="incorrect"><button>${mala}</button></li>
        `);
        });
      })
    })
      
}