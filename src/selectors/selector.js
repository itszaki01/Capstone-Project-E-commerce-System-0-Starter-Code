// Find the lowest price among products 
export const selectMin = (products) => {
  if (!products || products.length === 0) return 0;
  let low = products[0];

  for (let i = 0; i < products.length; i++) {
    if (products[i].price < low.price) {
      low = products[i];
    }
  }

  return Math.floor(low.price);
};

// Find the highest price among products 
export const selectMax = (products) => {
  if (!products || products.length === 0) return 0;

  let high = products[0];

  for (let i = 0; i < products.length; i++) {
    if (products[i].price > high.price) {
      high = products[i];
    }
  }

  return Math.floor(high.price);
};

// Filter Logic
export const selectFilter = (products, filter) => {
  if (!products || products.length === 0) return [];

  // console.log("products", products)

  return products.filter((product) => {
    const isPriceInRange = filter.maxPrice
      ? (product.price >= filter.minPrice && product.price <= filter.maxPrice)
      : true;

    // console.log("isPriceInRange", isPriceInRange)

    const matchBrand = product.brand ? product.brand.toLowerCase().includes(filter.brand.toLowerCase()) : true;
    // console.log("matchBrand", matchBrand)

    return (matchBrand && isPriceInRange);
  }).sort((a, b) => {
    if (filter.sortOrder === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (filter.sortOrder === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (filter.sortOrder === 'price-desc') {
      return a.price < b.price ? 1 : -1;
    }
    return a.price > b.price ? 1 : -1;
  });
};