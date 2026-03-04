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
         <button  onclick="loadPlant(${btn.id})" class="btn btn-success w-full justify-start mb-3">${btn.category_name}</button>
        `
         CatDiv.append(makeCatDiv);
    });
   
}
//load Plat div
const loadPlant = (id) =>{
     const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayPlant(data.plants));
}

//display Plant

const displayPlant = (plants) =>{
let PlantDiv = document.getElementById("plant-div");
PlantDiv.innerHTML = "";
plants.forEach(plant =>{
    const makePlantDiv = document.createElement("div");
    makePlantDiv.innerHTML = `
      <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${plant.image}"
      alt="${plant.name}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${plant.name}</h2>
    <p class= "line-clamp-2">${plant.description}</p>
    <div>
    <div class="badge badge-soft badge-success">${plant.category}</div>
    <p>${plant.price}</p>
    </div>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `
    PlantDiv.append(makePlantDiv);
})

}

loadCategory();
