$(function(){

	var list = `breakfast
builder
citizen
clean
confident
destroy
disease
energy
food
forest
friendly
garlic
hairdresser
headache
increase
music
neighborhood
onion
outgoing
phone
pollution
poverty
promote
Reduce
residential
rubbish
shoulder
smart
Source
teach
teenagers
think
throw
United_Kingdom
violence
waste`;

	var vlist = list.split("\n");
	var lastElm = NaN;
	var p = {
		startCallback : function() {
			$('.start').attr('disabled', 'true');
			$('.listen').attr('disabled', 'true');
		},
		stopCallback : function($stopElm, i) {
			$('.start').removeAttr('disabled');
			$('.listen').removeAttr('disabled');
			lastElm = i;
		},
		speed: 20,
		duration: 2
	}
	function updateImages(){	
		$("div.roulette_container").empty();
		$("div.roulette_container").append($("<div>",{
			class:"roulette",
			style:"display:none;",
		}));
		vlist.forEach(element => $("div.roulette").append($("<img>",{ 
			src: 'audios_11/' + element + '.jpg',
		})));
		$("div.roulette").roulette(p);
	}
	updateImages();
	$('.listen').attr('disabled', 'true');
	
	$('.start').click(function(){
		if(!isNaN(lastElm)){
			vlist.splice(lastElm, 1);
			updateImages();
		}
		p['stopImageNumber'] = Math.floor(Math.random() * vlist.length);
		$("div.roulette").roulette('option', p);
		$("div.roulette").roulette('start');
	});
	
	$('.listen').click(function(){
		if(!isNaN(lastElm)){
			var audio = new Audio('audios_11/' + vlist[lastElm] + '.mp3');
			audio.play();
		}
	});

});

