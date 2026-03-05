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
    <img
      src="${plant.image}"
      alt="${plant.name}"/>
  </figure>
  <div class="card-body pl-0 pr-0 pt-1 w-full"> 
    <h2 class="card-title">${plant.name}</h2>
    <p class= "line-clamp-2 text-left">${plant.description}</p>
    <div class="flex justify-between">
    <div class="badge border border-green-500 bg-green-100 text-green-400 p-2">${plant.category}</div>
    <p class="text-right font-semibold">৳${plant.price}</p>
    </div>
    <div class="card-actions">
      <button class="add-cart-btn btn btn-primary w-full mt-3 bg-green-800 rounded-2xl border-none">Add to Cart</button>
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
      <div class="card bg-base-200 shadow-sm px-2 pt-2 w-full h-95">
  <figure>
    <img
      src="${plant.image}"
      alt="${plant.name}"/>
  </figure>
  <div class="card-body pl-0 pr-0 pt-1 w-full"> 
    <h2 class="card-title">${plant.name}</h2>
    <p class= "line-clamp-2 text-left">${plant.description}</p>
    <div class="flex justify-between">
    <div class="badge border border-green-500 bg-green-100 text-green-400 p-2">${plant.category}</div>
    <p class="text-right font-semibold">৳${plant.price}</p>
    </div>
    <div class="card-actions">
      <button class="add-cart-btn btn btn-primary w-full mt-3 bg-green-800 rounded-2xl border-none">Add to Cart</button>
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

const cartBtn = document.querySelectorAll(".add-cart-btn");


loadCategory();
loadAllPlant();

