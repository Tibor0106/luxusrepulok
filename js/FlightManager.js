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
    var from = document.getElementById("uploadFrom").value;
    var where = document.getElementById("uploadWhere").value;
    var start = document.getElementById("uploadStart").value;
    var arrival = document.getElementById("uploadArrival").value;
    var price = document.getElementById("uploadPrice").value;
    var airplaneid = document.getElementById("uploadAirplaneId").value;
    const flight = new Flight(from, where, start, arrival, airplaneid, price);
    if (from.length != 0 && where.length != 0 && start.length != 0 && arrival.length != 0) {
        flight.upload();

    } else {
        alert("Missing data");
    }
});

