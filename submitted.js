var urlParams;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();





function addFood(food) {

    let avg = 0;
    let numppl = 0;
    var store = urlParams.myStore;
    var foods = urlParams.myFood;
    var avail = parseInt(urlParams.Availability, 10);

    firebase.database().ref("/Foods/" + foods + "/Locations/" + store + "/Submissions/AVG").once('value').then(function (snapshot) {
        avg = snapshot.val();
    });
    firebase.database().ref("/Foods/" + foods + "/Locations/" + store + "/Submissions/Numppl").once('value').then(function (snapshot) {
        numppl = snapshot.val();
        console.log(avg + " " + numppl)
        var submit = (avail + (avg * numppl)) / (numppl + 1);
        console.log(submit);
        numppl = numppl + 1;
        if (avail == 0) {
            firebase.database().ref("/Foods/" + foods + "/Locations/" + store + "/Submissions").set({
                AVG: avail,
                Numppl: 1

            });
            firebase.database().ref("/Stores/" + store + "/Foods/" + foods + "/Submissions").set({
                AVG: avail,
                Numppl: 1
            
            });
        
        }

        else {
            firebase.database().ref("/Foods/" + foods + "/Locations/" + store + "/Submissions").set({
                AVG: submit,
                Numppl: numppl

            });
            firebase.database().ref("/Stores/" + store + "/Foods/" + foods + "/Submissions").set({
                AVG: avail,
                Numppl: 1
                
            
            });
        }
    });


}
addFood();
