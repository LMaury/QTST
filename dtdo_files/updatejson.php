
<?php 
$NewDatas = $_POST['jsondata'];
$OBJList = json_decode($NewDatas);

//print_r($OBJList);

$RefFile ="./structure.json";
// Ecriture dans le fichier 
$buffer= fopen($RefFile,"w");
fwrite($buffer,json_encode( $OBJList));
fclose($buffer);

$response['result']= "success";
$response['newdata']= json_encode( $OBJList);
echo json_encode( $response);

?>
