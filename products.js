/* =========================================
   SMASH WICH
   Products & Categories
========================================= */


/* أقسام المنيو */
const CATEGORIES = [

    {
        id: "all",
        name: "كل المنيو"
    },

    {
        id: "fast food",
        name: "fast food"
    },

    {
        id: "Healthy Food",
        name: "Healthy Food"
    },

    {
        id: "Keto",
        name: "Keto"
    },

    {
        id: "Sourdough",
        name: "Sourdough"
    },

    {
        id: "Sides & Fries",
        name: "Sides & Fries"
    }

];


/* المنتجات */
const PRODUCTS = [

    {
        id: "fast food",

        name: "Classic Burger",

        description:
            "برجر مع الجبنة وصوص المطعم المميز.",

        price: 145,

        category: "fast food",

        image: "images/smash cheese.jpg",

        badge: "الأكثر طلبًا",

        available: true
    },


    {
        id: "fast food",

        name: "Double Smash",

        description:
            "دبل برجر لعشاق الطعم القوي.",

        price: 195,

        category: "fast food",

        image: "images/smash mushroom.jpg",

        badge: "SPECIAL",

        available: true
    },


    {
        id: "chicken-sandwich",

        name: "Chicken Sandwich",

        description:
            "ساندوتش دجاج مع الخضروات والصوص.",

        price: 125,

        category: "Healthy Food",

        image: "images/Healthy Ta ndoori Chicken Meal.jpg",

        badge: "",

        available: true
    },


    {
        id: "signature-meal",

        name: "Keto Nuts Smash Burger",

        description:
            "لحمم سماش - صوص بيج تيستي هلثي - بيف بيكون - جبنة شيدر وجبنة موتزاريلا وخس وخيار.",

        price: 220,

        category: "Keto",

        image: "images/Keto Nuts Smash Burger.jpg",

        badge: "SPECIAL",

        available: true
    },


    {
        id: "Sourdough",

        name: "Sour de Smash",

        description:
        "لحمم سماش - صوص بيج تيستي هلثي - بيف بيكون - جبنة شيدر وجبنة موتزاريلا وخس وخيار.",

        price: 50,

        category: "Sourdough",

        image: "images/Sourdough.jpg",

        badge: "",

        available: true
    },


    {
        id: "soft-drink",

        name: "French Fries Box",

        description:
        "بطاطس محمره بتوابل سماش ويتش",
     

        price: 30,

        category: "Sides & Fries",

        image: "images/f.jpg",

        badge: "",

        available: true
    }

];