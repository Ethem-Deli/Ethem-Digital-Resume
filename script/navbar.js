document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#navbar-button").addEventListener("click", () => {
        document.querySelector("#navbar-button").classList.toggle("is-active");
        document.querySelector("#navbar-menu").classList.toggle("is-active");
    });
});
