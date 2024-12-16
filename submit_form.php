<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Example email handling (update with your email address)
    $to = "falisznalt@gmail.com";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for reaching out! Your message has been sent.";
    } else {
        echo "Sorry, something went wrong. Please try again.";
    }
} else {
    echo "Invalid Request";
}
?>