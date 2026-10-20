/* =========================================
   SMASH WICH
   Main Application
========================================= */


/* أدوات مساعدة */

const $ = (selector, root = document) =>
    root.querySelector(selector);


const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


const state = {
    activeCategory: "all",

    searchTerm: "",

    cart: loadCart()
};


/* تنسيق الأسعار */

function money(amount) {

    const price = Number(amount) || 0;

    return `${price.toLocaleString("en-EG")} ${CONFIG.delivery.currencyLabel}`;

}


/* حماية النصوص قبل وضعها داخل HTML */

function escapeHTML(value = "") {

    return String(value).replace(/[&<>"']/g, character => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    })[character]);

}


/* حفظ السلة في المتصفح */

function loadCart() {

    try {

        const saved = JSON.parse(
            localStorage.getItem("smashWichCart") || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.filter(item =>

            PRODUCTS.some(product => product.id === item.id) &&

            Number.isInteger(item.quantity) &&

            item.quantity > 0

        );

    } catch {

        return [];

    }

}


function saveCart() {

    try {

        localStorage.setItem(
            "smashWichCart",
            JSON.stringify(state.cart)
        );

    } catch {

        // الموقع يظل شغال حتى لو التخزين المحلي غير متاح.

    }

}


/* تحديث الإعدادات العامة */

function applyConfig() {

    document.title = `${CONFIG.brand.name} | ${CONFIG.brand.nameArabic}`;

    document.documentElement.style.setProperty(
        "--background",
        CONFIG.colors.background
    );

    document.documentElement.style.setProperty(
        "--surface",
        CONFIG.colors.surface
    );

    document.documentElement.style.setProperty(
        "--text",
        CONFIG.colors.text
    );

    document.documentElement.style.setProperty(
        "--muted",
        CONFIG.colors.muted
    );

    document.documentElement.style.setProperty(
        "--accent",
        CONFIG.colors.accent
    );

    document.documentElement.style.setProperty(
        "--accent-secondary",
        CONFIG.colors.accentSecondary
    );


    $("#announcementText").textContent =
        CONFIG.brand.announcement;


    $("#brandName").textContent =
        CONFIG.brand.name;


    $("#brandLogo").src =
        CONFIG.brand.logo;


    $("#brandLogo").alt =
        CONFIG.brand.name;


    $("#heroEyebrow").textContent =
        CONFIG.hero.eyebrow;


    $("#heroTitle").innerHTML =
        `${escapeHTML(CONFIG.hero.titleLine1)}<br>
        <span>${escapeHTML(CONFIG.hero.titleLine2)}</span>`;


    $("#heroDescription").textContent =
        CONFIG.hero.description;


    $("#heroProof").textContent =
        CONFIG.hero.proofText;


    $("#heroImage").src =
        CONFIG.hero.image;


    $("#heroImageLabel").textContent =
        CONFIG.hero.imageLabel;


    $("#heroImageSubtitle").textContent =
        CONFIG.hero.imageSubtitle;


    $("#menuEyebrow").textContent =
        CONFIG.menu.eyebrow;


    $("#menuTitle").innerHTML =
        `${escapeHTML(CONFIG.menu.titleLine1)}
        <span>${escapeHTML(CONFIG.menu.titleLine2)}</span>`;


    $("#menuDescription").textContent =
        CONFIG.menu.description;


    $("#productSearch").placeholder =
        CONFIG.menu.searchPlaceholder;


    $("#menuNote").textContent =
        CONFIG.menu.note;


    $("#promoEyebrow").textContent =
        CONFIG.promo.eyebrow;


    $("#promoTitle").innerHTML =
        `${escapeHTML(CONFIG.promo.titleLine1)}<br>
        <span>${escapeHTML(CONFIG.promo.titleLine2)}</span>`;


    $("#promoDescription").textContent =
        CONFIG.promo.description;


    $("#promoImage").src =
        CONFIG.promo.image;


    $("#aboutEyebrow").textContent =
        CONFIG.about.eyebrow;


    $("#aboutTitle").innerHTML =
        `${escapeHTML(CONFIG.about.titleLine1)}<br>
        <span>${escapeHTML(CONFIG.about.titleLine2)}</span>`;


    $("#aboutDescription").textContent =
        CONFIG.about.description;


    $("#aboutImage").src =
        CONFIG.about.image;


    $("#aboutPoints").innerHTML =
        CONFIG.about.points.map((point, index) => `

            <div class="about-point">

                <strong>
                    ${String(index + 1).padStart(2, "0")}
                </strong>

                <span>${escapeHTML(point)}</span>

            </div>

        `).join("");


    $("#contactEyebrow").textContent =
        CONFIG.contactSection.eyebrow;


    $("#contactTitle").innerHTML =
        `${escapeHTML(CONFIG.contactSection.titleLine1)}
        <span>${escapeHTML(CONFIG.contactSection.titleLine2)}</span>`;


    $("#contactDescription").textContent =
        CONFIG.contactSection.description;


    $("#footerBrand").textContent =
        CONFIG.brand.name;


    $("#footerText").textContent =
        CONFIG.brand.footerText;


    $("#copyrightName").textContent =
        CONFIG.brand.name;


    $("#currentYear").textContent =
        new Date().getFullYear();


    const whatsappURL =
        `https://wa.me/${CONFIG.contact.whatsappNumber}`;


    $("#contactWhatsApp").href = whatsappURL;

    $("#footerWhatsApp").href = whatsappURL;


    $("#instagramLink").href =
        CONFIG.contact.instagramUrl || "#";


    $("#facebookLink").href =
        CONFIG.contact.facebookUrl || "#";

}


/* البحث عن منتج */

function getProduct(productId) {

    return PRODUCTS.find(product =>
        product.id === productId
    );

}


/* اسم القسم */

function getCategoryName(categoryId) {

    const category = CATEGORIES.find(item =>
        item.id === categoryId
    );

    return category ? category.name : "منيو";

}


/* عرض أقسام المنيو */

function renderCategories() {

    $("#categoryTabs").innerHTML = CATEGORIES.map(category => `

        <button

            type="button"

            class="category-tab ${
                state.activeCategory === category.id ? "active" : ""
            }"

            data-category="${escapeHTML(category.id)}"

        >

            ${escapeHTML(category.name)}

        </button>

    `).join("");

}


/* عرض المنتجات */

function renderProducts() {

    const search =
        state.searchTerm.trim().toLocaleLowerCase("ar");


    const filteredProducts = PRODUCTS.filter(product => {

        if (product.available === false) {
            return false;
        }

        const matchesCategory =
            state.activeCategory === "all" ||

            product.category === state.activeCategory;


        const searchableText = `

            ${product.name}

            ${product.description}

            ${getCategoryName(product.category)}

        `.toLocaleLowerCase("ar");


        const matchesSearch =
            searchableText.includes(search);


        return matchesCategory && matchesSearch;

    });


    if (filteredProducts.length === 0) {

        $("#productGrid").innerHTML = `

            <div class="empty-state">

                مفيش منتجات مطابقة لبحثك.

            </div>

        `;

        return;

    }


    $("#productGrid").innerHTML =
        filteredProducts.map(product => `

            <article class="product-card">

                <div class="product-image-wrap">

                    <img

                        class="product-image"

                        src="${escapeHTML(product.image)}"

                        alt="${escapeHTML(product.name)}"

                        loading="lazy"

                    >

                    ${
                        product.badge
                        ? `<span class="product-badge">
                            ${escapeHTML(product.badge)}
                           </span>`
                        : ""
                    }

                </div>


                <div class="product-content">

                    <span class="product-category">

                        ${escapeHTML(
                            getCategoryName(product.category)
                        )}

                    </span>


                    <div class="product-title-row">

                        <h3 class="product-title">

                            ${escapeHTML(product.name)}

                        </h3>


                        <span class="product-price">

                            ${money(product.price)}

                        </span>

                    </div>


                    <p class="product-description">

                        ${escapeHTML(product.description)}

                    </p>


                    <button

                        class="add-button"

                        type="button"

                        data-add="${escapeHTML(product.id)}"

                    >

                        <span>+</span>

                        <b>أضف للسلة</b>

                    </button>

                </div>

            </article>

        `).join("");


    // معالجة الصور غير الموجودة.
    $$(".product-image", $("#productGrid")).forEach(image => {

        image.addEventListener("error", () => {

            image.style.visibility = "hidden";

        }, { once: true });

    });

}


/* إضافة منتج للسلة */

function addToCart(productId) {

    const product = getProduct(productId);


    if (!product || product.available === false) {
        return;
    }


    const existingItem = state.cart.find(item =>
        item.id === productId
    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        state.cart.push({

            id: productId,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    showToast(`اتضاف ${product.name} للسلة`);

}


/* تغيير الكمية */

function changeQuantity(productId, change) {

    const item = state.cart.find(cartItem =>
        cartItem.id === productId
    );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        state.cart = state.cart.filter(cartItem =>
            cartItem.id !== productId
        );

    }


    saveCart();

    renderCart();

}


/* حذف منتج */

function removeFromCart(productId) {

    state.cart = state.cart.filter(item =>
        item.id !== productId
    );


    saveCart();

    renderCart();

}


/* حساب إجمالي السلة */

function getCartDetails() {

    const items = state.cart.map(item => {

        const product = getProduct(item.id);


        if (!product) {
            return null;
        }


        return {

            ...product,

            quantity: item.quantity,

            lineTotal: product.price * item.quantity

        };

    }).filter(Boolean);


    const subtotal = items.reduce(
        (sum, item) => sum + item.lineTotal,
        0
    );


    const delivery = items.length
        ? Math.max(0, Number(CONFIG.delivery.fee) || 0)
        : 0;


    const total = subtotal + delivery;


    const count = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    return {

        items,

        subtotal,

        delivery,

        total,

        count

    };

}


/* عرض السلة */

function renderCart() {

    const details = getCartDetails();


    $("#cartCount").textContent =
        details.count;


    $("#drawerCount").textContent =
        `(${details.count})`;


    $("#cartSubtotal").textContent =
        money(details.subtotal);


    $("#cartDelivery").textContent =
        money(details.delivery);


    $("#cartTotal").textContent =
        money(details.total);


    $("#checkoutButton").disabled =
        details.items.length === 0;


    $("#checkoutButton").style.opacity =
        details.items.length ? "1" : ".5";


    if (details.items.length === 0) {

        $("#cartItems").innerHTML = `

            <div class="cart-empty">

                السلة لسه فاضية 👀

                <br>

                اختار منتجات من المنيو.

            </div>

        `;

    } else {

        $("#cartItems").innerHTML =
            details.items.map(item => `

                <article class="cart-item">

                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                    >


                    <div>

                        <h3>
                            ${escapeHTML(item.name)}
                        </h3>


                        <span class="cart-item-price">

                            ${money(item.lineTotal)}

                        </span>


                        <div class="cart-item-controls">

                            <div class="quantity-control">

                                <button

                                    type="button"

                                    data-quantity="${escapeHTML(item.id)}"

                                    data-change="-1"

                                    aria-label="تقليل الكمية"

                                >−</button>


                                <span>${item.quantity}</span>


                                <button

                                    type="button"

                                    data-quantity="${escapeHTML(item.id)}"

                                    data-change="1"

                                    aria-label="زيادة الكمية"

                                >+</button>

                            </div>


                            <button

                                class="remove-item"

                                type="button"

                                data-remove="${escapeHTML(item.id)}"

                            >

                                حذف

                            </button>

                        </div>

                    </div>

                </article>

            `).join("");

    }


    renderCheckoutSummary();

}


/* ملخص الطلب */

function renderCheckoutSummary() {

    const details = getCartDetails();


    $("#checkoutSummary").innerHTML = `

        ${details.items.map(item => `

            <div class="summary-row">

                <span>

                    ${escapeHTML(item.name)} × ${item.quantity}

                </span>

                <strong>

                    ${money(item.lineTotal)}

                </strong>

            </div>

        `).join("")}


        <div class="summary-row">

            <span>المجموع الفرعي</span>

            <strong>${money(details.subtotal)}</strong>

        </div>


        <div class="summary-row">

            <span>التوصيل</span>

            <strong>${money(details.delivery)}</strong>

        </div>


        <div class="summary-row summary-total">

            <span>الإجمالي</span>

            <strong>${money(details.total)}</strong>

        </div>

    `;

}


/* فتح السلة */

function openCart() {

    $("#cartDrawer").classList.add("open");

    $("#cartOverlay").classList.add("open");


    $("#cartDrawer").setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add("no-scroll");

}


/* إغلاق السلة */

function closeCart() {

    $("#cartDrawer").classList.remove("open");

    $("#cartOverlay").classList.remove("open");


    $("#cartDrawer").setAttribute(
        "aria-hidden",
        "true"
    );


    if (!$("#checkoutModal").classList.contains("open")) {

        document.body.classList.remove("no-scroll");

    }

}


/* فتح نافذة بيانات التوصيل */

function openCheckout() {

    if (getCartDetails().items.length === 0) {

        showToast("ضيف منتجات للسلة الأول.");

        return;

    }


    closeCart();

    renderCheckoutSummary();


    $("#checkoutModal").classList.add("open");


    $("#checkoutModal").setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add("no-scroll");

}


/* إغلاق نافذة الطلب */

function closeCheckout() {

    $("#checkoutModal").classList.remove("open");


    $("#checkoutModal").setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove("no-scroll");

}


/* إشعار صغير */

function showToast(message) {

    const toast = $("#toast");


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(showToast.timer);


    showToast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* تجهيز رسالة واتساب */

function createWhatsAppMessage(data, details) {

    const lines = [

        `🛍️ طلب جديد من ${CONFIG.brand.name}`,

        "",

        `الاسم: ${data.customerName}`,

        `رقم الموبايل: ${data.phone}`,

        `المنطقة: ${data.area}`,

        `العنوان: ${data.address}`,

        "",

        "تفاصيل الطلب:"

    ];


    details.items.forEach(item => {

        lines.push(

            `• ${item.name} × ${item.quantity} = ${money(item.lineTotal)}`

        );

    });


    lines.push(

        "",

        `المجموع الفرعي: ${money(details.subtotal)}`,

        `التوصيل: ${money(details.delivery)}`,

        `الإجمالي: ${money(details.total)}`

    );


    if (data.notes) {

        lines.push("", `ملاحظات: ${data.notes}`);

    }


    lines.push(

        "",

        "من فضلكم أكدوا الطلب ووقت التوصيل."

    );


    return lines.join("\n");

}


/* إرسال الطلب إلى واتساب */

function submitOrder(event) {

    event.preventDefault();


    const details = getCartDetails();


    if (details.items.length === 0) {

        showToast("السلة فاضية.");

        closeCheckout();

        return;

    }


    const formData = new FormData(event.currentTarget);


    const data = {

        customerName: String(
            formData.get("customerName") || ""
        ).trim(),

        phone: String(
            formData.get("phone") || ""
        ).trim(),

        area: String(
            formData.get("area") || ""
        ).trim(),

        address: String(
            formData.get("address") || ""
        ).trim(),

        notes: String(
            formData.get("notes") || ""
        ).trim()

    };


    if (
        !data.customerName ||
        !data.phone ||
        !data.area ||
        !data.address
    ) {

        showToast("كمّل بيانات التوصيل.");

        return;

    }


    const phoneDigits = data.phone.replace(/\D/g, "");


    if (phoneDigits.length < 8) {

        showToast("اكتب رقم موبايل صحيح.");

        return;

    }


    if (!/^\d{8,15}$/.test(CONFIG.contact.whatsappNumber)) {

        showToast("راجع رقم واتساب المطعم في CONFIG.");

        return;

    }


    const message = createWhatsAppMessage(data, details);


    const whatsappURL =

        `https://wa.me/${CONFIG.contact.whatsappNumber}` +

        `?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );


    showToast(
        "واتساب هيفتح برسالة جاهزة. اضغط إرسال لتأكيد الطلب."
    );


    closeCheckout();

}


/* قائمة الموبايل */

function setupNavigation() {

    const toggle = $("#menuToggle");

    const nav = $("#mainNav");


    toggle.addEventListener("click", () => {

        nav.classList.toggle("open");

    });


    $$("#mainNav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

        });

    });

}


/* ربط الأحداث */

function setupEvents() {


    /* تغيير قسم المنيو */

    $("#categoryTabs").addEventListener("click", event => {

        const button = event.target.closest("[data-category]");


        if (!button) {
            return;
        }


        state.activeCategory =
            button.dataset.category;


        renderCategories();

        renderProducts();

    });


    /* البحث */

    $("#productSearch").addEventListener("input", event => {

        state.searchTerm = event.target.value;

        renderProducts();

    });


    /* إضافة منتج */

    $("#productGrid").addEventListener("click", event => {

        const button = event.target.closest("[data-add]");


        if (button) {

            addToCart(button.dataset.add);

        }

    });


    /* تعديل الكمية والحذف */

    $("#cartItems").addEventListener("click", event => {

        const quantityButton =
            event.target.closest("[data-quantity]");


        const removeButton =
            event.target.closest("[data-remove]");


        if (quantityButton) {

            changeQuantity(

                quantityButton.dataset.quantity,

                Number(quantityButton.dataset.change)

            );

        }


        if (removeButton) {

            removeFromCart(
                removeButton.dataset.remove
            );

        }

    });


    /* السلة */

    $("#openCart").addEventListener("click", openCart);

    $("#closeCart").addEventListener("click", closeCart);

    $("#cartOverlay").addEventListener("click", closeCart);


    /* إتمام الطلب */

    $("#checkoutButton").addEventListener(
        "click",
        openCheckout
    );


    $("#closeCheckout").addEventListener(
        "click",
        closeCheckout
    );


    $("#checkoutModal").addEventListener("click", event => {

        if (event.target === $("#checkoutModal")) {

            closeCheckout();

        }

    });


    $("#checkoutForm").addEventListener(
        "submit",
        submitOrder
    );


    /* زر Escape */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeCart();

            closeCheckout();

            $("#mainNav").classList.remove("open");

        }

    });

}


/* تشغيل المشروع */

function initApp() {

    applyConfig();

    renderCategories();

    renderProducts();

    renderCart();

    setupEvents();

    setupNavigation();

}


document.addEventListener(
    "DOMContentLoaded",
    initApp
);