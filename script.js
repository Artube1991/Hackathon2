let currentTab = 0;
showTab(currentTab);

const next = document.querySelector('.next'),
      prev = document.querySelector('.prev');

const quetions = document.getElementById('questions');
const finish = document.querySelectorAll('.finish');

function finished() {
  for (let i = 0; i < finish.length; i++) {
  finish[i].style.display = "none";
}
};

finished();

function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

function toHTML(element, text) {
      elem_to_insert = document.getElementById(element);
      elem_to_insert.innerHTML = `<iframe src="https://giphy.com/embed/${text}" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
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

getGIF("gif-cat", "cat");
getGIF("no_anxiety_gif", "happy");
getGIF("low_anxiety_gif", "not bad");
getGIF("high_anxiety_gif", "anxiety");
getGIF("anxiety", "sad");

function submitForm(e) {
    e.preventDefault();
    let user_name = e.target.name.value;
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
      quetions.style.display = "none";
      document.getElementById('no_anxiety').style = "block";
      document.getElementById('no_anxiety_text').innerText = `You've earned only ${anxiety_score} scores. Your anxiety level is low as low as ever. So, ${user_name}, you may relax and watch the funny video :)`;
    }

    else if (anxiety_score < 11) {
      quetions.style.display = "none";
      document.getElementById('low_anxiety').style = "block";
      document.getElementById('low_anxiety_text').innerText = `${user_name}, your anxiety scores are ${anxiety_score}. Your anxiety level is low but you may have some stress deep inside your heart. Listen to it.`;
    }

    else if (anxiety_score < 22) {
      quetions.style.display = "none";
      document.getElementById('anxiety').style = "block";
      document.getElementById('anxiety_text').innerText = `Hi, ${user_name}, we've revealed that your anxiety scores are ${anxiety_score}. You definetely have the anxiety. Try to avoid stresses, eat and sleep well and talk to your friends.`;
    }

    else {
      quetions.style.display = "none";
      document.getElementById('high_anxiety_text').innerText = `Your anxiety level is really high! ${anxiety_score} scores! You should talk to psychologist and immediately have a rest! Care of yourself, ${user_name}.`;
      document.getElementById('high_anxiety').style = "block";
    };    

}

function showTab(n) {
  let x = document.querySelectorAll('.tab');
  const prev = document.querySelector('.prev');
  x[n].style.display = "block";
  if (n == 0) {
    prev.style.display = "none";
  }
  else if (n == x.length - 1) {
    next.style.display = "none";
  } else {
    prev.style.display = "inline";
  }
}

next.addEventListener('click', () => { // Логика кнопки "Вперёд (next)" По нажатию на кнопку проверка полей на валидность и смена текущего таба
  let x = document.querySelectorAll('.tab');
  if (!validateForm()) {
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