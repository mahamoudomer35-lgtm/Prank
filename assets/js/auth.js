(() => {
  const A = window.AETHER || {};
  const client = A.supabase;

  A.showMessage = (element, message, type = "") => {
    if (!element) return;
    element.textContent = message;
    element.className = `form-message ${type}`.trim();
  };

  A.requireSession = async () => {
    if (!client) {
      document.body.classList.remove("auth-pending");
      const notice = document.querySelector("[data-config-notice]");
      if (notice) notice.textContent = "Supabase is not configured. Add your project URL and public key to assets/js/supabase.js.";
      return null;
    }
    try {
      const { data, error } = await client.auth.getSession();
      if (error || !data.session) {
        window.location.replace("login.html");
        return null;
      }
      return data.session;
    } catch (error) {
      console.error("Session check failed:", error);
      window.location.replace("login.html");
      return null;
    }
  };

  A.logout = async () => {
    if (!client) {
      window.location.replace("login.html");
      return;
    }
    const { error } = await client.auth.signOut();
    if (error) {
      alert("Could not sign out. Please try again.");
      return;
    }
    window.location.replace("login.html");
  };

  A.guardCurrentPage = () => {
    if (document.body.dataset.protected === "true") A.requireSession();
  };

  window.AETHER = A;
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    if (!loginForm) return;
    const message = document.querySelector("#login-message");
    const submit = loginForm.querySelector('button[type="submit"]');

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
        A.showMessage(message, "Enter a valid email address and password.", "error");
        return;
      }
      if (!client) {
        A.showMessage(message, "Supabase is not configured. Update assets/js/supabase.js first.", "error");
        return;
      }
      submit.disabled = true;
      submit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> AUTHENTICATING';
      A.showMessage(message, "Checking credentials…");
      try {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error || !data?.session || !data?.user) {
          A.showMessage(message, error?.message || "Authentication could not be confirmed.", "error");
          submit.disabled = false;
          submit.textContent = "AUTHENTICATE";
          return;
        }
        window.location.assign("done.html");
      } catch (error) {
        A.showMessage(message, "Unable to connect. Check your connection and try again.", "error");
        submit.disabled = false;
        submit.textContent = "AUTHENTICATE";
      }
    });
  });
  A.guardCurrentPage();
})();
