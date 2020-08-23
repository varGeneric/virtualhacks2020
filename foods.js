var foods;
firebase.auth().onAuthStateChanged(function (user) {
    //here
});

function addFood(food) {
    
    try{
      var user = firebase.auth().currentUser;
    let itemNum = 0;
    let foodNum = 0;
    var userId = user.uid;
    firebase.database().ref("/users/" + userId + "/itemCount/itemCount").once('value').then(function(snapshot) 
    {
        itemNum = snapshot.val();
    });
    firebase.database().ref("/users/" + userId + '/shoppingList/' + food + "/foodCount").once('value').then(function(snapshot) {
        if(snapshot.val()!=null){
            foodNum = snapshot.val();
            console.log(foodNum);
        }
        else{
            itemNum = itemNum + 1;
        }
        foodNum = foodNum + 1;
        updateFood(foodNum, itemNum, userId, food);
    });
    var popup = document.getElementById(food+"1");
    popup.classList.add("show");
  }
  catch(e)
  {
    var popup = document.getElementById(food+"2");
    popup.classList.add("show");
  }
    // firebase.database().ref("/users/" + userId + '/shoppingList/' + food).set({
    //     foodCount: foodNum
    // });
    // if (userId!= null){
    // var popup = document.getElementById(food+"1");
    // popup.classList.add("show");
    // }
    // else{
    //   var popup = document.getElementById(food+"2");
    //   popup.classList.add("show");
    // }
}

function updateFood(foodNum, itemNum, userId, food)
{   
    console.log(foodNum)
    firebase.database().ref("/users/" + userId + "/shoppingList/" + food).set({
        foodCount: foodNum
    });
    firebase.database().ref("/users/" + userId + "/itemCount").set({
        itemCount: itemNum
    });
}
function updateFoodCards() {
 
   var cnt  = 0;
    
    var html = "";
    firebase.database().ref("/Foods").once('value').then(function(snapshot) 
      {
        foods = snapshot.val();
        for(var child in foods){
          if(cnt==10){break;}
          var childNodes = foods[child];
            console.log(childNodes);
              //This loop iterates over children of user_id
              //childNodes.key is key of the children of userid such as (20170710)
              //childNodes.val().name;
              //childNodes.val().time;
              //childNodes.val().rest_time;
              //childNodes.val().interval_time;
              html += `
<div class="container-fluid ">
    <div class="row">
      <div class="col-12 mt-3">
        <div class="card custom-card shadow ">
          <div style="display: flex; flex: 1 1 auto;">
            <div class="img-square-wrapper" style="height: 180px; width: 300px;">
              <img class="" src="${childNodes.photo}"
                alt="Card image cap" style="max-height: 180px; max-width: 300px; height:auto; width:auto; display: block; margin-left: auto; margin-right: auto;">
            </div>
            <div class="card-body">
              <h4 class="card-title capitalize">${child}</h4>
              
            </div>
          </div>
          <div class="card-footer">
            <div class="text-right popup" style="float: right;">
            <a class="btn btn-outline-success" href="genericFoodPage.html?name=${child}&url=${encodeURIComponent(childNodes.photo)}">
            See stock
          </a>
              <button type="button" class="btn btn-outline-success"onclick="addFood('${child}')" ">Add to shopping list</button>
              <span class="popuptext" id="${child}1">Added to shopping list</span>
              <span class="popuptext" id="${child}2">Please login to add to shopping list</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
                // console.log(html);
              document.getElementById("cards").innerHTML = html;
                
                cnt++;
        }
   });
}
function updateFoodCardsSearch(){
  document.getElementById("cards").innerHTML = '<div class="container-fluid"> <div class="row"><div class="col-12 mt-3" id="recipe-cards" ><div class="loader"></div> </div></div></div>';
  var search = document.getElementById("search").value;
  var html = "";
  var cnt = 0;
 console.log(search)
  for(var child in foods){
    if(cnt==10){break;}
    var childNodes = foods[child];
      console.log(childNodes);
      if(child.startsWith(search))
      {
        //This loop iterates over children of user_id
        //childNodes.key is key of the children of userid such as (20170710)
        //childNodes.val().name;
        //childNodes.val().time;
        //childNodes.val().rest_time;
        //childNodes.val().interval_time;
        html += `
<div class="container-fluid">
<div class="row">
<div class="col-12 mt-3">
  <div class="card custom-card shadow">
    <div style="display: flex; flex: 1 1 auto;">
      <div class="img-square-wrapper" style="height: 180px; width: 300px;">
        <img class="" src="${childNodes.photo}"
          alt="Card image cap" style="max-height: 180px; max-width: 300px; height:auto; width:auto; display: block; margin-left: auto; margin-right: auto;">
      </div>
      <div class="card-body">
        <h4 class="card-title capitalize">${child}</h4>
        
      </div>
    </div>
    <div class="card-footer">
      <div class="text-right popup" style="float: right;">
      <a class="btn btn-outline-success" href="genericFoodPage.html?name=${child}&url=${encodeURIComponent(childNodes.photo)}">
      See stock
    </a>
        <button type="button" class="btn btn-outline-success"onclick="addFood('${child}')" ">Add to shopping list</button>
        <span class="popuptext" id="${child}1">Added to shopping list</span>
        <span class="popuptext" id="${child}2">Please login to add to shopping list</span>
      </div>
    </div>
  </div>
</div>
</div>
</div>
`;
          // console.log(html);
        document.getElementById("cards").innerHTML = html;
        cnt = cnt+1;
      }
      document.getElementById("cards").innerHTML = html;
          
  }
}
   
            


    updateFoodCards();

// document.getElementById("appleAdd").addEventListener("click", addFood);
// document.getElementById("orangeAdd").addEventListener("click", addFood);
// document.getElementById("grapesAdd").addEventListener("click", addFood);
