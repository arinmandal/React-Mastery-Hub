import express from 'express';
let app = express();

app.get('/api/products', (req, res) => {
  const products = [
    {
      "id": 1,
      "name": "watch",
      "price": 299.99,
      "category": "Electronics",
      "image": "https://www.apple.com/newsroom/images/product/watch/lifestyle/Apple_announces-watch-se_09152020_big.jpg.large.jpg"
    },
    {
      "id": 2,
      "name": "Nike Shoes",
      "price": 89.99,
      "category": "Clothing",
      "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/20590f63-9956-4150-bfce-f71ddfd1f9c1/BOOK+1+EP.png"
    },
    {
      "id": 3,
      "name": "Samsung TV",
      "price": 1299.99,
      "category": "Electronics",
      "image": "https://images.jdmagicbox.com/quickquotes/images_main/samsung_series_7_165_1_cm_65_65nu7100_4k_ultra_hd_led_smart_television_82755971_0.jpeg"
    },
    {
      "id": 4,
      "name": "Canon Camera",
      "price": 699.99,
      "category": "Electronics",
      "image": "https://in.canon/media/image/2024/07/17/3d47abeaf9574a9ba9401c6ff2ca7bb1_EOS+R5+Mark+II+%26+RF24-105mm+f4L+IS+USM+Front+Slant.png"
    },
    {
      "id": 5,
      "name": "Gaming Chair",
      "price": 199.99,
      "category": "Home Decor",
      "image": "https://ii1.pepperfry.com/media/catalog/product/x/t/494x544/xtreme-leather-gaming-chair-in-black---blue-colour-xtreme-leather-gaming-chair-in-black---blue-colou-a1tfwo.jpg"
    }
  ]
  if (req.query.search) {
    let filterProducts = products.filter(products => products.name.includes(req.query.search))
    res.send(filterProducts);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
}
)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})