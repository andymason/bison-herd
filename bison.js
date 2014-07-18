var maxLeft;
var maxRight;
var stage;
var MAX_HERD = 80;
var MIN_SPEED = 3;
var MAX_SPEED = 5;
var herd = [];


function setupStage() {
    stage = $('.stage');
    maxLeft = 0;
    maxRight = stage.width();
    maxBottom = stage.height();
}


var Person = function(x, y) {
        this.width = 380;
        this.height = 500;
        this.x = x;
        this.y = y - this.height;
        this.count = Math.random() * 10;

        this.speed = 10;

        this.elm = $('<div>').attr('class', 'person');
        this.elm.css('left', this.x + 'px');
        this.elm.css('top', this.y + 'px');
        this.elm.css('height', this.height + 'px');
        this.elm.css('width', this.width + 'px');
};

Person.prototype.move = function() {
    // this.x -= this.speed;
    // this.elm.css('left', this.x + 'px');


    this.count += 0.2;
    this.elm.css('top', (this.y -  Math.sin(this.count) * 20)+ 'px');

};


var Bison = function() {
    this.width = 350;
    this.height = 250;
    this.x = Math.random() * maxRight;
    this.y = maxBottom - this.height;
    this.count = Math.random() * 10;
    this.speed = MIN_SPEED + (Math.random() * (MAX_SPEED - MIN_SPEED));
    this.elm = $('<div>').attr('class', 'bison');
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

function anim() {
    for (var i = 0; i < herd.length; i++) {
        herd[i].move();
    }
    window.requestAnimationFrame(anim);
}

function init() {
    setupStage();
    window.addEventListener('resize', setupStage, false);
    for (var i = 0; i < MAX_HERD; i++) {
        var bison = new Bison();
        addActor(bison);
    }

    var p1 = new Person(maxRight/2, maxBottom - 250);
    addActor(p1);

    anim();
}


init();