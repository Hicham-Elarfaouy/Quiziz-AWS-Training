<?php
header("Content-Type:application/json");
require_once 'database.php';

try{
    if(isset($_GET['id']) && $_GET['id'] != ''){
        $id = $_GET['id'];

        $sql = "SELECT `right-option-id` FROM `answers` WHERE `question-id` = $id";
        $a_stmt = connection()->prepare($sql);

        $sql = "SELECT `id`, `option` FROM `options` WHERE `question-id` = $id";
        $o_stmt = connection()->prepare($sql);

        $sql = "SELECT * FROM `questions` WHERE id = $id";
        $stmt = connection()->prepare($sql);

        if($stmt->execute() && $a_stmt->execute() && $o_stmt->execute()){
            $obj = (object) $stmt->fetch();

            $options_array = [];
            $answers_array = [];

            while ($option = $o_stmt->fetch()){
                $options_array[] = (object)$option;
            }
            while ($answer = $a_stmt->fetch()){
                $answers_array[] = $answer['right-option-id'];
            }

            $obj->options = $options_array;
            $obj->answers = $answers_array;
            var_dump( $obj);

            // Free result set
            unset($stmt);
        } else{
            echo "No records matching your query were found.";
        }
    }else{
        $sql = "SELECT * FROM `questions`";
        $stmt = connection()->prepare($sql);

        if($stmt->execute()){
            echo json_encode($stmt->fetchAll());
            // Free result set
            unset($stmt);
        } else{
            echo "No records matching your query were found.";
        }
    }
} catch(PDOException $e){
    die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}
