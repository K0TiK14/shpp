function Product(
  ID = 0,
  name = "name",
  description = "description",
  price = 0,
  brand = "brand",
  sizes = ["XS", "S", "M", "L", "XL", "XXL"],
  activeSize = ["XS", "S", "M", "L", "XL", "XXL"],
  quantity = 0,
  date = new Date(),
  reviews = [],
  images = []
) {
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.sizes = sizes;
  this.activeSize = activeSize;
  this.quantity = quantity;
  this.date = date;
  this.reviews = reviews;
  this.images = images;

  this.getID = function () {
    return this.ID;
  };
  this.setID = function (newID) {
    this.ID = newID;
  };
  this.getName = function () {
    return this.name;
  };
  this.setName = function (newName) {
    this.name = newName;
  };
  this.getDescription = function () {
    return this.description;
  };
  this.setDescription = function (newDescription) {
    this.description = newDescription;
  };
  this.getPrice = function () {
    return this.price;
  };
  this.setPrice = function (newPrice) {
    this.price = newPrice;
  };
  this.getBrand = function () {
    return this.brand;
  };
  this.setBrand = function (newBrand) {
    this.brand = newBrand;
  };
  this.getSizes = function () {
    return this.sizes;
  };
  this.setSizes = function (newSizes) {
    this.sizes = newSizes;
  };
  this.getActiveSize = function () {
    return this.activeSize;
  };
  this.setActiveSize = function (newActiveSize) {
    this.activeSize = newActiveSize;
  };
  this.getQuantity = function () {
    return this.quantity;
  };
  this.setQuantity = function (newQuantity) {
    this.quantity = newQuantity;
  };
  this.getDate = function () {
    return this.date;
  };
  this.setDate = function (newDate) {
    this.date = newDate;
  };
  this.getReviews = function () {
    return this.reviews;
  };
  this.setReviews = function (newReviews) {
    this.reviews = newReviews;
  };
  this.getImages = function () {
    return this.images;
  };
  this.setImages = function (newImages) {
    this.images = newImages;
  };

  this.getReviewByID = function (reviewID) {
    return this.reviews.find((review) => review.ID === reviewID);
  };
  this.getImage = function (index = 0) {
    return this.images[index];
  };
  this.addSize = function (newSize) {
    this.sizes.push(newSize);
  };
  this.deleteSize = function (size) {
    const index = this.sizes.indexOf(size);
    if (index !== -1) {
      this.sizes.splice(index, 1);
    }
  };
  this.addReview = function (review) {
    this.reviews.push(review);
  };
  this.deleteReview = function (reviewID) {
    const index = this.reviews.findIndex((review) => review.ID === reviewID);
    if (index !== -1) {
      this.reviews.splice(index, 1);
    }
  };
  this.getAverageRating = function () {
    let averageRating = 0;
    let counter = 0;

    for (const review of this.reviews) {
      averageRating += review.rating;
      counter++;
    }

    return counter > 0 ? averageRating / counter : 0;
  };
}

function Review(
  ID = 0,
  author = "author",
  date = new Date(),
  comment = "comment",
  rating = 0
) {
  this.ID = ID;
  this.author = author;
  this.date = date;
  this.comment = comment;
  this.rating = rating;
}

function searchProducts(products = [], search = "") {
  let searchResult = [];
  search = search.toLowerCase();

  for (const product of products) {
    let productName = product.getName().toLowerCase();
    let productDescription = product.getDescription().toLowerCase();

    if (productName.includes(search) || productDescription.includes(search)) {
      searchResult.push(product);
    }
  }

  return searchResult;
}

/**
 *
 * @param {*} products products array.
 * @param {*} sortRule "price" / "name" / "ID".
 * @returns sorted products array.
 */
function sortProducts(products = [], sortRule = "price") {
  return products.sort((a, b) => {
    if (sortRule === "price") {
      return a.getPrice() - b.getPrice(); // Сортування за ціною (числове)
    } else if (sortRule === "name") {
      return a.getName().localeCompare(b.getName()); // Сортування за назвою (рядкове)
    } else if (sortRule === "ID") {
      return a.getID() - b.getID(); // Сортування за ID (числове)
    } else {
      throw new Error("Невідоме правило сортування");
    }
  });
}

let reviews1 = [
  new Review(0, "John", new Date(), "Great product!", 5),
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

let product1 = new Product(
  1,
  "Футболка",
  "Футболка Зоряні Війни",
  500,
  "Nike",
  ["XS", "S", "M", "L", "XL", "XXL"],
  ["S", "M", "L"],
  15,
  new Date(),
  reviews1,
  ["Зображення_1", "Зображення_2", "Зображення_3"]
);

let product2 = new Product(
  2,
  "Кросівки",
  "Кросівки Adidas Ultraboost",
  3000,
  "Adidas",
  ["36", "37", "38", "39", "40", "41"],
  ["38", "39", "40"],
  25,
  new Date(),
  reviews2,
  ["Зображення_4", "Зображення_5", "Зображення_6"]
);

let product3 = new Product(
  3,
  "Куртка",
  "Куртка Зимова Columbia",
  4500,
  "Columbia",
  ["M", "L", "XL", "XXL"],
  ["M", "L", "XL"],
  10,
  new Date(),
  reviews3,
  ["Зображення_7", "Зображення_8", "Зображення_9"]
);

let product4 = new Product(
  4,
  "Сумка",
  "Сумка рюкзак Deuter",
  2000,
  "Deuter",
  ["One Size"],
  ["One Size"],
  30,
  new Date(),
  reviews4,
  ["Зображення_10", "Зображення_11", "Зображення_12"]
);

let products = [product1, product2, product3, product4];

console.log(product1);
console.log(product2);
console.log(product3);
console.log(product4);

console.log(
  "\n--------------------------Tests-------------------------------\n"
);
// Тести для product1
console.log(product1.getID()); // Очікується: 1
console.log(product1.getName()); // Очікується: "Футболка"
console.log(product1.getDescription()); // Очікується: "Футболка Зоряні Війни"
console.log(product1.getPrice()); // Очікується: 500
console.log(product1.getBrand()); // Очікується: "Nike"
console.log(product1.getSizes()); // Очікується: ["XS", "S", "M", "L", "XL", "XXL"]
console.log(product1.getActiveSize()); // Очікується: ["S", "M", "L"]
console.log(product1.getQuantity()); // Очікується: 15
console.log(product1.getDate()); // Очікується: поточна дата
console.log(product1.getReviews()); // Очікується: масив коментарів reviews1
console.log(product1.getImages()); // Очікується: ["Зображення_1", "Зображення_2", "Зображення_3"]

// Тести для зміни значень
product1.setID(10);
console.log(product1.getID()); // Очікується: 10

product1.setName("Нова футболка");
console.log(product1.getName()); // Очікується: "Нова футболка"

product1.setPrice(550);
console.log(product1.getPrice()); // Очікується: 550

product1.addSize("XXXL");
console.log(product1.getSizes()); // Очікується: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

product1.deleteSize("XS");
console.log(product1.getSizes()); // Очікується: ["S", "M", "L", "XL", "XXL", "XXXL"]

// Тест для отримання окремого коментаря
console.log(product1.getReviewByID(1)); // Очікується: Review від Jane

// Тест для середнього рейтингу
console.log(product1.getAverageRating()); // Очікується: середнє значення рейтингу

// Тести для searchProducts, sortProducts
console.log(
  `\n--------------------------(searchProducts(products, "ка"))-------------------------------\n`
);
console.log(searchProducts(products, "ка"));
console.log(
  `\n--------------------------(searchProducts(products, "ак"))-------------------------------\n`
);
console.log(searchProducts(products, "ак"));
console.log(
  `\n--------------------------(sortProducts(products, "name"))-------------------------------\n`
);
console.log(sortProducts(products, "name"));
console.log(
  `\n--------------------------(sortProducts(products, "ID"))-------------------------------\n`
);
console.log(sortProducts(products, "ID"));
console.log(
  `\n--------------------------(sortProducts(products, "price"))-------------------------------\n`
);
console.log(sortProducts(products, "price"));