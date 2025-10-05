// basket.js

function loadBasket() {
  try {
    let data = JSON.parse(localStorage.getItem("basket"));
    if (!Array.isArray(data)) return [];
    return data;
  } catch (e) {
    return [];
  }
}

let basket = loadBasket();

function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function addToBasket(product) {
  if (!Array.isArray(basket)) basket = [];

  // Check if product already exists
  let existing = basket.find(item => item.id === product.id);
  if (existing) {
    existing.qty += product.qty; // increment by selected quantity
  } else {
    basket.push(product);
  }

  saveBasket();
  console.log("✅ Product added:", product, basket);
}


document.addEventListener("DOMContentLoaded", () => {
  let qty = 1;
  const qtyDisplay = document.getElementById("quantity-display");
  const qtyHidden = document.getElementById("quantity");

  document.getElementById("increase").addEventListener("click", () => {
    qty++;
    qtyDisplay.textContent = qty;
    qtyHidden.value = qty;
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      qtyDisplay.textContent = qty;
      qtyHidden.value = qty;
    }
  });
});







// Attach events
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-basket").forEach(btn => {
    btn.addEventListener("click", () => {
      const quantityInput = document.getElementById("quantity");
      const qty = parseInt(quantityInput.value) || 1;

      let product = {
        id: btn.getAttribute("data-id"),
        title: btn.getAttribute("data-title"),
        price: parseFloat(btn.getAttribute("data-price")),
        image: "{{ site.baseurl }}" + btn.getAttribute("data-image"),
        qty: qty
      };

      addToBasket(product);
      alert(product.title + " تمت إضافته إلى السلة!");
    });
  });
});
