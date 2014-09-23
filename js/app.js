$(document).ready(function() {

	function Constellation(name,subname,stars,connections,guessed) {
		this.name = name;
		this.subname = subname;
		this.stars = stars;
		this.connections = connections;
	}

	var ursaMajor = new Constellation("Ursa Major", "(Big Dipper)", "images/stars/ursa_major_stars.png", "images/connections/ursa_major_connections.png", "");
	var perseus = new Constellation("Perseus", "", "images/stars/perseus_stars.png", "images/connections/perseus_connections.png", "");
	var orion = new Constellation("Orion", "", "images/stars/orion_stars.png", "images/connections/orion_connections.png", "");
	var hercules = new Constellation("Hercules", "", "images/stars/hercules_stars.png", "images/connections/hercules_connections.png", "");
	var cygnus = new Constellation("Cygnus", "(The Swan)", "images/stars/cygnus_stars.png", "images/connections/cygnus_connections.png", "");
	var cassiopea = new Constellation("Cassiopea", "", "images/stars/cassiopea_stars.png", "images/connections/cassiopea_connections.png", "");
	var pegasus = new Constellation("Pegasus", "", "images/stars/pegasus_stars.png", "images/connections/pegasus_connections.png", "");

	var rights = [];
	var wrongs = [];

	var constellationsSet = [
		ursaMajor,
		perseus,
		orion,
		hercules,
		cygnus,
		cassiopea,
		pegasus
	];

	var index = 0;

	var falseChoices = [];
	function generateRandomFalseChoices() {
		var iRandom = Math.floor((Math.random() * 6) +1);
		switch(true) {
			case iRandom === index && index !== 1:
				console.log('index: '+ index +' iRandom: '+ iRandom + 'iRandom === 1 && index === 1');
				falseChoices[0] = constellationsSet[index - 1].name;
				falseChoices[1] = constellationsSet[index - 2].name;
				break;
			case iRandom === 1 && index === 1:
				console.log('index: '+ index +' iRandom: '+ iRandom + 'iRandom === 1 && index === 1');
				falseChoices[0] = constellationsSet[0].name;
				falseChoices[1] = constellationsSet[3].name;
				break;
			case iRandom - 1 === index && iRandom !== 2:
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom - 1 === index');
				falseChoices[0] = constellationsSet[iRandom].name;
				falseChoices[1] = constellationsSet[(Math.abs(index * 2 - iRandom - 1))].name;
				break;
			case index === 1 && iRandom === 2:
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom - 1 === index');
				falseChoices[0] = constellationsSet[iRandom].name;
				falseChoices[1] = constellationsSet[(Math.abs(index * 3 - iRandom - 1))].name;
				break;
			case iRandom - index === index || index - iRandom === iRandom:
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom - index === index || index - iRandom === iRandom');
				falseChoices[0] = constellationsSet[(Math.abs(iRandom - this.length - 1))].name;
				falseChoices[1] = constellationsSet[iRandom].name;
				break;
			case iRandom !== index && index !== 0 && iRandom !== (index * 2):
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom !== index && index !== 0 && iRandom !== (index * 2)');
				falseChoices[0] = constellationsSet[iRandom].name;
				falseChoices[1] = constellationsSet[(Math.abs(iRandom - index))].name;
				break;
			case iRandom !== 1 && index === 0:
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom !== 1 && index === 0');
				falseChoices[0] = constellationsSet[iRandom].name;
				falseChoices[1] = constellationsSet[(Math.abs(iRandom - 1))].name;
				break;
			case iRandom === 1 && index === 0:
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom === 1 && index === 0');
				falseChoices[0] = constellationsSet[iRandom].name;
				falseChoices[1] = constellationsSet[2].name;
				break;
			case iRandom === (index * 2) && (iRandom / index) !== 2 && iRandom - index !== index && index - iRandom !== iRandom:
				console.log('index: '+ index +' iRandom: '+ iRandom +'iRandom === (index * 2) && (iRandom / index) !== 2 && iRandom - index !== index && index - iRandom !== iRandom');
				falseChoices[0] = constellationsSet[iRandom].name;
				falseChoices[1] = constellationsSet[(Math.abs(iRandom - 1))].name;
				break;
			default:
				console.log('index: '+ index +' iRandom: '+ iRandom);
				break; 
		}
	}

	var randomChoicePosition1;
	var randomChoicePosition2;
	var randomChoicePosition3;
	function generateRandomChoicePosition() {
		var iRandom2 = Math.floor((Math.random() * 3) +1);
		switch(iRandom2) {
			case 1:
				randomChoicePosition1 = iRandom2;
				randomChoicePosition2 = 2;
				randomChoicePosition3 = 3;
				break;
			case 2:
				randomChoicePosition1 = iRandom2;
				randomChoicePosition2 = 3;
				randomChoicePosition3 = 1;
				break;
			case 3:
				randomChoicePosition1 = iRandom2;
				randomChoicePosition2 = 1;
				randomChoicePosition3 = 2;
				break;
			default:
				randomChoicePosition1 = 1;
				randomChoicePosition2 = 2;
				randomChoicePosition3 = 3;
				break;
		}
	}

	generateRandomChoicePosition();
	generateRandomFalseChoices();

	$('.nextSet').on('click', function() {
		$('input[name="choices"]:checked').removeAttr('checked');
		if (index === constellationsSet.length) {
			index = 0;
			$('#right_or_wrong_dot').hide();
			$('.right_or_wrong_dot_circle').hide();
			$('#right_wrong li:first').text('');
			$('.stars').css("background", "");
			$('.connections').css("background", "");
			$('.info').text('');
			$('.choices').text('');
			$('.tryAgain').text('try again');
			$('.start_and_feedback').show();
			$('.right_or_wrong_dot_circle').hide();
			$('.right_or_wrong_dot').hide();
			for (each in rights) {
				$('.right').append('<div></div>');
			}
			for (each in wrongs) {
				$('.wrong').append('<div></div>');
			}

			// adhoc new quiz functionality... next step: bring everything back to 0 to start anew
			if ($('.tryAgain').text() === 'try again') {
				$(this).on('click', function() {
					location.reload(true);
				});
			}
		} else {
			index++;
			generateRandomFalseChoices();
			generateRandomChoicePosition();
			$('.stars').css("background", "url('"+ constellationsSet[index].stars +"')");
			$('.connections').css({'background': '', 'opacity': '0', 'width': '0px', 'height': '0px'});
			$('#right_wrong li:first').text('');
			$('.start_and_feedback').hide();
			$('.info').hide().css({'font-size': '0px', 'opacity': '0'});;
			$('.choices').show();
			$('#choices_and_info li:nth-child('+ randomChoicePosition1 +') input').attr("value", constellationsSet[index].name);
			$('#choices_and_info li:nth-child('+ randomChoicePosition1 +') span').text(constellationsSet[index].name);
			$('#choices_and_info li:nth-child('+ randomChoicePosition2 +') input').attr("value", falseChoices[0]);
			$('#choices_and_info li:nth-child('+ randomChoicePosition2 +') span').text(falseChoices[0]);
			$('#choices_and_info li:nth-child('+ randomChoicePosition3 +') input').attr("value", falseChoices[1]);
			$('#choices_and_info li:nth-child('+ randomChoicePosition3 +') span').text(falseChoices[1]);
		}
	});

	// load stars & choices
	$('.stars').css("background", "url('"+ constellationsSet[index].stars +"')");
	$('#choices_and_info li:nth-child('+ randomChoicePosition1 +') input').attr("value", constellationsSet[index].name);
	$('#choices_and_info li:nth-child('+ randomChoicePosition1 +') span').text(constellationsSet[index].name);
	$('#choices_and_info li:nth-child('+ randomChoicePosition2 +') input').attr("value", falseChoices[0]);
	$('#choices_and_info li:nth-child('+ randomChoicePosition2 +') span').text(falseChoices[0]);
	$('#choices_and_info li:nth-child('+ randomChoicePosition3 +') input').attr("value", falseChoices[1]);
	$('#choices_and_info li:nth-child('+ randomChoicePosition3 +') span').text(falseChoices[1]);


	var guessed = $('input[name="choices"]:checked').val();
	$('input[name="choices"]').on('click', function() {
		$('.connections').css("background", "url('"+ constellationsSet[index].connections +"')").animate({'opacity': '1', 'width': '500px', 'height': '500px'}, 'slow');
		if ($('input[name="choices"]:checked').val() === constellationsSet[index].name) {
			// add 1 to rights array if answer was right
			rights.push(1);
			constellationsSet[index].guessed = 'right';
			console.log(constellationsSet[index].guessed);
			$('#right_wrong li:first').text('right!');
			// display green dot 
			$('#right_or_wrong_dot').css('background-color', 'rgb(70, 251, 173)');
		} else if ($('input[name="choices"]:checked').val() !== constellationsSet[index].name) {
			// add 1 to wrongs array if answer was right
			wrongs.push(1);
			$('#right_wrong li:first').text('wrong!');
			// display red dot 
			$('#right_or_wrong_dot').css('background-color', 'rgb(253, 83, 147)');
		}
		$('.name').text(constellationsSet[index].name);
		$('.subname').text(constellationsSet[index].subname);
		$('.choices').hide();
		$('.info').show();
		$('.info').animate({'font-size': '20px', 'opacity': '1'}, 'slow');
		$('.start_and_feedback').show();
		if (index === (constellationsSet.length - 1)) {
			index++;
			$('.nextSet').text('summary');
			$('.summary').on('click', function() {
				$('#view_msg').text('choose a constellation below');
				for (var i = 0; i < constellationsSet.length; i++) {
					$('#constellationsList').append('<li class="constellationsListItems '+ constellationsSet[i].guessed +'" value="'+ i +'">'+ constellationsSet[i].name +'</li>');
				}
			});
			// NEXT:: add whether it was guessed right or wrong to the object, and display the color (red or green) along with the image of the stars
			var finder;
			$('#constellationsList').on('click', '.constellationsListItems', function() {
				finder = $(this).val();
				if ($(this).val() === finder) {
					if ($(this).text() === constellationsSet[finder].name && constellationsSet[finder].guessed === 'right') {
						console.log('this was right');
						$('.constellationsListItems').removeClass('red');
						$('.constellationsListItems').removeClass('green');
						$(this).addClass('green');
					} else {
						console.log('this was wrong');
						$('.constellationsListItems').removeClass('red');
						$('.constellationsListItems').removeClass('green');
						$(this).addClass('red');
					}
				}
				$('.stars').css("background", "");
				$('.stars').css("background", "url('"+ constellationsSet[finder].stars +"')");
			});
		}
	});
	
	

});
