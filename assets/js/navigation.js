(() => {
  const $ = (selector) => document.querySelector(selector);
  const sidebar = $("#sidebar");
  const overlay = $("#sidebar-overlay");
  const settings = $("#settings-menu");

  function setSidebar(open) {
    sidebar?.classList.toggle("open", open);
    overlay?.classList.toggle("open", open);
    sidebar?.setAttribute("aria-hidden", String(!open));
    $("#menu-toggle")?.setAttribute("aria-expanded", String(open));
  }
  $("#menu-toggle")?.addEventListener("click", () => setSidebar(!sidebar?.classList.contains("open")));
  $("#sidebar-close")?.addEventListener("click", () => setSidebar(false));
  overlay?.addEventListener("click", () => setSidebar(false));
  $("#settings-toggle")?.addEventListener("click", () => {
    settings?.classList.toggle("open");
    $("#settings-toggle")?.setAttribute("aria-expanded", String(settings?.classList.contains("open")));
  });
  document.addEventListener("click", (event) => {
    if (settings?.classList.contains("open") &&
        !settings.contains(event.target) && !$("#settings-toggle")?.contains(event.target)) {
      settings.classList.remove("open");
    }
  });
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => window.AETHER?.logout());
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === location.pathname.split("/").pop()) link.classList.add("active");
  });
  document.querySelectorAll("[data-settings-info]").forEach((item) => {
    item.addEventListener("click", () => {
      const label = item.dataset.settingsInfo;
      alert(`${label}\n\nThis section is an informational placeholder in this demo.`);
    });
  });
})();
