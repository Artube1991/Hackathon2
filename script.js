let currentTab = 0 // Текущий таб
showTab(currentTab);

const next = document.querySelector('.next'),
      prev = document.querySelector('.prev');

const main = document.getElementById('regForm');

function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

function toHTML(element, text) {
      elem_to_insert = document.getElementById(element);
      elem_to_insert.innerHTML = `<div><iframe src="https://giphy.com/embed/${text}" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>`
  }

function getGIF(element, theme) {
  fetch(`https://api.giphy.com/v1/gifs/search?q=${theme}&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My&limit=100`)
  .then((response) => {
  if (response.ok){
      return response.json()
  } else {
      throw new Error("Wrong GIF")
  }
  })
  .then((new_obj) => {
      console.log(new_obj);
      let number = getRandomInt(1, 51);
      gif_id = new_obj["data"][number]["id"];
      toHTML(element, gif_id);
  })
  .catch((error) => {
      console.log(`We have the error: ${error}`)
      image.innerText = `We have the error: ${error}`
  });
};

getGIF("gif-cat", "cat")

function submitForm(e) {
    e.preventDefault();
    let user_input = Number(e.target.confidence.value);
    let user_input_2 = Number(e.target.pict.value);
    let user_input_3_nan = e.target.bothering.value;
    let user_input_4 = Number(e.target.avoid.value);
    let user_input_5 = Number(e.target.rate.value);
    let user_input_6 = Number(e.target.pleasure.value);
    let user_input_7 = Number(e.target.safe.value);
    let user_input_8 = Number(e.target.restless.value);

    let user_input_3_arr = user_input_3_nan.split(', ');
    let user_input_3 = Number(user_input_3_arr.length);

    console.log(user_input);
    console.log(user_input_2);
    console.log(user_input_3_arr.length);
    console.log(user_input_4);
    console.log(user_input_5);
    console.log(user_input_6);
    console.log(user_input_7);
    console.log(user_input_8);

    let anxiety_score = user_input + user_input_2 + user_input_3 + user_input_4 + user_input_6 + user_input_7 + user_input_8 - user_input_5;
    console.log(anxiety_score);

    if (anxiety_score < 3) {
    main.innerHTML = '<div id="no_anxiety"><h1>Congratulations!</h1><div id="no_anxiety_gif"></div><p>You raised just .. scores. Your anxiety level is low as low as ever. You may relax and watch the funny video here:</p>';
    getGIF("no_anxiety_gif", "happy");
  }

  if (anxiety_score > 21) {
    main.innerHTML = '<div id="high_anxiety"><h1>Emergency!</h1><div id="high_anxiety_gif"></div><p>Your anxiety level is really high! ... scores! You should talk to psychologist and immediately have a rest! Here is some advives for you.</p></div>';
    getGIF("high_anxiety_gif", "anxiety");
  }

  else {
    
  }
      

}

function showTab(n) { // Отвечает за показ текущего таба и показ кнопки "Назад (prev)"
  let x = document.querySelectorAll('.tab');
  const prev = document.querySelector('.prev');
  x[n].style.display = "block";
  if (n == 0) {
    prev.style.display = "none";
  } else {
    prev.style.display = "inline";
  }
}

next.addEventListener('click', () => { // Логика кнопки "Вперёд (next)" По нажатию на кнопку проверка полей на валидность и смена текущего таба
  let x = document.querySelectorAll('.tab');
  if (!validateForm()) { // Проверка полей на валидность
    return
  }
  if (currentTab <= 11) { // Смена табов
    x[currentTab].style.display = "none";
    currentTab = ++currentTab;
    x[currentTab].style.display = "block";
  }
  showTab(currentTab);
  step(currentTab);
});

prev.addEventListener('click', () => { // Логика кнопки "Назад (prev)"
  let x = document.querySelectorAll('.tab');
  x[currentTab].style.display = "none";
  currentTab = --currentTab;
  x[currentTab].style.display = "block";
  showTab(currentTab);
  step(currentTab);
});

function step(n) { // Показывает на каком ты сейчас вопросе
  var x = document.getElementsByClassName("step");
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove("current-step");
  }
  x[n].classList.add("current-step");
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  //if (valid) {
  //  document.getElementsByClassName("step")[currentTab].className += " finish";
  //}
  return valid; // return the valid status
}