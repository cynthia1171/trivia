let cont = 0;
function puntajeT(cont){
  
  if (cont === 11) {
    var name = $('#name').val();
    $('#contenedor').empty();
    $('#nombre').empty();
    $('#contenedor').append(`
      <img id="game-over" src="assets/img/game-over.png"/>
      <h3>${name} tu puntaje es:</h3>
      <h4>${puntaje}</h4>
      <a href="index.html"><button id="volver">Volver a jugar</button></a>
    `);
  }else{
    getTrivia();
  }
}

$('#volver').click(function() {
  alert('volver');
  puntaje = 0;
  cont = 0;
})

$('#start').click(function() {
  let nickname = $('#nick').val();
  if (nickname === '') {
    alert('debes ingresar nickname');
  }else {
    $('.nickname').hide();
    $('#nombre').append('A jugar <span id="name">'+nickname+'!!!</span>');
    cont++;
    puntajeT(cont);
  }
});
let puntaje = 0;

  function getTrivia() {
    
    fetch(`https://opentdb.com/api.php?amount=10&category=15`)
      .then(function (response) {
        // Turns the the JSON into a JS object
        return response.json();
      })
      .then(function (categories) {
        let firstQuestion = categories.results[0].question;
        $('#contenedor').append(`<p id="pregunta">${firstQuestion}</p>`);
        let categorie = categories.results[0];
        let arrAnswers = [];
        arrAnswers.push(categorie.correct_answer);
        $('#contenedor').append(`
            <li><button id="correct" class="btn btn-default btn-block">${arrAnswers}</button></li>
      `);
        let incorrect = categorie.incorrect_answers;
        incorrect.forEach((mala, i) => {
          $('#contenedor').append(`
            <li><button id="incorrect" class="btn btn-default btn-block">${mala}</button></li>
        `);

        });

        $('button').click(function () {
          var id = $(this).attr('id');
          if (id === 'correct') {
            puntaje = puntaje + 100;
            $('#contenedor').empty();
            cont++;
            puntajeT(cont);
          } else if (id === 'incorrect') {
            puntaje -= 100;
            $('#contenedor').empty();
            cont++;
            puntajeT(cont);
          }
        })
      });

  }
  
