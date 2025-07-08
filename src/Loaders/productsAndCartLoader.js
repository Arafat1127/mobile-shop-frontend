import { getStoredProduct } from "../Utilities/fakedb";
export const productsAndCartLoader = async () => {
  try {

    const [mobilesRes, laptopsRes, tvsRes, allCategoryRes] = await Promise.all([
      fetch("https://mobile-shop-silk.vercel.app/mobile"),
      fetch("https://mobile-shop-silk.vercel.app/laptop"),
      fetch("https://mobile-shop-silk.vercel.app/tv"),
      fetch("https://mobile-shop-silk.vercel.app/categories"),
    ]);

    const mobiles = await mobilesRes.json();
    const laptops = await laptopsRes.json();
    const tvs = await tvsRes.json();
    const allCategory = await allCategoryRes.json();
    const allProducts = [...mobiles, ...laptops, ...allCategory, ...tvs];

    // Load saved cart and initialize cart
    const savedCart = getStoredProduct();
    const initialCart = Object.keys(savedCart).reduce((cart, id) => {
      const product = allProducts.find((item) => item.id === id);
      if (product) {
        product.quantity = savedCart[id];
        cart.push(product);
      }
      return cart;
    }, []);

    return { products: allProducts, initialCart };
  } catch (error) {
    console.error("Error loading products and cart data:", error);
    return { products: [], initialCart: [] };
  }
};
