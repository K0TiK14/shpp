// const Validator = require('./validator');

// console.log(Validator.validateEmail("fi@secondpart.end"));
// console.log(Validator.validateEmail("first-part@.se=cond%p.art.end"));
// console.log(Validator.validateEmail("first.part@se=cond%part.r"));

// console.log(Validator.validateEmail(""));
// console.log(Validator.validateEmail("f@secondart.end,"));
// console.log(Validator.validateEmail("first-part@.se=cond@part.end"));
// console.log(Validator.validateEmail("-firstpart@.se=cond%.enddeded"));
// console.log(Validator.validateEmail("firs_tpart@.se.en"));
// console.log(Validator.validateEmail("firstpart@.se.enddeded"));

// console.log(Validator.validatePhone(""));
// console.log(Validator.validatePassword(""));

const {
  // AbstractProduct,
  Clothes,
  Electronics,
  Review,
  searchProducts,
  sortProducts,
} = require("./product");

// Ініціалізація відгуків
let reviews1 = [
  new Review(0, "John", new Date(), "Great product!", 4),
  new Review(1, "Jane", undefined, "Norm product.", 3),
  new Review(2, "Alex", new Date(), "Excellent quality, highly recommend!", 5),
];

let reviews2 = [
  new Review(3, "Mary", undefined, "Not bad, but could be better.", 4),
  new Review(4, "Tom", new Date(), "Terrible experience, won't buy again.", 1),
  new Review(5, "Anna", undefined, "Pretty good for the price.", 4),
];

let reviews3 = [
  new Review(6, "Mike", new Date(), "Absolutely love it!", 5),
  new Review(7, "Emily", undefined, "It's okay, nothing special.", 3),
  new Review(8, "Oliver", new Date(), "Decent product but arrived late.", 3),
];

let reviews4 = [
  new Review(9, "Sophia", undefined, "Very poor quality, not as described.", 2),
  new Review(10, "Liam", new Date(), "Satisfied with the purchase.", 4),
  new Review(11, "Emma", undefined, "Amazing, exceeded my expectations!", 5),
];

// Ініціалізація продуктів
let product1 = new Clothes(
  1,
  "Футболка",
  "Футболка Зоряні Війни",
  500,
  "Nike",
  15,
  new Date(),
  reviews1,
  ["Зображення_1", "Зображення_2", "Зображення_3"]
);

let product2 = new Clothes(
  2,
  "Кросівки",
  "Кросівки Adidas Ultraboost",
  3000,
  "Adidas",
  25,
  new Date(),
  reviews2,
  ["Зображення_4", "Зображення_5", "Зображення_6"]
);

let product3 = new Electronics(
  3,
  "Куртка",
  "Куртка Зимова Columbia",
  4500,
  "Columbia",
  10,
  new Date(),
  reviews3,
  ["Зображення_7", "Зображення_8", "Зображення_9"],
  2,
  100
);

let product4 = new Electronics(
  4,
  "Сумка",
  "Сумка рюкзак Deuter",
  2000,
  "Deuter",
  30,
  new Date(),
  reviews4,
  ["Зображення_10", "Зображення_11", "Зображення_12"],
  1,
  50
);

let products = [product1, product2, product3, product4];

// Функція для запуску тестів
function runTests() {
  console.log(
    "\n--------------------------Tests-------------------------------\n"
  );

  // Тести для product1
  console.assert(product1.valueAccessor("ID") === 1, "ID не співпадає");
  console.assert(
    product1.valueAccessor("name") === "Футболка",
    "Назва не співпадає"
  );
  console.assert(
    product1.valueAccessor("description") === "Футболка Зоряні Війни",
    "Опис не співпадає"
  );
  console.assert(product1.valueAccessor("price") === 500, "Ціна не співпадає");
  console.assert(
    product1.valueAccessor("brand") === "Nike",
    "Бренд не співпадає"
  );
  console.assert(
    product1.valueAccessor("quantity") === 15,
    "Кількість не співпадає"
  );
  console.assert(
    product1.valueAccessor("reviews").length === 3,
    "Кількість відгуків не співпадає"
  );
  console.assert(
    product1.valueAccessor("images").length === 3,
    "Кількість зображень не співпадає"
  );

  // Тести для зміни значень
  product1.valueAccessor("ID", 10);
  console.assert(product1.valueAccessor("ID") === 10, "ID не оновлено");

  product1.valueAccessor("name", "Нова футболка");
  console.assert(
    product1.valueAccessor("name") === "Нова футболка",
    "Назва не оновлена"
  );

  product1.valueAccessor("price", 550);
  console.assert(product1.valueAccessor("price") === 550, "Ціна не оновлена");

  product1.addSize("XXXL");
  console.assert(
    product1.sizes.length === 7,
    "Кількість розмірів не співпадає"
  );

  product1.deleteSize("XS");
  console.assert(
    product1.sizes.length === 6,
    "Кількість розмірів не зменшилась"
  );

  // Тест для отримання окремого коментаря
  console.assert(
    product1.getReviewByID(1).author === "Jane",
    "Відгук не знайдено"
  );

  // Тест для середнього рейтингу
  console.assert(
    product1.getAverageRating() === 4,
    "Середній рейтинг не співпадає"
  );

  // Тести для searchProducts, sortProducts
  console.log(
    "\n--------------------------searchProducts(products, 'ка')-------------------------------\n"
  );
  console.log(searchProducts(products, "ка"));

  console.log(
    "\n--------------------------sortProducts(products, 'name')-------------------------------\n"
  );
  console.log(sortProducts(products, "name"));

  console.log(
    "\n--------------------------sortProducts(products, 'ID')-------------------------------\n"
  );
  console.log(sortProducts(products, "ID"));

  console.log(
    "\n--------------------------sortProducts(products, 'price')-------------------------------\n"
  );
  console.log(sortProducts(products, "price"));

  console.log(
    "\n--------------------------product1.getFullInformation()-------------------------------\n"
  );
  console.log(product1.getFullInformation());
  console.log(
    "\n--------------------------product3.getFullInformation()-------------------------------\n"
  );
  console.log(product3.getFullInformation());

  console.log(
    "\n--------------------------product1.getPriceForQuantity()-------------------------------\n"
  );
  console.log(product1.getPriceForQuantity());
  console.log(
    "\n--------------------------product3.getPriceForQuantity()-------------------------------\n"
  );
  console.log(product3.getPriceForQuantity());
}

// Запуск тестів
runTests();
