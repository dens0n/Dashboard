const time = document.getElementById("current-time");
const date = document.getElementById("current-date");

setInterval(() => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    time.innerHTML = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    date.innerHTML = currentDate.toLocaleDateString('sv-SE', options);
}, 100);

