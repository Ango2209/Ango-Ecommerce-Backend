const { faker } = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;

const main = async () => {
  const url =
    "mongodb+srv://Anhngo2208:Anhngole.123@cluster0.onhfeyv.mongodb.net/Ango-Ecommerce?retryWrites=true&w=majority";

  const client = new MongoClient(url);
  try {
    await client.connect();
    const productsCollection = client
      .db("Ango-Ecommerce")
      .collection("products");

    productsCollection.drop();
    const categories = ["Watch", "Laptop", "Dessert", "Lunch"];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const brands = ["Samsung", "Iphone", "Michelin", "Redbull"];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const colors = ["Red", "Yellow", "Green", "Pink"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    let products = [];
    for (let i = 0; i < 15; i++) {
      let newProduct = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: randomCategory,
        brand: randomBrand,
        colors: [randomColor],
        quantity: 100,
        sold: 0,
        image: [{ url: faker.image.urlLoremFlickr({ category: "food" }) }],
      };
      products.push(newProduct);
    }
    await productsCollection.insertMany(products);
  } catch (err) {
    console.error(err);
  }
};
main();
