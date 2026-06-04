document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PRODUCT DATA
    ===================================== */

    const productData = {
        "Alight Motion": {
            image: "assets/am.png",
            title: "Alight Motion Premium",
            products: [
                {
                    id: 1,
                    name: "Alight Motion 1 Tahun Email Seller",
                    price: 5000,
                    bestSeller: true
                },
                {
                    id: 2,
                    name: "Alight Motion 1 Tahun Email Customer",
                    price: 8000,
                    bestSeller: false
                }
            ]
        }
    };

    /* =====================================
       ELEMENTS
    ===================================== */

    const packageList = document.querySelector(".package-list");
    const paymentInputs = document.querySelectorAll(
        'input[name="payment"]'
    );

    const buyButton = document.getElementById("buyButton");
    const toastContainer = document.getElementById("toastContainer");

    const summaryApp = document.getElementById("summaryApp");
    const summaryPackage = document.getElementById("summaryPackage");
    const summaryPayment = document.getElementById("summaryPayment");
    const summaryPrice = document.getElementById("summaryPrice");

    const appTitle = document.querySelector(".app-title");
    const appImage = document.querySelector(".app-banner-image img");

    /* =====================================
       STATE
    ===================================== */

    let selectedPackage = null;
    let selectedPayment = "QRIS";

    /* =====================================
       LOCAL STORAGE
    ===================================== */

    const selectedApp =
        localStorage.getItem("selectedApk") ||
        "Alight Motion";

    const appData =
        productData[selectedApp] ||
        productData["Alight Motion"];

    /* =====================================
       FORMAT RUPIAH
    ===================================== */

    function formatRupiah(value) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);
    }

    /* =====================================
       TOAST
    ===================================== */

    function showToast(message) {

        if (!toastContainer) return;

        const toast = document.createElement("div");

        toast.className = "toast";
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px)";
        }, 2200);

        setTimeout(() => {
            toast.remove();
        }, 2600);
    }

    /* =====================================
       APP INFO
    ===================================== */

    function renderAppInfo() {

        if (appTitle) {
            appTitle.textContent = appData.title;
        }

        if (appImage) {
            appImage.src = appData.image;
            appImage.alt = appData.title;
        }

        if (summaryApp) {
            summaryApp.textContent = appData.title;
        }
    }

    /* =====================================
       SUMMARY
    ===================================== */

    function updateSummary() {

        if (summaryPackage) {
            summaryPackage.textContent =
                selectedPackage
                    ? selectedPackage.name
                    : "Belum Dipilih";
        }

        if (summaryPayment) {
            summaryPayment.textContent =
                selectedPayment;
        }

        if (summaryPrice) {
            summaryPrice.textContent =
                selectedPackage
                    ? formatRupiah(selectedPackage.price)
                    : "Rp0";
        }
    }

    /* =====================================
       RENDER NOMINAL
    ===================================== */

    function renderPackages() {

        if (!packageList) return;

        packageList.innerHTML = "";

        appData.products.forEach((item) => {

            const label =
                document.createElement("label");

            label.className =
                "package-card";

            const input =
                document.createElement("input");

            input.type = "radio";
            input.name = "package";
            input.value = item.id;

            const content =
                document.createElement("div");

            content.className =
                "package-content";

            const title =
                document.createElement("h3");

            title.textContent =
                item.name;

            const desc =
                document.createElement("p");

            desc.textContent =
                "Premium Access";

            const price =
                document.createElement("strong");

            price.textContent =
                formatRupiah(item.price);

            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(price);

            if (item.bestSeller) {

                const badge =
                    document.createElement("span");

                badge.className =
                    "best-seller-badge";

                badge.textContent =
                    "BEST SELLER";

                content.appendChild(badge);
            }

            label.appendChild(input);
            label.appendChild(content);

            packageList.appendChild(label);

            input.addEventListener("change", () => {

                selectedPackage = item;

                updateSummary();

                showToast(
                    "Paket berhasil dipilih"
                );
            });
        });
    }

    /* =====================================
       PAYMENT
    ===================================== */

    paymentInputs.forEach((input) => {

        input.addEventListener("change", () => {

            selectedPayment =
                input.value;

            updateSummary();
        });
    });

    /* =====================================
       WHATSAPP
    ===================================== */

    function generateWhatsAppMessage() {

        return `
Halo Admin Apk Premium Jayy,

Saya ingin membeli produk berikut:

 Aplikasi : ${appData.title}
 Paket : ${selectedPackage.name}
 Pembayaran : ${selectedPayment}
 Harga : ${formatRupiah(selectedPackage.price)}

Mohon informasi untuk proses pembayaran dan pembuatan akun.

Terima kasih.
        `.trim();
    }

    /* =====================================
       BUY BUTTON
    ===================================== */

    if (buyButton) {

        buyButton.addEventListener("click", (event) => {

            event.preventDefault();

            if (!selectedPackage) {

                showToast(
                    "Silakan pilih paket terlebih dahulu"
                );

                return;
            }

            const message =
                encodeURIComponent(
                    generateWhatsAppMessage()
                );

            const whatsappUrl =
                `https://wa.me/6285828936369?text=${message}`;

            window.open(
                whatsappUrl,
                "_blank"
            );
        });
    }

    /* =====================================
       INIT
    ===================================== */

    renderAppInfo();
    renderPackages();
    updateSummary();

});