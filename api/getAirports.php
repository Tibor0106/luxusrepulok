<?php
require_once "database.php";

if (isset($_POST["id"])) {
    $id = $_POST["id"];
    $sql = "SELECT * FROM airports WHERE id LIKE '$id'";
    $stmt = $conn->prepare($sql);

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