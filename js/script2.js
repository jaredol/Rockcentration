/* ------ BOARD SETUP ------------ */


var firstChoice;
var secondChoice;

MAXCARDS = 32;
MAXCARDS = 18;
MAXCARDS = 6;
var options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "15", "16", "17", "18", "19", "20"];


var shuffledArray = [];
var shuffledArrayDuplicate;
var joinedArray;

var pairsMatched = 0;
var pairsAttempted = 0;


function newBoard(){

    resetDefaults(); // sets attempts and matches back to Zero

     $('#tilesWrap').empty(); // empty out exisiting tiles
    

    for(i = 0; i < MAXCARDS / 2; i++) {
        var rdmIdx   = Math.floor(Math.random() * options.length)
        shuffledArray.push(options[rdmIdx]);
    }

    // create a copy of shuffled array.
    shuffledArrayDuplicate = shuffledArray;

    // join the two shuffled arrays
    joinedArray = shuffledArray.concat(shuffledArrayDuplicate);

    //populate wrapper with shuffled araay
    for(var i = 0; i < joinedArray.length; i++) {
        // also add relevant hook to parent <div>
        $('#tilesWrap').append('<div class="tile ' + joinedArray[i] + '"><img class="back" src="images/' + joinedArray[i] + '.jpg"><div class="front"></div></div>');

    }


}

newBoard();


/* ------ TILE SELECTION ------------ */


function selectTiles(){
    console.log("selectiles");
    var totalPairs = joinedArray.length / 2;
        // Making first choice
    if(firstChoice == undefined && secondChoice == undefined){
        //debugger
        // Grab class of clicked tile
        var tileClass = this.className;

        // Set First Choice to the classname
        firstChoice = tileClass;
        $(this).addClass('choice1 flipping');

        console.log("first choice is " + firstChoice);
        // Making second choice
    } else if (firstChoice !== undefined && secondChoice == undefined){
        var tileClass = this.className;
        // Set second Choice to the classname
        secondChoice = tileClass;
        console.log("second choice is " + secondChoice);
        // we need to disble further clicks on other elements here:
        //$('.tile').addClass('disableClicks');
        $(this).addClass('choice2 flipping');
        

        // CORRECT SELECTION:
        if(firstChoice == secondChoice ){
            console.log("correct");
            
            $('.choice1').addClass('matched');
            $('.choice2').addClass('matched');

            $('.tile.choice1').removeClass('choice1');
            $('.tile.choice2').removeClass('choice2');


            // Reset choices
            firstChoice = undefined;
            secondChoice = undefined;
            pairsMatched++;
            pairsAttempted++
            $('#pairsMatched').html(pairsMatched);
            $('#pairsAttempted').html(pairsAttempted);

            if(totalPairs == pairsMatched) {
                $('#gameOverMsg').fadeIn().html("YOU DID IT!!  Congratualtions, you it took you " + pairsAttempted + " attempts. See if you can beat it next time");
            }


        // INCORRECT SELECTION:
        } else {
            console.log("no match!");
            $(this).addClass('flipping').delay(700)


            setTimeout(function() { 
                closeLastSelection(); 
            }, 1000);

            //debugger
            
         

            pairsAttempted++
            $('#pairsAttempted').html(pairsAttempted);
            $('.tile.choice1').removeClass('choice1');
            $('.tile.choice2').removeClass('choice2');
            
            // attempts = attempts + 1;
            // $('#pairsAttempted').html(attempts);
        }

        

    }

}


$('#tilesWrap').on('click', '.tile', selectTiles);

function resetDefaults(){
    console.log("reset deefs");
    shuffledArray = [];
    shuffledArrayDuplicate;
    joinedArray;
    var pairsMatched = 0;
    var pairsAttempted = 0;
    $('#pairsMatched').html(pairsMatched);
    $('#pairsAttempted').html(pairsAttempted);
}


//newBoard();

function closeLastSelection(){
    console.log("closing your last selection");
    $('.tile:not(.matched)').delay(2000).removeClass('flipping');
    //$('.tile').delay(600).fadeToggle( 100, "linear");
    // Reset choices
    firstChoice = undefined;
    secondChoice = undefined;

    // $('.tile.choice1').removeClass('.choice1');
    // $('.tile.choice2').removeClass('.choice2');

}

//$('#resetGame').on('click', resetGame);
$('#resetGame').on('click', newBoard);


 // FLIPPING

$('.tile').on('click', function(){
  //selectTiles();
    //$(this).toggleClass('flipping');
    //$(this).addClass('choice1');

});




// function resetGame(){
//     $('#tilesWrap').empty();
//     newBoard();
// }


// $('button').on('click', function(){
//     newBoard();
//     $('.tile').on('click', selectTiles);
// })







