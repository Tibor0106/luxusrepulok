<?php

$servername = "localhost";
$username = "luxusrepulok";
$password = "lxMjfYHYkRhvmoB";
$dbname = "luxusrepulok";


$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");


if ($conn->connect_error) {
    die("Hiba a kapcsolódás során: " . $conn->connect_error);
}


// database: lxMjfYHYkRhvmoB

//ftp: DG8NheAeVm3Ve7T