(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\91965\Project\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* You can add global styles to this file, and also import other style files */\nbody{\n    margin:0;\n    padding: 0;\n}\np {\n    margin: 0;\n  }\ntd, tr{\n    padding:10px;\n  }\n.header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    min-height: 150px;\n    text-align: center;\n    background:#4E6CB8;\n    color: white;\n    z-index: 1;\n    font-weight: 600;\n  }\n.header-2{\n    position: relative;\n    /* top: 720px; */\n    margin-top: 20px;\n    left: 0;\n    right: 0;\n    height: 80px;\n    text-align: center;\n    background:#4E6CB8;\n    color: white;\n    font-weight: 500;\n    /* font-size: 10px; */\n    /* position: absolute; */\n    top: 50%;\n    left: 50%;\n    /* margin-right: -50%; */\n    transform: translate(-50%, -50%) \n  }\n.header span{\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-right: -50%;\n    transform: translate(-50%, -50%) \n  }\n.Level-2{\n    position: relative;\n    /* top: 800px; */\n    left: 0;\n    right: 0;\n    /* min-height: 15%; */\n    text-align: center;\n    background-color: white;\n    color: #000000ab;\n    font-weight: 600;\n    font-size: 20px;\n  }\n.Level-3{\n    display: block;\n    position: relative;\n    /* top: 850px; */\n    left: 0;\n    right: 0;\n    min-height: 15%;\n    text-align: center;\n    background-color: white;\n    color: Black;\n    font-weight: 600;\n    font-size: 20px;\n  }\n.Level-4{\n    display: block;\n    position: relative;\n    text-align: center;\n    /* top: 1500px; */\n  }\n.Level-5{\n    display: block;\n    position: relative;\n    text-align: center;\n    top: 40px;\n    padding-bottom:40px;\n    background: #ececec;\n  }\n.Level-6{\n    display: block;\n    position: relative;\n    text-align: center;\n    top: 40px;\n    /* max-width: 70%; */\n    /* font-size: 20px; */\n  }\n.Level-7{\n    display: block;\n    position: relative;\n    text-align: center;\n    top: 40px;\n    /* max-width: 70%; */\n  }\n.Level-8{\n    display: block;\n    position: relative;\n    /* text-align: center; */\n    /* top: 1500px; */\n  }\n/* .header-2 span{\n    position: absolute;\n    top: 50%;\n  } */\n.OfferText{\n    text-align: center; color: white;\n    font-weight: 500;\n    font-size: 20px ;\n  }\n.toolBar{\n      position: relative;\n      /* background : whitesmoke; */\n      top:120px;\n      /* display: block; */\n      /* top: -10px; */\n      max-width: 85%;\n      margin: 0 auto;\n      height: 80px;\n      z-index: 10;\n      box-shadow: 0 8px 6px -6px black;\n  }\n.content {\n    /* display: flex; */\n    /* margin: 82px auto 32px; */\n    /* padding: 0 16px; */\n    align-items: center;\n    /* border-radius: 100px; */\n  }\n.gallery {\n            display: grid;\n            grid-template-columns: repeat(8, 1fr);\n            grid-template-rows: repeat(8, 7vw);\n            grid-gap: 1.5rem; \n          }\n.gallery__img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n            /* position: relative; */\n            display: block; \n          }\n.grid-Container{\n        width: 90%;\n        margin: 2rem auto; \n    }\n.gallery__item{\n      position: relative;\n      opacity: 1.0;\n    }\n.gallery__item :hover{\n      opacity: 0.5;\n    }\n.gallery__item--1 {\n        grid-column-start: 1;\n        grid-column-end: 6;\n        grid-row-start: 1;\n        grid-row-end: 5;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n.gallery__item--2 {\n        grid-column-start: 1;\n        grid-column-end: 6;\n        grid-row-start: 5;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 3 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n.gallery__item--3 {\n        grid-column-start: 6;\n        grid-column-end: 9;\n        grid-row-start: 1;\n        grid-row-end: 4;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 5 / span 4;\n        grid-row: 1 / span 5; */\n      }\n.gallery__item--4 {\n        grid-column-start: 6;\n        grid-column-end: 9;\n        grid-row-start: 4;\n        grid-row-end: 6;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 4;  */\n        /* grid-row: 3 / span 3; */\n      }\n.gallery__item--5 {\n        grid-column-start: 6;\n        grid-column-end: 9;\n        grid-row-start: 6;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 4; */\n        /* grid-row: 6 / span 3; */\n      }\n/* .gallery__item--6 {\n        grid-column-start: 5;\n        grid-column-end: 9;\n        grid-row-start: 6;\n        grid-row-end: 9;\n    \n      } */\n.gallery__item--7 {\n        grid-column-start: 1;\n        grid-column-end: 5;\n        grid-row-start: 1;\n        grid-row-end: 5;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 5 / span 4; */\n        /* grid-row: 6 / span 3; */\n      }\n.gallery__item--8 {\n        grid-column-start: 1;\n        grid-column-end: 5;\n        grid-row-start: 5;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n.gallery__item--9 {\n        grid-column-start: 5;\n        grid-column-end: 9;\n        grid-row-start: 1;\n        grid-row-end: 5;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 3 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n.gallery__item--10 {\n        grid-column-start: 5;\n        grid-column-end: 9;\n        grid-row-start: 5;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 5 / span 4;\n        grid-row: 1 / span 5; */\n      }\n.zeroMP{\n      margin:0;\n      padding:0;\n  }\n.toolBar-Blocks{\n    float: left;\n    text-align: center;\n  }\n.floatRight{\n      float: right;\n  }\n.Banner{\n    z-index: 0;\n    position: relative;\n  }\n.banner-Text{\n    position: absolute;\n    top: 25%;\n    right: 15%;\n    font-size:45px;\n    font-weight: 700;\n    color: white;\n    /* text-shadow: 1px 1px 1px darkgray; */\n  }\n.banner-Text-1{\n    position: absolute;\n    top: 50%;\n    right: 15%;\n    font-size:45px;\n    font-weight: 400;\n    color: white;\n    padding:50px;\n    /* text-shadow: 1px 1px 1px darkgray; */\n    background: rgb(148, 167, 119, 0.7) ;\n    border-radius: 0px 100px 0px 100px;\n    margin-bottom: 20px;\n  }\n.banner-switch{\n    cursor: pointer;\n    position: absolute;\n    bottom: 10px;\n    left: 10px;\n    font-weight: 600;\n    color: white;\n    text-shadow: 1px 1px 1px darkgray;\n    margin-bottom: 20px;\n  }\n.pull-right{\n    float: right;\n  }\n.buyButton{\n    padding:10px;\n    padding-left:20px;\n    padding-right:20px;\n    font-size: 18px;\n    float: right;\n    margin-top:10px!important;\n    background:#4E6CB8;\n    color: white;\n    box-shadow: 0 8px 6px -6px black;\n  }\n.Deselected{\n    color : darkgray;\n    opacity: 0.7;\n  }\n/* .banner-Heading{\n    position: absolute;\n    top: 25%;\n    right: 15%;\n    font-size:45px;\n    font-weight: 600;\n    color: white;\n  } */\n#firstBlock{\n    position: relative;\n    display: inline-block;\n    font-size: 23px;\n    height: 100%;\n    width: 15%;\n    background: white;\n    border-radius: 10px 0px 0px 10px;\n  }\n.dropdown-content {\n    position: absolute;\n    background-color: #f9f9f9;\n    min-width: 160px;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n    padding: 12px 16px;\n    z-index: 0.1;\n    border-radius: 0px 0px 10px 10px;\n    display: block;\n    width:inherit;\n    margin-top:81px;\n  }\n/* #firstBlock:hover .dropdown-content{\n    \n  } */\n#secondBlock{\n    position: relative;\n    height: 100%;\n    color: #9b9a9a;\n    width: 20%;\n    background: whitesmoke;\n  }\n#thirdBlock{\n    position: relative;\n    height: 100%;\n    width: 15%;\n    color: gray;\n    background: #CCCDD5;\n  }\n#fourthBlock{\n    position: relative;\n    height: 100%;\n    width: 50%;\n    background: white;\n    border-radius: 0px 10px 10px 0px;\n  }\n#firstBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n#secondBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    transform: translate(-50%, -50%);\n  }\n#thirdBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n#fourthBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    transform: translate(-50%, -50%);\n  }\n.photoGram{\n    /* position: relative; */\n    border: solid white 1px;\n  }\n.caption{\n    /* position: relative; */\n    padding:3px;\n    margin-top:-5px;\n    background: white;\n    border: solid white 1px;\n    /* border:solid 0.5px darkgray; */\n  }\n.roundedCornersBottom{\n    box-shadow: 0 8px 6px -6px #8f8f8f;\n    border-radius: 0px 0px 10px 10px;\n  }\n.roundedCornersTop{\n    border-radius: 10px 10px 0px 0px ;\n  }\n.photoFrame{\n    /* position: absolute; */\n    display: inline-block;\n    max-width: 20%;\n    margin: 0 auto;\n    /* max-width: 21%; */\n  }\n.checked {\n    padding:3px;\n    color: orange;\n  }\n.banner-unchecked{\n    color: grey;\n    opacity: 0.6;\n  }\n.L5Head{\n      padding: 20px;\n      margin: 5px;\n      text-align: center;\n      color: 666666;\n      font-weight: 600;\n  }\n.GreenContainer{\n    position: relative;\n    /* text-align: center; */\n    color: white;\n  }\n/* .Text-Head {\n    position: absolute;\n    top: 40%;\n    left: 25%;\n    font-weight: bold;\n    transform: translate(-50%, -50%);\n    color: white;\n  } */\n.Text-Para {\n    position: absolute;\n    /* top: 90px; */\n    max-width: 40%;\n    top: 50%;\n    left: 25%;\n    font-weight: 400;\n    font-size:20px;\n    /* left: 50%; */\n    transform: translate(-50%, -50%);\n    color: white;\n  }\n.adjacent-img {\n    position: absolute;\n    /* top: 90px; */\n    max-width: 30%;\n    top: 50%;\n    left: 70%;\n    /* left: 50%; */\n    transform: translate(-50%, -50%);\n    color: white;\n    opacity: 0.65;\n  }\n.CarouselModify{\n    /* position: relative; */\n    color: darkgray;\n    font-size: 35px;\n    cursor:pointer;\n    margin-top: -10%;\n    display: inline-block;\n    max-width: 20%;\n    transition: width 2s;\n    /* transform: translate(50%, 50%); */\n  }\n.CarouselModify:hover{\n    color: black;\n    font-size: 40px;\n  }\n/* .CarouselModify:disabled{\n    color: grey;\n    font-size: 35px;\n  } */\n.pull-left{\n    float: left;\n  }\n.top-right-caption{\n    color: white;\n    position: absolute;\n    text-shadow: 1px 1px 1px darkgray;\n    top: 8px;\n    right: 16px;\n  }\n.footer-top{\n    margin-top:-10px;\n    width:100%;\n    /* position: relative; */\n    background:#4661A6;\n    color: white;\n  }\n.btnPopSearch{\n    margin-left: 30px!important;\n    background: #424D72;\n    color: white;\n    border-radius: 100px!important;\n    margin-bottom: 30px!important;\n  }\n.lblPopSearch{\n    font-size: 40px; padding:30px;\n    font-weight:400;\n  }\n.footer-bottom{\n    /* margin-top:-10px; */\n    position: relative;\n    height: 100%;\n    background:#4E6CB8;\n    color: white;\n  }\n.footer-end{\n    /* margin-top:-10px; */\n    position: relative;\n    background:#4E6CB8;\n    color: rgb(255, 255, 255, 0.5)ff;\n  }\n.ptop30{\n    padding-top: 30px;\n  }\n.pbot30{\n    padding-bottom: 30px;\n  }\n#search{\n    border: none;\n    color: #9b9a9a;\n    background: whitesmoke;\n  }\n#search:focus{\n    color: black;\n    outline: none;\n  }\n.Pointer{\n    cursor: pointer;\n  }\n\n\n", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"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","sourcesContent":["/* You can add global styles to this file, and also import other style files */\nbody{\n    margin:0;\n    padding: 0;\n}\n\n\n  p {\n    margin: 0;\n  }\n  td, tr{\n    padding:10px;\n  }\n\n  .header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    min-height: 150px;\n    text-align: center;\n    background:#4E6CB8;\n    color: white;\n    z-index: 1;\n    font-weight: 600;\n  }\n\n  .header-2{\n    position: relative;\n    /* top: 720px; */\n    margin-top: 20px;\n    left: 0;\n    right: 0;\n    height: 80px;\n    text-align: center;\n    background:#4E6CB8;\n    color: white;\n    font-weight: 500;\n    /* font-size: 10px; */\n    /* position: absolute; */\n    top: 50%;\n    left: 50%;\n    /* margin-right: -50%; */\n    transform: translate(-50%, -50%) \n  }\n\n\n  .header span{\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin-right: -50%;\n    transform: translate(-50%, -50%) \n  }\n\n  .Level-2{\n    position: relative;\n    /* top: 800px; */\n    left: 0;\n    right: 0;\n    /* min-height: 15%; */\n    text-align: center;\n    background-color: white;\n    color: #000000ab;\n    font-weight: 600;\n    font-size: 20px;\n  }\n\n  .Level-3{\n    display: block;\n    position: relative;\n    /* top: 850px; */\n    left: 0;\n    right: 0;\n    min-height: 15%;\n    text-align: center;\n    background-color: white;\n    color: Black;\n    font-weight: 600;\n    font-size: 20px;\n  }\n\n  .Level-4{\n    display: block;\n    position: relative;\n    text-align: center;\n    /* top: 1500px; */\n  }\n\n  .Level-5{\n    display: block;\n    position: relative;\n    text-align: center;\n    top: 40px;\n    padding-bottom:40px;\n    background: #ececec;\n  }\n\n  .Level-6{\n    display: block;\n    position: relative;\n    text-align: center;\n    top: 40px;\n    /* max-width: 70%; */\n    /* font-size: 20px; */\n  }\n\n  .Level-7{\n    display: block;\n    position: relative;\n    text-align: center;\n    top: 40px;\n    /* max-width: 70%; */\n  }\n  .Level-8{\n    display: block;\n    position: relative;\n    /* text-align: center; */\n    /* top: 1500px; */\n  }\n\n  /* .header-2 span{\n    position: absolute;\n    top: 50%;\n  } */\n\n  .OfferText{\n    text-align: center; color: white;\n    font-weight: 500;\n    font-size: 20px ;\n  }\n\n  .toolBar{\n      position: relative;\n      /* background : whitesmoke; */\n      top:120px;\n      /* display: block; */\n      /* top: -10px; */\n      max-width: 85%;\n      margin: 0 auto;\n      height: 80px;\n      z-index: 10;\n      -webkit-box-shadow: 0 8px 6px -6px black;\n      -moz-box-shadow: 0 8px 6px -6px black;\n      box-shadow: 0 8px 6px -6px black;\n  }\n\n\n  .content {\n    /* display: flex; */\n    /* margin: 82px auto 32px; */\n    /* padding: 0 16px; */\n    align-items: center;\n    /* border-radius: 100px; */\n  }\n\n    .gallery {\n            display: grid;\n            grid-template-columns: repeat(8, 1fr);\n            grid-template-rows: repeat(8, 7vw);\n            grid-gap: 1.5rem; \n          }\n        \n    .gallery__img {\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n            /* position: relative; */\n            display: block; \n          }   \n    \n          \n    .grid-Container{\n        width: 90%;\n        margin: 2rem auto; \n    }  \n\n    .gallery__item{\n      position: relative;\n      opacity: 1.0;\n    }\n    .gallery__item :hover{\n      opacity: 0.5;\n    }\n    \n    .gallery__item--1 {\n        grid-column-start: 1;\n        grid-column-end: 6;\n        grid-row-start: 1;\n        grid-row-end: 5;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n      \n      .gallery__item--2 {\n        grid-column-start: 1;\n        grid-column-end: 6;\n        grid-row-start: 5;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 3 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n      \n      .gallery__item--3 {\n        grid-column-start: 6;\n        grid-column-end: 9;\n        grid-row-start: 1;\n        grid-row-end: 4;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 5 / span 4;\n        grid-row: 1 / span 5; */\n      }\n      \n      .gallery__item--4 {\n        grid-column-start: 6;\n        grid-column-end: 9;\n        grid-row-start: 4;\n        grid-row-end: 6;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 4;  */\n        /* grid-row: 3 / span 3; */\n      }\n      \n      .gallery__item--5 {\n        grid-column-start: 6;\n        grid-column-end: 9;\n        grid-row-start: 6;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 4; */\n        /* grid-row: 6 / span 3; */\n      }\n      \n      /* .gallery__item--6 {\n        grid-column-start: 5;\n        grid-column-end: 9;\n        grid-row-start: 6;\n        grid-row-end: 9;\n    \n      } */\n      .gallery__item--7 {\n        grid-column-start: 1;\n        grid-column-end: 5;\n        grid-row-start: 1;\n        grid-row-end: 5;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 5 / span 4; */\n        /* grid-row: 6 / span 3; */\n      }\n      .gallery__item--8 {\n        grid-column-start: 1;\n        grid-column-end: 5;\n        grid-row-start: 5;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 1 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n      \n      .gallery__item--9 {\n        grid-column-start: 5;\n        grid-column-end: 9;\n        grid-row-start: 1;\n        grid-row-end: 5;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 3 / span 2;  */\n        /* grid-row: 1 / span 2; */\n      }\n      \n      .gallery__item--10 {\n        grid-column-start: 5;\n        grid-column-end: 9;\n        grid-row-start: 5;\n        grid-row-end: 9;\n      \n        /** Alternative Syntax **/\n        /* grid-column: 5 / span 4;\n        grid-row: 1 / span 5; */\n      }\n  \n  .zeroMP{\n      margin:0;\n      padding:0;\n  }\n  \n  .toolBar-Blocks{\n    float: left;\n    text-align: center;\n  }\n\n  .floatRight{\n      float: right;\n  }\n\n  .Banner{\n    z-index: 0;\n    position: relative;\n  }\n  \n  .banner-Text{\n    position: absolute;\n    top: 25%;\n    right: 15%;\n    font-size:45px;\n    font-weight: 700;\n    color: white;\n    /* text-shadow: 1px 1px 1px darkgray; */\n  }\n\n  .banner-Text-1{\n    position: absolute;\n    top: 50%;\n    right: 15%;\n    font-size:45px;\n    font-weight: 400;\n    color: white;\n    padding:50px;\n    /* text-shadow: 1px 1px 1px darkgray; */\n    background: rgb(148, 167, 119, 0.7) ;\n    border-radius: 0px 100px 0px 100px;\n    margin-bottom: 20px;\n  }\n  .banner-switch{\n    cursor: pointer;\n    position: absolute;\n    bottom: 10px;\n    left: 10px;\n    font-weight: 600;\n    color: white;\n    text-shadow: 1px 1px 1px darkgray;\n    margin-bottom: 20px;\n  }\n  .pull-right{\n    float: right;\n  }\n\n  .buyButton{\n    padding:10px;\n    padding-left:20px;\n    padding-right:20px;\n    font-size: 18px;\n    float: right;\n    margin-top:10px!important;\n    background:#4E6CB8;\n    color: white;\n    -webkit-box-shadow: 0 8px 6px -6px black;\n    -moz-box-shadow: 0 8px 6px -6px black;\n    box-shadow: 0 8px 6px -6px black;\n  }\n\n  .Deselected{\n    color : darkgray;\n    opacity: 0.7;\n  }\n\n  /* .banner-Heading{\n    position: absolute;\n    top: 25%;\n    right: 15%;\n    font-size:45px;\n    font-weight: 600;\n    color: white;\n  } */\n\n  \n\n  #firstBlock{\n    position: relative;\n    display: inline-block;\n    font-size: 23px;\n    height: 100%;\n    width: 15%;\n    background: white;\n    border-radius: 10px 0px 0px 10px;\n  }\n\n  .dropdown-content {\n    position: absolute;\n    background-color: #f9f9f9;\n    min-width: 160px;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n    padding: 12px 16px;\n    z-index: 0.1;\n    border-radius: 0px 0px 10px 10px;\n    display: block;\n    width:inherit;\n    margin-top:81px;\n  }\n\n  /* #firstBlock:hover .dropdown-content{\n    \n  } */\n\n  #secondBlock{\n    position: relative;\n    height: 100%;\n    color: #9b9a9a;\n    width: 20%;\n    background: whitesmoke;\n  }\n  #thirdBlock{\n    position: relative;\n    height: 100%;\n    width: 15%;\n    color: gray;\n    background: #CCCDD5;\n  }\n  #fourthBlock{\n    position: relative;\n    height: 100%;\n    width: 50%;\n    background: white;\n    border-radius: 0px 10px 10px 0px;\n  }\n\n  #firstBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n  #secondBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    transform: translate(-50%, -50%);\n  }\n  #thirdBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n  #fourthBlock span{\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    transform: translate(-50%, -50%);\n  }\n\n  .photoGram{\n    /* position: relative; */\n    border: solid white 1px;\n  }\n  .caption{\n    /* position: relative; */\n    padding:3px;\n    margin-top:-5px;\n    background: white;\n    border: solid white 1px;\n    /* border:solid 0.5px darkgray; */\n  }\n\n  .roundedCornersBottom{\n    -webkit-box-shadow: 0 8px 6px -6px #8f8f8f;\n    -moz-box-shadow: 0 8px 6px -6px #8f8f8f;\n    box-shadow: 0 8px 6px -6px #8f8f8f;\n    border-radius: 0px 0px 10px 10px;\n  }\n\n  .roundedCornersTop{\n    border-radius: 10px 10px 0px 0px ;\n  }\n\n  .photoFrame{\n    /* position: absolute; */\n    display: inline-block;\n    max-width: 20%;\n    margin: 0 auto;\n    /* max-width: 21%; */\n  }\n\n  .checked {\n    padding:3px;\n    color: orange;\n  }\n\n  .banner-unchecked{\n    color: grey;\n    opacity: 0.6;\n  }\n\n  .L5Head{\n      padding: 20px;\n      margin: 5px;\n      text-align: center;\n      color: 666666;\n      font-weight: 600;\n  }\n\n  .GreenContainer{\n    position: relative;\n    /* text-align: center; */\n    color: white;\n  }\n\n  /* .Text-Head {\n    position: absolute;\n    top: 40%;\n    left: 25%;\n    font-weight: bold;\n    transform: translate(-50%, -50%);\n    color: white;\n  } */\n\n  .Text-Para {\n    position: absolute;\n    /* top: 90px; */\n    max-width: 40%;\n    top: 50%;\n    left: 25%;\n    font-weight: 400;\n    font-size:20px;\n    /* left: 50%; */\n    transform: translate(-50%, -50%);\n    color: white;\n  }\n\n  .adjacent-img {\n    position: absolute;\n    /* top: 90px; */\n    max-width: 30%;\n    top: 50%;\n    left: 70%;\n    /* left: 50%; */\n    transform: translate(-50%, -50%);\n    color: white;\n    opacity: 0.65;\n  }\n\n\n  .CarouselModify{\n    /* position: relative; */\n    color: darkgray;\n    font-size: 35px;\n    cursor:pointer;\n    margin-top: -10%;\n    display: inline-block;\n    max-width: 20%;\n    transition: width 2s;\n    /* transform: translate(50%, 50%); */\n  }\n\n  .CarouselModify:hover{\n    color: black;\n    font-size: 40px;\n  }\n\n  /* .CarouselModify:disabled{\n    color: grey;\n    font-size: 35px;\n  } */\n\n\n  .pull-left{\n    float: left;\n  }\n  \n  .top-right-caption{\n    color: white;\n    position: absolute;\n    text-shadow: 1px 1px 1px darkgray;\n    top: 8px;\n    right: 16px;\n  }\n\n  .footer-top{\n    margin-top:-10px;\n    width:100%;\n    /* position: relative; */\n    background:#4661A6;\n    color: white;\n  }\n\n  .btnPopSearch{\n    margin-left: 30px!important;\n    background: #424D72;\n    color: white;\n    border-radius: 100px!important;\n    margin-bottom: 30px!important;\n  }\n\n  .lblPopSearch{\n    font-size: 40px; padding:30px;\n    font-weight:400;\n  }\n\n  .footer-bottom{\n    /* margin-top:-10px; */\n    position: relative;\n    height: 100%;\n    background:#4E6CB8;\n    color: white;\n  }\n\n  .footer-end{\n    /* margin-top:-10px; */\n    position: relative;\n    background:#4E6CB8;\n    color: rgb(255, 255, 255, 0.5)ff;\n  }\n\n  .ptop30{\n    padding-top: 30px;\n  }\n\n  .pbot30{\n    padding-bottom: 30px;\n  }\n\n  #search{\n    border: none;\n    color: #9b9a9a;\n    background: whitesmoke;\n  }\n  #search:focus{\n    color: black;\n    outline: none;\n  }\n  .Pointer{\n    cursor: pointer;\n  }\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map