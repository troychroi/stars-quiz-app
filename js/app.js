$(document).ready(function() {

	function Constellation(name,subname,stars,connections) {
		this.name = name;
		this.subname = subname;
		this.stars = stars;
		this.connections = connections;
	}

	var ursaMajor = new Constellation("Ursa Major", "(Big Dipper)", "images/stars/ursa_major_stars.png", "images/connections/ursa_major_connections.png");
	var perseus = new Constellation("Perseus", "", "images/stars/perseus_stars.png", "images/connections/perseus_connections.png");
	var pegasus = new Constellation("Pegasus", "", "images/stars/pegasus_stars.png", "images/connections/pegasus_connections.png");
	var orion = new Constellation("Orion", "", "images/stars/orion_stars.png", "images/connections/orion_connections.png");
	var hercules = new Constellation("Hercules", "", "images/stars/hercules_stars.png", "images/connections/hercules_connections.png");
	var cygnus = new Constellation("Cygnus", "(The Swan)", "images/stars/cygnus_stars.png", "images/connections/cygnus_connections.png");
	var cassiopea = new Constellation("Cassiopea", "", "images/stars/cassiopea_stars.png", "images/connections/cassiopea_connections.png");

	var rights = [];
	var wrongs = [];

	var constellationsSet = [
		ursaMajor,
		perseus,
		pegasus,
		orion,
		hercules,
		cygnus,
		cassiopea
	];

	var index = 0;

	$('.nextSet').on('click', function() {
		//choicesRandomize();
		//choicesPositionRandomize();
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
				$('.tryAgain').on('click', function() {
					location.reload(true);
				});
			}
		} else {
			index++;
			$('.stars').css("background", "url('"+ constellationsSet[index].stars +"')");
			$('.connections').css("background", " ");
			$('#right_wrong li:first').text('');
			$('.start_and_feedback').hide();
			$('.info').hide();
			$('.choices').show();
			$('#choices_and_info li').find('input').remove();
			$('#choices_and_info li').text('');
			$('#choices_and_info li:nth-child('+ (index + 1) +')').append('<input type="radio" name="choices" value="'+ constellationsSet[index + 1].name +'">'+ constellationsSet[index + 1].name +'</input>');
			$('#choices_and_info li:nth-child('+ (index + 2) +')').append('<input type="radio" name="choices" value="'+ constellationsSet[index + 2].name +'">'+ constellationsSet[index + 2].name +'</input>');
			$('#choices_and_info li:nth-child('+ index +')').append('<input type="radio" name="choices" value="'+ rightChoice +'">'+ rightChoice +'</input>');
		}
	});

	// USE THESE TO GENERATE RANDOM CHOICES AND TO RANDOMLY POSITION THE RIGHT CHOICE AS WELL
	// var randomChoice1;
	// var randomChoice2;
	 var rightChoice = constellationsSet[index].name;	
	// var randomChoicePosition1;
	// var randomChoicePosition2;
	// var randomChoicePosition3;

	// NEXT::: MAKE AN ARRAY OF 3 RETURNS FROM choicesRandomize AND THEN SHUFFLE IT
	// function choicesRandomize() {
	// 	randomChoice1 = Math.floor((Math.random() * 7) + 1);
	// 	randomChoice2 = Math.floor((Math.random() * 7) + 1);
	// }
	
	// NEXT::: MAKE AN ARRAY OF 3 RETURNS FROM choicesPositionRandomize AND THEN SHUFFLE IT
	// function choicesPositionRandomize() {
	// 	randomChoicePosition1 = Math.floor((Math.random() * 3) +1);
	// 	randomChoicePosition2 = Math.floor((Math.random() * 3) +1);
	// 	randomChoicePosition3 = Math.floor((Math.random() * 3) +1);
	// }

	// load stars 
	$('.stars').css("background", "url('"+ constellationsSet[0].stars +"')");

	// 
	$('input[name="choices"]').on('click', function() {
		$('.connections').css("background", "url('"+ constellationsSet[index].connections +"')").animate({'opacity': '1', 'width': '500px', 'height': '500px'}, 'slow');
		if ($('input[name="choices"]:checked').val() === constellationsSet[index].name) {
			// add 1 to rights array if answer was right
			rights.push(1);
			console.log(index);
			$('#right_wrong li:first').text('right!');
			// display green dot 
			$('#right_or_wrong_dot').css('background-color', 'rgb(70, 251, 173)');
		} else if ($('input[name="choices"]:checked').val() !== constellationsSet[index].name) {
			// add 1 to wrongs array if answer was right
			wrongs.push(1);
			console.log(index);
			$('#right_wrong li:first').text('wrong!');
			// display red dot 
			$('#right_or_wrong_dot').css('background-color', 'rgb(253, 83, 147)');
		}
		$('.choices').hide();
		$('.name').text(constellationsSet[index].name);
		$('.subname').text(constellationsSet[index].subname);
		$('.info').show();
		$('.info').animate({'font-size': '20px', 'opacity': '1'}, 'slow');
		$('.start_and_feedback').show();
		if (index === (constellationsSet.length - 1)) {
			index++;
			$('.nextSet').text('summary');
			console.log(index);
		}
	});

});
