var maxLeft;
var maxRight;
var maxBottom;
var stage;
var startBison = 2;
var MAX_HERD = 200;
var MIN_SPEED = 3;
var MAX_SPEED = 5;
var herd = [];
var backgrounds = ["office.jpg","golfwang.jpg"];


function setupStage() {
    stage = $('.stage');
    maxLeft = 0;
    maxRight = stage.width();
    maxBottom = stage.height();
    var randomNumber = Math.floor(Math.random()*backgrounds.length);
    $('body').css('background-image','url('+backgrounds[randomNumber]+')');
}



var Person = function(x, y, className) {
        this.width = maxRight / 4;
        this.height = this.width * 2.8;
        this.x = x;
        this.y = y - this.height;
        this.count = Math.random() * 10;

        this.speed = 10;



        this.elm = $('<div>').attr('class', 'person');
        this.elm.addClass(className);
        this.elm.css('left', this.x + 'px');
        this.elm.css('top', this.y + 'px');

        this.elm.css('height', this.height + 'px');
        this.elm.css('width', this.width + 'px');
};

Person.prototype.move = function() {
    // this.x -= this.speed;
    // this.elm.css('left', this.x + 'px');


    this.count += 0.2;
    var angle = (Math.sin(this.count) * 5);
    this.elm.css('top', (this.y -  Math.sin(this.count) * maxBottom/24)+ 'px');
    this.elm.css('transform', 'rotate(' + angle + 'deg)');

};

var Wasp = function(x, y) {
        this.width = maxRight / 20;
        this.height = this.width * 0.7;
        this.x = x;
        this.y = y - this.height;
        this.count = Math.random() * 10;
        this.countY = Math.random() * 10;

        this.speed = 10;

        this.elm = $('<div>').attr('class', 'wasp');
        this.elm.css('left', this.x + 'px');
        this.elm.css('top', this.y + 'px');
        this.elm.css('height', this.height + 'px');
        this.elm.css('width', this.width + 'px');
};

Wasp.prototype.move = function() {
    // this.x -= this.speed;
    // this.elm.css('left', this.x + 'px');


    this.count += 0.04;
    this.countY += 0.2;
    this.elm.css('top', (this.y -  Math.sin(this.countY) * maxBottom/24)+ 'px');
    this.elm.css('left', (this.x -  Math.sin(this.count) * maxRight/2.5)+ 'px');

};


var Bison = function(classname) {
    this.width = maxBottom/3;
    this.height = this.width * 0.9;
    this.x = Math.random() * maxRight;
    this.y = maxBottom - this.height;
    this.count = Math.random() * 10;
    this.speed = MIN_SPEED + (Math.random() * (MAX_SPEED - MIN_SPEED));
    
    this.elm = $('<div>').attr('class', classname);
    this.elm.css('left', this.x + 'px');
    this.elm.css('top', this.y + 'px');
    this.elm.css('height', this.height + 'px');
    this.elm.css('width', this.width + 'px');

};

Bison.prototype.move = function() {
    this.x -= this.speed;
    this.elm.css('left', this.x + 'px');


    this.count += 0.1;
    this.elm.css('top', (this.y -  Math.sin(this.count) * 20)+ 'px');

    if (this.x < maxLeft - this.width) {
        this.x = maxRight + Math.random() * maxRight;
        this.speed = MIN_SPEED + (Math.random() * (MAX_SPEED - MIN_SPEED));
    }
};


function addActor(actor) {
    herd.push(actor);
    stage.append(actor.elm);
}

var interval = null;

function addMoreBison(e) {
    e.preventDefault();
    interval = setInterval(function() {
        var bison = new Bison('bison');
        addActor(bison);
        console.log(herd.length);
    }, 200);
}
function addMoreBruno(e) {
    e.preventDefault();
    intervalbruno = setInterval(function() {
        var bison = new Bison('bruno');
        addActor(bison);
        console.log(herd.length);
    }, 200);
}


function stopMoreBison(e) {
    e.preventDefault();
    clearInterval(interval);
}

function stopMoreBruno(e) {
    e.preventDefault();
    clearInterval(intervalbruno);
}

function anim() {
    for (var i = 0; i < herd.length; i++) {
        herd[i].move();
    }
    window.requestAnimationFrame(anim);
}

function init() {
    setupStage();
    window.addEventListener('resize', setupStage, false);

    var btn = $('.moreBison');
    btn.on('mousedown', addMoreBison);
    btn.on('touchstart', addMoreBison);
    btn.on('mouseup', stopMoreBison);
    btn.on('touchend', stopMoreBison);
    btn.on('touchcancel', stopMoreBison);
    
    var btnbruno = $('.moreBruno');
    btnbruno.on('mousedown', addMoreBruno);
    btnbruno.on('touchstart', addMoreBruno);
    btnbruno.on('mouseup', stopMoreBruno);
    btnbruno.on('touchend', stopMoreBruno);
    btnbruno.on('touchcancel', stopMoreBruno);


    for (var i = 0; i < startBison; i++) {
        var bison = new Bison('bison');
        addActor(bison);
    }


    var p1 = new Person(maxRight/5, maxBottom - maxBottom/5, 'p1');
    var p2 = new Person(maxRight/1.8, maxBottom - maxBottom/5, 'p2');
    addActor(p1);
    addActor(p2);

    var  wasp = new Wasp(maxRight/2, maxBottom - maxBottom/2);
    addActor(wasp);

    anim();
}
// $('#bruno').click(function(){
// var p3 = new Person(maxRight/2, maxBottom - 250,'bruno');
// 	addActor(p3);
// });

init();
