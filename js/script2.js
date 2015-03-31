/* ------ BOARD SETUP ------------ */


var firstChoice;
var secondChoice;

MAXCARDS = 18;
var options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];



//var shuffledArray = _.shuffle(options)
var shuffledArrayDuplicate;
var joinedArray;

var pairsMatched = 0;
var pairsAttempted = 0;


function newBoard(){

    //create random array
    var shuffledArray = _.shuffle(options)
    shuffledArray = shuffledArray.splice(0, 9)  // reduce the size down to 18 items

    resetDefaults(); // sets attempts and matches back to Zero

     $('#tilesWrap').empty(); // empty out exisiting tiles

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
                setTimeout(function() { 
                    $('#gameOverMsg').fadeIn().html("<h2>YOU DID IT!!</h2>  Congratulations, it took you <span>" + pairsAttempted + "</span> attempts. See if you can beat it next time");
                    $('.btnWrap').slideDown();
                }, 800);

            }


        // INCORRECT SELECTION:
        } else {
            console.log("no match!");
            $(this).addClass('flipping').delay(700)


            setTimeout(function() { 
                closeLastSelection(); 
            }, 1000);

            pairsAttempted++
            $('#pairsAttempted').html(pairsAttempted);
            $('.tile.choice1').removeClass('choice1');
            $('.tile.choice2').removeClass('choice2');
            
        }      

    }

}


$('#tilesWrap').on('click', '.tile', selectTiles);

function resetDefaults(){
    shuffledArray = [];
    shuffledArrayDuplicate;
    joinedArray;
    var pairsMatched = 0;
    var pairsAttempted = 0;
    $('#pairsMatched').html(pairsMatched);
    $('#pairsAttempted').html(pairsAttempted);
}


function closeLastSelection(){
    console.log("closing your last selection");
    $('.tile:not(.matched)').delay(2000).removeClass('flipping');
    // Reset choices
    firstChoice = undefined;
    secondChoice = undefined;
}

$('#resetGame').on('click', newBoard);


