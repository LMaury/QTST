	<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title> State Of Project </title>

    <!--<script src="../js/jquery.min.js"></script>-->
    <script src="../../../js/jquery-3.2.1.min.js"></script>
    <script src="../../../OKRConsult/includes/popper.min.js"></script>
    <script src="../../../OKRConsult/includes/bootstrap.min.js"></script>
    <script src="./sop_files/sop_functions.js"></script>
    <script src="../../../material/daemonite_mat/js/material.min.js"></script>
    
	<link rel='stylesheet' href="../../../material/daemonite_mat/css/material.min.css" type='text/css' media='all' />
    <link rel='stylesheet' href='.\sop_style.css' type='text/css' media='all' />
    <link rel="shortcut icon" type="image/png" src="/SPRP/php/FA/stateofproject/assets/sop_favicon-32x32.png"/>
    <link rel="icon" type="image/x-icon" href="/SPRP/php/FA/stateofproject/assets/favicon.ico">
    
 
</head>
<body class="changelocked">
	<!-- <a href="https://iconscout.com/icons/shield" target="_blank">Shield Icon</a> by <a href="https://iconscout.com/contributors/minimo" target="_blank">Neelpari Minimo</a> -->
	<div class="title">
			<h1 class="text-center font-weight-bold ta-center"><img width="300" src="./assets/Logo_SOP"> </h1>
			
		</div>
	<div class="wrappercontent">
		<button class="btn btn-float btn-info my-1 fl-r controls" type="button"><i class="material-icons" data-toggle="modal" data-target="#ProjetCard" onclick="pagemodel.EditingMode(false)">+</i></button>
		
		<br>
		<a class="btn-large lock" onclick="modify($(this))" id="mdfy"><img class="icon" src="./assets/lock.png"> Unlock </a>
		<h5 class="text-center text-subtitle ilineless topfading "> Suivi des etats des sites DOPS CORP outillage  </h5>
		
	  
			

	<!-------------------------------- ----> 
<div class="Content_container">

		
		<p>Liste projets en cours :</p>
		<ul id="renderedcontent"></ul> 
		<p id="message"></p>

</div> <!--- END CONTENT CONTAINER -->

	</div> <!-- WraperContent --> 

	<script type="text/javascript">

				//const StateCollection = [];

				var StateCollection = [];
				/// INITIALISATION  ///////////////////
      			document.getElementById("renderedcontent").innerHTML = "<div class='loader'> <img src='../../../kafka2/V3/kafkatop3_files/tiny_loader_dots.gif'> </div> ";
				var AllLinesofProject = [];
				document.getElementById("message").innerHTML = "loading...definition";
				console.log('load');
				var  StateCollection = [];
				var stateready = false;
				
				//// MAIN JS 
      			getdef().then(statesdef =>  { StateCollection = statesdef;stateready=true;init()});

      			///////// DCOCUMENT READY 
      			// 	$(document).ready(function() {
    			// });
			</script>

			<h2> CONTENU GENERE </h2>

			<!--- MODAL ---> 
				<div class="modal fade" id="ProjetCard" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog modal-dialog-centered">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Nouveau projet</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				        <!-- field -->
				        <div class="form-group floating-label form-ripple">
						  <label for="projectname">Nom du projet</label>
						  <input aria-describedby="exampleFloatingLabel1Help" class="form-control" id="projectname" placeholder="Nom pour_ votre projet " type="text">
						  <small id="exampleFloatingLabel1Help" class="form-text">Code</small>
						</div>
						<!-- field END -->
						<!-- field -->
						<br><br>
				        <div class="form-group floating-label form-ripple">
						  <label for="projectdesc">Description </label>
						  <input aria-describedby="exampleFloatingLabel1Help" class="form-control" id="projectdesc" placeholder=" " type="text">
						  <small id="exampleFloatingLabel1Help" class="form-text">Décrivez votre projet </small>

						</div>
						<input  id="projectuuid" placeholder=" " type="hidden">
						<!-- field END -->
				      </div>
				      <p id="validmessage"></p>
				      <div class="modal-footer">
				        <button type="button" id="newbtn" class="btn btn-primary" onclick="pagemodel.Create()">Nouveau projet</button>
				        <button type="button" id="updatebtn" class="btn btn-primary hide" onclick="pagemodel.Update()">Modifier </button>

				      </div>
				    </div>
				  </div>
				</div>
			<!--- MODAL ---> 


		



</body>