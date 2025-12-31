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
/* harmony export */   FANCY_VANILLA_ENTITIES: () => (/* binding */ FANCY_VANILLA_ENTITIES),
/* harmony export */   ID: () => (/* binding */ ID),
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
// The Plugin's main ID (equivalent to MOD_ID) - used for registration and filename export.
var ID = "mahi";
// The Plugin's current version (similar to gradle.properties info).
var VERSION = "0.0.1";
// The name of the Mahi Entity codec
var CODEC_NAME = "mahi_entity";
// List of fancy entities which use keyframed animations as of 1.21.11
// These are used for the examples/placeholders of settings
var FANCY_VANILLA_ENTITIES = [
    "Armadillo",
    "Bat",
    "Breeze",
    "Camel",
    "CopperGolem",
    "Creaking",
    "Frog",
    "Nautilus",
    "Sniffer",
    "Warden"
];


/***/ },

/***/ "./ts/format/mahiActions.ts"
/*!**********************************!*\
  !*** ./ts/format/mahiActions.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadMahiActions: () => (/* binding */ loadMahiActions),
/* harmony export */   monkeypatchMahiProjectWindowClick: () => (/* binding */ monkeypatchMahiProjectWindowClick),
/* harmony export */   unloadMahiActions: () => (/* binding */ unloadMahiActions)
/* harmony export */ });
/* harmony import */ var _mahiEntityFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mahiEntityFormat */ "./ts/format/mahiEntityFormat.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./ts/utils.ts");
/* harmony import */ var _mahiPluginProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mahiPluginProperties */ "./ts/format/mahiPluginProperties.ts");




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
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.addMonkeypatch)(BarItems, "project_window", "click", monkeypatchMahiProjectWindowClick);
}
function unloadMahiActions() {
    exportModel.delete();
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.removeMonkeypatches)();
}
function monkeypatchMahiProjectWindowClick() {
    if (Format.id === _constants__WEBPACK_IMPORTED_MODULE_1__.CODEC_NAME) {
        (0,_mahiPluginProperties__WEBPACK_IMPORTED_MODULE_3__.openMahiProjectSettingsDialog)();
    }
    else {
        return _utils__WEBPACK_IMPORTED_MODULE_2__.Monkeypatches.get(BarItems).click();
    }
}


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
/* harmony import */ var _mahiPluginProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mahiPluginProperties */ "./ts/format/mahiPluginProperties.ts");



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
    model_identifier: false,
    pbr: true,
    new: function () {
        if (newProject(this)) {
            return (0,_mahiPluginProperties__WEBPACK_IMPORTED_MODULE_2__.openMahiProjectSettingsDialog)();
        }
    },
});
MAHI_CODEC.format = MAHI_FORMAT;
function isFormatMahiEntity() {
    return Format == MAHI_FORMAT;
}


/***/ },

/***/ "./ts/format/mahiPluginProperties.ts"
/*!*******************************************!*\
  !*** ./ts/format/mahiPluginProperties.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANIMATION_CLASS_PROPERTY: () => (/* binding */ ANIMATION_CLASS_PROPERTY),
/* harmony export */   ENTITY_CLASS_PROPERTY: () => (/* binding */ ENTITY_CLASS_PROPERTY),
/* harmony export */   EXPORT_VERSION_PROPERTY: () => (/* binding */ EXPORT_VERSION_PROPERTY),
/* harmony export */   FLIP_Y_PROPERTY: () => (/* binding */ FLIP_Y_PROPERTY),
/* harmony export */   MODEL_CLASS_PROPERTY: () => (/* binding */ MODEL_CLASS_PROPERTY),
/* harmony export */   MODEL_SUPERCLASS_PROPERTY: () => (/* binding */ MODEL_SUPERCLASS_PROPERTY),
/* harmony export */   RENDERER_CLASS_PROPERTY: () => (/* binding */ RENDERER_CLASS_PROPERTY),
/* harmony export */   RENDERER_SUPERCLASS_PROPERTY: () => (/* binding */ RENDERER_SUPERCLASS_PROPERTY),
/* harmony export */   RENDER_STATE_CLASS_PROPERTY: () => (/* binding */ RENDER_STATE_CLASS_PROPERTY),
/* harmony export */   RENDER_STATE_SUPERCLASS_PROPERTY: () => (/* binding */ RENDER_STATE_SUPERCLASS_PROPERTY),
/* harmony export */   createMahiFormConfig: () => (/* binding */ createMahiFormConfig),
/* harmony export */   loadMahiProperties: () => (/* binding */ loadMahiProperties),
/* harmony export */   openMahiProjectSettingsDialog: () => (/* binding */ openMahiProjectSettingsDialog),
/* harmony export */   unloadMahiProperties: () => (/* binding */ unloadMahiProperties)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates */ "./ts/format/templates.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


// export const MOD_ID_PROPERTY: string = "mahi_modid";
var ENTITY_CLASS_PROPERTY = "mahi_entity_class";
var EXPORT_VERSION_PROPERTY = "mahi_export_version";
var FLIP_Y_PROPERTY = "mahi_flip_y";
var MODEL_CLASS_PROPERTY = "mahi_model_class";
var ANIMATION_CLASS_PROPERTY = "mahi_animation_class";
var RENDERER_CLASS_PROPERTY = "mahi_renderer_class";
var RENDER_STATE_CLASS_PROPERTY = "mahi_render_state_class";
var MODEL_SUPERCLASS_PROPERTY = "mahi_model_superclass";
var RENDERER_SUPERCLASS_PROPERTY = "mahi_renderer_superclass";
var RENDER_STATE_SUPERCLASS_PROPERTY = "mahi_render_state_superclass";
var pluginProperties;
function loadMahiProperties() {
    pluginProperties = createPluginProperties();
}
function unloadMahiProperties() {
    for (var _i = 0, pluginProperties_1 = pluginProperties; _i < pluginProperties_1.length; _i++) {
        var property = pluginProperties_1[_i];
        property.delete();
    }
}
function createPluginProperties() {
    var exampleEntity = getExampleEntityName();
    return [
        createMahiPluginProperty("string", ENTITY_CLASS_PROPERTY, {
            label: "Entity Class",
            description: "Your Entity Class name.",
            placeholder: "".concat(exampleEntity),
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", EXPORT_VERSION_PROPERTY, {
            label: "Export Version",
            description: "The Minecraft version to export your project to.",
            default: _templates__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES[0],
            options: (0,_templates__WEBPACK_IMPORTED_MODULE_1__.getTemplateOptionNames)(),
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("boolean", FLIP_Y_PROPERTY, {
            label: "Flip Y Axis",
            description: "Flip the Y Axis.",
            default: true,
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", MODEL_CLASS_PROPERTY, {
            label: "Model Class",
            description: "Your Entity's Model Class name.",
            placeholder: getEntityModelName("", exampleEntity),
            options: {
                "class_export": true,
                "whitespace": true
            },
            condition: isMahiProject(),
        })
    ];
}
function createMahiFormConfig() {
    var form = {
        format: {
            label: "data.format",
            text: "Mahi Model",
            description: "Formatted to the Mahi Minecraft Java Library Model format.",
            type: "info",
        },
    };
    for (var key in ModelProject.properties) {
        var property = ModelProject.properties[key];
        if (property.exposed === false || !Condition(property.condition))
            continue;
        var entry = form[property.name] = {
            label: property.label,
            description: property.description,
            value: Project[property.name],
            placeholder: property.placeholder,
            type: property.type
        };
        if (property.name === "name") { // Replace name label & description
            entry.label = "Project File Name";
            entry.placeholder = property.placeholder;
            entry.description = "The file name of your Blockbench project.";
        }
        else if (property.name === "model_identifier") { // Replace model id label (used as mod id in export)
            entry.label = "Mod ID";
            entry.placeholder = "example_mod || ExampleMod.MOD_ID";
            entry.description = "Your mod's mod id. Can reference a static string (e.g. in your main class), otherwise will be exported as a string.";
        }
        else if (property.name === FLIP_Y_PROPERTY) { // Add texture size after Flip Y Axis
            form.texture_size = {
                label: "dialog.project.texture_size",
                description: "The model's texture size.",
                type: "vector",
                dimensions: 2,
                linked_ratio: true,
                value: [Project.texture_width, Project.texture_height],
                min: 1
            };
            form["".concat(property.name, "_whitespace")] = { label: "", text: "", type: "info" }; // whitespace
        }
        else if (property.name === EXPORT_VERSION_PROPERTY) { // Add whitespace after Export Version
            form["".concat(property.name, "_whitespace")] = { label: "", text: "", type: "info" };
        }
        if (property.type == "boolean")
            entry.type = "checkbox";
        if (property.type == "string")
            entry.type = "text";
        if (property["options"]) {
            var entryOptions = property["options"];
            if (entryOptions["whitespace"]) {
                form["".concat(property.name, "_whitespace")] = { label: "", text: "", type: "info" }; // whitespace
                var clone = __assign({}, entryOptions);
                delete clone["whitespace"];
                entryOptions = clone;
            }
            delete entryOptions["class_export"];
            delete entryOptions["superclass_export"];
            if (Object.keys(entryOptions).length > 0) {
                // @ts-ignore
                entry["options"] = entryOptions;
                entry.type = "select";
            }
        }
        if (form.name && (Project.save_path || Project.export_path || Format.image_editor) && !Format.legacy_editable_file_name) {
            delete form.name;
        }
    }
    form.custom_settings = {
        label: "Custom Class Names",
        description: "Settings for custom exported class & superclass names.",
        options: {
            // default: "None",
            class: "Classes",
            superclass: "Superclasses"
        },
        type: "inline_multi_select"
    };
    return form;
}
function openMahiProjectSettingsDialog() {
    if (Project instanceof ModelProject) {
        var form = createMahiFormConfig();
        var dialog_1 = new Dialog({
            id: "mahi_project_settings",
            title: "Mahi Project Settings",
            width: 500,
            form: form,
            onConfirm: function (formResult, event) {
                Blockbench.showQuickMessage(formResult.filename, 5000);
                dialog_1.hide();
            }
        });
        dialog_1.show();
    }
    return true;
}
// Util methods
function getExampleEntityName() {
    var index = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_0__.FANCY_VANILLA_ENTITIES.length);
    return _constants__WEBPACK_IMPORTED_MODULE_0__.FANCY_VANILLA_ENTITIES[index];
}
function getEntityModelName(entityName, fallbackName) {
    return getClassNameFromEntity(entityName, fallbackName, "Model");
}
function getEntityAnimationName(entityName, fallbackName) {
    return getClassNameFromEntity(entityName, fallbackName, "Animation");
}
function getEntityRendererName(entityName, fallbackName) {
    return getClassNameFromEntity(entityName, fallbackName, "Renderer");
}
function getEntityRenderStateName(entityName, fallbackName) {
    return getClassNameFromEntity(entityName, fallbackName, "RenderState");
}
function getClassNameFromEntity(entityName, fallbackName, suffix) {
    return (entityName === "" ? fallbackName : entityName) + suffix;
}
function createMahiPluginProperty(type, id, options) {
    return new Property(ModelProject, type, id, options);
}
function isMahiProject() {
    return { formats: [_constants__WEBPACK_IMPORTED_MODULE_0__.CODEC_NAME] };
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
/* harmony export */   createRendererTemplate: () => (/* binding */ createRendererTemplate),
/* harmony export */   getTemplateOptionNames: () => (/* binding */ getTemplateOptionNames)
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
    },
    "26.1-snapshot1-mojmaps": {
        name: "Fabric 26.1-snapshot1 (Mojmaps)",
        model: _templates_modelTemplates__WEBPACK_IMPORTED_MODULE_0__.MODEL_TEMPLATE_26_1_SNAPSHOT_1,
        animation: _templates_animationTemplates__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_TEMPLATE_26_1_SNAPSHOT_1,
        renderer: _templates_rendererTemplates__WEBPACK_IMPORTED_MODULE_2__.RENDERER_TEMPLATE_26_1_SNAPSHOT_1,
        renderState: _templates_renderStateTemplates__WEBPACK_IMPORTED_MODULE_3__.RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1
    }
};
function getTemplateOptionNames() {
    var options = {};
    for (var key in TEMPLATES) {
        options[key] = TEMPLATES[key].name;
    }
    return options;
}
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
/* harmony export */   ANIMATION_TEMPLATE_1_21_11: () => (/* binding */ ANIMATION_TEMPLATE_1_21_11),
/* harmony export */   ANIMATION_TEMPLATE_26_1_SNAPSHOT_1: () => (/* binding */ ANIMATION_TEMPLATE_26_1_SNAPSHOT_1)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var ANIMATION_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createAnimationTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(animation_class) {\n    \n    }\n");
var ANIMATION_TEMPLATE_26_1_SNAPSHOT_1 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createAnimationTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(animation_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/format/templates/modelTemplates.ts"
/*!***********************************************!*\
  !*** ./ts/format/templates/modelTemplates.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODEL_TEMPLATE_1_21_11: () => (/* binding */ MODEL_TEMPLATE_1_21_11),
/* harmony export */   MODEL_TEMPLATE_26_1_SNAPSHOT_1: () => (/* binding */ MODEL_TEMPLATE_26_1_SNAPSHOT_1)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var MODEL_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createModelTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(model_class) {\n    \n    }\n");
var MODEL_TEMPLATE_26_1_SNAPSHOT_1 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createModelTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(model_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/format/templates/renderStateTemplates.ts"
/*!*****************************************************!*\
  !*** ./ts/format/templates/renderStateTemplates.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RENDER_STATE_TEMPLATE_1_21_11: () => (/* binding */ RENDER_STATE_TEMPLATE_1_21_11),
/* harmony export */   RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1: () => (/* binding */ RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var RENDER_STATE_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createRenderStateTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(render_state_class) {\n    \n    }\n");
var RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createRenderStateTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(render_state_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/format/templates/rendererTemplates.ts"
/*!**************************************************!*\
  !*** ./ts/format/templates/rendererTemplates.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RENDERER_TEMPLATE_1_21_11: () => (/* binding */ RENDERER_TEMPLATE_1_21_11),
/* harmony export */   RENDERER_TEMPLATE_26_1_SNAPSHOT_1: () => (/* binding */ RENDERER_TEMPLATE_26_1_SNAPSHOT_1)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");

var RENDERER_TEMPLATE_1_21_11 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createRendererTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(renderer_class) {\n    \n    }\n");
var RENDERER_TEMPLATE_26_1_SNAPSHOT_1 = (0,_templates__WEBPACK_IMPORTED_MODULE_0__.createRendererTemplate)("\n    // Made with Blockbench %(bb_version) and Mahi %(mahi_version)\n    // Exported for Minecraft version %(mc_versions)\n    // Paste this class into your mod and generate all the required imports\n    public class %(renderer_class) {\n    \n    }\n");


/***/ },

/***/ "./ts/utils.ts"
/*!*********************!*\
  !*** ./ts/utils.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Monkeypatches: () => (/* binding */ Monkeypatches),
/* harmony export */   addMonkeypatch: () => (/* binding */ addMonkeypatch),
/* harmony export */   removeMonkeypatches: () => (/* binding */ removeMonkeypatches)
/* harmony export */ });
// Credit to the Geckolib Blockbench plugin for the Monkeypatch code
// https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/utils.ts
var Monkeypatches = new Map();
var addMonkeypatch = function (symbol, path, functionKey, newFunction) {
    var pathAccessor = path ? symbol[path] : symbol;
    if (!Monkeypatches.get(symbol))
        Monkeypatches.set(symbol, { _pathAccessor: pathAccessor });
    Monkeypatches.get(symbol)[functionKey] = pathAccessor[functionKey];
    pathAccessor[functionKey] = newFunction;
};
var removeMonkeypatches = function () {
    Monkeypatches.forEach(function (symbol) {
        Object.keys(symbol).forEach(function (functionKey) {
            if (functionKey.startsWith('_'))
                return;
            symbol._pathAccessor[functionKey] = symbol[functionKey];
        });
    });
    Monkeypatches.clear();
};


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
/* harmony import */ var _format_mahiActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format/mahiActions */ "./ts/format/mahiActions.ts");
/* harmony import */ var _format_mahiPluginProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./format/mahiPluginProperties */ "./ts/format/mahiPluginProperties.ts");



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
            (0,_format_mahiPluginProperties__WEBPACK_IMPORTED_MODULE_2__.loadMahiProperties)();
            (0,_format_mahiActions__WEBPACK_IMPORTED_MODULE_1__.loadMahiActions)();
        },
        onunload: function () {
            (0,_format_mahiPluginProperties__WEBPACK_IMPORTED_MODULE_2__.unloadMahiProperties)();
            (0,_format_mahiActions__WEBPACK_IMPORTED_MODULE_1__.unloadMahiActions)();
        }
    });
})();

})();

/******/ })()
;