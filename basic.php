<?php
$servername = "floptical-relational-database.cxrbiaxhps5f.us-west-2.rds.amazonaws.com";
$username = "Floptical";
$password = "Password1";
$dbname = "flopticalDatabase";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT video_link FROM Videos WHERE id=4";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "link: " . $row["movie"]. "<br>";
    }
} else {
    echo "0 results";
}

mysqli_close($conn);
?>
<html>
 <head>
 <title>Step 1</title>
 </head>
 <body>
</body>
</html>