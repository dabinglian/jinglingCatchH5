
var photoCount = 0;
var ba64 = "", bgOrientation = 1; //照片方向;
var pageName = "花之女神的三次元秀场 "

function View() {
    var me = this;
    this.pageList = ["home", "clothing", "map"];
    this.step = 0;
    var container = document.getElementById("container");
    var cav = container.querySelector("canvas")
    if(cav){
        cav.remove();
    }
    this.width = 750;
    this.height = setH_X;
    this.app = new PIXI.Application({
        width: this.width,
        height: this.height, 
        transparent: true,
    });
    container.appendChild(this.app.view);
    var cav_w = parseInt(container.style.width);
    this.app.view.style.width = cav_w+"px"
    this.app.view.style.height = cav_w/setRatio_2 + "px";
    this.app.view.style.marginTop = -(cav_w/setRatio_2/2) + "px"

    this.SpritePool = {};
    this.containerPool = {};
    this.textPool = {};
    this.imgList = resources.loader.resources; 
    this.destroyList = [];

}

//添加一个普通容器
//name, 名字；parent， 父容器；x, x坐标, y, y坐标
View.prototype.addContainer = function(name, parent, x, y){
    if(!(this.containerPool[name])){
        var container = new PIXI.Container();
        container.x = x||0;
        container.y = y||0;
        parent.addChild(container);
        this.containerPool[name] = container;
        return container
    }
    return this.containerPool[name]
}
//添加一个场景页容器
View.prototype.addPage = function(name){
    if(!(this[name])){
        var container = new PIXI.Container();
        container.x = this.width / 2;
        container.y = this.height / 2;
        container.pivot.set(this.width / 2, this.height / 2);
        this.app.stage.addChild(container);
        this[name] = container;
    }
}
//显示场景页
//step， 章节序号
View.prototype.showView = function (step) {
    var me = this;
    var page = "page_"+this.pageList[this.step];
    var enter = 'enter_'+ this.pageList[step];
    me.step = step;

    if(me[page]){
        this.leave_Page( page, function(){
            me[enter]();
        });
    }else{
        me[enter]();
    }
}

View.prototype.before_enter_Page = function(pageName){
    this[pageName].x = this.width / 2;
    TweenMax.set(this[pageName], {pixi:{brightness:0, scaleX:1.1, scaleY:1.1}})
}

View.prototype.enter_Page = function(pageName){
    TweenMax.to(this[pageName], 0.5, {pixi:{brightness:1, scaleX:1, scaleY:1}});
}

View.prototype.leave_Page = function(pageName, cb){
    var me = this;
    var line = new TimelineMax();
    line.to(this[pageName], 0.5, {
        pixi:{ brightness:0, scaleX:1.1, scaleY:1.1}, 
        onComplete: function(){
            me.destoryPage();
            cb&&cb();
        }
    })
}

View.prototype.destoryPage = function(cb){
    var len = this.destroyList.length;
    for(var i=0;i<len; i++){
        try {
            this.destroyList[i].destroy();
        }
        catch(err) {
            this.destroyList[i].alpha = 0;
            console.log(err.message);
        }
    }
    this.destroyList = [];
}

View.prototype.getSprite = function(label, resourcesName, addTO ,x, y, scaleX, scaleY, anchorX, anchorY, alpha){
    var texture = this.imgList[resourcesName].texture;
    var sprite = new PIXI.Sprite(texture);

    sprite.x = x||0;
    sprite.y = y||0;
    sprite.anchor.set(anchorX||0 , anchorY||0);
    sprite.scale.set(scaleX||1 , scaleY||1);
    sprite.alpha = alpha ==undefined?1:alpha;

    this.SpritePool[label || resourcesName] = sprite;
    addTO.addChild(sprite);
    return sprite;
}

View.prototype.getTexture = function(resourcesName){
    return this.imgList[resourcesName].texture;
}

View.prototype.getText = function(str, conttainer, x, y, style ){
    var Text = new PIXI.Text(str, style);
    Text.anchor.x = 0.5;
    Text.x = x;
    Text.y = y;

    this.textPool[str] = Text;
    conttainer.addChild(Text);
}

View.prototype.enter_home = function () {
    var me = this;
    this.addPage("page_home");
    this.before_enter_Page("page_home");
    this.enter_Page("page_home");
    var container = this.page_home;
    var pool = this.SpritePool;

    this.getSprite('entry_bg', 'entry_bg', container, me.width/2, me.height/2, 1, 1, 0.5, 0.5, 1);
    this.getSprite('entry_start', 'entry_start', container, me.width/2, 1130 + detalY, 1, 1, 0.5, 0.5, 1);

    TweenMax.to(pool.entry_start, 0.6, {pixi:{scale: 0.92, brightness: 1.2}, ease:Sine.easeInOut, repeat:-1, yoyo: true});
    
    this.destroyList.push(pool.entry_start, pool.entry_bg, container);
    
    pool.entry_start.interactive = true;
    pool.entry_start.buttonMode = true;
    pool.entry_start.on('pointerdown', function(){
        me.showView(1)
    });
}

View.prototype.enter_clothing = function () {
    var me = this;
    this.addPage("page_clothing");
    this.before_enter_Page("page_clothing");
    this.enter_Page("page_clothing");

    var container = this.page_clothing;
    var pool = this.SpritePool;

    this.getSprite('clothing_bg', 'clothing_bg', container, me.width/2, me.height/2, 1, 1, 0.5, 0.5, 1);
    this.getSprite('clothing_skip', 'clothing_skip', container, me.width/2, 1130 + detalY, 1, 1, 0.5, 0.5, 1);

    pool.clothing_skip.background = '#f00'

    TweenMax.to(pool.clothing_skip, 0.6, {pixi:{scale: 0.92, brightness: 1.2}, ease:Sine.easeInOut, repeat:-1, yoyo: true});

    this.destroyList.push(pool.clothing_bg, pool.clothing_skip);

    pool.clothing_skip.interactive = true;
    pool.clothing_skip.buttonMode = true;
    pool.clothing_skip.on('pointerdown', function(){
        me.showView(2)
    });
}