function AbstractProduct(
  ID = 0,
  name = "name",
  description = "description",
  price = 0,
  brand = "brand",
  quantity = 0,
  date = new Date(),
  reviews = [],
  images = []
) {
  if (new.target === AbstractProduct) {
    throw new Error("Cannot instantiate AbstractProduct directly");
  }
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.quantity = quantity;
  this.date = date;
  this.reviews = reviews;
  this.images = images;
}
AbstractProduct.prototype.valueAccessor = function (key, value) {
  if (value === undefined) {
    return this[key];
  } else {
    this[key] = value;
  }
};

AbstractProduct.prototype.getReviewByID = function (reviewID) {
  return this.reviews.find((review) => review.ID === reviewID);
};
AbstractProduct.prototype.getImage = function (index = 0) {
  return this.images[index];
};
AbstractProduct.prototype.addReview = function (review) {
  this.reviews.push(review);
};
AbstractProduct.prototype.deleteReview = function (reviewID) {
  const index = this.reviews.findIndex((review) => review.ID === reviewID);
  if (index !== -1) {
    this.reviews.splice(index, 1);
  }
};
AbstractProduct.prototype.getAverageRating = function () {
  let averageRating = 0;
  let counter = 0;

  for (const review of this.reviews) {
    averageRating += review.rating;
    counter++;
  }

  return counter > 0 ? averageRating / counter : 0;
};
AbstractProduct.prototype.getFullInformation = function () {
  return Object.entries(this)
    .filter(([, value]) => typeof value !== "function")
    .map(([key, value]) => `${key} - ${value}`)
    .join("\n");
};

AbstractProduct.prototype.getPriceForQuantity = function () {
  return this.price * this.quantity;
};

function Clothes(
  ID = 0,
  name = "name",
  description = "description",
  price = 0,
  brand = "brand",
  quantity = 0,
  date = new Date(),
  reviews = [],
  images = [],
  sizes = ["XS", "S", "M", "L", "XL", "XXL"],
  activeSize = ["XS", "S", "M", "L", "XL", "XXL"],
  material = "material",
  color = "color"
) {
  AbstractProduct.call(
    this,
    ID,
    name,
    description,
    price,
    brand,
    quantity,
    date,
    reviews,
    images
  );
  this.sizes = sizes;
  this.activeSize = activeSize;
  this.material = material;
  this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

Clothes.prototype.addSize = function (newSize) {
  this.sizes.push(newSize);
};
Clothes.prototype.deleteSize = function (size) {
  const index = this.sizes.indexOf(size);
  if (index !== -1) {
    this.sizes.splice(index, 1);
  }
};

function Electronics(
  ID = 0,
  name = "name",
  description = "description",
  price = 0,
  brand = "brand",
  quantity = 0,
  date = new Date(),
  reviews = [],
  images = [],
  warranty = 0,
  power = 0
) {
  AbstractProduct.call(
    this,
    ID,
    name,
    description,
    price,
    brand,
    quantity,
    date,
    reviews,
    images
  );
  this.warranty = warranty;
  this.power = power;
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

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
    let productName = product.valueAccessor("name").toLowerCase();
    let productDescription = product.valueAccessor("description").toLowerCase();

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
      return a.valueAccessor("price") - b.valueAccessor("price"); // Сортування за ціною (числове)
    } else if (sortRule === "name") {
      return a.valueAccessor("name").localeCompare(b.valueAccessor("name")); // Сортування за назвою (рядкове)
    } else if (sortRule === "ID") {
      return a.valueAccessor("ID") - b.valueAccessor("ID"); // Сортування за ID (числове)
    } else {
      throw new Error("Невідоме правило сортування");
    }
  });
}

module.exports = {
  AbstractProduct,
  Clothes,
  Electronics,
  Review,
  searchProducts,
  sortProducts,
};
