<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

$to      = "javier@diamondlux.com.au";
$name    = htmlspecialchars(strip_tags($_POST["name"] ?? ""));
$phone   = htmlspecialchars(strip_tags($_POST["phone"] ?? ""));
$email   = htmlspecialchars(strip_tags($_POST["email"] ?? ""));
$vehicle = htmlspecialchars(strip_tags($_POST["vehicle"] ?? ""));
$service = htmlspecialchars(strip_tags($_POST["service"] ?? ""));
$source  = htmlspecialchars(strip_tags($_POST["source"] ?? ""));
$message = htmlspecialchars(strip_tags($_POST["message"] ?? ""));

if (empty($name) || empty($email) || empty($phone) || empty($vehicle)) {
    header("Location: index.html?status=error");
    exit;
}

$subject = "New Assessment Request — $vehicle";

$body  = "NEW ASSESSMENT REQUEST\n";
$body .= "========================\n\n";
$body .= "Name:    $name\n";
$body .= "Phone:   $phone\n";
$body .= "Email:   $email\n";
$body .= "Vehicle: $vehicle\n";
$body .= "Service: $service\n";
$body .= "Source:  $source\n\n";
$body .= "Notes:\n$message\n";

$headers  = "From: Diamond Lux Website <noreply@diamondlux.com.au>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    header("Location: index.html?status=success");
} else {
    header("Location: index.html?status=error");
}
exit;
?>
