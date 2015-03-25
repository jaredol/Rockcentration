/* ------ BOARD SETUP ------------ */


var firstChoice;
var secondChoice;

MAXCARDS = 20;
//var options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var options = ["0", "1", "2"];


var shuffledArray = [];
var shuffledArrayDuplicate;
var joinedArray;
var pairsMatched = 0;


for(i = 0; i < MAXCARDS; i++) {
    var rdmIdx = Math.floor(Math.random() * options.length)
    shuffledArray.push(options[rdmIdx]);
}
//console.log(shuffledArray);

// create a copy of shuffled array.
shuffledArrayDuplicate = shuffledArray;

// join the two shuffled arrays
joinedArray = shuffledArray.concat(shuffledArrayDuplicate);

//populate wrapper with shuffled araay
for(var i = 0; i < joinedArray.length; i++) {
    // also add relevant hook to parent <div>
    $('#tilesWrap').append('<div class="tile ' + joinedArray[i] + '"><div class="tile-cover"></div><img src="' + joinedArray[i] + '.jpg"></div>');
}



/* ------ TILE SELECTION ------------ */


function selectTiles(){
    if(firstChoice == undefined && secondChoice == undefined){
        // Grab class of clicked tile
        var tileClass = this.className;
        // Set First Choice to the classname
        firstChoice = tileClass;
        $(this).find('.tile-cover').fadeToggle( 100, "linear" ).addClass('choice1');
        console.log("first choice is " + firstChoice);

    } else if (firstChoice !== undefined && secondChoice == undefined){
        var tileClass = this.className;
        // Set second Choice to the classname
        secondChoice = tileClass;
        console.log("second choice is " + secondChoice);
        $(this).find('.tile-cover').fadeToggle( 100, "linear" ).addClass('choice2');

        // CORRECT SELECTION:
        if(firstChoice == secondChoice ){
            console.log("match!");
                // remove ability to click
                $('.choice1').unbind( "click" );
                $('.choice2').unbind( "click" );
                // Reset choices
                firstChoice = undefined;
                secondChoice = undefined;
                pairsMatched++;
                $('#pairsMatched').html(pairsMatched);


        // INCORRECT SELECTION:
        } else {
            console.log("no match!");
            closeLastSelection();
            $('.tile-cover').removeClass('.choice1');
            $('.tile-cover').removeClass('.choice2');
        }

    }
    // else if ( firstChoice !== undefined && secondChoice !== undefined ) {
    //     console.log("stop!");
    // }
}


function closeLastSelection(){
    console.log("closing your last selection");
    $('.choice1.tile-cover').delay(700).fadeToggle( 100, "linear" );
    $('.choice2.tile-cover').delay(600).fadeToggle( 100, "linear");
    // Reset choices
    firstChoice = undefined;
    secondChoice = undefined;

}




// function to check if firstChoice and secondChoice are equal
function isEqual(){

    if(firstChoice == secondChoice ){
        console.log("match!");
    }
}


$('.tile').on('click', selectTiles);




