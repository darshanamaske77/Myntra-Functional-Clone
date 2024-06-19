let bagItems;
onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemonHomePage();
  displayBagIcon();
}

function addToBag(itemid) {
  //to store items in form of array
  bagItems.push(itemid);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemsCount = document.querySelector(".bag-count"); //to show collection of array on display
  if (bagItems.length > 0) {
    bagItemsCount.style.visibility = "visible";
    bagItemsCount.innerText = bagItems.length;
  } else {
    bagItemsCount.style.visibility = "hidden";
  }
}

function displayItemonHomePage() {
  let itemsContainer = document.querySelector(".right-container");

  if (!itemsContainer) {
    return;
  }

  let innerHTML = "";

  items.forEach((item) => {
    // to display items on a home page
    innerHTML += `
        <div class="item-box">
          <div class="item-img">
            <img src="${item.item_img}" alt="" />
          </div>

          <div class="item-details">
            <h3>${item.brand_name}</h3>
            <p>${item.item_name}</p>
            <div class="price">
              <p class="item-price">Rs ${item.item_price}</p>
              <p class="original-price">Rs ${item.original_price}</p>
              <p class="item-discount">[${item.item_discount}% OFF]</p>
            </div>
            <button onclick = " addToBag (${item.id}) ">ADD TO BAG</button>
          </div>
        </div>
        `;
  });

  itemsContainer.innerHTML = innerHTML;
}
