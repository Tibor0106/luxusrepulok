const searchParams = new URLSearchParams(window.location.search);

var from = searchParams.get("from");

var where = searchParams.get("where");

var startDate = searchParams.get("fromdate");

var arrivalDate = searchParams.get("arrivaldate");



function search() {
    $.ajax({
        type: "POST",
        url: "http://jegyek.luxusrepulok.nhely.hu/api/getoffer.php",
        data: {
            from: this.from,
            where: this.where,
        },
        success: function (data) {
            $("#results").empty();
            try {

                data.forEach(i => {
                    $.ajax({
                        type: "POST",
                        url: "http://jegyek.luxusrepulok.nhely.hu/api/getAirports.php",
                        data: {
                            id: i.fromId,
                        },
                        success: function (datafrom) {
                            const start = new Date(i.startDate);
                            const date = new Date(startDate);

                            if (start.getFullYear() != date.getFullYear() ||
                                start.getMonth() != date.getMonth() ||
                                start.getDate() != date.getDate()) {
                                $("#results").append("Nincs találat!");
                                return;
                            }
                            $.ajax({
                                type: "POST",
                                url: "http://jegyek.luxusrepulok.nhely.hu/api/getAirports.php",
                                data: {
                                    id: i.whereId,
                                },
                                success: function (data) {

                                    $("#results").append(getCard(datafrom[0].name, data[0].name, i.startDate, i.arrivalDate));
                                }
                            });
                        }
                    });
                });
            } catch (err) {
                console.log(data);
            }
        },
    });
}
search();
function getCard(from, where, start, arrival) {
    var card = `
                <div class="flight-card mb-3">
                    <div class="row">
                        <div class="col-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor"
                                class="bi bi-airplane-engines" viewBox="0 0 16 16">
                                <path
                                    d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z" />
                            </svg>
                        </div>
                        <div class="mt-3 col-sm-2 ">
                            <label for=""> HONNAN:</label>
                            <p class="ms-3" style="font-family:monospace;">${from}</p>
                        </div>
                        <div class="mt-3 col-sm-2">
                            <label for=""> HOVA:</label>
                            <p class="ms-3" style="font-family:monospace;">${where}</p>
                        </div>
                        <div class="mt-3 col-sm-2">
                            <label for=""> INDULÁS:</label>
                            <p class="ms-3" style="font-family:monospace;">${formatDate(start)}</p>
                        </div>
                        <div class="mt-3 col-sm-2">
                            <label for=""> ÉRKEZÉS:</label>
                            <p class="ms-3" style="font-family:monospace;">${formatDate(arrival)}</p>
                        </div>
                        <div class="col-sm-2 ms-3" style="margin-top: 35px;">
                            <button class="btn btn-primary">Foglalás</button>
                        </div>
                    </div>
                </div>
            `;

    return card;
}


function formatDate(date) {

    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}