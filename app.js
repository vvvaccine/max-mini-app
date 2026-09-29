document.getElementById("start").addEventListener("click", () => {
    const user = window.WebApp.initDataUnsafe.user;

    if (!user) {
        alert("Данные пользователя недоступны");
        return;
    }

    alert(
        `ID: ${user.id}\n` +
        `Имя: ${user.first_name}\n` +
        `Фамилия: ${user.last_name}\n` +
        `Никнейм: ${user.username}\n` +
        `Язык: ${user.language_code}`
    );
});