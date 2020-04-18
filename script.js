let N = 12;
let M = 19;
let blockSize = 500 / N;
let characterPos = {x: 0, y: 0};
let gameArea;
let karakter;

let KEYLEFT = 'ArrowLeft';
let KEYUP = 'ArrowUp';
let KEYRIGHT = 'ArrowRight';
let KEYDOWN = 'ArrowDown';


function addCharacter() {
    karakter = $('<img src="karakter.png" id="karakter" />');
    karakter.css({
        height: blockSize,
    });
    karakter.appendTo(gameArea);
}

function moveCharacter(e){
    let key = e.key;

    switch (key) {
        case KEYUP:
            characterPos.y--;
            break;
        case KEYRIGHT:
            characterPos.x++;
            break;
        case KEYDOWN:
            characterPos.y++;
            break;
        case KEYLEFT:
            characterPos.x--;
            break;
    }
    if (characterPos.x < 0) {
        characterPos.x = 0;
    } else if (characterPos.x > N - 1) {
        characterPos.x = N - 1;
    } else if (characterPos.y < 0) {
        characterPos.y = 0;
    } else if (characterPos.y > M - 1) {
        characterPos.y = M - 1;
    } else {
        animateCharacter();
    }
}


function pajaFelepit(){
    for(var i = 0; i < M; i++){
        for(var j = 0; j < N; j++){
            var mezo = $('<div></div>');
            mezo.addClass('mezo');
            mezo.css({
                height: blockSize,
                width: blockSize,
                top: i*blockSize,
                left: j*blockSize
            });

            if(Math.random()>0.95){
                mezo.addClass('ladas');
            }
            mezo.appendTo(gameArea);
        }
    }
}

function animateCharacter(){
    karakter.animate({
        top: characterPos.y * blockSize,
        left: characterPos.x * blockSize
    }, 100, function () {
        gameArea.find('.ladas').each(function () {
            if($(this).css('top') === karakter.css('top') && $(this).css('left') === karakter.css('left')){
                let r = Math.random();
                if(r > 0.6666){
                    $(this).removeClass('ladas').addClass('szornyes');
                }else if(r > 0.3333){
                    $(this).removeClass('ladas').addClass('kincses');
                }else{
                    $(this).removeClass('ladas').addClass('ures');
                }
            }
        });
    });
}


$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');

    addCharacter();
    pajaFelepit();
    $(window).on('keydown', moveCharacter);

    $('#gamearea').css('height', (blockSize*M));
});



