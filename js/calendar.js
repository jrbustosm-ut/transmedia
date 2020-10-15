var lista_v = ["aji", "ajo", "apio", "arveja",
		"auyama", "berenjena", "brocoli", "calabacin", "cebolla cabezona", "col",
		"gengibre", "maiz", "nabo", "papa", "pepino", "pimenton", "puerro", "rabano",
		"remolacha", "tomate", "zanahoria"];

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function create_product(name, table){
	var row = $("<tr>").css({
		width: "70px",
		height: "70px",
		transform: "scale(1)",
		backgroundColor: "rgb(220, 220, 220)",
			"box-shadow": "0px 2px 6px 0px rgba(0,0,0,0.5)"
	});
	var first_c = $("<td>").text(capitalizeFirstLetter(name)).css({
		textAlign: "center",
		"font-weight": "bold",
		"text-decoration": "underline"
	}).click(function(event){
		$(this).parent("tr").nextAll("tr").slice(0,3).toggle(500);
	}).hover(function(){
		$(this).css("color", "green");	
	}, function(){
		$(this).css("color", "black");	
	});
	row.append(first_c);
	for(var i=1; i<=12; i++) {
		var celda = $("<td>").css({
			textAlign: "center",
			width: "70px",
			height: "70px"
		}).bind("contextmenu",function(e){
				return false;
		});
		var img = $('<img />', { 
			src: "img/" + name.toLowerCase() + ".svg",
			alt: name,
			height: "0px",
			width: "0px"
		}).bind("contextmenu",function(e){
				return false;
		});
		celda.append(img);
		
		celda.mousedown(function(event){
			var img = $(this).find('img');
			var size = Math.floor(img.height() / 15) * 15;
			if(event.which==3) {
    			size -= 15;
				if(size<0) size=45;
			}else{
				size += 15;
				if(size>45) size=0;
			}
        	img.animate({
				width: Math.round(size),
				height: Math.round(size)
			}, 200);
		});
		row.append(celda);
	}
	var controles = $("<td>")
	var next = $("<img />", {
		src: "img/next.svg",
		height: "30px",
		width: "30px",
		class: "control"
	}).css({
		"margin-left" : "10px",
	}).click(function(){
		$(this).parents("tr").find("img").not(".control").trigger( "mousedown" );
	}).hover(function(){
		$(this).attr("src","img/next_hover.svg");	
	}, function(){
		$(this).attr("src","img/next.svg");
	});
	controles.append(next);

	var clear = $("<img />", {
		src: "img/clear.svg",
		height: "30px",
		width: "30px",
		class: "control"
	}).css({
		"margin-left" : "10px",
	}).click(function(){
		$(this).parents("tr").find("img").not(".control").animate({
			width: "0px",
			height: "0px"
		}, 200);
	}).hover(function(){
		$(this).attr("src","img/clear_hover.svg");	
	}, function(){
		$(this).attr("src","img/clear.svg");
	});
	controles.append(clear);

	var remove = $("<img />", {
		src: "img/remove.svg",
		height: "30px",
		width: "30px",
		class: "control"
	}).css({
		"margin-left" : "10px",
	}).click(function(){
		$(this).parents("tr").hide(200);
	}).hover(function(){
		$(this).attr("src","img/remove_hover.svg");	
	}, function(){
		$(this).attr("src","img/remove.svg");
	});
	controles.append(remove);

	row.append(controles);
	table.append(row);

	var labores = ["Siembra", "Cuidado", "Cosecha"];
	for(var i = 0; i < labores.length; ++i){
		var row_s = $("<tr>").css({
			backgroundColor: "rgb(255, 255, 255)",
		});
		var firstTd = $("<td>").text(labores[i]).css({
			textAlign: "center",
		});

		if(i==0) firstTd.css({"padding-top": "20px"});
		if(i==labores.length-1) firstTd.css({"padding-bottom": "20px"});
		row_s.append(firstTd);
		
		for(var j=1; j<=12; ++j) {
			var celda = $("<td>").html("&nbsp;").css({
				textAlign: "center",
			});

			if (Math.floor(Math.random() * 3) <= 1){
				var img = $('<img />', { 
					src: "img/" + labores[i].toLowerCase() + (i!=1?"":"_" + (
						Math.floor(Math.random() * 2) == 0?"0":"1"
						)) + ".svg",
					alt: labores[i].toLowerCase(),
					height: "20px",
					width: "20px"
				});
				celda.append(img);
			}
			
			row_s.hide();
			row_s.append(celda);
		}
		row_s.append($("<td>").html("&nbsp;"));
		table.append(row_s);
	}
}

$(function(){
	var table = $('<table>').css({
		border: "1px solid #DDDDDD",
	}).attr({
		"cellspacing": 0,
		"cellpadding": 0
	});
	table.bind('selectstart', function(event) {
		event.preventDefault();
	});

	var theader = $("<thead>");
	var header = $("<tr>").append($("<th>").html("&nbsp;"));
	header.css({
		backgroundColor: "rgb(0, 0, 0)",
		color: "rgb(220, 220, 220)",
	});
	for(var i=0; i<=11; i++){
		var month = capitalizeFirstLetter(new Date(2000, i, 1).toLocaleString('default', { month: 'long' }));
		header.append($("<th>").text(month.substring(0,3)).css({
			"padding-bottom": "10px",
			"padding-top": "10px"
		}));
	}
	header.append($("<th>").html("&nbsp;"));
	theader.append(header);
	table.append(theader);

	var tbody = $("<tbody>");
	for(var i=0; i<lista_v.length; ++i){
		create_product(lista_v[i], tbody);
	}
	table.append(tbody);

	$("#calendar_main").append(table);

	table.floatThead({
		position: 'fixed'
	});
	
});