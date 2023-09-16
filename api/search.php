<?php

require_once "database.php";

if (isset($_POST["search"])) {
    $search = $_POST["search"];

    $formattedSearch = '%' . $search . '%';

    $sql = "SELECT * FROM airports WHERE city LIKE ? OR country LIKE ? or id LIKE ?";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("sss", $formattedSearch, $formattedSearch, $search);

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
if (isset($_POST["id"])) {
    $search = $_POST["id"];

    $formattedSearch = '%' . $search . '%';

    $sql = "SELECT * FROM airports WHERE id LIKE ?";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("s", $formattedSearch);

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