


				/////// STATE OF PROJETC  :::: FUNCTIONS  //////////////////////////////////////////////////////////
				
				// °° GENERAL FUNCTIONS 

				function init() { 
						
      					getdata().then((data) => {
	      					 AllLinesofProject = data;
	      					 var DOM = pagedata.renderTask(AllLinesofProject, StateCollection);
	      					 pagedata.refresh(true);
	      					 //console.log(DOM);
	      					 document.getElementById("renderedcontent").innerHTML = DOM;
      					});
      					document.getElementById("message").innerHTML = "";
      					document.getElementById("message").classList.add("hide");

      				}


	 			function changestate(thiselement, step) {
					// get input hidden id 
					var selfuuid = Number(thiselement.parent().parent().find('input').val());
					
					// target group 
					// Get all (1) span of group -- get data-id value
					var selfstateid = Number(thiselement.parent().find("span")[0].dataset.id);
					

					// Get target element-object of collection 
					var target = AllLinesofProject.filter(element => { return element.id == selfuuid })[0]; ;
					const SameID = (element) => element.id == target.id ;
					// get the rank in array 
					var targetrank = AllLinesofProject.findIndex(SameID); ;
					// add a step 
					newid = selfstateid +step;
					// set new stateid 
					target.stateid = newid;
					console.log("new obj > ");
					console.log(target.stateid);
					AllLinesofProject[targetrank].stateid=newid;
					pagedata.refresh(false);

				}


				function modify(element) {
					$('body').toggleClass("changelocked");
					$(element).toggleClass("active");
				}

			

			// °° ASYNC FUNCTIONS 

				async function getdef() {
					return new Promise(function(resolve,reject){
							$.ajax({
							       type: "GET",
							       url: "./dtdo_files/states.json",
							       datatype:"json",
							       success: function(data) {                  	
							           	//JSondata = JSON.parse(data);
							           	console.log("states .............. OK");
							           	resolve(data);
							       		}
							   		});   		
							});	
				}
				

				async function getdata() {
					return new Promise(function(resolve,reject){
							$.ajax({
							       type: "GET",
							       url: "./dtdo_files/structure.json",
							       datatype:"json",
							       success: function(data) {                  	
							           	//JSondata = JSON.parse(data);
							           	console.log("data .............. OK");
							           	resolve(data);
							       		}
							   		});   		
							});	
				}




				function writeJSon(objfile) {

							$.ajax({
								type: "POST",
								url: "./dtdo_files/updatejson.php",
								dataType: "json",
								data: { "jsondata":JSON.stringify(objfile),"jsondate":"null"},
								success: function(data) {
									console.log("json updated....");
							}
						});
						}


				// °° CLOSURE  FUNCTIONS 
					
				// All method for DOM in a object 

				class DOMdata {

				 renderTask(TaskCollection, StatesCollection) {
					// parent_container // 
					var aclassname = "Topfade";
					var TEMPLATE = "<li class='LOP %ACLASS%' style='border-left:4px solid %MARKER%'><input id='projectuuid' type='hidden' value=%ID%>";
					// title // 
					TEMPLATE = TEMPLATE +	"<h3 class='LOP-title'>%TITLE%</h3>  <span class='LOP-desc'> %DESC% </span> " ;
					// Badge // 
					TEMPLATE = TEMPLATE + "<span class='LOP-state'> <button onclick='changestate($(this),-1)' class='controls'>&nbsp;<&nbsp;</button> <span data-id=%STATEID% class='badge ' style='border:1px solid %THEME%; color:%THEMETEXT%'>%STATENAME%</span> <button onclick='changestate($(this),+1)' class='controls'>&nbsp;>&nbsp;</buton></span>";
					// UDPATE 
					TEMPLATE = TEMPLATE + "<button type='button' class='edit  controls' onclick='pagemodel.Edit($(this))' ><span aria-hidden='true'> ... </span></button>";
					// Close // 
					TEMPLATE = TEMPLATE + "<button type='button' class='close fl-r controls' onclick='pagemodel.Delete($(this))' aria-label='Close'><span aria-hidden='true'>&times;</span></button>	</li>";
					var html ="";
					console.log("RENDERtask");
					console.log(TaskCollection);
					TaskCollection.forEach((element,idx) => {
						
						aclassname = ((idx % 2) == 0)?"Topfade-dl":"Topfade";	
						console.log("Label rank : "+element.stateid);
						console.log(StateCollection[element.stateid]);
						html = html + TEMPLATE
							.replace("%ACLASS%", aclassname)
							.replace("%ID%", element.id)
							.replace("%TITLE%", element.title)
							.replace("%DESC%", element.desc)
							.replace("%STATEID%", element.stateid)
							.replace("%STATENAME%", StateCollection[element.stateid] != undefined ? StateCollection[element.stateid].label:StateCollection[element.stateid-StateCollection.length].label)
							.replace("%THEME%",StateCollection[element.stateid] != undefined ? StateCollection[element.stateid].theme:StateCollection[element.stateid-(StateCollection.length)].theme)
							.replace("%THEMETEXT%",StateCollection[element.stateid] != undefined ? StateCollection[element.stateid].theme:StateCollection[element.stateid-(StateCollection.length)].theme)
							.replace("%MARKER%",StateCollection[element.stateid] != undefined ? StateCollection[element.stateid].theme:StateCollection[element.stateid-(StateCollection.length)].theme);
					} );
					document.getElementById("renderedcontent").innerHTML = html;
					return html;
				}
			

				 refresh(simple_refresh) {					
					// DOM refresh  statements
					console.log("Init refresh");
					this.renderTask(AllLinesofProject);

					/// Write statement
					if (!(simple_refresh)) {
						writeJSon(AllLinesofProject);
						console.log("Write-refresh");
					}
				}

				 IDfilter(elt, idtofind) {
					return elt.id == idtofind;
				}
				

		}



   class Elementmanager  {


   GetFieldsInfo() {
		var Modaldata = {};
		Modaldata.pname = document.getElementById("projectname").value;
		Modaldata.pdesc = document.getElementById("projectdesc").value;
		Modaldata.puuid = document.getElementById("projectuuid").value;
		return Modaldata;
	}

   SetFieldsInfo(Infos) {
			document.getElementById("projectname").value = Infos.title;
		 	document.getElementById("projectdesc").value = Infos.desc;
		 	document.getElementById("projectuuid").value = Infos.id;
		}

	EditingMode(ChangeExsitingElement) {
		$("#updatebtn").removeClass("hide");
		$("#newbtn").removeClass("hide");
		console.log("ras");
		if (ChangeExsitingElement) {
			console.log("hide new");
			// MODIFY 
			$("#newbtn").addClass("hide");
			$("#updatebtn").removeClass("hide");
		}else{
			console.log("hide update");
			//CREATE 
			$("#updatebtn").addClass("hide");
			
		}
	}

   	Create() {
   		this.EditingMode(false);
   		var UserFields = this.GetFieldsInfo();
   		var lastrecord = AllLinesofProject[(AllLinesofProject.length-1)] ;
		var lastuuid =lastrecord.id;
		//
		var Newitem =  {"id":lastuuid+1,"title":UserFields.pname,"desc":UserFields.pdesc,"stateid":1} ;
		// Addcard(Newitem);
		AllLinesofProject.push(Newitem);
		$('#ProjetCard').modal('hide');
		// refresh and write 
		pagedata.refresh(false);
   	}

	Delete(targetelement) {
		var projectid = targetelement.parent().parent().find("input")[0].value;
		var projectRank = AllLinesofProject.findIndex(elmt => {return elmt.id == projectid });
		console.log(AllLinesofProject[projectRank]);
		let confirmdelete = confirm('Etes vous sur de supprimer le projet ' + AllLinesofProject[projectRank].title + ' ? ');
		if (confirmdelete) {
			AllLinesofProject.splice(projectRank, 1);
			pagedata.refresh(false);
		}else {
			console.log("do nothing");
		}
		
	}

	Edit(targetelement){
		this.EditingMode(true);
		var projectid = targetelement.parent().parent().find("input")[0].value;
		var injecteddata = AllLinesofProject.find(elmt => {return elmt.id == projectid });
		this.SetFieldsInfo(injecteddata);
		$('#ProjetCard').modal('show');
	}

	Update(targetelement) {
		var UserFields = this.GetFieldsInfo();
		var projectid = UserFields.puuid;
		var projectRank = AllLinesofProject.findIndex(elmt => {return elmt.id == projectid });
		console.log("Update element rank ");
		var currentobj =(AllLinesofProject[projectRank]);
		console.log(currentobj);
		var Uptobj =  {...currentobj,"title":UserFields.pname,"desc":UserFields.pdesc} ;
		console.log(Uptobj);
		AllLinesofProject[projectRank]=Uptobj;
		pagedata.refresh(true);
			$('#ProjetCard').modal('hide');
		
		}

	}

	// Initialize a page DOMmodel 
	var pagedata = new DOMdata();
	var pagemodel = new Elementmanager();

		