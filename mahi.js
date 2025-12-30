/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/constants.ts"
/*!*************************!*\
  !*** ./ts/constants.ts ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CODEC_NAME: () => (/* binding */ CODEC_NAME),
/* harmony export */   ID: () => (/* binding */ ID),
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
// The Plugin's main ID (equivalent to MOD_ID) - used for registration and filename export.
var ID = "mahi";
// The Plugin's current version (similar to gradle.properties info).
var VERSION = "0.0.1";
// The name of the Mahi Entity codec
var CODEC_NAME = "mahi_entity";


/***/ },

/***/ "./ts/format/mahiEntityFormat.ts"
/*!***************************************!*\
  !*** ./ts/format/mahiEntityFormat.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAHI_CODEC: () => (/* binding */ MAHI_CODEC),
/* harmony export */   MAHI_FORMAT: () => (/* binding */ MAHI_FORMAT),
/* harmony export */   isFormatMahiEntity: () => (/* binding */ isFormatMahiEntity)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates */ "./ts/format/templates.ts");


var MAHI_CODEC = new Codec(_constants__WEBPACK_IMPORTED_MODULE_0__.CODEC_NAME, {
    name: "Mahi Entity",
    extension: "java",
    remember: true,
    support_partial_export: true,
    load_filter: {
        type: "text",
        extensions: ["java"],
    },
    compile: function (options) {
    },
    parse: function (data, path, args) {
    },
    afterDownload: function (path) {
    },
    afterSave: function (path) {
    },
    fileName: function () {
        return "file";
    }
});
MAHI_CODEC.templates = _templates__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES;
// codec.compileAnimations = function(animations = Animation.all) {
//
// }
var MAHI_FORMAT = new ModelFormat(_constants__WEBPACK_IMPORTED_MODULE_0__.CODEC_NAME, {
    id: _constants__WEBPACK_IMPORTED_MODULE_0__.CODEC_NAME,
    icon: "fa-fish-fins",
    category: "minecraft",
    target: "Minecraft: Java Edition",
    format_page: {
        content: [
            { type: 'h3', text: tl('mode.start.format.informations') },
            { text: "* ".concat(tl('format.modded_entity.info.integer_size'), "\n\t\t\t\t\t* ").concat(tl('format.modded_entity.info.format')).replace(/\t+/g, '')
            }
        ]
    },
    codec: MAHI_CODEC,
    node_name_regex: "\\w",
    box_uv: true,
    box_uv_float_size: true,
    single_texture: true,
    bone_rig: true,
    centered_grid: true,
    rotate_cubes: true,
    integer_size: true,
    animation_mode: true,
    pbr: true
});
MAHI_CODEC.format = MAHI_FORMAT;
function isFormatMahiEntity() {
    return Format == MAHI_FORMAT;
}


/***/ },

/***/ "./ts/format/mahiExportActions.ts"
/*!****************************************!*\
  !*** ./ts/format/mahiExportActions.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadMahiActions: () => (/* binding */ loadMahiActions),
/* harmony export */   unloadMahiActions: () => (/* binding */ unloadMahiActions)
/* harmony export */ });
/* harmony import */ var _mahiEntityFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mahiEntityFormat */ "./ts/format/mahiEntityFormat.ts");

var exportModel = new Action("export_model", {
    name: "Export Mahi Model",
    icon: "view_in_ar",
    condition: function () { return (0,_mahiEntityFormat__WEBPACK_IMPORTED_MODULE_0__.isFormatMahiEntity)(); },
    click: function () {
        _mahiEntityFormat__WEBPACK_IMPORTED_MODULE_0__.MAHI_CODEC.export();
    }
});
function loadMahiActions() {
    MenuBar.addAction(exportModel, "file.export.0");
}
function unloadMahiActions() {
    exportModel.delete();
}


/***/ },

/***/ "./ts/format/templates.ts"
/*!********************************!*\
  !*** ./ts/format/templates.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TEMPLATES: () => (/* binding */ TEMPLATES),
/* harmony export */   createAnimationTemplate: () => (/* binding */ createAnimationTemplate),
/* harmony export */   createModelTemplate: () => (/* binding */ createModelTemplate),
/* harmony export */   createRenderStateTemplate: () => (/* binding */ createRenderStateTemplate),
/* harmony export */   createRendererTemplate: () => (/* binding */ createRendererTemplate)
/* harmony export */ });
/* harmony import */ var _templates_modelTemplates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templates/modelTemplates */ "./ts/format/templates/modelTemplates.ts");
/* harmony import */ var _templates_animationTemplates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/animationTemplates */ "./ts/format/templates/animationTemplates.ts");
/* harmony import */ var _templates_rendererTemplates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/rendererTemplates */ "./ts/format/templates/rendererTemplates.ts");
/* harmony import */ var _templates_renderStateTemplates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/renderStateTemplates */ "./ts/format/templates/renderStateTemplates.ts");




var TEMPLATES = {
    "1.21.11-mojmaps": {
        name: "Fabric 1.21.11 (Mojmaps)",
        model: _templates_modelTemplates__WEBPACK_IMPORTED_MODULE_0__.MODEL_TEMPLATE_1_21_11,
        animation: _templates_animationTemplates__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_TEMPLATE_1_21_11,
        renderer: _templates_rendererTemplates__WEBPACK_IMPORTED_MODULE_2__.RENDERER_TEMPLATE_1_21_11,
        renderState: _templates_renderStateTemplates__WEBPACK_IMPORTED_MODULE_3__.RENDER_STATE_TEMPLATE_1_21_11,
    }
};
function createModelTemplate(file) {
    return { file: file, type: "model" };
}
function createAnimationTemplate(file) {
    return { file: file, type: "animation" };
}
function createRendererTemplate(file) {
    return { file: file, type: "renderer" };
}
function createRenderStateTemplate(file) {
    return { file: file, type: "renderState" };
}


/***/ },

/***/ "./ts/format/templates/animationTemplates.ts"
/*!***************************************************!*\
  !*** ./ts/format/templates/animationTemplates.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANIMATION_TEMPLATE_1_21_11: () => (/* binding */ ANIMATION_TEMPLATE_1_21_11)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var ANIMATION_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createAnimationTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(animation_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/format/templates/modelTemplates.ts"
/*!***********************************************!*\
  !*** ./ts/format/templates/modelTemplates.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODEL_TEMPLATE_1_21_11: () => (/* binding */ MODEL_TEMPLATE_1_21_11)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var MODEL_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createModelTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(model_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/format/templates/renderStateTemplates.ts"
/*!*****************************************************!*\
  !*** ./ts/format/templates/renderStateTemplates.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RENDER_STATE_TEMPLATE_1_21_11: () => (/* binding */ RENDER_STATE_TEMPLATE_1_21_11)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var RENDER_STATE_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createRenderStateTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(render_state_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/format/templates/rendererTemplates.ts"
/*!**************************************************!*\
  !*** ./ts/format/templates/rendererTemplates.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RENDERER_TEMPLATE_1_21_11: () => (/* binding */ RENDERER_TEMPLATE_1_21_11)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var RENDERER_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createRendererTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(renderer_class) {\n    \n    }\n");


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./ts/constants.ts");
/* harmony import */ var _format_mahiExportActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format/mahiExportActions */ "./ts/format/mahiExportActions.ts");


(function () {
    BBPlugin.register(_constants__WEBPACK_IMPORTED_MODULE_0__.ID, {
        title: "Mahi",
        icon: "icon.png",
        author: "Superkat32",
        description: "Plugin for the Mahi Minecraft Java Library",
        tags: ["Minecraft: Java Edition", "Animation", "Likely Janky"],
        version: _constants__WEBPACK_IMPORTED_MODULE_0__.VERSION,
        min_version: "4.9.0",
        variant: "both",
        onload: function () {
            (0,_format_mahiExportActions__WEBPACK_IMPORTED_MODULE_1__.loadMahiActions)();
        },
        onunload: function () {
            (0,_format_mahiExportActions__WEBPACK_IMPORTED_MODULE_1__.unloadMahiActions)();
        }
    });
})();

})();

/******/ })()
;