const dark = {
  "--Background": "hsl(235, 21%, 11%)",
  "--principal-color-text": "hsl(234, 39%, 85%)",
  "--color-text-header": "hsl(0, 0%, 98%)",
  "--bg-color-header": "hsl(235, 24%, 19%)",
  "--sombra": "hsl(100, 10%, 10%)",
  "--bg-movil": "url(./assets/img/bg-mobile-dark.jpg)",
  "--bg-desktop": "url(./assets/img/bg-desktop-dark.jpg)",
  "--border": "hsl(233, 14%, 35%)",
  "--color-text-hover": "hsl(0, 0%, 98%)",
  "--color-text-medio": "hsl(234, 11%, 52%)",
};
const light = {
  "--Background": "hsl(240deg, 11%, 96%)",
  "--principal-color-text": "hsl(235, 21%, 11%)",
  "--color-text-header": "hsl(0, 0%, 98%)",
  "--bg-color-header": "hsl(0, 0%, 98%)",
  "--bg-desktop": "url(./assets/img/bg-desktop-light.jpg)",
  "--sombra": "hsl(236, 33%, 92%)",
  "--bg-movil": "url(./assets/img/bg-mobile-light.jpg)",
  "--border": "hsl(234, 39%, 85%)",
  "--color-text-hover": "hsl(237, 14%, 26%)",
  "--color-text-medio": "hsl(234, 39%, 85%)",
};
const db = [
  {
    text: "Complete online JavaScript course",
    checked: true,
    id: 1,
  },
  {
    text: "Jog arounf the park 3x",
    checked: false,
    id: 2,
  },
  {
    text: "10 minutes meditation",
    checked: false,
    id: 3,
  },
  {
    text: "Read for 1 hour",
    checked: false,
    id: 4,
  },
  {
    text: "Pck up groceries",
    checked: false,
    id: 5,
  },
  {
    text: "Complete Todo App on Fronted Mento",
    checked: false,
    id: 6,
  },
];
let theme = true,
filter = "all";

//theme drak
document.getElementById("icon-theme").addEventListener("click", (e) => {
  if (!theme) {
    for (let valor in light) {
      document.documentElement.style.setProperty(valor, light[valor]);
    }
    e.target.src = "assets/img/icon-moon.svg";
    theme = true
  } else {
    for (let valor in dark) {
      document.documentElement.style.setProperty(valor, dark[valor]);
    }
    e.target.src = "assets/img/icon-sun.svg";
    theme = false
  }
});

//drag and drop
function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {
    enableDragList(list);
  });
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "move";
  },true);
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
  },true);
  item.addEventListener("drag", (e) => handleDrag(e, item));
  item.addEventListener("dragend", (e) => handleDrop(e, item));
  item.addEventListener("touchmove", (e) => handleDrag(e, item));
  item.addEventListener("touchend", (e) => handleDrop(e, item));
}

function handleDrag(e, item) {
  e.preventDefault();
  const selectedItem = item,
  list = selectedItem.parentNode;
  let x, y;
  if (e.clientX) {
    e.dataTransfer.dropEffect = "move"
    x = e.clientX;
    y = e.clientY;
  } else if (e.touches && e.touches.length) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  }
  selectedItem.classList.add("drag-sort-active");
  if (x && y) {
    let swapItem =
    document.elementFromPoint(x, y) === null
    ? selectedItem
    : document.elementFromPoint(x, y);
    if (list === swapItem.parentNode) {
      swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      if(selectedItem !== swapItem){
        list.insertBefore(selectedItem, swapItem);
        const next = db.findIndex(el =>swapItem !== null?swapItem.dataset.item_id == el.id:null)
        console.log(e)
        orderItems(selectedItem.dataset.item_id,swapItem !== null?db[next === 0?0:next-1].id:null,swapItem !== null?db[next === 0?0:next].id:db[db.length-2].id)
      }
    }
  }
}

function handleDrop(e) {
  e.target.classList.remove("drag-sort-active");
  e.target.style.cursor = "default"
}

//render
function render(item) {
  const fragment = new DocumentFragment();
  if(filter === "all"){
    if(!item){
    document.getElementById("todo-list").innerHTML = ""
    document.getElementById("filter_all").classList.add("active")
    document.getElementById("filter_active").classList.remove("active")
    document.getElementById("filter_completed").classList.remove("active")
      db.map((item) => {
      fragment.appendChild(addItem(item));
    
  });}
  }else if(filter === "active"){
    if(!item){
    document.getElementById("todo-list").innerHTML = ""
    document.getElementById("filter_all").classList.remove("active")
    document.getElementById("filter_active").classList.add("active")
    document.getElementById("filter_completed").classList.remove("active")
    db.map((item) => {
      if(!item.checked){
        fragment.appendChild(addItem(item));
      }
    });
  }else if(item.checked){
      item.item.parentNode.removeChild(item.item)
  }
  }else if(filter === "completed"){
    if(!item){
      document.getElementById("todo-list").innerHTML = ""
    document.getElementById("filter_all").classList.remove("active")
    document.getElementById("filter_active").classList.remove("active")
    document.getElementById("filter_completed").classList.add("active")
    db.map((item) => {
      if(item.checked){
        fragment.appendChild(addItem(item));
      }
    });
    }else if(!item.checked){
      item.item.parentNode.removeChild(item.item)
    }
  }
  document.getElementById("count-items").innerHTML = `${db.length} items lef`
  document.getElementById("todo-list").appendChild(fragment);
}

// add item
function addItem(item){
  const $li = document.createElement("li");
    $li.innerHTML = `
    <label class="container-checkbox">
      <input
        type="checkbox"
        class="checkbox"
        ${item.checked ? "checked" : ""}
        name="validtodoitem"
        id="validtodoitem"
        class="valid-todo-item"
      />
      <span class="checkmark"></span>
      <p>${item.text}</p>
    </label>
    <img
      src="assets/img/icon-cross.svg"
      class="icon-cross"
      alt="cross"
    />`;
    $li.classList.add("item");
    $li.dataset.item_id = item.id;
    enableDragItem($li)
    $li.querySelector("input").addEventListener("change",active)
    $li.querySelector(".icon-cross").addEventListener("click",deleteItem)
  return $li
}
//delete item
function deleteItem(e){
  e.preventDefault()
  e.stopPropagation()
  db.splice(0,db.length,...db.filter(el=>el.id == e.target.parentNode.dataset.item_id?null:el))
  e.target.parentNode.parentNode.removeChild(e.target.parentNode)
}
//active or desactive
function active(e){
  if(e.target.checked){
    let index = db.findIndex(el =>e.target.parentNode.parentNode.dataset.item_id == el.id)
    db[index] = {...db[index],checked:true}
    render({item:e.target.parentNode.parentNode,checked:true})
  }else{
    let index = db.findIndex(el =>e.target.parentNode.parentNode.dataset.item_id == el.id)
    db[index] = {...db[index],checked:false}
    render({item:e.target.parentNode.parentNode,checked:false})
  }
}

//ordenar items
function orderItems(item,next,pos){
  db.sort(function(b, a){
      if(a.id == item && (b.id == next || next == null)){
        return -1
      }if(a.id == pos && (b.id == item || next == null)){
        return -1
      }else{
        return 1
      }
    })
}
//event add item
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = new Date().getTime();
  db.push({
    text:e.target.add.value,
    checked:e.target.validtodo.checked,
    id:id
  });
  document.getElementById("todo-list").appendChild(addItem(db[db.length-1]));
  document.getElementById("count-items").innerHTML = `${db.length} items lef`
  e.target.reset()
  render(e)
});
//event filter
document.getElementById("filter_all").addEventListener("click",(e)=>{
  filter = "all"
  render()
})
document.getElementById("filter_active").addEventListener("click",(e)=>{
  filter = "active"
  render()
})
document.getElementById("filter_completed").addEventListener("click",(e)=>{
  filter = "completed"
  render()
})
//event clear all
document.getElementById("clear-all-item").addEventListener("click",(e)=>{
  db.splice(0,db.length,...db.filter(el=>el.checked?null:el))
  render()
})
//render
render();
