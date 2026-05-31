export function parseProductPrice(price) {
  const number = Number(String(price).replace("$", ""));
  return Number.isNaN(number) ? 0 : number;
}

export function formatCurrency(value) {
  return "$" + Number(value).toFixed(2);
}

export function getDiscountPercent(product) {
  const currentPrice = parseProductPrice(product.price);
  const oldPrice = parseProductPrice(product.oldPrice);

  if (oldPrice <= 0 || currentPrice <= 0 || currentPrice >= oldPrice) {
    return 0;
  }

  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
}

export function filterProducts(products, searchText, category, maxBudget, onlyOffers) {
  const budgetNumber = Number(maxBudget);
  const hasBudget = maxBudget !== "" && !Number.isNaN(budgetNumber);

  return products.filter((product) => {
    const title = product.title.toLowerCase();
    const search = searchText.trim().toLowerCase();
    const price = parseProductPrice(product.price);
    const discount = getDiscountPercent(product);

    const matchesSearch = title.includes(search);
    const matchesCategory = category === "All" || product.category === category;
    const matchesBudget = !hasBudget || price <= budgetNumber;
    const matchesOffer = !onlyOffers || discount > 0 || product.badge !== "";

    return matchesSearch && matchesCategory && matchesBudget && matchesOffer;
  });
}

export function sortProducts(products, sortMode) {
  const sorted = [...products];

  if (sortMode === "price-low") {
    sorted.sort((first, second) => parseProductPrice(first.price) - parseProductPrice(second.price));
  } else if (sortMode === "price-high") {
    sorted.sort((first, second) => parseProductPrice(second.price) - parseProductPrice(first.price));
  } else if (sortMode === "name") {
    sorted.sort((first, second) => first.title.localeCompare(second.title));
  } else if (sortMode === "discount") {
    sorted.sort((first, second) => getDiscountPercent(second) - getDiscountPercent(first));
  }

  return sorted;
}

export function getProductsTotal(products) {
  let total = 0;

  for (const product of products) {
    total += parseProductPrice(product.price);
  }

  return total;
}

export function getCategoryCounts(products) {
  const counts = {};

  for (const product of products) {
    counts[product.category] = (counts[product.category] || 0) + 1;
  }

  return counts;
}

export function validateEmail(email) {
  return email.includes("@") && email.includes(".") && email.trim().length >= 6;
}

export function readStorageList(key, fallback = []) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    return fallback;
  }
}

export function saveStorageList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.log("Storage is not available", error);
  }
}

export function normalizeCustomerInput(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

export function buildOrderCode(prefix = "FS") {
  const bigTime = BigInt(Date.now());
  return `${prefix}-${bigTime.toString().slice(-6)}`;
}

export function getValueType(value) {
  return typeof value;
}

export function calculateDeliveryFee(speed) {
  switch (speed) {
    case "express":
      return 5;
    case "standard":
      return 3;
    case "pickup":
      return 0;
    default:
      return 2;
  }
}

export function createStockSequence(count) {
  const total = parseInt(count, 10);
  const sequence = [];
  let index = 1;

  if (Number.isNaN(total) || total <= 0) {
    return sequence;
  }

  do {
    sequence.push(`Stock check ${index}`);
    index++;
  } while (index <= total && index <= 5);

  return sequence;
}

export function summarizeCategoriesWithVar(products) {
  var summary = "";

  for (var index = 0; index < products.length; index++) {
    summary += products[index].category;

    if (index < products.length - 1) {
      summary += " | ";
    }
  }

  return summary;
}

export function createReverseCategoryList(products) {
  const categories = [];
  let index = products.length - 1;

  while (index >= 0) {
    categories.push(products[index].category);
    index--;
  }

  return categories;
}
