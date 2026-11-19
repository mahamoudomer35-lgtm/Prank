(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const requestForm = document.querySelector("#request-form");
    const applicationForm = document.querySelector("#application-form");

    function saveLocal(key, payload) {
      try {
        const current = JSON.parse(localStorage.getItem(key) || "[]");
        current.push({ ...payload, submittedAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(current));
        return true;
      } catch (error) {
        return false;
      }
    }

    requestForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const category = document.querySelector("#request-category").value;
      const description = document.querySelector("#request-description").value.trim();
      const message = document.querySelector("#request-message");
      if (!category || description.length < 8) {
        window.AETHER.showMessage(message, "Choose a category and enter at least 8 characters.", "error");
        return;
      }
      if (!saveLocal("aether-demo-requests", { category, description })) {
        window.AETHER.showMessage(message, "Your browser could not save this demo request.", "error");
        return;
      }
      requestForm.reset();
      window.AETHER.showMessage(message, "REQUEST RECEIVED. Your fictional challenge request has been submitted successfully. Please wait for a response.", "success");
    });

    applicationForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const nickname = document.querySelector("#app-nickname").value.trim();
      const introduction = document.querySelector("#app-introduction").value.trim();
      const message = document.querySelector("#application-message");
      if (nickname.length < 2) {
        window.AETHER.showMessage(message, "Please enter a nickname of at least 2 characters.", "error");
        return;
      }
      if (!saveLocal("aether-demo-applications", { nickname, introduction })) {
        window.AETHER.showMessage(message, "Your browser could not save this demo application.", "error");
        return;
      }
      applicationForm.reset();
      window.AETHER.showMessage(message, "APPLICATION RECEIVED. Thanks for your interest in the AETHER experience.", "success");
    });
  });
})();
