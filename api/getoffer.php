<?php

require_once "database.php";

if (isset($_POST["from"]) && isset($_POST["where"])) {
    $from = $_POST["from"];
    $where = $_POST["where"];

    $sql = "SELECT * FROM flights 
        INNER JOIN airplanes ON airplanes.id = flights.airplaneId
        WHERE flights.whereId LIKE ? AND flights.fromId LIKE ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ss", $where, $from);

    $stmt->execute();
    $result = $stmt->get_result();

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

?>