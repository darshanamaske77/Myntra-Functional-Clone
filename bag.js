let bagItemsObjects;

onLoad();

function onLoad() {
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummary = document.querySelector(".summary-box");

  let totalItems = bagItemsObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalFee = 99;

  bagItemsObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.item_price;
  });

  let finalPayment = totalMRP - totalDiscount + totalFee;

  bagSummary.innerHTML = `<p><span class="box-details"> PRICE DETAILS (${totalItems} Items)</span></p>
            <div class="totalMRP">
              <span class="mrp-tag">TOTAL MRP</span>
              <span class="mrp-value">Rs ${totalMRP}</span>
            </div>
            <div class="discount">
              <span class="discount-tag">Discount on MRP</span>
              <span class="discount-value">Rs ${totalDiscount}</span>
            </div>
            <div class="fee">
              <span class="fee-tag">Convenience fee</span>
              <span class="fee-value">Rs ${totalFee}</span>
            </div>
            <div class="total">
              <span class="total-tag">Total Price</span>
              <span class="total-value">Rs ${finalPayment}</span>
            </div>
            <button class="btn-summary">PLACE YOUR ORDER</button>`;
}

function loadBagItemsObjects() {
  console.log(bagItems);
  bagItemsObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemsObjects);
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
  let bagElements = document.querySelector(".left-side");
  let innerHTML = "";
  bagItemsObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });
  bagElements.innerHTML = innerHTML;
}

function generateItemHTML(item) {
  return `<div class="bag-item">
            <div class="left-item">
              <img src="${item.item_img}" alt="image" />
            </div>
            <div class="right-item">
              <div class="item-elements">
                <p class="bag-item-name"><span>${item.brand_name}</span></p>
                <p class="bag-item-detail"><span>${item.item_name}</span></p>
              </div>
              <div class="bag-price">
                <span class="bag-item-price">Rs${item.item_price}</span>
                <span class="bag-item-originalprice">Rs ${item.original_price}</span>
                <span class="bag-item-discount">(${item.item_discount} OFF)</span>
              </div>
            </div>
            <div class="remove"onclick = " removeFromBag(${item.id}) ">X</div>
          </div>`;
}
