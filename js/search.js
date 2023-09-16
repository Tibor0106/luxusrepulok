
var inputFromList = document.getElementById("searchFrom");

var inputArrivalList = document.getElementById("searchArrival");

var choosedfrom = "";

var choosedarrival = "";

var choosedfrom = 0;





$("#Inputfrom").on("input", function () {
    $(inputFromList).empty();
    $.ajax({
        type: "POST",
        url: "http://jegyek.luxusrepulok.nhely.hu/api/search.php",
        data: { search: this.value },
        success: function (data) {
            console.log(data);
            data.forEach(element => {
                inputFromList.innerHTML = `<li><a class="dropdown-item text-warning" href="#" onclick="addFrom('${element.city} (${element.id})', '${element.id}')"> ${element.city} (${element.id})</a></> `;
            });
        },
    });


})

function addFrom(text, id) {
    $("#Inputfrom").val(text);
    choosedfrom = id;
}
function addArrival(text, id) {
    $("#Inputarrival").val(text);
    choosedarrival = id;
}

$("#Inputarrival").on("input", function () {
    $(inputArrivalList).empty();
    $.ajax({
        type: "POST",
        url: "http://jegyek.luxusrepulok.nhely.hu/api/search.php",
        data: { search: this.value },
        success: function (data) {
            console.log(data);
            data.forEach(element => {
                inputArrivalList.innerHTML = `<li><a class="dropdown-item text-warning" href="#" onclick="addArrival('${element.city} (${element.id})', '${element.id}')">${element.city} (${element.id})</a></> `;
            });
        },
    });




})
$("#search").click(function () {
    const fromDate = $("#fromDate").val();

    if (!fromDate) {
        alert("Kérjük, adja meg mindkét dátumot.");
        return;
    }
    const fromDateObj = new Date(fromDate);
    window.location = `http://jegyek.luxusrepulok.nhely.hu/search/?from=${choosedfrom}&where=${choosedarrival}&fromdate=${fromDateObj}`;
});









