

var fromElement = document.getElementById("From");
var whereElement = document.getElementById("Where")

var listFrom = document.getElementById("searchFrom");
var listWhere = document.getElementById("searchWhere");
listWhere.value = "test";
listFrom.value = "test"

var fromChoosedValue = "";
var whereChoosedValue = "";
class Search {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    search() {
        console.log(this.type)
        $.ajax({
            type: "POST",
            url: "http://jegyek.luxusrepulok.nhely.hu/api/search.php",
            data: { search: this.value },
            success: function (data) {
                data.forEach(element => {

                    listFrom.innerHTML = `<li><a class="dropdown-item text-warning" href="#" onclick="addFrom('${element.city} (${element.id})', '${element.id}')">${element.city} (${element.id})</a></> `;


                    listWhere.innerHTML = `<li><a class="dropdown-item text-warning" href="#" onclick="addWhere('${element.city} (${element.id})', '${element.id}')">${element.city} (${element.id})</a></> `;


                });
            },
        });
    }
}
$(fromElement).on("input", function () {
    const search = new Search(this.value, "from");
    search.search();
})
$(whereElement).on("input", function () {
    const search = new Search(this.value, "where");
    search.search();
})

function addFrom(a, b) {
    fromElement.value = a;
    fromChoosedValue = b;
}
function addWhere(a, b) {
    whereElement.value = a;
    whereChoosedValue = b;
}
class Flight {
    constructor(from, where, start, arrival, airplaneId, price) {
        this.from = from;
        this.where = where;
        this.start = start;
        this.arrival = arrival;
        this.airplaneId = airplaneId;
        this.price = price;
    }

    upload() {
        $.ajax({
            type: "POST",
            url: "http://jegyek.luxusrepulok.nhely.hu/api/uploadflight.php",
            data: {
                from: this.from,
                where: this.where,
                start: this.start,
                arrival: this.arrival,
                airplaneId: this.airplaneId,
                price: this.price
            },
            success: function (data) {
                alert(data);
            },
        });
    }
}
$("#uploadFlight").click(function () {

    var start = document.getElementById("uploadStart").value;
    var arrival = document.getElementById("uploadArrival").value;
    var price = document.getElementById("uploadPrice").value;
    var airplaneid = document.getElementById("uploadAirplaneId").value;
    const flight = new Flight(fromChoosedValue, whereChoosedValue, start, arrival, airplaneid, price);
    if (fromChoosedValue.length != 0 && whereChoosedValue.length != 0 && start.length != 0 && arrival.length != 0) {
        flight.upload();

    } else {
        alert("Missing data");
    }
});




