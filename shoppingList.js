// function httpGetPromise(url, method = "GET") {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.onload = resolve;
//     xhr.onerror = reject;
//     xhr.send();
//   });
// }
firebase.auth().onAuthStateChanged(function (user) {
  if(user != null && user.uid != null) {
    updateFoodCards();  }
    else
    {
      document.getElementById("header").innerHTML = "<h2 >Please Login to see your shopping list</h2>"
    }
});

function updateFoodCards() {
  var user = firebase.auth().currentUser;
  if (user == null)
    return;

  var userId = user.uid;
 
  var foods;
  firebase.database().ref("/Foods").once('value').then(function(snapshot) 
    {
      console.log(snapshot.val())
      foods = snapshot.val()
      updateFoodCardsInner(foods, userId);
    });
    console.log(foods);
    console.log(userId);

 
  
  
}
function updateFoodCardsInner(foods, userId){
  var html = "";
  firebase.database().ref("/users/" + userId + "/shoppingList").once('value').then(function(snapshot) 
  {
        snapshot.forEach(function(childNodes){
          try{
            var img = foods[childNodes.key].photo;
          }
          catch(e)
          {
            var img = ""
          }
          console.log(img);
          console.log(foods[childNodes.key])
          //This loop iterates over children of user_id
          //childNodes.key is key of the children of userid such as (20170710)
          //childNodes.val().name;
          //childNodes.val().time;
          //childNodes.val().rest_time;
          //childNodes.val().interval_time;
          html += `
          <div style="padding-bottom: 20px;">
          <div class="card custom-card shadow">
          <div style="display: flex; flex: 1 1 auto;">
              <div class="img-square-wrapper" style="height: 180px; width: 300px;">
                  <img class="" src="${img}" alt="Card image cap" style="max-height: 180px; max-width: 300px; height:auto; width:auto; display: block; margin-left: auto; margin-right: auto;">
              </div>
              <div class="card-body">
                  <a href="" style="color: inherit;text-decoration: none;"><h4 class="card-title capitalize">${childNodes.key}</h4></a>
                  <p class="card-text">Availability: <b></b></p>
                  <p class="card-text">Number of Item on Shopping List: <b>${childNodes.val().foodCount} items</b></p>
            </div>
          </div>
          <div class="card-footer">`;

          html += `<div class="text-right" style="float: right;">
          <a class="btn btn-outline-success" href="genericFoodPage.html?name=${childNodes.key}&url=${encodeURIComponent(img)}">
            See stock
          </a>
                          <button type="button" class="btn btn-outline-danger"onclick="removeOneFood('${childNodes.key}')">Remove one</button>
                          <button type="button" class="btn btn-outline-danger"onclick="removeAllFood('${childNodes.key}')">Remove all</button>
                          </div>
                          </div>
                          </div>
                          </div>`;
           
          document.getElementById("recipe-cards").innerHTML = html;
            
            
              });
              document.getElementById("recipe-cards").innerHTML = html;
});
document.getElementById("recipe-cards").innerHTML = html;

}
setTimeout(updateFoodCards, 250);

function removeOneFood(food){
  var user = firebase.auth().currentUser;
  let itemNum = 0;
  let foodNum = 0;
  var userId = user.uid;
  
  firebase.database().ref("/users/" + userId + "/itemCount/itemCount").once('value').then(function(snapshot) 
  {
      itemNum = snapshot.val();
  });
  firebase.database().ref("/users/" + userId + '/shoppingList/' + food + "/foodCount").once('value').then(function(snapshot) {
      
          foodNum = snapshot.val();
          console.log(foodNum);
     
          if(foodNum==1){
            itemNum = itemNum - 1
          };
      
      foodNum = foodNum - 1;
      updateFood(foodNum, itemNum, userId, food);
  });
}

function removeAllFood(food){
  var user = firebase.auth().currentUser;
  let itemNum = 0;
  let foodNum = 0;
  var userId = user.uid;
  firebase.database().ref("/users/" + userId + "/itemCount/itemCount").once('value').then(function(snapshot) 
  {
      itemNum = snapshot.val();
  });
  updateFood(0,itemNum-1, userId,food)
}
function updateFood(foodNum, itemNum, userId, food)
{   
    console.log(foodNum)
    if(foodNum<=0)
    {
      firebase.database().ref("/users/" + userId + "/shoppingList/" + food).remove()
      console.log("hi");
      
    }
    else{
      firebase.database().ref("/users/" + userId + "/shoppingList/" + food).set({
        foodCount: foodNum
    });
    firebase.database().ref("/users/" + userId + "/itemCount").set({
        itemCount: itemNum
    });
    }
    console.log("asd");
    updateFoodCards();
}
// function addFood(food) {
//   var user = firebase.auth().currentUser;
//   let itemNum = 0;
//   let foodNum = 1;
//   var userid = user.uid;

//   firebase.database().ref('users/' + userid + '/itemCount').once('value').then(function(snapshot) {
//     itemNum = snapshot.val()+1;
//     firebase.database().ref('users/' + userid).set({
//       itemCount: itemNum
//     });
//   });
  
  
//   firebase.database().ref('users/' + userid + "/shoppingList/" + food + "/foodCount").once('value').then(function(snapshot) {
//     foodNum = snapshot.val()+1;
//     var updates = {};
//     updates['users/' + userid + "/shoppingList/" + food + "/foodCount"] = foodNum;
//     firebase.database().ref().update(
//       updates
//     );
//   });
 
 
// }


// // let foodCount = firebase.database().ref('users/' + userid + "/shoppingList/" + food + "/foodCount");
//   // foodCount.on('value', function(snapshot) {
//   //   if(snapshot.val()!=null){
//   //     foodNum = snapshot.val()+1;
      
//   //   }
   
    
//   //   // firebase.database().ref('users/' + userid + "/shoppingList/" + food).set({
//   //   // foodCount: foodNum
//   //   // });
//   // });

//    // firebase.database().ref('users/' + userid + "/shoppingList/" + food).set({
//   //   foodCount: foodNum
//   // });