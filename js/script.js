var firstChoice;
var secondChoice;




function selectTiles(){
    if(firstChoice == undefined && secondChoice == undefined){
        // Grab class of clicked tile
        var tileClass = this.className;
        // Set First Choice to the classname
        firstChoice = tileClass;
        $(this).find('.tile-cover').fadeToggle( 100, "linear" ).addClass('lastChoice');
        console.log("first choice is " + firstChoice);

    } else if (firstChoice !== undefined && secondChoice == undefined){
        var tileClass = this.className;
        // Set second Choice to the classname
        secondChoice = tileClass;
        console.log("second choice is " + secondChoice);
        $(this).find('.tile-cover').fadeToggle( 100, "linear" ).addClass('secondLastChoice');

        // CORRECT SELECTION:
        if(firstChoice == secondChoice ){
            console.log("match!");
                // Reset choices
                firstChoice = undefined;
                secondChoice = undefined;
        // INCORRECT SELECTION:
        } else {
            console.log("no match!");
            closeLastSelection();
        }

    }
    // else if ( firstChoice !== undefined && secondChoice !== undefined ) {
    //     console.log("stop!");
    // }
}


function closeLastSelection(){
    console.log("closing your last selection");
    $('.lastChoice.tile-cover').delay(700).fadeToggle( 100, "linear" );
    $('.secondLastChoice.tile-cover').delay(600).fadeToggle( 100, "linear" );
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




