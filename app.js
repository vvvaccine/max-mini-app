
// =========================
// ЭЛЕМЕНТЫ РЕГИСТРАЦИИ
// =========================

const registrationWindow =
    document.getElementById("registrationWindow");

const registerButton =
    document.getElementById("register");

const nameInput =
    document.getElementById("name");

const phoneInput =
    document.getElementById("phone");

const emailInput =
    document.getElementById("email");

const clubInput =
    document.getElementById("club");

const agreement =
    document.getElementById("agreement");

const error =
    document.getElementById("error");


// =========================
// ЭЛЕМЕНТЫ ЛИЧНОГО КАБИНЕТА
// =========================

const accountWindow =
    document.getElementById("accountWindow");

const accountName =
    document.getElementById("accountName");

const accountBalance =
    document.getElementById("accountBalance");


// =========================
// ЭЛЕМЕНТЫ ВОЗНАГРАЖДЕНИЯ
// =========================

const rewardWindow =
    document.getElementById("rewardWindow");

const registrationReward =
    document.getElementById("registrationReward");

const claimReward =
    document.getElementById("claimReward");


// =========================
// БАЛАНС ПОЛЬЗОВАТЕЛЯ
// =========================

// Пока баланс хранится только во время работы приложения

let balance = 0;


// Размер награды за регистрацию

const registrationRewardAmount = 50;


// =========================
// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ MAX
// =========================

const user =
    window.WebApp?.initDataUnsafe?.user;

if (user) {

    let fullName =
        user.first_name || "";

    if (user.last_name) {
        fullName += " " + user.last_name;
    }

    nameInput.value = fullName;
}


// =========================
// ОТКРЫТИЕ ПУБЛИЧНОЙ ОФЕРТЫ
// =========================

document.getElementById("offer")
    .addEventListener("click", (event) => {

        event.preventDefault();

        window.WebApp.openLink("https://max.ru/");

    });


// =========================
// МАСКА ТЕЛЕФОНА
// =========================

phoneInput.addEventListener("input", () => {

    let value =
        phoneInput.value.replace(/\D/g, "");

    if (value.startsWith("7")) {
        value = value.substring(1);
    }

    value = value.substring(0, 10);

    let result = "+7";

    if (value.length > 0) {
        result +=
            " (" + value.substring(0, 3);
    }

    if (value.length >= 3) {
        result += ")";
    }

    if (value.length > 3) {
        result +=
            " " + value.substring(3, 6);
    }

    if (value.length > 6) {
        result +=
            "-" + value.substring(6, 8);
    }

    if (value.length > 8) {
        result +=
            "-" + value.substring(8, 10);
    }

    phoneInput.value = result;

});


// =========================
// ПОДСКАЗКИ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ
// =========================

nameInput.title = "Заполните поле";
phoneInput.title = "Заполните поле";
emailInput.title = "Заполните поле";


// =========================
// РЕГИСТРАЦИЯ
// =========================

registerButton.addEventListener("click", () => {

    error.textContent = "";


    // Проверяем имя

    if (nameInput.value.trim() === "") {

        error.textContent =
            "Введите имя";

        nameInput.focus();

        return;
    }


    // Проверяем телефон

    const phone =
        phoneInput.value.trim();

    if (phone.length !== 18) {

        error.textContent =
            "Введите корректный номер телефона";

        phoneInput.focus();

        return;
    }


    // Проверяем e-mail

    const email =
        emailInput.value.trim();

    if (email === "") {

        error.textContent =
            "Введите e-mail";

        emailInput.focus();

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        error.textContent =
            "Введите корректный e-mail";

        emailInput.focus();

        return;
    }


    // Проверяем согласие

    if (!agreement.checked) {

        error.textContent =
            "Необходимо согласиться с Правилами публичной оферты";

        return;
    }


    // =========================
    // РЕГИСТРАЦИЯ УСПЕШНА
    // =========================

    error.textContent = "";


    // Берём имя, которое пользователь
    // ввёл в форме

    const enteredName =
        nameInput.value.trim();


    // Передаём имя в ЛК

    accountName.textContent =
        enteredName;


    // Показываем текущий баланс

    updateBalance();


    // Показываем ЛК

    registrationWindow.style.display =
        "none";

    accountWindow.style.display =
        "block";


    // На главном окне кнопка MAX «Назад»
    // должна быть скрыта

    window.WebApp.BackButton.hide();

});


// =========================
// ОБНОВЛЕНИЕ БАЛАНСА
// =========================

function updateBalance() {

    accountBalance.textContent =
        balance + " ₽";

}


// =========================
// ОТКРЫТИЕ ВОЗНАГРАЖДЕНИЯ
// =========================

document.getElementById("rewards")
    .addEventListener("click", (event) => {

        event.preventDefault();


        // Скрываем ЛК

        accountWindow.style.display =
            "none";


        // Показываем окно награды

        rewardWindow.style.display =
            "block";


        // Показываем кнопку «Назад» MAX

        window.WebApp.BackButton.show();

    });


// =========================
// ПОЛУЧЕНИЕ НАГРАДЫ
// =========================

claimReward.addEventListener("click", () => {

    // Добавляем 50 рублей к балансу

    balance += registrationRewardAmount;


    // Обновляем баланс

    updateBalance();


    // Убираем блок награды

    registrationReward.style.display =
        "none";

});


// =========================
// КНОПКА «НАЗАД» MAX
// =========================

const onBackButtonPress = () => {

    // Если открыто окно вознаграждения

    if (rewardWindow.style.display === "block") {

        // Скрываем окно вознаграждения

        rewardWindow.style.display =
            "none";


        // Возвращаем ЛК

        accountWindow.style.display =
            "block";


        // На ЛК кнопка назад больше не нужна

        window.WebApp.BackButton.hide();

    }

};


// Регистрируем обработчик кнопки MAX

window.WebApp.BackButton.onClick(
    onBackButtonPress
);


// =========================
// ЗАГЛУШКИ
// =========================

document.getElementById("history")
    .addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "Раздел «История» пока находится в разработке."
        );

    });


document.getElementById("referrals")
    .addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "Раздел «Мои рефералы» пока находится в разработке."
        );

    });
