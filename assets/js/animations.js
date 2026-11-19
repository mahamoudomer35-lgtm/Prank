(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const verification = document.querySelector("#verification-state");
    if (verification) {
      (async () => {
        if (!window.AETHER?.supabase) {
          verification.textContent = "SUPABASE CONFIGURATION REQUIRED";
          return;
        }
        const { data, error } = await window.AETHER.supabase.auth.getSession();
        if (error || !data?.session) {
          window.location.replace("login.html");
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 1250));
        document.querySelector("#verify-spinner")?.classList.add("hidden");
        document.querySelector("#verify-check")?.classList.remove("hidden");
        verification.textContent = "IDENTITY CONFIRMED";
        document.querySelector("#verify-detail").textContent = "Your authenticated session is active.";
        await new Promise(resolve => setTimeout(resolve, 900));
        window.location.replace("loading.html");
      })();
    }

    const progress = document.querySelector("#progress-fill");
    if (progress) {
      (async () => {
        const start = performance.now();
        const duration = 5000;
        const percent = document.querySelector("#progress-percent");
        const status = document.querySelector("#loading-status");
        const messages = [
          [0, "INITIALIZING SYSTEM..."],
          [18, "VERIFYING SESSION..."],
          [42, "LOADING INTERFACE..."],
          [67, "SYNCHRONIZING DATA..."],
          [91, "ACCESS GRANTED."]
        ];
        const tick = () => {
          const elapsed = performance.now() - start;
          const value = Math.min(100, (elapsed / duration) * 100);
          progress.style.width = `${value}%`;
          percent.textContent = `${Math.floor(value)}%`;
          const current = messages.filter(([at]) => value >= at).at(-1);
          status.textContent = current?.[1] || messages[0][1];
          if (value < 100) requestAnimationFrame(tick);
          else setTimeout(() => window.location.replace("dashboard.html"), 350);
        };
        tick();
      })();
    }
  });
})();
