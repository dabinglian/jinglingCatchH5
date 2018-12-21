var resources = {};

resources.loader = new PIXI.loaders.Loader();
resources.v = '20181212';

resources.assetLoad = function(cb) {
  var arr = []
  for(var key in this.list) {
    arr = arr.concat(this.list[key])
  }
  var loader = this.loader;
  var len = arr.length;
  for(var i = 0; i < len; i++) {
    loader.add(arr[i].name, arr[i].src +"?"+this.v);
  }
  loader.onProgress.add((loader, res) => {
    var progress = Math.floor(loader.progress)
    $(".loading_page").html("舞会准备中..." + progress + "%")

  })
  loader.onComplete.once((a, b) => {
    console.log('onComplete');
    cb && cb();
  })
  loader.load();
}

resources.list = {
    page_begin: [
        {name: "entry_bg", src: './images/entry/bg.png'},
        {name: "entry_start", src: './images/entry/start.png'}
    ],
    page_clothing: [
        {name: "clothing_bg", src:  './images/clothing/bg.jpg'},
        {name: "clothing_skip", src:  './images/clothing/skip.png'}
    ],
    page_map: [
      {name: "map_bg", src: './images/map/map.png'},
      {name: "map_icon_01", src: './images/map/icon_01.png'},
      {name: "map_icon_02", src: './images/map/icon_02.png'},
      {name: "map_pop", src: './images/map/box.png'}
    ]
}

