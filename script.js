document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const toastContainer = document.getElementById("toastContainer");
    const apkCards = document.querySelectorAll(".apk-card");

    /**
     * Loading Screen Fade Out
     */
    window.addEventListener("load", () => {
        if (!loadingScreen) return;

        loadingScreen.style.transition = "opacity 0.6s ease, visibility 0.6s ease";
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";

        setTimeout(() => {
            loadingScreen.remove();
        }, 700);
    });

    /**
     * Toast Modern
     */
    function showToast(title, message) {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = "toast";

        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";

            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2200);
    }

    /**
     * Fade Out Page Before Redirect
     */
    function redirectWithFade(url) {
        document.body.style.transition = "opacity 0.4s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = url;
        }, 400);
    }

    /**
     * APK Card Click
     */
    apkCards.forEach((card) => {
        card.addEventListener("click", () => {
            const apkName = card.dataset.apkName || "";

            apkCards.forEach((item) => {
                item.classList.remove("is-active");
            });

            card.classList.add("is-active");

            try {
                localStorage.setItem("selectedApk", apkName);
            } catch (_) {}

            showToast(
                "Aplikasi Dipilih",
                `${apkName} sedang dibuka...`
            );

            setTimeout(() => {
                redirectWithFade("form.html");
            }, 800);
        });
    });
});