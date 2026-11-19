(() => {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-mission]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.mission;
        sessionStorage.setItem("aether-selected-mission", name);
        window.location.assign("request.html?mission=" + encodeURIComponent(name));
      });
    });
  });
})();
