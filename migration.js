var objectId = require('mongodb').ObjectID;
categories = [{
        name: 'Фрукты',
        products: [{
                _id: objectId(),
                name: 'Апельсин',
                count: 40,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://polza-vred.su/wp-content/uploads/2016/03/apel.jpg'
            },
            {
                _id: objectId(),
                name: 'Виноград',
                count: 20,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://okeydoc.ru/wp-content/uploads/2015/12/grapes_variety_sweet_fruit_70303_3840x2400.jpg'
            },
            {
                _id: objectId(),
                name: 'Мандарин',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://www.fresher.ru/manager_content/12-2015/mandariny-vidy-vkus-polza-i-tonkosti-vybora/1.jpg'
            },
            {
                _id: objectId(),
                name: 'Ананас',
                count: 40,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://medvoice.ru/wp-content/uploads/2016/07/ananas.jpg'
            },
            {
                _id: objectId(),
                name: 'Груша',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'https://www.greenplanet.pro/upload/iblock/3b8/3b8721909e08592341b47c6b31bfdbed.jpg'
            },
        ],
        imgPath: 'http://sashabrownfitness.com/wp-content/uploads/2015/01/27141301.jpg'
    },
    {
        name: 'Овощи',
        products: [{
                _id: objectId(),
                name: 'Капуста',
                count: 0,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://edaplus.info/food_pictures/brussels_sprouts.jpg'
            },
            {
                _id: objectId(),
                name: 'Картошка',
                count: 0,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://www.vokrugsada.ru/wp-content/uploads/kartoshka.jpg'
            },
            {
                _id: objectId(),
                name: 'Помидор',
                count: 40,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'https://images.lady.mail.ru/456339/'
            },
            {
                _id: objectId(),
                name: 'Огурец',
                count: 40,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://www.1000listnik.ru/wp-content/uploads/2016/03/56e1411715e62.jpeg'
            },
            {
                _id: objectId(),
                name: 'Перец',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://megaogorod.com/files/styles/imginarticlebig/public/field/image/u2169/111_19.jpg?itok=39JIhwPW'
            },
        ],
        imgPath: 'http://www.molbulak.ru/upload/iblock/b47/b47f74e863b00255ab9c63d24acc553b.jpg'
    },
    {
        name: 'Молочные продукты',
        products: [{
                _id: objectId(),
                name: 'Молоко',
                count: 50,
                lastUpdate: new Date(),
                description: "",
                measurement: "л.",
                imgPath: 'http://mojzheludok.com/wp-content/uploads/2015/12/Moloko-ot-izzhogi.jpg'
            },
            {
                _id: objectId(),
                name: 'Кефир',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "л.",
                imgPath: 'http://irecommend.ru/sites/default/files/product-images/42696/kefir_group_01-2013.jpg'
            },
            {
                _id: objectId(),
                name: 'Сыр',
                count: 11,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'https://mamapedia.com.ua/UploadImages/tverdyi-syr.jpg'
            },
            {
                _id: objectId(),
                name: 'Творог',
                count: 7,
                lastUpdate: new Date(),
                description: "",
                measurement: "кг.",
                imgPath: 'http://notefood.ru/wp-content/uploads/2016/02/domashnij-tvorog.jpg'
            },
            {
                _id: objectId(),
                name: 'Сметана',
                count: 8,
                lastUpdate: new Date(),
                description: "",
                measurement: "л.",
                imgPath: 'http://polza-vred.su/wp-content/uploads/2016/09/maski-smetana-foto-02.jpg'
            },
        ],
        imgPath: 'https://fizcult.by/uploads/images/articles/615/original/as8lG2MS8ohCJ87d.jpg'
    },
    {
        name: 'Бытовая техника',
        products: [{
                _id: objectId(),
                name: 'Стиральные машины',
                count: 1,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://www.ryazan-stroyka.ru/materials/technika/07_stiralniemashinyvryazani/images/02.jpg'
            },
            {
                _id: objectId(),
                name: 'Микроволновки',
                count: 2,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://beregite-zdorovje.ru/uploads/dolzen_znat_kazduj/mikrovolnovka.jpg'
            },
            {
                _id: objectId(),
                name: 'Холодильники',
                count: 40,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://tehnika.vyborkuhni.ru/wp-content/uploads/2014/10/obzor_modelej_xolodilnikov_libxer_01.jpg'
            },
            {
                _id: objectId(),
                name: 'Миксеры',
                count: 50,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'https://i2.rozetka.ua/goods/1547521/vitek-vt-1403-w_images_1547521025.jpg'
            },
        ],
        imgPath: 'https://tehnika-sech.ru/ssl/u/pic/58/0d5d3eb17911e6992fab3167067513/-/57b37c238fa07.jpg'
    },
    {
        name: 'Автозапчасти',
        products: [{
                _id: objectId(),
                name: 'Фильтры',
                count: 1,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'https://ua.all.biz/img/ua/catalog/430244.jpeg'
            },
            {
                _id: objectId(),
                name: 'Свечи',
                count: 50,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://tire1.ru/wp-content/uploads/2017/04/mnogoelektrodnaya-svecha.jpg'
            },
            {
                _id: objectId(),
                name: 'Тормоза',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://ustroistvo-avtomobilya.ru/wp-content/uploads/2012/11/Tormoza.jpg'
            },
            {
                _id: objectId(),
                name: 'Фары',
                count: 2,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://моторов.рф/_upload/images/fara2,_motorov.jpg'
            },
        ],
        imgPath: 'http://ua-vestnik.com/wp-content/uploads/2017/08/25cfaf66ee16408e7c66b5c2f49a7d45.jpg'
    },
    {
        name: 'Аудиотехника',
        products: [{
                _id: objectId(),
                name: 'Наушники',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'https://static.svyaznoy.ru/upload/iblock/e48/4151168.jpg/resize/307x224/'
            },
            {
                _id: objectId(),
                name: 'Колонки',
                count: 9,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://it-m.by/images/kak_vybrat/kak-vybrat-kolonki-1.jpg',
            },
        ],
        imgPath: 'http://files.tovaroved.info/muzykalnyj-centr.jpg'
    },
    {
        name: 'Оптические приборы',
        products: [{
            _id: objectId(),
            name: 'Бинокли',
            count: 5,
            lastUpdate: new Date(),
            description: "",
            measurement: "шт.",
            imgPath: 'https://cdn.4glaza.ru/images/products/large/0/binoculars-levenhuk-atom-10-30x50.jpg'
        }],
        imgPath: 'http://www.podarkoff.com.ua/resources/images/cats_pics/optics.jpg'
    },
    {
        name: 'Манипуляторы и устройства ввода',
        products: [{
                _id: objectId(),
                name: 'Геймпады',
                count: 5,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://hotline.ua/img/tx/202/20266385.jpg'
            },
            {
                _id: objectId(),
                name: 'Клавиатуры',
                count: 51,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'https://www.osp.ru/FileStorage/DOCUMENTS_ILLUSTRATIONS/13193397/original.jpg'
            },
            {
                _id: objectId(),
                name: 'Мышки',
                count: 15,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://vse-sekrety.ru/uploads/posts/2014-07/1406824553_mouse-01.jpg'
            },
        ],
        imgPath: 'https://www.syl.ru/misc/i/ai/166363/614568.jpg'
    },
    {
        name: 'Инструменты',
        products: [{
                _id: objectId(),
                name: 'Отвертки',
                count: 8,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://www.tehnotools.com/upload/medialibrary/76c/76cc806ff6f86383488aedc17f875488.jpg'
            },
            {
                _id: objectId(),
                name: 'Ключи',
                count: 59,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://www.emomi.com/gaechnyj-kljuch-kombinirovannyj-nabor-1.jpeg'
            }
        ],
        imgPath: 'http://автоград21.рф/images/ruchnoj-instrument1.jpg'
    },
    {
        name: 'Сантехника',
        products: [{
                _id: objectId(),
                name: 'Трубы',
                count: 0,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://santekhvl.ru/wp-content/uploads/2014/05/vodoprovodnye_truby_iz_plastika.jpg'
            },
            {
                _id: objectId(),
                name: 'Краны',
                count: 0,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://gidroguru.com/wp-content/uploads/segodnya-naibolee-rasprostraneny-odnorychazhnye-modeli.jpg'
            }
        ],
        imgPath: 'http://liding-c.com/wp-content/uploads/2013/08/santehnika-na-liding-c.com_.jpg'
    },
    {
        name: 'Строительные материалы',
        products: [{
                _id: objectId(),
                name: 'Цемент',
                count: 10,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://tdmetallukraine.com/wp-content/uploads/2012/12/6.gif'
            },
            {
                _id: objectId(),
                name: 'Кирпичи',
                count: 6,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://chelkon.ru/wp-content/uploads/2015/09/111.jpg'
            },
            {
                _id: objectId(),
                name: 'Доски',
                count: 511,
                lastUpdate: new Date(),
                description: "",
                measurement: "шт.",
                imgPath: 'http://pol-master.com/wp-content/uploads/2013/05/Gotovim_doski_dlya_pola1-400x315.jpg'
            }
        ],
        imgPath: 'http://moodle.ask-bru.by/pluginfile.php/16/course/summary/sm.jpg'
    },
];
module.exports = categories