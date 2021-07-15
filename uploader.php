<?php 
$name = $_FILES["file"]["name"];
$file = $_FILES["file"]["tmp_name"];
$error = $_FILES["file"]["error"];
$destination = "./files/$name";

$upload = move_uploaded_file($file, $destination);

if ($upload) {
	$res = [
		"error" => false,
		"status" => http_response_code(200),
		"statusText"=> "Todo nitido con $name",
		"files" => $_FILES["file"]
	];
} else {
	$res = [
		"error" => true,
		"status" => http_response_code(500),
		"statusText"=> "Bobo con $name",
		"files" => $_FILES["file"]
	];
	
}
echo json_encode($res);
 ?>