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

export function convertBudgetValues(value) {
  const rawValue = String(value || "0");
  const numberWithNumber = Number(rawValue);
  const numberWithParseInt = parseInt(rawValue, 10);
  const numberWithPlus = +rawValue;
  const textWithToString = numberWithNumber.toString();
  const textWithString = String(numberWithParseInt);

  return {
    numberWithNumber,
    numberWithParseInt,
    numberWithPlus,
    textWithToString,
    textWithString,
    isInvalid: Number.isNaN(numberWithNumber),
  };
}

export function reverseProductTitles(products) {
  const titles = products.map((product) => product.title);
  const reversed = [];

  for (let index = titles.length - 1; index >= 0; index--) {
    reversed.push(titles[index]);
  }

  return reversed;
}

export function buildPriceMatrix(products) {
  return products.slice(0, 3).map((product, index) => [index + 1, product.title, parseProductPrice(product.price)]);
}

export function calculateFactorialForStock(number) {
  const total = parseInt(number, 10);
  let factorial = 1;

  if (Number.isNaN(total) || total < 1) {
    return 0;
  }

  for (let index = 1; index <= total && index <= 6; index++) {
    factorial *= index;
  }

  return factorial;
}

export function countProductsByObjectEntries(products) {
  const counts = getCategoryCounts(products);
  const lines = [];

  for (const [key, value] of Object.entries(counts)) {
    lines.push(`${key}: ${value}`);
  }

  return lines;
}

export function checkFalseLikeValues(value) {
  const cleaned = normalizeCustomerInput(value);
  const result = cleaned ? "Customer wrote a real note" : "Empty note is treated as false";
  return result;
}

export class StoreReport {
  constructor(products) {
    this.products = products;
    this.createdAt = new Date();
  }

  getMostExpensiveTitle() {
    const sorted = sortProducts(this.products, "price-high");
    return sorted[0]?.title || "No products";
  }

  getReportLine() {
    const total = getProductsTotal(this.products);
    return `Store has ${this.products.length} products with total display value ${formatCurrency(total)}.`;
  }
}

export function buildJavaScriptStoreReport(products, budgetValue = "50") {
  let mutableCount = products.length;
  mutableCount += 1;

  const fixedStoreName = "Fashion Store";
  const report = new StoreReport(products);
  const conversions = convertBudgetValues(budgetValue);
  const firstTitle = products[0]?.title || "";
  const combinedTitle = firstTitle.concat(" collection");
  const titleSample = firstTitle.length > 0 ? `${firstTitle[0]} / ${firstTitle.charAt(1) || "-"}` : "No title";
  const matrix = buildPriceMatrix(products);
  const objectEntryLines = countProductsByObjectEntries(products);
  const invalidMath = "A" * 2;
  const emptyCustomerNote = null;
  const missingDeliveryValue = undefined;
  const typeChecks = [
    ["store", getValueType(fixedStoreName)],
    ["count", getValueType(products.length)],
    ["valid", getValueType(products.length > 0)],
    ["big order", getValueType(BigInt(products.length))],
    ["function", getValueType(buildOrderCode)],
    ["object", getValueType(report)],
    ["undefined", getValueType(missingDeliveryValue)],
    ["null", getValueType(emptyCustomerNote)],
    ["NaN", Number.isNaN(invalidMath) ? "NaN" : "number"],
  ];

  const priceMessage = conversions.numberWithNumber >= 40 && products.length !== 0
    ? "Budget can match a premium item"
    : "Budget is better for basics";

  const ternaryMessage = products.length > 3 ? "Large collection" : "Small collection";

  return {
    fixedStoreName,
    mutableCount,
    reportLine: report.getReportLine(),
    mostExpensive: report.getMostExpensiveTitle(),
    orderCode: buildOrderCode("FS"),
    combinedTitle,
    titleSample,
    conversions,
    typeChecks,
    matrix,
    reversedTitles: reverseProductTitles(products),
    objectEntryLines,
    priceMessage,
    ternaryMessage,
    falseLikeMessage: checkFalseLikeValues(""),
    factorial: calculateFactorialForStock(products.length),
  };
}
