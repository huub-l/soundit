(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/scripts/app"],{

/***/ "./resources/assets/scripts/app.js":
/*!*****************************************!*\
  !*** ./resources/assets/scripts/app.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _highwayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./highwayjs */ "./resources/assets/scripts/highwayjs/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./resources/assets/scripts/common.js");


window.addEventListener('DOMContentLoaded', function () {
  new _highwayjs__WEBPACK_IMPORTED_MODULE_0__["default"]();
  Object(_common__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

/***/ }),

/***/ "./resources/assets/scripts/common.js":
/*!********************************************!*\
  !*** ./resources/assets/scripts/common.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return common; });
function common() {
  document.getElementById('gridToggle').addEventListener('click', function () {
    document.getElementById('grid-debug').classList.toggle('visible');
  });
}

/***/ }),

/***/ "./resources/assets/scripts/components/form.js":
/*!*****************************************************!*\
  !*** ./resources/assets/scripts/components/form.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return form; });
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./resources/assets/scripts/utils/api.js");

function form(selector) {
  if (!document.body.classList.contains('page-template-template-page')) {
    /* Form Helpers */
    var resetMessages = function resetMessages() {
      _form.querySelectorAll('.form-error').forEach(function (f) {
        f.classList.remove('show');
      });
    };

    var resetFields = function resetFields() {
      var Inputs = _form.querySelectorAll('input:not([type=submit]), select');

      [].forEach.call(Inputs, function (Input) {
        Input.value = '';
      });
    };

    var validateEmail = function validateEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    var _form = document.querySelector('[data-form="' + selector + '"]'),
        requiredFields = _form.getElementsByClassName('required-field');

    console.log('works');
    var postURL;

    switch (_form.dataset.form) {
      case 'contact-form':
        postURL = _utils_api__WEBPACK_IMPORTED_MODULE_0__["default"].forms.contact;
        break;

      case 'newsletter':
        postURL = _utils_api__WEBPACK_IMPORTED_MODULE_0__["default"].forms.newsletter;
        break;

      default:
        break;
    }

    _form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      if (_form.dataset.form != selector) {
        return;
      }

      _form.dataset.loading = 'true'; // reset the form messages

      resetMessages(); // Validate Everything

      var invalidFields = [];

      var makeInvalid = function makeInvalid(field) {
        invalidFields.push(field);

        _form.querySelector('[data-error="' + field.id + '"]').classList.add('show');
      };

      var validateForm = function validateForm(fields) {
        for (var index = 0; index < fields.length; index++) {
          var required = fields[index];

          if (required.type == 'email') {
            if (!validateEmail(required.value)) {
              makeInvalid(required);
            }
          } else if (required.type == 'file' && required.files.length == 0) {
            makeInvalid(required);
          } else {
            if (!required.value) {
              makeInvalid(required);
            }
          }
        }

        if (invalidFields.length > 0) {
          return false;
        }

        return true;
      }; // Append all present files


      var params = new FormData(_form);
      params.append('_wpnonce', document.body.dataset.nonce);

      if (validateForm(requiredFields)) {
        fetch(postURL, {
          method: 'POST',
          body: params
        }).then(_utils_api__WEBPACK_IMPORTED_MODULE_0__["checkStatus"]).then(_utils_api__WEBPACK_IMPORTED_MODULE_0__["parseJSON"]).then(function (response) {
          console.log(params);

          if (response.code === 'sent-with-success') {
            if (_form.dataset.form == 'contact-form') {
              document.querySelector('.contact-form .form-feedback').classList.add('success');
            } else if (_form.dataset.form == 'newsletter') {
              document.querySelector('.newsletter .form-feedback').classList.add('success');
            }

            resetFields();
            _form.dataset.loading = 'done';
            setTimeout(function () {
              _form.dataset.loading = 'false';
              document.querySelector('.form-feedback').classList.remove('success');
            }, 4000);
          }
        })["catch"](function (error) {
          console.log('...', error);
          Object(_utils_api__WEBPACK_IMPORTED_MODULE_0__["errorResponse"])(error);
        });
      }
    });
  }
}

/***/ }),

/***/ "./resources/assets/scripts/highwayjs/AssetLoader.js":
/*!***********************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/AssetLoader.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
*   Add any promises that need to be resolved before showing
*   the page by using the add( promise ) method.
*/
var AssetLoader = {
  promisesToLoad: [],
  load: function load() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$element = _ref.element,
        element = _ref$element === void 0 ? document.body : _ref$element,
        _ref$progress = _ref.progress,
        progress = _ref$progress === void 0 ? false : _ref$progress;

    this.element = element;
    this.addMedia();
    return this.loaded = new Promise(function (resolve) {
      if (progress) {
        _this.progressPromise(_this.promisesToLoad, progress).then(function () {
          _this.promisesToLoad = [];
          resolve();
        });
      } else {
        Promise.all(_this.promisesToLoad).then(function () {
          _this.promisesToLoad = [];
          resolve();
        });
      }
    });
  },
  add: function add(promise) {
    this.promisesToLoad.push(promise);
  },
  addMedia: function addMedia() {
    var _this2 = this;

    var images = this.element.querySelectorAll('img');

    var _loop = function _loop(i) {
      _this2.promisesToLoad.push(new Promise(function (resolve) {
        var imgEl = document.createElement('img');
        imgEl.addEventListener('load', resolve);
        imgEl.addEventListener('error', resolve);
        imgEl.src = images[i].src;
      }));
    };

    for (var i = 0; i < images.length; i++) {
      _loop(i);
    }

    var videos = this.element.querySelectorAll('video');

    var _loop2 = function _loop2(_i) {
      _this2.promisesToLoad.push(new Promise(function (resolve) {
        var videoEl = document.createElement('video');
        videoEl.addEventListener('loadedmetadata', resolve);
        videoEl.addEventListener('error', resolve);
        videoEl.src = videos[_i].src;
      }));
    };

    for (var _i = 0; _i < videos.length; _i++) {
      _loop2(_i);
    } // TODO: check background images

  },
  progressPromise: function progressPromise(promises, tickCallback) {
    var len = promises.length;
    var progress = 0;

    function tick(promise) {
      promise.then(function () {
        progress++;
        tickCallback(progress, len);
      })["catch"](function (reason) {
        console.log(reason);
      });
      return promise;
    }

    return Promise.all(promises.map(tick));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (AssetLoader);

/***/ }),

/***/ "./resources/assets/scripts/highwayjs/MainController.js":
/*!**************************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/MainController.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainController; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var locomotive_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! locomotive-scroll */ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js");



var mainScroll;

var MainController = /*#__PURE__*/function () {
  function MainController() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MainController);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MainController, [{
    key: "init",
    value: function init() {
      mainScroll = new locomotive_scroll__WEBPACK_IMPORTED_MODULE_2__["default"]({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getDirection: true
      });
    }
  }, {
    key: "updateScroll",
    value: function updateScroll() {
      mainScroll.update();
    }
  }, {
    key: "getScroll",
    value: function getScroll() {
      return mainScroll;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      mainScroll.destroy();
    }
  }]);

  return MainController;
}();



/***/ }),

/***/ "./resources/assets/scripts/highwayjs/animations/PageLoader.js":
/*!*********************************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/animations/PageLoader.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");

var PageLoader = {
  timeline: gsap__WEBPACK_IMPORTED_MODULE_0__["default"].timeline({
    paused: true
  }).fromTo('#transition', {
    autoAlpha: 0
  }, {
    duration: 0.5,
    autoAlpha: 1,
    immediateRender: false
  }),
  hide: function hide() {
    var _this = this;

    return new Promise(function (resolve) {
      _this.timeline.tweenFromTo(_this.timeline.duration(), 0, {
        ease: 'expo.inOut'
      });

      gsap__WEBPACK_IMPORTED_MODULE_0__["default"].delayedCall(_this.timeline.duration() * 0.4, resolve);
    });
  },
  show: function show() {
    var _this2 = this;

    return new Promise(function (resolve) {
      _this2.timeline.tweenFromTo(0, _this2.timeline.duration(), {
        ease: 'expo.inOut',
        onComplete: resolve
      });
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (PageLoader);

/***/ }),

/***/ "./resources/assets/scripts/highwayjs/index.js":
/*!*****************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return H; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @dogstudio/highway/build/highway.min.js */ "./node_modules/@dogstudio/highway/build/highway.min.js");
/* harmony import */ var _dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _renderers_Default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./renderers/Default */ "./resources/assets/scripts/highwayjs/renderers/Default.js");
/* harmony import */ var _transitions_Default__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transitions/Default */ "./resources/assets/scripts/highwayjs/transitions/Default.js");
/* harmony import */ var _renderers_private__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./renderers/private */ "./resources/assets/scripts/highwayjs/renderers/private.js");






function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _createSuper(Derived) {
  return function () {
    var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}







var H = /*#__PURE__*/function (_Highway$Core) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(H, _Highway$Core);

  var _super = _createSuper(H);

  function H() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, H);

    _this = _super.call(this, {
      renderers: {
        home: _renderers_Default__WEBPACK_IMPORTED_MODULE_7__["default"],
        template_private: _renderers_private__WEBPACK_IMPORTED_MODULE_9__["default"],
        template_page: _renderers_Default__WEBPACK_IMPORTED_MODULE_7__["default"],
        template_login: _renderers_Default__WEBPACK_IMPORTED_MODULE_7__["default"],
        single_post: _renderers_Default__WEBPACK_IMPORTED_MODULE_7__["default"]
      },
      transitions: {
        "default": _transitions_Default__WEBPACK_IMPORTED_MODULE_8__["default"]
      }
    });

    _this.on('NAVIGATE_IN', _this.onNavigateIn);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(H, [{
    key: "onNavigateIn",
    value: function onNavigateIn(_ref) {
      var to = _ref.to,
          location = _ref.location;

      if (!to.page.body.classList.contains('home')) {
        document.querySelectorAll('[data-anchor]').forEach(function (anchor) {
          anchor.href = window.location.origin + '/' + anchor.dataset.anchor;
        });
      }

      var menuItems = document.querySelectorAll('.menu-item a'); // Update Active Nav Link

      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active');

        if (menuItems[i].href === location.href) {
          menuItems[i].classList.add('active');
        }
      } // Update body classes


      document.body.className = to.page.body.className;
    }
  }, {
    key: "attach",
    value: function attach() {
      this.links = document.querySelectorAll('a[href]:not([target]):not([href|="#"]):not([data-router-disabled]):not(.sf-dump-toggle)');

      var _iterator = _createForOfIteratorHelper(this.links),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var link = _step.value;
          link.addEventListener('click', this._navigate);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return H;
}(_dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6___default.a.Core);



/***/ }),

/***/ "./resources/assets/scripts/highwayjs/renderers/Default.js":
/*!*****************************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/renderers/Default.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultRenderer; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _MainController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MainController */ "./resources/assets/scripts/highwayjs/MainController.js");
/* harmony import */ var _dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @dogstudio/highway/build/highway.min.js */ "./node_modules/@dogstudio/highway/build/highway.min.js");
/* harmony import */ var _dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _AssetLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AssetLoader */ "./resources/assets/scripts/highwayjs/AssetLoader.js");
/* harmony import */ var _animations_PageLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../animations/PageLoader */ "./resources/assets/scripts/highwayjs/animations/PageLoader.js");
/* harmony import */ var _components_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/form */ "./resources/assets/scripts/components/form.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");






function _createSuper(Derived) {
  return function () {
    var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}








var DefaultRenderer = /*#__PURE__*/function (_Highway$Renderer) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(DefaultRenderer, _Highway$Renderer);

  var _super = _createSuper(DefaultRenderer);

  function DefaultRenderer(properties) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DefaultRenderer); // pass properties into constructor of parent class


    _this = _super.call(this, properties); // initialize class variables

    _this.MainController = new _MainController__WEBPACK_IMPORTED_MODULE_5__["default"]();
    _this.themeUrl = site_info.templateUrl;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DefaultRenderer, [{
    key: "onEnter",
    value: function onEnter() {
      var _this2 = this;

      this.loadScripts();
      this.MainController.init();
      _AssetLoader__WEBPACK_IMPORTED_MODULE_7__["default"].load({
        element: this.properties.view
      }).then(function () {
        console.log('assets loaded');

        var mainScroll = _this2.MainController.getScroll();

        var login = document.querySelector('.password-page');
        window.addEventListener('resize', function () {
          mainScroll.update();
        });
        /**
         * Update Window Size
         */

        var windowSize;
        windowSize = window.innerWidth;

        window.onresize = function () {
          windowSize = window.innerWidth;
        }; // Viewport vh


        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // Max body for login page 

        if (login) {
          document.body.style.height = '100vh';
          document.body.classList.add('no-scroll');
        } // Cursor 


        var cursor = document.querySelector('#cursor');
        var links = document.querySelectorAll('a, button, .triggers-hover');
        document.addEventListener('mousemove', function (e) {
          cursor.style.left = e.pageX + 'px';
          cursor.style.top = e.pageY + 'px';
        });
        links.forEach(function (link) {
          link.addEventListener('mouseover', function hover() {
            cursor.classList.add('cursor-link');
            return false;
          });
          link.addEventListener('mouseleave', function leave() {
            cursor.classList.remove('cursor-link');
            return false;
          });
        }); // Icon scroll to top

        var headerIcon = document.querySelector('.brand-icon'),
            hero = document.querySelector('.js-hero');
        headerIcon.addEventListener('click', function () {
          mainScroll.scrollTo(hero);
        });

        if (!document.body.classList.contains('password-protected')) {
          var parentHeight = function parentHeight() {
            var currentEl = document.querySelector('.active-member'),
                membersParent = document.querySelector('.team__members'),
                currentHeight = currentEl.offsetHeight;
            membersParent.style.height = currentHeight + 'px';
          };

          var forward = function forward() {
            document.querySelector('.team-next').addEventListener('click', function () {
              var currentEl = document.querySelector('.active-member'),
                  updateIndex = document.querySelector('.team__index span'),
                  nextEl;

              if (currentEl.dataset.row == membersIndex.length) {
                nextEl = members[0];
              } else {
                nextEl = currentEl.nextElementSibling;
              }

              currentEl.classList.remove('active-member');
              nextEl.classList.add('active-member');
              updateIndex.innerHTML = nextEl.dataset.row;
              parentHeight();
            });
          };

          var previous = function previous() {
            document.querySelector('.team-prev').addEventListener('click', function () {
              var currentEl = document.querySelector('.active-member'),
                  updateIndex = document.querySelector('.team__index span'),
                  prevEl;

              if (currentEl.dataset.row == 1) {
                prevEl = members[members.length - 1];
              } else {
                prevEl = currentEl.previousElementSibling;
              }

              currentEl.classList.remove('active-member');
              prevEl.classList.add('active-member');
              updateIndex.innerHTML = prevEl.dataset.row;
              parentHeight();
            });
          }; // Froms


          Object(_components_form__WEBPACK_IMPORTED_MODULE_9__["default"])('contact-form');
          Object(_components_form__WEBPACK_IMPORTED_MODULE_9__["default"])('newsletter');
          console.log('this is the size' + windowSize); // Header fixed

          if (windowSize > 1023) {
            mainScroll.on('scroll', function (instance) {
              var y = instance.scroll.y,
                  header = document.querySelector('#siteHeader'),
                  heroHeight = document.querySelector('#siteHeader').offsetHeight;

              if (y >= heroHeight) {
                header.classList.add('fixed');
              } else {
                header.classList.remove('fixed');
              }
            });
          } // Burger menu 


          if (window.matchMedia('(max-width: 1023px)').matches) {
            var burger = document.querySelector('.burger-menu'),
                nav = document.querySelector('.nav-header');
            burger.addEventListener('click', function (ev) {
              ev.preventDefault();
              burger.classList.toggle('open');
              nav.classList.toggle('visible');
              document.body.classList.toggle('no-scroll');
            });
            var menuItem = document.querySelectorAll('header .menu-item a');
            menuItem.forEach(function (item) {
              item.addEventListener('click', function (ev) {
                ev.preventDefault();
                burger.click();
              });
            });
          } // Margin for footer


          if (window.matchMedia('(min-width: 1024px)').matches) {
            var footer = document.querySelector('#siteFooter'),
                footerHeight = footer.offsetHeight,
                fakeFooter = document.querySelector('.fake-footer');
            fakeFooter.style.height = '' + footerHeight + 'px';
            setTimeout(function () {
              mainScroll.update();
            }, 200);
          }

          document.querySelectorAll('[data-anchor').forEach(function (anchor) {
            anchor.addEventListener('click', function (ev) {
              ev.preventDefault();
              var url = anchor.dataset.anchor;
              mainScroll.scrollTo(url, {
                offset: -50
              });
              mainScroll.update();
            });
          }); // Accordion

          var accordions = document.querySelectorAll('.js-accordion'),
              tabs = document.querySelectorAll('.accordion-tab'),
              parent = document.querySelector('.js-parent');

          var openAccordion = function openAccordion(accordion) {
            var wrapper = accordion.querySelector('.accordion-content'),
                content = accordion.querySelector('.accordion-child');
            accordion.querySelector('.accordion-tab').innerHTML = '<span>-</span> Close';
            wrapper.classList.add('visible');
            wrapper.style.height = content.offsetHeight + "px";

            if (parent) {
              parent.style.height = content.offsetHeight + "px";
            }
          };

          var closeAccordion = function closeAccordion(accordion) {
            var wrapper = accordion.querySelector('.accordion-content');
            accordion.querySelector('.accordion-tab').innerHTML = '<span>+</span> Read More';
            wrapper.classList.remove('visible');
            wrapper.style.height = null;

            if (parent) {
              parent.style.height = '20vh';
            }
          };

          accordions.forEach(function (accordion) {
            var intro = accordion.querySelector('.accordion-tab');
            var wrapper = accordion.querySelector('.accordion-content');

            intro.onclick = function () {
              if (wrapper.style.height) {
                closeAccordion(accordion);
              } else {
                accordions.forEach(function (accordion) {
                  return closeAccordion(accordion);
                });
                openAccordion(accordion);
              }

              setTimeout(function () {
                mainScroll.update();
              }, 300);
            };
          }); // Team Mobile Slideshow 

          var members = document.querySelectorAll('.team__members li'),
              membersIndex = document.querySelectorAll('[data-row]');
          members.forEach(function (member) {
            if (member.getAttribute('data-row') == '1') {
              member.classList.add('active-member');
            }
          });

          if (windowSize < 1023) {
            parentHeight();
          }

          forward();
          previous(); // Team ShowMore Accordion 

          var teamShowmoreTab = document.querySelector('.team__showmore-tab');
          teamShowmoreTab.addEventListener('click', function () {
            members.forEach(function (member) {
              member.classList.toggle('team__showmore');
            });

            if (teamShowmoreTab.innerHTML === '<span>+</span>Show more') {
              teamShowmoreTab.innerHTML = '<span>-</span>Close';
            } else {
              teamShowmoreTab.innerHTML = '<span>+</span>Show more';
            }

            setTimeout(function () {
              mainScroll.update();
            }, 300);
          });
        } // Text Animation


        mainScroll.on('call', function (value, way, obj) {
          switch (value) {
            case 'revealOpacity':
              if (!obj.el.classList.contains('animated')) {
                var element = obj.el;
                gsap__WEBPACK_IMPORTED_MODULE_10__["default"].from(element, {
                  duration: 1.5,
                  y: 50,
                  opacity: 0,
                  ease: 'power3.out'
                });
                obj.el.classList.add('animated');
              }

              break;

            case 'showVideo':
              var videoA = document.querySelector('.experience__one'),
                  videoB = document.querySelector('.experience__two');
              gsap__WEBPACK_IMPORTED_MODULE_10__["default"].from(videoA, {
                duration: 6,
                opacity: 1,
                ease: 'power3.out'
              });
              gsap__WEBPACK_IMPORTED_MODULE_10__["default"].from(videoB, {
                duration: 6,
                opacity: 0,
                ease: 'power3.out'
              });
              break;
          }
        });
      });
    }
  }, {
    key: "onFirstLoad",
    value: function onFirstLoad() {
      var _this3 = this;

      this.loadScripts(true);
      this.onEnter();
      _AssetLoader__WEBPACK_IMPORTED_MODULE_7__["default"].loaded.then(function () {
        console.log('loader');
        _animations_PageLoader__WEBPACK_IMPORTED_MODULE_8__["default"].hide().then(function () {
          _this3.onEnterCompleted();
        });
      });
    }
  }, {
    key: "onEnterCompleted",
    value: function onEnterCompleted() {}
  }, {
    key: "onLeave",
    value: function onLeave() {
      this.MainController.destroy();
    }
  }, {
    key: "onLeaveCompleted",
    value: function onLeaveCompleted() {}
  }, {
    key: "setup",
    value: function setup() {
      this.onFirstLoad();
    }
  }, {
    key: "loadScripts",
    value: function loadScripts(firstLoad) {
      this.reloadScripts = []; // scripts to reload every time

      var scripts = this.properties.view.querySelectorAll('script');
      var scriptsLength = scripts.length;

      for (var i = 0; i < scriptsLength; i++) {
        var code = scripts[i].innerText;
        var src = scripts[i].src;

        if (!firstLoad && code.length > 0) {
          // TODO: test adding script to page with innerHTML
          window.eval(code); // eslint-disable-line
        } else if (src.length > 0) {
          // TODO: resolve when all scripts are loaded
          this.appendScript(src, src.split('/').pop(), firstLoad)["catch"](function (error) {
            console.log(error);
          });
        }
      }
    }
  }, {
    key: "appendScript",
    value: function appendScript(src, filename, firstLoad) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (!!document.querySelector("[data-filename=\"".concat(filename, "\"]"))) return;
        var script = document.createElement('script'); // don't cache certain scripts

        if (!_this4.reloadScripts.includes(filename)) {
          script.dataset.filename = filename;
        }

        if (!firstLoad) {
          script.async = true;
          script.src = src;
          script.addEventListener('load', resolve);
          script.addEventListener('error', function () {
            return reject('Error loading script: ' + filename);
          });
          script.addEventListener('abort', function () {
            return reject('Script loading aborted: ' + filename);
          });
        }

        document.body.appendChild(script);
      });
    }
  }]);

  return DefaultRenderer;
}(_dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_6___default.a.Renderer);



/***/ }),

/***/ "./resources/assets/scripts/highwayjs/renderers/private.js":
/*!*****************************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/renderers/private.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Default__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Default */ "./resources/assets/scripts/highwayjs/renderers/Default.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_dist_ScrollTrigger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gsap/dist/ScrollTrigger */ "./node_modules/gsap/dist/ScrollTrigger.js");
/* harmony import */ var gsap_dist_ScrollTrigger__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(gsap_dist_ScrollTrigger__WEBPACK_IMPORTED_MODULE_9__);







function _createSuper(Derived) {
  return function () {
    var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}







var Private = /*#__PURE__*/function (_DefaultRenderer) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Private, _DefaultRenderer);

  var _super = _createSuper(Private);

  function Private() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Private);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Private, [{
    key: "onEnter",
    value: function onEnter() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Private.prototype), "onEnter", this).call(this);

      var mainScroll = this.MainController.getScroll(); // ** Infographics Slideshow ** 

      swiper__WEBPACK_IMPORTED_MODULE_7__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_7__["Navigation"], swiper__WEBPACK_IMPORTED_MODULE_7__["Pagination"]]);
      swiper__WEBPACK_IMPORTED_MODULE_7__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_7__["EffectFade"]]);
      var infographicsDesktop = new swiper__WEBPACK_IMPORTED_MODULE_7__["default"]('.infographic-desktop > .swiper-container', {
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,
        spaceBetween: 48,
        effect: 'fade',
        pagination: {
          el: '.infographic-desktop .swiper-pagination',
          clickable: true,
          renderBullet: function renderBullet(index, className) {
            return '<span class="' + className + ' triggers-hover">' + (index + 1) + '</span>';
          }
        },
        navigation: {
          nextEl: '.infographic-desktop .swiper-next',
          prevEl: '.infographic-desktop .swiper-prev'
        }
      });
      var infographicsMobile = new swiper__WEBPACK_IMPORTED_MODULE_7__["default"]('.infographic-mobile > .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 48,
        autoHeight: true,
        pagination: {
          el: '.infographic-mobile .swiper-pagination',
          clickable: true,
          renderBullet: function renderBullet(index, className) {
            return '<span class="' + className + ' triggers-hover">' + (index + 1) + '</span>';
          }
        },
        navigation: {
          nextEl: '.infographic-mobile .swiper-next',
          prevEl: '.infographic-mobile .swiper-prev'
        }
      }); // ** on slideChange **

      infographicsDesktop.on('slideChangeTransitionEnd', function () {
        setTimeout(function () {
          mainScroll.update();
          gsap_dist_ScrollTrigger__WEBPACK_IMPORTED_MODULE_9__["ScrollTrigger"].refresh();
        }, 50);
      });
      infographicsMobile.on('slideChangeTransitionEnd', function () {
        setTimeout(function () {
          mainScroll.update();
          gsap_dist_ScrollTrigger__WEBPACK_IMPORTED_MODULE_9__["ScrollTrigger"].refresh();
        }, 50);
      });
    }
  }, {
    key: "onFirstLoad",
    value: function onFirstLoad() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Private.prototype), "onFirstLoad", this).call(this);
    }
  }, {
    key: "onLeave",
    value: function onLeave() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Private.prototype), "onLeave", this).call(this);
    }
  }, {
    key: "onEnterCompleted",
    value: function onEnterCompleted() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Private.prototype), "onEnterCompleted", this).call(this);
    }
  }]);

  return Private;
}(_Default__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Private);

/***/ }),

/***/ "./resources/assets/scripts/highwayjs/transitions/Default.js":
/*!*******************************************************************!*\
  !*** ./resources/assets/scripts/highwayjs/transitions/Default.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultTransition; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @dogstudio/highway/build/highway.min.js */ "./node_modules/@dogstudio/highway/build/highway.min.js");
/* harmony import */ var _dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _AssetLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetLoader */ "./resources/assets/scripts/highwayjs/AssetLoader.js");
/* harmony import */ var _animations_PageLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../animations/PageLoader */ "./resources/assets/scripts/highwayjs/animations/PageLoader.js");






function _createSuper(Derived) {
  return function () {
    var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}





var DefaultTransition = /*#__PURE__*/function (_Highway$Transition) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(DefaultTransition, _Highway$Transition);

  var _super = _createSuper(DefaultTransition);

  function DefaultTransition() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DefaultTransition);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DefaultTransition, [{
    key: "in",
    value: function _in(_ref) {
      var from = _ref.from,
          to = _ref.to,
          trigger = _ref.trigger,
          done = _ref.done;
      _AssetLoader__WEBPACK_IMPORTED_MODULE_6__["default"].loaded.then(function () {
        _animations_PageLoader__WEBPACK_IMPORTED_MODULE_7__["default"].hide().then(function () {
          done();
        });
      });
    }
  }, {
    key: "out",
    value: function out(_ref2) {
      var from = _ref2.from,
          trigger = _ref2.trigger,
          done = _ref2.done;
      _animations_PageLoader__WEBPACK_IMPORTED_MODULE_7__["default"].show().then(function () {
        from.parentNode.removeChild(from);
        done();
      });
    }
  }]);

  return DefaultTransition;
}(_dogstudio_highway_build_highway_min_js__WEBPACK_IMPORTED_MODULE_5___default.a.Transition);



/***/ }),

/***/ "./resources/assets/scripts/utils/api.js":
/*!***********************************************!*\
  !*** ./resources/assets/scripts/utils/api.js ***!
  \***********************************************/
/*! exports provided: default, checkStatus, parseJSON, errorResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkStatus", function() { return checkStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJSON", function() { return parseJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorResponse", function() { return errorResponse; });
/* Config */
var url = '/wp-json/soundit/';
var api = {
  forms: {
    contact: "".concat(url, "v1/contact-form"),
    newsletter: "".concat(url, "v1/newsletter")
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}
function errorResponse(response) {
  throw Error(response);
}

/***/ }),

/***/ "./resources/assets/styles/app.scss":
/*!******************************************!*\
  !*** ./resources/assets/styles/app.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/styles/editor.scss":
/*!*********************************************!*\
  !*** ./resources/assets/styles/editor.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!************************************************************************************************************************!*\
  !*** multi ./resources/assets/scripts/app.js ./resources/assets/styles/app.scss ./resources/assets/styles/editor.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/joanasilva/Sites/soundit/wp-content/themes/soundit/resources/assets/scripts/app.js */"./resources/assets/scripts/app.js");
__webpack_require__(/*! /Users/joanasilva/Sites/soundit/wp-content/themes/soundit/resources/assets/styles/app.scss */"./resources/assets/styles/app.scss");
module.exports = __webpack_require__(/*! /Users/joanasilva/Sites/soundit/wp-content/themes/soundit/resources/assets/styles/editor.scss */"./resources/assets/styles/editor.scss");


/***/ })

},[[0,"/scripts/manifest","/scripts/vendor"]]]);
//# sourceMappingURL=app.js.map