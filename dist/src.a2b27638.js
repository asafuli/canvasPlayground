// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/gekko.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gekko =
/*#__PURE__*/
function () {
  function Gekko(ctx, htmlId) {
    var controls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      right: 'ArrowRight',
      left: 'ArrowLeft',
      up: 'ArrowUp',
      down: 'ArrowDown',
      jump: ' ',
      flip: 'Enter'
    };
    var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      x: 400,
      y: 300,
      w: 180,
      h: 180
    };
    var movingSpeed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;

    _classCallCheck(this, Gekko);

    this.ctx = ctx;
    this.image = document.getElementById(htmlId);
    this.speed = 0;
    this.movingSpeed = movingSpeed;
    this.movingAxis = 'x';
    this.position = _objectSpread({}, position);
    this.rotatePosition = _objectSpread({}, position);
    this.controls = _objectSpread({}, controls); //bindings

    this.move = this.move.bind(this);
    this.jump = this.jump.bind(this);
    this.flip = this.flip.bind(this);
    this.draw = this.draw.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    this.stop = this.stop.bind(this);
  } //Functions


  _createClass(Gekko, [{
    key: "move",
    value: function move(axis, sign) {
      this.speed = this.movingSpeed * sign;
      this.movingAxis = axis;
    }
  }, {
    key: "updatePlayerPosition",
    value: function updatePlayerPosition(deltaTime) {
      if (!deltaTime) return;
      this.position[this.movingAxis] += this.speed / deltaTime;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$position = this.position,
          x = _this$position.x,
          y = _this$position.y,
          w = _this$position.w,
          h = _this$position.h;
      return this.ctx.drawImage(this.image, x, y, w, h);
    }
  }, {
    key: "jump",
    value: function jump() {
      var _this = this;

      var _loop = function _loop(i) {
        setTimeout(function () {
          _this.ctx.clearRect(0, 0, 1500, 770);

          _this.position.y = i < 10 ? _this.position.y - 10 : _this.position.y + 10;

          _this.draw();
        }, i * 20, _this.position);
      };

      for (var i = 0; i < 20; i++) {
        _loop(i);
      }
    }
  }, {
    key: "flip",
    value: function flip() {
      var _this2 = this;

      var _loop2 = function _loop2(i) {
        setTimeout(function () {
          // save the unrotated ctx of the canvas so we can restore it later
          // the alternative is to untranslate & unrotate after drawing
          _this2.ctx.clearRect(0, 0, 1500, 770);

          _this2.ctx.save();

          _this2.ctx.clearRect(0, 0, _this2.position.x + _this2.position.w, _this2.position.y + _this2.position.h); // move to the center of the canvas


          _this2.ctx.translate(_this2.position.x + _this2.position.w / 2, _this2.position.y + _this2.position.h / 2); // rotate the canvas to the specified degrees


          _this2.ctx.rotate(1 * Math.PI / 180);

          _this2.position.x = -_this2.position.w / 2;
          _this2.position.y = -_this2.position.h / 2; // draw the image
          // since the ctx is rotated, the image will be rotated also

          _this2.ctx.drawImage(_this2.image, _this2.position.x, _this2.position.y, 180, 180); // we’re done with the rotating so restore the unrotated ctx


          if (i === 360) {
            _this2.ctx.restore();
          }
        }, i * 2);
      };

      for (var i = 0; i < 361; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "checkAction",
    value: function checkAction(e) {
      console.log(e.key);

      switch (e.key) {
        case this.controls.right:
          this.move('x', 1);
          break;

        case this.controls.left:
          this.move('x', -1);
          break;

        case this.controls.up:
          this.move('y', -1);
          break;

        case this.controls.down:
          this.move('y', 1);
          break;

        case this.controls.flip:
          this.flip();
          break;

        case this.controls.jump:
          this.jump();
          break;
      }
    }
  }, {
    key: "stop",
    value: function stop(e) {
      switch (e.key) {
        case this.controls.right:
          if (this.speed > 0 && this.movingAxis === 'x') this.speed = 0;
          break;

        case this.controls.left:
          if (this.speed < 0 && this.movingAxis === 'x') this.speed = 0;
          break;

        case this.controls.up:
          if (this.speed < 0 && this.movingAxis === 'y') this.speed = 0;
          break;

        case this.controls.down:
          if (this.speed > 0 && this.movingAxis === 'y') this.speed = 0;
          break;
      }
    }
    /*getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    */

  }]);

  return Gekko;
}();

exports.default = Gekko;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _gekko = _interopRequireDefault(require("./gekko"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Globals
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var lastTime = 0;
var players = [];
var gekkoExist = false;
var catBoyExist = false;
var yotamExist = false; //thumbnails

var gekkoThumb = document.getElementById("gekkoThumb");
var catBoyThumb = document.getElementById("catBoyThumb");
var yotamThumb = document.getElementById("yotamThumb");
gekkoThumb.addEventListener('click', function (ev) {
  addPlayer(ev);
}, false);
catBoyThumb.addEventListener('click', function (ev) {
  addPlayer(ev);
}, false);
yotamThumb.addEventListener('click', function (ev) {
  addPlayer(ev);
}, false);

function addPlayer(ev) {
  var newPlayer;

  if (ev.target.id === "gekkoThumb" && !gekkoExist) {
    newPlayer = new _gekko.default(ctx, "gekkoImg");
    gekkoExist = true;
  } else if (ev.target.id === "catBoyThumb" && !catBoyExist) {
    newPlayer = new _gekko.default(ctx, "catBoyImg", {
      right: 'd',
      left: 'a',
      up: 'w',
      down: 's',
      jump: '1'
    });
    catBoyExist = true;
  } else if (ev.target.id === "yotamThumb" && !yotamExist) {
    newPlayer = new _gekko.default(ctx, "yotamThumb", {
      right: "'",
      left: 'l',
      up: 'p',
      down: ';',
      jump: '='
    });
    yotamExist = true;
  } else {
    alert('Player already exist...');
    return;
  }

  window.addEventListener('keydown', function (e) {
    return newPlayer.checkAction(e);
  });
  window.addEventListener('keyup', function (e) {
    return newPlayer.stop(e);
  });
  players.push(newPlayer);
}

function GameLoop(timestamp) {
  var dt = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, 1500, 770);
  players.map(function (player) {
    player.updatePlayerPosition(dt);
    player.draw();
  });
  requestAnimationFrame(GameLoop);
} //Initial call


GameLoop();
},{"./gekko":"src/gekko.js"}],"../../Users/ASSAFEL/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51369" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../Users/ASSAFEL/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.map