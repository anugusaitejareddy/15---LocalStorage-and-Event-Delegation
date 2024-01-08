const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function updateItems(e) {
  e.preventDefault();
  let text = this.querySelector("input[name=item]").value;
  let item = {
    text,
    done: false,
  };
  items.push(item);
  populateItems(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateItems(items = [], itemsList) {
  itemsList.innerHTML = items
    .map((item, index) => {
      return `
            <li>
            <input type="checkbox" id="item${index}" data-index=${index} ${
        item.done ? "checked" : ""
      }/>
            <label for="item${index}">${item.text}</label>
            </li>
        `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateItems(items, itemsList);
}

addItems.addEventListener("submit", updateItems);
itemsList.addEventListener("click", toggleDone);

populateItems(items, itemsList);
