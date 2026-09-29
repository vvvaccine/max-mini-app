const registerButton = document.getElementById("register");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const clubInput = document.getElementById("club");

const agreement = document.getElementById("agreement");
const error = document.getElementById("error");


// Маска телефона
phoneInput.addEventListener("input", () => {

    let value = phoneInput.value.replace(/\D/g, "");

    if (value.startsWith("7")) {
        value = value.substring(1);
    }

    value = value.substring(0, 10);

    let result = "+7";

    if (value.length > 0) {
        result += " (" + value.substring(0, 3);
    }

    if (value.length >= 3) {
        result += ")";
    }

    if (value.length > 3) {
        result += " " + value.substring(3, 6);
    }

    if (value.length > 6) {
        result += "-" + value.substring(6, 8);
    }

    if (value.length > 8) {
        result += "-" + value.substring(8, 10);
    }

    phoneInput.value = result;
});


// Регистрация
registerButton.addEventListener("click", () => {

    error.textContent = "";


    // Проверяем имя
    if (nameInput.value.trim() === "") {
        error.textContent = "Введите имя";
        nameInput.focus();
        return;
    }


    // Проверяем телефон
    const phone = phoneInput.value.trim();

    if (phone.length !== 18) {
        error.textContent = "Введите корректный номер телефона";
        phoneInput.focus();
        return;
    }


    // Проверяем e-mail
    const email = emailInput.value.trim();

    if (email === "") {
        error.textContent = "Введите e-mail";
        emailInput.focus();
        return;
    }


    // Простая проверка e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        error.textContent = "Введите корректный e-mail";
        emailInput.focus();
        return;
    }


    // Проверяем согласие
    if (!agreement.checked) {
        error.textContent = "Необходимо согласиться с Правилами публичной оферты";
        return;
    }


    // Если все проверки пройдены
    error.textContent = "";

    alert("Регистрация успешно пройдена!");
});

