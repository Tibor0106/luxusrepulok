<?php

$servername = "localhost";
$username = "luxusrepulok";
$password = "lxMjfYHYkRhvmoB";
$dbname = "luxusrepulok";

// Adatbázis kapcsolat létrehozása
$conn = new mysqli($servername, $username, $password, $dbname);

// Kapcsolat ellenőrzése
if ($conn->connect_error) {
    die("Hiba a kapcsolódás során: " . $conn->connect_error);
}


// database: lxMjfYHYkRhvmoB

//ftp: DG8NheAeVm3Ve7T