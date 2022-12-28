<?php

function connection()
{
    try{
        $pdo = new PDO("mysql:host=localhost;dbname=db_quiz", "root", "");
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch(PDOException $e){
        die("ERROR: Could not connect. " . $e->getMessage());
    }
}