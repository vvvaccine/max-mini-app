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
// ЭЛЕМЕНТЫ ПРИГЛАШЕНИЯ
// =========================

const inviteWindow =
    document.getElementById("inviteWindow");

const inviteButton =
    document.getElementById("inviteButton");

const inviteClubName =
    document.getElementById("inviteClubName");

const inviteManagerName =
    document.getElementById("inviteManagerName");

const invitePhone =
    document.getElementById("invitePhone");

const inviteEmail =
    document.getElementById("inviteEmail");

const clubInfo =
    document.getElementById("clubInfo");

const managerNotice =
    document.getElementById("managerNotice");

const sendInvite =
    document.getElementById("sendInvite");

const inviteError =
    document.getElementById("inviteError");


// =========================
// ФУТЕР
// =========================

const footer =
    document.getElementById("footer");


// =========================
// БАЛАНС
// =========================

let balance = 0;

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
// ПУБЛИЧНАЯ ОФЕРТА
// =========================

document.getElementById("offer")
    .addEventListener("click", (event) => {

        event.preventDefault();

        window.WebApp.openLink("https://sportcrm.club/money-details.html");

    });


// =========================
// МАСКА ТЕЛЕФОНА РЕГИСТРАЦИИ
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
// МАСКА ТЕЛЕФОНА ПРИГЛАШЕНИЯ
// =========================

invitePhone.addEventListener("input", () => {

    let value =
        invitePhone.value.replace(/\D/g, "");

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

    invitePhone.value = result;

});


// =========================
// ПОДСКАЗКИ
// =========================

nameInput.title = "Заполните поле";
phoneInput.title = "Заполните поле";
emailInput.title = "Заполните поле";
inviteClubName.title = "Заполните поле";
inviteManagerName.title = "Заполните поле";
invitePhone.title = "Заполните поле";


// =========================
// ОБНОВЛЕНИЕ БАЛАНСА
// =========================

function updateBalance() {

    accountBalance.textContent =
        balance + " ₽";

}


// =========================
// РЕГИСТРАЦИЯ
// =========================

registerButton.addEventListener("click", () => {

    error.textContent = "";


    if (nameInput.value.trim() === "") {

        error.textContent =
            "Введите имя";

        nameInput.focus();

        return;
    }


    const phone =
        phoneInput.value.trim();

    if (phone.length !== 18) {

        error.textContent =
            "Введите корректный номер телефона";

        phoneInput.focus();

        return;
    }


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


    if (!agreement.checked) {

        error.textContent =
            "Необходимо согласиться с Правилами публичной оферты";

        return;
    }


    // Регистрация успешна

    accountName.textContent =
        nameInput.value.trim();

    updateBalance();

    registrationWindow.style.display =
        "none";

    accountWindow.style.display =
        "block";

    footer.style.display =
        "block";

    window.WebApp.BackButton.hide();

});


// =========================
// ВОЗНАГРАЖДЕНИЕ
// =========================

document.getElementById("rewards")
    .addEventListener("click", (event) => {

        event.preventDefault();

        accountWindow.style.display =
            "none";

        rewardWindow.style.display =
            "block";

        footer.style.display =
            "block";

        window.WebApp.BackButton.show();

    });


claimReward.addEventListener("click", () => {

    balance +=
        registrationRewardAmount;

    updateBalance();

    registrationReward.style.display =
        "none";

});


// =========================
// ОКНО ПРИГЛАШЕНИЯ
// =========================

inviteButton.addEventListener("click", () => {

    // Скрываем ЛК

    accountWindow.style.display =
        "none";


    // Показываем форму приглашения

    inviteWindow.style.display =
        "block";


    // На окне приглашения футер скрываем

    footer.style.display =
        "none";


    // Показываем системную кнопку назад

    window.WebApp.BackButton.show();

});


// =========================
// ОТПРАВКА ПРИГЛАШЕНИЯ
// =========================

sendInvite.addEventListener("click", () => {

    inviteError.textContent = "";


    // =========================
    // НАЗВАНИЕ КЛУБА
    // =========================

    if (inviteClubName.value.trim() === "") {

        inviteError.textContent =
            "Введите название клуба";

        inviteClubName.focus();

        return;
    }


    // =========================
    // ФИО РУКОВОДИТЕЛЯ
    // =========================

    if (inviteManagerName.value.trim() === "") {

        inviteError.textContent =
            "Введите ФИО руководителя";

        inviteManagerName.focus();

        return;
    }


    // =========================
    // ТЕЛЕФОН
    // =========================

    const managerPhone =
        invitePhone.value.trim();

    if (managerPhone.length !== 18) {

        inviteError.textContent =
            "Введите корректный номер телефона";

        invitePhone.focus();

        return;
    }


    // =========================
    // E-MAIL
    // =========================

    const managerEmail =
        inviteEmail.value.trim();

    // E-mail необязательный.
    // Проверяем формат только если он заполнен.

    if (managerEmail !== "") {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(managerEmail)) {

            inviteError.textContent =
                "Введите корректный e-mail";

            inviteEmail.focus();

            return;
        }

    }


    // =========================
    // ЧЕКБОКС
    // =========================

    if (!managerNotice.checked) {

        inviteError.textContent =
            "Необходимо подтвердить информацию о звонке Менеджера SportCRM";

        return;
    }


    // =========================
    // ПРИГЛАШЕНИЕ УСПЕШНО
    // =========================

    inviteError.textContent = "";


    // Здесь позже будет отправка данных
    // на сервер.


    // Очищаем форму

    inviteClubName.value = "";
    inviteManagerName.value = "";
    invitePhone.value = "";
    inviteEmail.value = "";
    clubInfo.value = "";
    managerNotice.checked = false;


    // Закрываем окно приглашения

    inviteWindow.style.display =
        "none";


    // Возвращаем ЛК

    accountWindow.style.display =
        "block";


    // Возвращаем футер

    footer.style.display =
        "block";


    // На главном окне кнопка назад скрыта

    window.WebApp.BackButton.hide();

});


// =========================
// КНОПКА «НАЗАД» MAX
// =========================

const onBackButtonPress = () => {

    // Возврат из вознаграждения

    if (rewardWindow.style.display === "block") {

        rewardWindow.style.display =
            "none";

        accountWindow.style.display =
            "block";

        footer.style.display =
            "block";

    }


    // Возврат из приглашения

    else if (inviteWindow.style.display === "block") {

        inviteWindow.style.display =
            "none";

        accountWindow.style.display =
            "block";

        footer.style.display =
            "block";

    }


    // На ЛК кнопка назад скрыта

    window.WebApp.BackButton.hide();

};


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
