function httpGetPromise(url, method = "GET") {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
}

function updateRecipeCards() {
  var html = "<h2>Featured Recipes</h2>";
  httpGetPromise(
    "https://api.spoonacular.com/recipes/random?apiKey=4e6d53114ae54af0a78d3f4e631302cd&instructionsRequired=true&number=10&addRecipeInformation=true"
  ).then(
    function (e) {
      console.log(e);
      var recipes = JSON.parse(e.target.response).recipes;
      for (var i = 0; i < recipes.length; i++) {
        html += `<a href="genericRecipePage.html?recipeID=${recipes[i].id}&recipeImage=${encodeURIComponent(recipes[i].image)}&recipeName=${recipes[i].title}&recipeURL=${encodeURIComponent(recipes[i].sourceUrl)}" style="text-decoration:none;color:black">
                <div style="padding-bottom: 20px;">
                <div class="card custom-card shadow">
                <div style="display: flex; flex: 1 1 auto;">
                    <div class="img-square-wrapper">
                        <img class="" src="${recipes[i].image}" alt="Card image cap" style="width: 300px; height: 200px; object-fit: fill;">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${recipes[i].title}</h4>
                        <p class="card-text">Serving size: <b>${recipes[i].servings} people</b></p>
                        <p class="card-text">Time to make: <b>${recipes[i].readyInMinutes} minutes</b></p>
                  </div>
                </div>
                <div class="card-footer">`;

        if (recipes[i].diets.length > 0) {
          html += `<small class="text-muted" style="padding-right: 10px;">Tags:</small>`;
          for (var w = 0; w < recipes[i].diets.length; w++) {
            html += `<button type="button" class="btn btn-outline-success btn-sm mr-1">${recipes[i].diets[w]}</button>`;
          }
        }

        html += `<div class="text-right" style="float: right;">
                        <p>Click on the card  to see the ingredients and add it to your shopping list</p>
                        </div>
                        </div>
                        </div>
                        </div>
                       </a>`;

        document.getElementById("recipe-cards").innerHTML = html;
      }
    },
    function (e) {
      console.log("Error updating recipe cards");
      console.log(e);
    }
  );
}

function searchBar(){
  var search = document.getElementById("search").value;
  var html = "";
  console.log(search);
  httpGetPromise(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=4e6d53114ae54af0a78d3f4e631302cd&query="+search+"&fillIngredients=true&number=10&addRecipeInformation=true"
  ).then(
    function (e) {
      console.log(e);
      var recipes = JSON.parse(e.target.response).results;
      console.log(recipes);
      for (var i = 0; i < recipes.length; i++) {
        html += `<a href="genericRecipePage.html?recipeID=${recipes[i].id}&recipeImage=${encodeURIComponent(recipes[i].image)}&recipeName=${recipes[i].title}&recipeURL=${encodeURIComponent(recipes[i].sourceUrl)}" style="text-decoration:none;color:black">
                <div style="padding-bottom: 20px;">
                <div class="card custom-card shadow">
                <div style="display: flex; flex: 1 1 auto;">
                    <div class="img-square-wrapper">
                        <img class="" src="${recipes[i].image}" alt="Card image cap" style="width: 300px; height: 200px; object-fit: fill;">
                    </div>
                    <div class="card-body">
                       <h4 class="card-title">${recipes[i].title}</h4>
                        <p class="card-text">Serving size: <b>${recipes[i].servings} people</b></p>
                        <p class="card-text">Time to make: <b>${recipes[i].readyInMinutes} minutes</b></p>
                  </div>
                </div>
                <div class="card-footer">`;

        // if (recipes[i].diets.length > 0) {
        //   html += `<small class="text-muted" style="padding-right: 10px;">Tags:</small>`;
        //   for (var w = 0; w < recipes[i].diets.length; w++) {
        //     html += `<button type="button" class="btn btn-outline-success btn-sm mr-1">${recipes[i].diets[w]}</button>`;
        //   }
        // }

        html += `<div class="text-right" style="float: right;">
        <p>Click on the card  to see the ingredients and add it to your shopping list</p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </a>`;

        document.getElementById("recipe-cards").innerHTML = html;
      }
    },
    function (e) {
      console.log("Error updating recipe cards");
      console.log(e);
    }
  );
  
}

updateRecipeCards();
