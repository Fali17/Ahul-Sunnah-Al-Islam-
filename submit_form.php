<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Your SMTP host
    $mail->SMTPAuth   = true;
    $mail->Username   = 'falisznalt@gmail.com'; // Your email
    $mail->Password   = 'Fast2slow';       // Your email password or app password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('youremail@gmail.com', 'Your Name');
    $mail->addAddress('recipient@example.com'); // Recipient email

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Contact Form Submission';
    $mail->Body    = "Name: {$_POST['name']}<br>Email: {$_POST['email']}<br>Message: {$_POST['message']}";

    $mail->send();
    echo "Message has been sent successfully!";
} catch (Exception $e) {
    echo "Mailer Error: {$mail->ErrorInfo}";
}
?>