<?php
if(!empty($_POST["send"])) {
    $name = "lasse";
    $email = $_POST["email"];
    $subject = "Trying";
    $content = $_POST["message"];

    $toEmail = "lasse.bjoern@hotmail.dk";
    $mailHeaders = "From lasse";

    if(mail($toEmail, $subject, $content, $mailHeaders)) {
        $message = "it worked";
        $type = "success";
    }
}
