let currentTab = 0 // Текущий таб
showTab(currentTab);

const next = document.querySelector('.next'),
      prev = document.querySelector('.prev');

let greeting = document.getElementById("greeting");

function submitForm(e) {
    e.preventDefault();
    let user_input = e.target.name.value;
    let user_input_2a = e.target.fav_language.value
    let user_input_2b = e.target.vehicle1.value
    let user_input_2c = e.target.vehicle2.value
    let user_input_2d = e.target.vehicle3.value
    let user_input_2 = e.target.email.value;
    let user_input_3 = e.target.phone.value;
    let user_input_4 = e.target.dd.value;
    let user_input_5 = e.target.nn.value;
    let user_input_6 = e.target.yyyy.value;
    let user_input_7 = e.target.uname.value;
    let user_input_8 = e.target.pword.value;
    console.log(user_input);
    console.log(user_input_2);
    console.log(user_input_2a);
    console.log(user_input_2b);
    console.log(user_input_2c);
    console.log(user_input_2d);
    console.log(user_input_3);
    console.log(user_input_4);
    console.log(user_input_5);
    console.log(user_input_6);
    console.log(user_input_7);
    console.log(user_input_8);
    // greeting.innerHTML = "";
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
  if (currentTab <= 6) { // Смена табов
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