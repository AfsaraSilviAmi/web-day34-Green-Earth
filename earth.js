let allPlants = [];
let cart = [];
//load categories btn
const loadCategory = () =>{
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayCategory(data.categories));
}
//display categories btn
const displayCategory = (btns) =>{

    let CatDiv = document.getElementById("cat-btn");
    btns.forEach(btn => {
        const makeCatDiv = document.createElement("div");
        makeCatDiv.innerHTML = `
         <button  id = "category-${btn.id}" onclick="loadPlant(${btn.id})" class="category-btn btn btn-ghost w-full justify-start mb-3">${btn.category_name}</button>
        `
         CatDiv.append(makeCatDiv);
    });
   
}
//load Plat div
const loadPlant = (id) =>{
     const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      nonActiveBtn(`category-${id}`);
      allPlants = data.plants;
      displayPlant(data.plants)
    });
}

//display Plant

const displayPlant = (plants) =>{
let PlantDiv = document.getElementById("plant-div");
PlantDiv.innerHTML = "";
plants.forEach(plant =>{
    const makePlantDiv = document.createElement("div");
    makePlantDiv.innerHTML = `
      <div class="card bg-base-200 shadow-sm px-2 pt-2 w-full h-95">
  <figure>
    <img onclick = "loadPlantDetail(${plant.id})"
      src="${plant.image}"
      alt="${plant.name}"/>
  </figure>
  <div class="card-body pl-0 pr-0 pt-1 w-full"> 
    <h2 onclick = "loadPlantDetail(${plant.id})" class="card-title">${plant.name}</h2>
    <p onclick = "loadPlantDetail(${plant.id})" class= "line-clamp-2 text-left">${plant.description}</p>
    <div class="flex justify-between">
    <div class="badge border border-green-500 bg-green-100 text-green-400 p-2">${plant.category}</div>
    <p class="text-right font-semibold">৳${plant.price}</p>
    </div>
    <div class="card-actions">
      <button id = "add-cart-${plant.id}" class="add-cart-btn btn btn-primary w-full mt-3 bg-green-800 rounded-2xl border-none">Add to Cart</button>
    </div>
  </div>
</div>
    `
    PlantDiv.append(makePlantDiv);
})

}

//load all Plants

const loadAllPlant = () =>{
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{
    nonActiveBtn("all-tree-btn");
    allPlants = data.plants;
    displayAllPlant(data.plants)
  });
}

//display all Plants

const displayAllPlant = (plants) =>{
  let PlantDiv = document.getElementById("plant-div");
PlantDiv.innerHTML = "";
plants.forEach(plant =>{
    const makePlantDiv = document.createElement("div");
    makePlantDiv.innerHTML = `
      <div  class="card bg-base-200 shadow-sm px-2 pt-2 w-full h-95">
  <figure>
    <img onclick = "loadPlantDetail(${plant.id})"
      src="${plant.image}"
      alt="${plant.name}"/>
  </figure>
  <div class="card-body pl-0 pr-0 pt-1 w-full"> 
    <h2 onclick = "loadPlantDetail(${plant.id})" class="card-title">${plant.name}</h2>
    <p onclick = "loadPlantDetail(${plant.id})" class= "line-clamp-2 text-left">${plant.description}</p>
    <div class="flex justify-between">
    <div class="badge border border-green-500 bg-green-100 text-green-400 p-2">${plant.category}</div>
    <p class="text-right font-semibold">৳${plant.price}</p>
    </div>
    <div class="card-actions">
      <button id = "add-cart-${plant.id}" class="add-cart-btn btn btn-primary w-full mt-3 bg-green-800 rounded-2xl border-none">Add to Cart</button>
    </div>
  </div>
</div>
    `
    PlantDiv.append(makePlantDiv);
})
}

const nonActiveBtn = (id) =>{
  const allBtn = document.querySelectorAll(".category-btn, #all-tree-btn");
  allBtn.forEach(btn => {
    btn.classList.remove("btn-success");
    btn.classList.add("btn-ghost");
  });
  const activeBtn = document.getElementById(id);
if(activeBtn){
   activeBtn.classList.remove("btn-ghost");
   activeBtn.classList.add("btn-success");
}
}
//add to cart
document.getElementById("plant-div").addEventListener("click", (e) => {

  if (e.target.classList.contains("add-cart-btn")) {
   const id = e.target.id.split("-")[2]; // "add-cart-5" -> 5
   const plant = allPlants.find(p => p.id == id);

   addToCart(plant);
  }

});
//to increase quantity and push values
const addToCart = (plant) =>{
 
  const existing = cart.find(item => item.id == plant.id);

  if(existing){
    existing.quantity++;
  }
  else{
    cart.push({
      id : plant.id,
      name : plant.name,
      price : plant.price,
      quantity : 1,

    })
  }
 displayCart();
}


const displayCart = ()=>{
let CartDiv = document.getElementById("cart-div");
let TotalDiv = document.getElementById("cart-total");
CartDiv.innerHTML = "";
let total = 0;
cart.forEach(item =>{
    const makeCartDiv = document.createElement("div");
    makeCartDiv.innerHTML = `
      <div class="flex justify-between bg-gray-200 p-4 rounded-lg">
                        <div>
                        <p class="font-semibold text-[18px]">${item.name}</p>
                        <p class="text-gray-600 text-[16px]">৳${item.price} X ${item.quantity}</p>
                        </div>
                        <div>
                            <button onclick = "cross('${item.id}')" class="text-gray-600 text-[16px] btn">X</button>
                        </div>
                       </div>
    `
    CartDiv.append(makeCartDiv);

    total = total + item.price * item.quantity;
})
  TotalDiv.innerHTML = `
         <p>Total</p>
          <p>৳${total}</p>
  `
}
const cross = (id) =>{
   cart = cart.filter(item => item.id !=id); 
   displayCart(); 
  }

//load plant detail
const loadPlantDetail = (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayPlantDetail(data.plants));
}

//display plant detail
const displayPlantDetail =(plant) =>{
 const detailDiv = document.getElementById("detailContainer");
 detailDiv.innerHTML = `
 <figure>
    <img class="h-80"
      src="${plant.image}"
      alt="${plant.name}"/>
  </figure>
  <h2 class="card-title">${plant.name}</h2>
    <p class= "text-left">${plant.description}</p>
 `
 document.getElementById("myModal").showModal();
}

loadCategory();
loadAllPlant();
loadPlantDetail();


