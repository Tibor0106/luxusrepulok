<?php
require_once "database.php";


$from = $_POST["from"];
$where = $_POST["where"];
$startDate = $_POST["start"];
$arrivalDate = $_POST["arrival"];
$airplaneId = $_POST["airplaneId"];
$price = $_POST["price"];



$sql = "INSERT INTO flights (fromId, whereId, startDate, arrivalDate, airplaneId, price)
            VALUES ('$from', '$where', '$startDate', '$arrivalDate', '$airplaneId', '$price')";

if ($conn->query($sql) === TRUE) {
    echo "Sikeres rögzítés";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>