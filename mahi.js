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
// These are used for the examples/placeholders of settings (has caused a surprising amount of headaches to implement)
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

/***/ "./ts/format/actions.ts"
/*!******************************!*\
  !*** ./ts/format/actions.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadMahiActions: () => (/* binding */ loadMahiActions),
/* harmony export */   unloadMahiActions: () => (/* binding */ unloadMahiActions)
/* harmony export */ });
/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format */ "./ts/format/format.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./ts/utils.ts");
/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./properties */ "./ts/format/properties.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates */ "./ts/format/templates.ts");
/* harmony import */ var _templates_templateUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templates/templateUtils */ "./ts/format/templates/templateUtils.ts");






var exportMahiProject = new Action("export_mahi_project", {
    name: "Export Mahi Entity",
    icon: "fa-fish-fins",
    condition: function () { return (0,_format__WEBPACK_IMPORTED_MODULE_0__.isFormatMahiEntity)(); },
    click: function () {
        openExportProjectSettings();
    }
});
var exportMahiModel = new Action("export_mahi_model", {
    name: "Export Mahi Model",
    icon: "view_in_ar",
    condition: function () { return (0,_format__WEBPACK_IMPORTED_MODULE_0__.isFormatMahiEntity)(); },
    click: function () {
        openExportProjectSettings(true, false, false, false);
    }
});
var exportMahiAnimations = new Action("export_mahi_animations", {
    name: "Export Mahi Animations",
    icon: "animation",
    condition: function () { return (0,_format__WEBPACK_IMPORTED_MODULE_0__.isFormatMahiEntity)(); },
    click: function () {
        openExportProjectSettings(false, true, false, true);
    }
});
var buttonOfHope = new Action("button_of_hope", {
    name: "Button of Hope",
    icon: "fa-frog",
    condition: function () { return (0,_format__WEBPACK_IMPORTED_MODULE_0__.isFormatMahiEntity)() && Animator.open && Timeline.selected.length && Timeline.selected.find(function (kf) { return kf.transform; }); },
    click: function () {
        Undo.initEdit({ keyframes: Timeline.selected });
        Timeline.selected.forEach(function (keyframe) {
            if (keyframe.transform) {
                keyframe["easing"] = "custom";
                var element = document.getElementById(keyframe.uuid);
                if (element && element.children && keyframe["easing"]) {
                    element.children[0].className = "apparently-you-can-just-change-the-class-name";
                }
            }
        });
        Undo.finishEdit("Change keyframes interpolation");
        updateKeyframeSelection();
    }
});
function loadMahiActions() {
    MenuBar.addAction(exportMahiModel, "file.export");
    MenuBar.addAction(exportMahiAnimations, "file.export");
    MenuBar.addAction(exportMahiProject, "file.export");
    MenuBar.addAction(buttonOfHope, "animation");
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.addMonkeypatch)(BarItems, "project_window", "click", monkeypatchMahiProjectWindowClick);
}
function unloadMahiActions() {
    exportMahiModel.delete();
    exportMahiAnimations.delete();
    exportMahiProject.delete();
}
function monkeypatchMahiProjectWindowClick() {
    if (Format.id === _constants__WEBPACK_IMPORTED_MODULE_1__.CODEC_NAME) {
        (0,_properties__WEBPACK_IMPORTED_MODULE_3__.openMahiProjectSettingsDialog)();
    }
    else {
        return _utils__WEBPACK_IMPORTED_MODULE_2__.Monkeypatches.get(BarItems).click();
    }
}
function openExportProjectSettings(exportModel, exportAnimation, exportRenderer, exportRenderState) {
    if (exportModel === void 0) { exportModel = true; }
    if (exportAnimation === void 0) { exportAnimation = true; }
    if (exportRenderer === void 0) { exportRenderer = true; }
    if (exportRenderState === void 0) { exportRenderState = true; }
    var form = createExportInputForm(exportModel, exportAnimation, exportRenderer, exportRenderState);
    form.select_all_none = {
        type: "buttons",
        buttons: ["generic.select_all", "generic.select_none", "Model Change", "Animation Change"],
        click: function (index) {
            switch (index) {
                case 0: return dialog.setFormValues({
                    export_model: true,
                    export_animation: true,
                    export_renderer: true,
                    export_renderstate: true
                });
                case 1: return dialog.setFormValues({
                    export_model: false,
                    export_animation: false,
                    export_renderer: false,
                    export_renderstate: false
                });
                case 2: return dialog.setFormValues({
                    export_model: true,
                    export_animation: false,
                    export_renderer: false,
                    export_renderstate: false
                });
                case 3: return dialog.setFormValues({
                    export_model: false,
                    export_animation: true,
                    export_renderer: false,
                    export_renderstate: true
                });
            }
        }
    };
    var dialog = new Dialog({
        id: "mahi_project_export",
        title: "Mahi Entity Export Settings",
        form: form,
        onConfirm: function (formResult, event) {
            if (formResult.export_animation) {
                openExportAnimationSettings(formResult);
            }
            else {
                exportProject(formResult);
            }
            dialog.hide();
        }
    });
    dialog.show();
}
function createExportInputForm(exportModelDefault, exportAnimationDefault, exportRendererDefault, exportRenderStateDefault) {
    return {
        export_model: {
            label: "Export Entity Model",
            description: "Save your Entity Model to your computer.",
            value: exportModelDefault,
            type: "checkbox",
        },
        export_animation: {
            label: "Export Entity Animation",
            description: "Save your Entity Animations to your computer.",
            value: exportAnimationDefault,
            type: "checkbox",
        },
        export_renderer: {
            label: "Export Entity Renderer Template",
            description: "Save a Entity Renderer template to your computer.",
            value: exportRendererDefault,
            type: "checkbox",
        },
        export_renderstate: {
            label: "Export Entity Render State Template",
            description: "Save a Entity Render State template to your computer.",
            value: exportRenderStateDefault,
            type: "checkbox",
        }
    };
}
function openExportAnimationSettings(exportFormResults) {
    var form = {};
    var keys = [];
    var animations = Animation["all"].slice();
    if (Format.animation_files)
        animations.sort(function (a, b) { return a.path.hashCode() - b.path.hashCode(); });
    animations.forEach(function (animation) {
        var key = animation.name;
        keys.push(key);
        form[key.hashCode()] = {
            label: key,
            type: "checkbox",
            value: true
        };
    });
    form.select_all_none = {
        type: "buttons",
        buttons: ["generic.select_all", "generic.select_none"],
        click: function (index) {
            var values = {};
            keys.forEach(function (key) { return values[key.hashCode()] = (index == 0); });
            dialog.setFormValues(values);
        }
    };
    var dialog = new Dialog({
        id: "mahi_animation_export",
        title: "dialog.animation_export.title",
        form: form,
        onConfirm: function (formResult, event) {
            if (exportFormResults != undefined) {
                exportProject(exportFormResults, formResult, keys);
            }
            dialog.hide();
        }
    });
    dialog.show();
}
function exportProject(exportFormResults, animationFormResults, animationKeys) {
    if (exportFormResults.export_model) {
        exportModel();
    }
    if (exportFormResults.export_animation && animationFormResults != undefined && animationKeys != undefined) {
        exportAnimation(animationFormResults, animationKeys);
    }
    if (exportFormResults.export_renderer) {
        exportRenderer();
    }
    if (exportFormResults.export_renderstate) {
        exportRenderState(animationFormResults, animationKeys);
    }
}
function exportModel() {
}
function exportAnimation(animationFormResult, animationKeys) {
    var animationTemplate = (0,_templates__WEBPACK_IMPORTED_MODULE_4__.getProjectTemplateSet)().animation;
    var keys = animationKeys.filter(function (key) { return animationFormResult[key.hashCode()]; });
    var animations = keys.map(function (k) { return Animation["all"].find(function (anim) { return anim.name == k; }); });
    var content = animationTemplate.createFileContent(animations);
    Blockbench.export({
        resource_id: "mahi_animations",
        type: "Mahi Modded Entity Animations",
        extensions: ["java"],
        name: (0,_templates_templateUtils__WEBPACK_IMPORTED_MODULE_5__.getProjectAnimationClass)(),
        content: content
    });
}
function exportRenderer() {
}
function exportRenderState(animationFormResult, animationKeys) {
    var renderStateTemplate = (0,_templates__WEBPACK_IMPORTED_MODULE_4__.getProjectTemplateSet)().renderState;
    var animations = "";
    if (animationFormResult != undefined && animationKeys != undefined) {
        var keys = animationKeys.filter(function (key) { return animationFormResult[key.hashCode()]; });
        animations = keys.map(function (k) { return Animation["all"].find(function (anim) { return anim.name == k; }); });
    }
    var content = renderStateTemplate.createFileContent(animations);
    Blockbench.export({
        resource_id: "mahi_renderstate",
        type: "Mahi Modded Render State",
        extensions: ["java"],
        name: (0,_templates_templateUtils__WEBPACK_IMPORTED_MODULE_5__.getProjectRenderStateClass)(),
        content: content
    });
}


/***/ },

/***/ "./ts/format/easing/easingTypes.ts"
/*!*****************************************!*\
  !*** ./ts/format/easing/easingTypes.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EASING_TYPES: () => (/* binding */ EASING_TYPES),
/* harmony export */   FADE_IN_OUT_SVG: () => (/* binding */ FADE_IN_OUT_SVG),
/* harmony export */   FADE_IN_SVG: () => (/* binding */ FADE_IN_SVG),
/* harmony export */   FADE_OUT_SVG: () => (/* binding */ FADE_OUT_SVG)
/* harmony export */ });
/* harmony import */ var _easings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easings */ "./ts/format/easing/easings.ts");

// List of all easing types available. Default SVGs copy-pasted from the Geckolib Blockbench Plugin:
// https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/animationUi.ts
var FADE_IN_SVG = "<svg viewBox=\"0 0 6.3499999 6.3500002\" height=\"24\" width=\"24\"><g transform=\"translate(0,-290.64998)\"><path d=\"m 0.52916667,296.47081 c 4.23333333,0 5.29166663,-1.05833 5.29166663,-5.29166\" style=\"fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\"/></g></svg>";
var FADE_OUT_SVG = "<svg viewBox=\"0 0 6.3499999 6.3500002\" height=\"24\" width=\"24\"><g transform=\"translate(0,-290.64998)\"><path d=\"m 0.52916667,296.47081 c 0,-4.23333 1.05833333,-5.29166 5.29166663,-5.29166\" style=\"fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\"/></g></svg>";
var FADE_IN_OUT_SVG = "<svg viewBox=\"0 0 6.3499999 6.3500002\" height=\"24\" width=\"24\"><g transform=\"translate(0,-290.64998)\"><path d=\"m 0.52916667,296.47081 c 5.55625003,0 -0.26458334,-5.29166 5.29166663,-5.29166\" style=\"fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\"/></g></svg>";
var EASING_TYPES = {
    "linear": {
        in: function (amount) { return amount; },
        svg: "<svg viewBox=\"0 0 6.3499999 6.3500002\" height=\"24\" width=\"24\"><g transform=\"translate(0,-290.64998)\"><path d=\"M 0.52916667,296.47081 5.8208333,291.17915\" style=\"fill:none;stroke-width:0.52916667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\"/></g></svg>"
    },
    "sine": {
        in: _easings__WEBPACK_IMPORTED_MODULE_0__.easeInSine,
        out: _easings__WEBPACK_IMPORTED_MODULE_0__.easeOutSine,
        inOut: _easings__WEBPACK_IMPORTED_MODULE_0__.easeInOutSine,
        svg: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 6.3499999 6.3500002\"><g transform=\"translate(0,-290.64998)\"><path d=\"m 0.52916667,296.47081 c 1.32291663,0 4.23333333,-3.43958 5.29166663,-5.29166\" style=\"fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\"/></g></svg>"
    }
};


/***/ },

/***/ "./ts/format/easing/easings.ts"
/*!*************************************!*\
  !*** ./ts/format/easing/easings.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easeInOutSine: () => (/* binding */ easeInOutSine),
/* harmony export */   easeInSine: () => (/* binding */ easeInSine),
/* harmony export */   easeOutSine: () => (/* binding */ easeOutSine),
/* harmony export */   lerp: () => (/* binding */ lerp)
/* harmony export */ });
// Util file with all the easings from https://easings.net/
function lerp(start, end, amount) {
    return amount * (end - start) + start;
}
// Sine
function easeInSine(amount) {
    return 1 - Math.cos(amount * (Math.PI / 2));
}
function easeOutSine(amount) {
    return Math.sin((amount * Math.PI) / 2);
}
function easeInOutSine(amount) {
    return -(Math.cos(Math.PI * amount) - 1) / 2;
}


/***/ },

/***/ "./ts/format/easing/keyframe.ts"
/*!**************************************!*\
  !*** ./ts/format/easing/keyframe.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadMahiKeyframeEasings: () => (/* binding */ loadMahiKeyframeEasings),
/* harmony export */   unloadMahiKeyframeEasings: () => (/* binding */ unloadMahiKeyframeEasings)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./ts/utils.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _easings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./easings */ "./ts/format/easing/easings.ts");
/* harmony import */ var _easingTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./easingTypes */ "./ts/format/easing/easingTypes.ts");




/*
File which handles all the custom easing stuff on keyframes.
This has been designed to be easily copy-pasted into other plugins,
as long as you have the easings.ts & easingTypes.ts files, and an addMonkeypatch function (see utils.ts).

I've left some comments to try to make sense of what on earth is happening in this abomination
^ used to Java mixins lol

This heavily based on the Geckolib Blockbench Plugin's custom easing:
https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/keyframe.ts
https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/animationUi.ts
Some user-facing things like icons and button placements have been intentionally kept the same for consistency
(Also Geckolib just does it really well imo)
 */
var BAR_MENU_IDS = new Set();
function loadMahiKeyframeEasings() {
    // Listen to Blockbench events for various activities
    Blockbench.on("update_keyframe_selection", createEasingMenu);
    // Monkeypatch custom easing function which handles a keyframe's "easing" property
    // @ts-ignore
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addMonkeypatch)(Keyframe, "prototype", "getLerp", monkeypatchMahiKeyframeLerping);
}
function unloadMahiKeyframeEasings() {
    // Remove our listened events
    Blockbench.removeListener("update_keyframe_selection", createEasingMenu);
    // Monkeypatches are automatically removed in the index.ts unload function
}
var createEasingMenu = function () {
    if (!applyToProject())
        return; // Don't apply to projects this shouldn't be applied too
    if (!document.getElementById("panel_keyframe"))
        return; // Don't apply if no keyframe panel
    // Remove all added menus to prevent duplication - if they should still be visible, they'll be recreated here
    BAR_MENU_IDS.forEach(function (barId) {
        $("#".concat(barId)).remove(); // Prevent added inputs from duplicating somehow
    });
    var easingBar = createAndAppendKeyframeBar("easing");
    // Add all easing types to the easing bar
    for (var easingKey in _easingTypes__WEBPACK_IMPORTED_MODULE_3__.EASING_TYPES) {
        var easingType = _easingTypes__WEBPACK_IMPORTED_MODULE_3__.EASING_TYPES[easingKey];
        addEasingTypeButton(easingBar, easingKey, easingType);
    }
    var selectedEasingKey = getSelectedKeyframesEasingKey();
    // Highlight the selected easing type by making its color the accent color (blue by default)
    var selectedEasingElement = document.getElementById("kf_easing_type_" + selectedEasingKey);
    selectedEasingElement.style.stroke = "var(--color-accent)";
    selectedEasingElement.classList.add("selected_kf_easing");
    if (selectedEasingKey !== "linear") {
        // Change the interpolation dropdown text content to say "Custom (Mahi)"
        document.getElementById("panel_keyframe").querySelector("div.bb-select").textContent = "Custom (Mahi)";
    }
    // Add the fade types to the easing bar based on the currently selected easing type
    if (selectedEasingKey !== null && _easingTypes__WEBPACK_IMPORTED_MODULE_3__.EASING_TYPES[selectedEasingKey]) {
        var easingType = _easingTypes__WEBPACK_IMPORTED_MODULE_3__.EASING_TYPES[selectedEasingKey];
        // EasingTypes always have an "in" function, but may not have an "out" or "inOut" function
        // If they have either an "out" or "inOut", display both that one and the "in" as an option
        if (easingType.out || easingType.inOut) {
            var fadeBar = createAndAppendKeyframeBar("easing_fade", "Fade");
            addFadeTypeButton(fadeBar, "in", "In", _easingTypes__WEBPACK_IMPORTED_MODULE_3__.FADE_IN_SVG);
            if (easingType.out)
                addFadeTypeButton(fadeBar, "out", "Out", _easingTypes__WEBPACK_IMPORTED_MODULE_3__.FADE_OUT_SVG);
            if (easingType.inOut)
                addFadeTypeButton(fadeBar, "inout", "In & Out", _easingTypes__WEBPACK_IMPORTED_MODULE_3__.FADE_IN_OUT_SVG);
            var selectedFadeKey = getSelectedKeyframesFadeKey();
            var selectedFadeElement = document.getElementById("kf_fade_type_" + selectedFadeKey);
            selectedFadeElement.style.stroke = "var(--color-accent)";
            selectedFadeElement.classList.add("selected_kf_fade");
        }
    }
};
// Adds an element to the easing bar which has an SVG icon and sets the easing type of all selected keyframes on click
function addEasingTypeButton(easingBar, easingId, easingType) {
    // const div: HTMLDivElement = document.createElement("div");
    // div.innerHTML = easingType.svg;
    // div.id = "kf_easing_type_" + easingId;
    // div.setAttribute("style", "stroke:var(--color-text); margin:0px; padding:3px; width:30px; height: 30px");
    // div.setAttribute("title", `Switch to ${capitalize(easingId)} easing`);
    var div = createButtonElement("kf_easing_type_".concat(easingId), "Switch to ".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.capitalize)(easingId), " easing"), easingType.svg);
    div.onclick = function () {
        // Start the undo-able edit, adding all the currently selected keyframes
        Undo.initEdit({ keyframes: Timeline.selected });
        for (var keyframe in Timeline.selected) {
            Timeline.selected[keyframe]["easing"] = easingId;
        }
        // Ensure the changes are visible
        window.updateKeyframeSelection();
        // End undo-able edit
        Undo.finishEdit("Edit keyframe easing");
    };
    easingBar.appendChild(div);
}
function addFadeTypeButton(fadeBar, fadeId, fadeName, svg) {
    var div = createButtonElement("kf_fade_type_".concat(fadeId), "Fade ".concat(fadeName, " easing"), svg);
    div.onclick = function () {
        for (var keyframe in Timeline.selected) {
            Timeline.selected[keyframe]["easing_fade"] = fadeId;
        }
        window.updateKeyframeSelection();
    };
    fadeBar.appendChild(div);
}
function createAndAppendKeyframeBar(id, name) {
    if (name === void 0) { name = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.capitalize)(id); }
    var barId = "keyframe_bar_".concat(id);
    // Keep track of all created bar menu ids so they can be removed before creating them again
    // I opted to keep track of them instead of removing them before creating them again
    // because menus may need to be removed without being recreated(e.g. remove fade menu without having fade options)
    BAR_MENU_IDS.add(barId);
    var keyframePanel = document.getElementById("panel_keyframe");
    var bar = document.createElement("div");
    keyframePanel.appendChild(bar);
    bar.outerHTML =
        "<div class=\"bar flex\" style=\"flex-wrap: wrap\" id=".concat(barId, ">\n            <label class=\"tl\" style=\"font-weight: bolder; min-width: 47px;\">").concat(name, "</label>\n        </div>");
    return document.getElementById(barId);
}
function createButtonElement(id, title, innerHTML) {
    var div = document.createElement("div");
    div.id = id;
    div.innerHTML = innerHTML;
    div.setAttribute("style", "stroke:var(--color-text); margin:0px; padding:3px; width:30px; height:30px");
    div.setAttribute("title", title);
    return div;
}
function getSelectedKeyframesEasingKey() {
    return getSelectedKeyframesProperty("easing", "linear");
}
function getSelectedKeyframesFadeKey() {
    return getSelectedKeyframesProperty("easing_fade", "in");
}
function getSelectedKeyframesProperty(property, defaultValue, conflictValue) {
    if (conflictValue === void 0) { conflictValue = null; }
    var selectorFunction = function (keyframe) { return (keyframe[property] === undefined ? defaultValue : keyframe[property]); };
    if (Timeline.selected.length > 1) {
        // Check if all selected keyframes have the same value as the last selected keyframe
        var lastValue = selectorFunction(Timeline.selected[Timeline.selected.length - 1]);
        for (var keyframe in Timeline.selected) {
            var keyframeValue = selectorFunction(Timeline.selected[keyframe]);
            if (lastValue !== keyframeValue) {
                return conflictValue;
            }
        }
        return lastValue;
    }
    else {
        // Return either the only selected keyframes' value, or just the default value if none are selected
        if (Timeline.selected[0])
            return selectorFunction(Timeline.selected[0]);
        return defaultValue;
    }
}
function monkeypatchMahiKeyframeLerping(other, axis, amount, allow_expression) {
    if (!applyToProject()) { // Don't apply custom easings if the project is not a Mahi Entity project
        // @ts-ignore
        return _utils__WEBPACK_IMPORTED_MODULE_0__.Monkeypatches.get(Keyframe).getLerp.apply(this, arguments); // Return original getLerp function
    }
    var easing = other["easing"] || "defaultEasing";
    var easeAmount = (0,_easings__WEBPACK_IMPORTED_MODULE_2__.easeInSine)(amount);
    var start = this.data_points.length == 1 ? this.calc(axis) : this.calc(axis, 1);
    var end = other.calc(axis);
    var result = (0,_easings__WEBPACK_IMPORTED_MODULE_2__.lerp)(start, end, easeAmount);
    if (!Number.isNaN(result)) {
        return result;
    }
    return 0;
}
function applyToProject() {
    return Format.id === _constants__WEBPACK_IMPORTED_MODULE_1__.CODEC_NAME; // Codec name from my constants.ts file
}


/***/ },

/***/ "./ts/format/format.ts"
/*!*****************************!*\
  !*** ./ts/format/format.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAHI_CODEC: () => (/* binding */ MAHI_CODEC),
/* harmony export */   MAHI_FORMAT: () => (/* binding */ MAHI_FORMAT),
/* harmony export */   isFormatMahiEntity: () => (/* binding */ isFormatMahiEntity)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates */ "./ts/format/templates.ts");
/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./properties */ "./ts/format/properties.ts");



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
MAHI_CODEC.compileAnimations = function (animations) {
    if (animations === void 0) { animations = Animation["all"]; }
    var exportVersion = Project[_properties__WEBPACK_IMPORTED_MODULE_2__.EXPORT_VERSION_PROPERTY];
    var templateSet = _templates__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES[exportVersion];
    console.log(templateSet);
};
var MAHI_FORMAT = new ModelFormat(_constants__WEBPACK_IMPORTED_MODULE_0__.CODEC_NAME, {
    id: _constants__WEBPACK_IMPORTED_MODULE_0__.CODEC_NAME,
    name: "Mahi Entity",
    description: "Entity model for Minecraft Java mods using the Mahi Library. Exports to '.java' class files to load directly in your Minecraft mod.",
    icon: "fa-fish-fins",
    category: "minecraft",
    target: "Minecraft: Java Edition",
    format_page: {
        content: [
            { type: 'h3', text: tl('mode.start.format.informations') },
            { text: "* ".concat(tl('format.modded_entity.info.integer_size'), "\n\t\t\t\t\t* ").concat(tl('format.modded_entity.info.format')).replace(/\t+/g, '')
            },
            { type: "h3", text: tl('mode.start.format.resources') },
            { text: "* [Mahi Wiki](https://github.com/Superkat32/Mahi)\n\t\t\t\t\t* [Mahi Modrinth](https://github.com/Superkat32/Mahi)\n\t\t\t\t\t* [Mahi GitHub](https://github.com/Superkat32/Mahi)".replace(/\t+/g, '')
            },
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
    pbr: true,
    new: function () {
        if (newProject(this)) {
            return (0,_properties__WEBPACK_IMPORTED_MODULE_2__.openMahiProjectSettingsDialog)();
        }
    },
});
MAHI_CODEC.format = MAHI_FORMAT;
function isFormatMahiEntity() {
    return Format == MAHI_FORMAT;
}


/***/ },

/***/ "./ts/format/properties.ts"
/*!*********************************!*\
  !*** ./ts/format/properties.ts ***!
  \*********************************/
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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./ts/utils.ts");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



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
    var exampleEntity = generateExampleEntityName();
    return [
        createMahiPluginProperty("string", ENTITY_CLASS_PROPERTY, {
            label: "Entity Class",
            description: "Your Entity Class name.",
            placeholder: "".concat(exampleEntity),
            options: {
                entityPlaceholder: {
                    exampleOnly: true
                }
            },
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
            options: {
                whitespace: true
            },
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", MODEL_CLASS_PROPERTY, {
            label: "Model Class",
            description: "Your Entity's Model Class name.",
            placeholder: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityModelName)(exampleEntity),
            options: {
                whitespace: true,
                info: {
                    label: "Class Exports",
                    text: "Exported Class Names (Optional)"
                },
                entityPlaceholder: {
                    suffix: "Model"
                }
            },
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", ANIMATION_CLASS_PROPERTY, {
            label: "Animation Class",
            description: "Your Entity's Animation Class name.",
            placeholder: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityAnimationName)(exampleEntity),
            options: {
                entityPlaceholder: {
                    suffix: "Animation"
                }
            },
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", RENDERER_CLASS_PROPERTY, {
            label: "Renderer Class",
            description: "Your Entity's Renderer Class name.",
            placeholder: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityRendererName)(exampleEntity),
            options: {
                entityPlaceholder: {
                    suffix: "Renderer"
                }
            },
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", RENDER_STATE_CLASS_PROPERTY, {
            label: "Render State Class",
            description: "Your Entity's Render State Class name.",
            placeholder: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityRenderStateName)(exampleEntity),
            options: {
                entityPlaceholder: {
                    suffix: "RenderState"
                }
            },
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", MODEL_SUPERCLASS_PROPERTY, {
            label: "Model Superclass",
            description: "Your Entity Model's Superclass(extends) name.",
            placeholder: "EntityModel",
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", RENDERER_SUPERCLASS_PROPERTY, {
            label: "Renderer Superclass",
            description: "Your Entity Renderer's Superclass(extends) name.",
            placeholder: "MobRenderer",
            condition: isMahiProject(),
        }),
        createMahiPluginProperty("string", RENDER_STATE_SUPERCLASS_PROPERTY, {
            label: "RenderState Superclass",
            description: "Your Entity Render State's Superclass(extends) name.",
            placeholder: "LivingEntityRenderState",
            condition: isMahiProject(),
        }),
    ];
}
function createMahiFormConfig(exampleEntity, placeholderEntity) {
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
        var entry = {
            label: property.label,
            description: property.description,
            value: Project[property.name],
            placeholder: property.placeholder,
            type: property.type
        };
        if (property.name === "name") { // Replace name label & description
            entry.label = "Project File Name";
            entry.placeholder = "".concat(exampleEntity, "Project");
            entry.description = "The file name of your Blockbench project.";
        }
        else if (property.name === "model_identifier") { // Replace model id label (used as mod id in export)
            entry.label = "Mod ID";
            entry.placeholder = "example_mod || ExampleMod.MOD_ID";
            entry.description = "Your mod's mod id. Can reference a static string (e.g. in your main class), otherwise will be exported as a string.";
        }
        if (property.type == "boolean")
            entry.type = "checkbox";
        if (property.type == "string")
            entry.type = "text";
        if (property["options"]) {
            var entryOptions = property["options"];
            if (entryOptions["whitespace"]) { // apply whitespace before value
                form["".concat(property.name, "_whitespace")] = { label: "", text: "", type: "info" }; // whitespace value
            }
            if (entryOptions["info"]) {
                var infoOptions = entryOptions["info"];
                form["".concat(property.name, "_info")] = {
                    label: infoOptions["label"],
                    text: infoOptions["text"],
                    type: "info"
                };
            }
            if (entryOptions["entityPlaceholder"]) {
                var entityPlaceholderOptions = entryOptions["entityPlaceholder"];
                var prefix = entityPlaceholderOptions["prefix"] ? entityPlaceholderOptions["prefix"] : "";
                var suffix = entityPlaceholderOptions["suffix"] ? entityPlaceholderOptions["suffix"] : "";
                var usedEntity = entityPlaceholderOptions["exampleOnly"] ? exampleEntity : placeholderEntity;
                entry.placeholder = "".concat(prefix).concat(usedEntity).concat(suffix);
            }
            // exclude whitespace and custom_class keys in export version dropdown (I don't know why this works LOL)
            var whitespace = entryOptions.whitespace, info = entryOptions.info, entityPlaceholder = entryOptions.entityPlaceholder, selectableOptions = __rest(entryOptions, ["whitespace", "info", "entityPlaceholder"]);
            if (Object.keys(selectableOptions).length > 0) {
                // @ts-ignore
                entry["options"] = selectableOptions;
                entry.type = "select";
            }
        }
        if (form.name && (Project.save_path || Project.export_path || Format.image_editor) && !Format.legacy_editable_file_name) {
            delete form.name;
        }
        form[property.name] = entry; // Set the entry in the form
        if (property.name === FLIP_Y_PROPERTY) { // Add texture size after Flip Y Axis
            form.texture_size = {
                label: "dialog.project.texture_size",
                description: "The model's texture size.",
                type: "vector",
                dimensions: 2,
                linked_ratio: true,
                value: [Project.texture_width, Project.texture_height],
                min: 1
            };
        }
    }
    return form;
}
function openMahiProjectSettingsDialog() {
    if (Project instanceof ModelProject) {
        var exampleEntity_1 = generateExampleEntityName();
        var placeholderEntity = exampleEntity_1;
        if (Project[ENTITY_CLASS_PROPERTY] != "")
            placeholderEntity = Project[ENTITY_CLASS_PROPERTY];
        var form = createMahiFormConfig(exampleEntity_1, placeholderEntity);
        var dialog_1 = new Dialog({
            id: "mahi_project_settings",
            title: "Mahi Project Settings",
            width: 500,
            part_order: ["form", "component"],
            form: form,
            onFormChange: function (formResult) {
                try {
                    // Update the dynamic options based on the input Entity Class
                    var inputEntityName = formResult[ENTITY_CLASS_PROPERTY] != "" ? formResult[ENTITY_CLASS_PROPERTY] : exampleEntity_1;
                    // @ts-ignore
                    document.getElementById(MODEL_CLASS_PROPERTY)["placeholder"] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityModelName)(inputEntityName);
                    // @ts-ignore
                    document.getElementById(ANIMATION_CLASS_PROPERTY)["placeholder"] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityAnimationName)(inputEntityName);
                    // @ts-ignore
                    document.getElementById(RENDERER_CLASS_PROPERTY)["placeholder"] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityRendererName)(inputEntityName);
                    // @ts-ignore
                    document.getElementById(RENDER_STATE_CLASS_PROPERTY)["placeholder"] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getEntityRenderStateName)(inputEntityName);
                }
                catch (error) { }
            },
            onConfirm: function (formResult, event) {
                var save;
                var was_changed = false;
                var box_uv = formResult.uv_mode == "box_uv";
                var texture_width = Math.clamp(formResult.texture_size[0], 1, Infinity);
                var texture_height = Math.clamp(formResult.texture_size[1], 1, Infinity);
                if (Project.box_uv != box_uv
                    || Project.texture_width != texture_width
                    || Project.texture_height != texture_height) {
                    was_changed = true;
                    if (Project.box_uv != box_uv
                        && ((box_uv && !Cube.all.find(function (cube) { return cube.box_uv; }))
                            || !(box_uv && !Cube.all.find(function (cube) { return !cube.box_uv; })))) {
                        // @ts-ignore
                        if (!save)
                            save = Undo.initEdit({ elements: Cube.all, uv_only: true, uv_mode: true });
                        Cube.all.forEach(function (cube) { cube.setUVMode(box_uv); });
                        if (!save)
                            save = Undo.initEdit({ uv_mode: true });
                        Project.texture_width = texture_width;
                        Project.texture_height = texture_height;
                        if (Format.optional_box_uv)
                            Project.box_uv = box_uv;
                        Canvas.updateAllUVs();
                        updateSelection();
                    }
                }
                for (var key in ModelProject.properties) {
                    if (formResult[key] != undefined && Project[key] != formResult[key] && typeof Project[key] != "object") {
                        was_changed = true;
                    }
                    ModelProject.properties[key].merge(Project, formResult);
                }
                Project.name = Project.name.trim();
                Project.model_identifier = Project.model_identifier.trim();
                if (save)
                    Undo.finishEdit("Change project UV settings");
                if (was_changed)
                    Project.saved = false;
                Blockbench.dispatchEvent("update_project_settings", formResult);
                BARS.updateConditions();
                if (Project.EditSession) {
                    var metadata = {
                        texture_width: Project.texture_width,
                        texture_height: Project.texture_height,
                        box_uv: Project.box_uv
                    };
                    for (var key in ModelProject.properties) {
                        ModelProject.properties[key].copy(Project, metadata);
                    }
                    Project.EditSession.sendAll("change_project_meta", JSON.stringify(metadata));
                }
                dialog_1.hide();
            }
        });
        dialog_1.show();
    }
    return true;
}
// Util methods
function generateExampleEntityName() {
    var index = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_0__.FANCY_VANILLA_ENTITIES.length);
    return _constants__WEBPACK_IMPORTED_MODULE_0__.FANCY_VANILLA_ENTITIES[index];
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
/* harmony export */   CLASS_COMMENT_INFO: () => (/* binding */ CLASS_COMMENT_INFO),
/* harmony export */   TEMPLATES: () => (/* binding */ TEMPLATES),
/* harmony export */   getProjectTemplateSet: () => (/* binding */ getProjectTemplateSet),
/* harmony export */   getTemplateOptionNames: () => (/* binding */ getTemplateOptionNames)
/* harmony export */ });
/* harmony import */ var _templates_animationTemplates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templates/animationTemplates */ "./ts/format/templates/animationTemplates.ts");
/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./properties */ "./ts/format/properties.ts");
/* harmony import */ var _templates_renderStateTemplates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/renderStateTemplates */ "./ts/format/templates/renderStateTemplates.ts");



var CLASS_COMMENT_INFO = "/**\n * Made with Blockbench %(bb_version) and Mahi %(mahi_version).\n * Exported for Minecraft %(mc_version) or later.\n * <br><br>Copy this file into your mod and generate all the required imports.\n * @author %(author)\n */";
var TEMPLATES = {
    "1.21.11-mojmaps": {
        name: "Fabric 1.21.11 (Mojmaps)",
        version: "1.21.11",
        // model: MODEL_TEMPLATE_1_21_11,
        animation: _templates_animationTemplates__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_TEMPLATE_1_21_11,
        // renderer: RENDERER_TEMPLATE_1_21_11,
        renderState: _templates_renderStateTemplates__WEBPACK_IMPORTED_MODULE_2__.RENDER_STATE_TEMPLATE_1_21_11
    },
    "26.1-snapshot1-mojmaps": {
        name: "Fabric 26.1-snapshot1 (Mojmaps)",
        version: "26.1-snapshot1",
        // model: MODEL_TEMPLATE_26_1_SNAPSHOT_1,
        animation: _templates_animationTemplates__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_TEMPLATE_26_1_SNAPSHOT_1,
        // renderer: RENDERER_TEMPLATE_26_1_SNAPSHOT_1,
        renderState: _templates_renderStateTemplates__WEBPACK_IMPORTED_MODULE_2__.RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1
    }
};
function getProjectTemplateSet() {
    return TEMPLATES[Project[_properties__WEBPACK_IMPORTED_MODULE_1__.EXPORT_VERSION_PROPERTY]];
}
function getTemplateOptionNames(whitespace) {
    if (whitespace === void 0) { whitespace = false; }
    var options = {};
    for (var key in TEMPLATES) {
        options[key] = TEMPLATES[key].name;
    }
    if (whitespace) {
        options["whitespace"] = true;
    }
    return options;
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
/* harmony export */   ANIMATION_TEMPLATE_26_1_SNAPSHOT_1: () => (/* binding */ ANIMATION_TEMPLATE_26_1_SNAPSHOT_1),
/* harmony export */   AnimationTemplate: () => (/* binding */ AnimationTemplate)
/* harmony export */ });
/* harmony import */ var _templateUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templateUtils */ "./ts/format/templates/templateUtils.ts");
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

var AnimationTemplate = /** @class */ (function () {
    function AnimationTemplate(config) {
        this.config = config;
    }
    AnimationTemplate.prototype.createFileContent = function (animations) {
        var _this = this;
        if (animations === void 0) { animations = Animation["all"]; }
        var commentInfo = (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.createCommentInfo)();
        var file = new _templateUtils__WEBPACK_IMPORTED_MODULE_0__.FileBuilder(this.config.file);
        file.replaceVar("comment_info", commentInfo);
        file.replaceVar("animation_class", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.getProjectAnimationClass)());
        var animationStrings = [];
        animations.forEach(function (animation) {
            var animString = new _templateUtils__WEBPACK_IMPORTED_MODULE_0__.FileBuilder(_this.config.animation);
            animString.replaceVar("name", animation.name.toUpperCase());
            animString.replaceVar("length", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.toFloat)(animation.length));
            animString.replaceVar("looping", animation.loop == "loop" ? _this.config.looping : "");
            var channelStrings = [];
            var channelTypes = _this.config.channelTypes;
            for (var id in animation.animators) {
                var animator = animation.animators[id];
                if (!(animator instanceof BoneAnimator))
                    continue;
                var _loop_1 = function (channelId) {
                    if (!(animator[channelId] && animator[channelId].length))
                        return "continue";
                    var keyframes = animator[channelId].slice().sort(function (a, b) { return a.time - b.time; });
                    var keyframeStrings = [];
                    keyframes.forEach(function (keyframe, index) {
                        var keyframeString = _this.addKeyframe(channelId, keyframe.time, keyframe.calc("x"), keyframe.calc("y"), keyframe.calc("z"), keyframe.interpolation);
                        keyframeStrings.push(keyframeString);
                        if (keyframe.data_points[1]) {
                            var keyframeString1 = _this.addKeyframe(channelId, keyframe.time + 0.001, keyframe.calc("x", 1), keyframe.calc("y", 1), keyframe.calc("z", 1), keyframe.interpolation);
                            keyframeStrings.push(keyframeString1);
                        }
                        else if (keyframe.interpolation == "step" && keyframes[index + 1]) {
                            var nextKeyframe = keyframes[index + 1];
                            var nextKeyframeString = _this.addKeyframe(channelId, nextKeyframe.time - 0.001, keyframe.calc("x"), keyframe.calc("y"), keyframe.calc("z"), "linear");
                            keyframeStrings.push(nextKeyframeString);
                        }
                    });
                    var channelBuilder = new _templateUtils__WEBPACK_IMPORTED_MODULE_0__.FileBuilder(_this.config.channel);
                    channelBuilder.replaceVar("name", animator.name);
                    channelBuilder.replaceVar("channel_type", channelTypes[channelId]);
                    channelBuilder.replaceVar("keyframes", "\n\t\t\t" + keyframeStrings.join(",\n\t\t\t") + "\n\t\t");
                    channelStrings.push(channelBuilder.build());
                };
                for (var channelId in channelTypes) {
                    _loop_1(channelId);
                }
            }
            animString.replaceVar("channels", "\n\t\t" + channelStrings.join("\n\t\t") + "\n\t\t");
            animationStrings.push(animString.build());
        });
        file.replaceVar("animations", animationStrings.join("\n\n\t"));
        return file.build();
    };
    AnimationTemplate.prototype.addKeyframe = function (channelId, time, x, y, z, easing) {
        if (channelId == "position")
            x *= -1;
        if (channelId == "rotation") {
            x *= -1;
            y *= -1;
        }
        var keyframeBuilder = new _templateUtils__WEBPACK_IMPORTED_MODULE_0__.FileBuilder(this.config.keyframeTypes[channelId]);
        keyframeBuilder.replaceVar("time", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.toFloat)(time));
        keyframeBuilder.replaceVar("x", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.toFloat)(x));
        keyframeBuilder.replaceVar("y", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.toFloat)(y));
        keyframeBuilder.replaceVar("z", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.toFloat)(z));
        keyframeBuilder.replaceVar("easing", this.config.easingTypes[easing] || this.config.easingTypes.linear);
        return keyframeBuilder.build();
    };
    return AnimationTemplate;
}());

var ANIMATION_TEMPLATE_1_21_11 = new AnimationTemplate({
    file: "%(comment_info)\npublic class %(animation_class) {\n    %(animations)\n}",
    animation: "public static final AnimationDefinition %(name) = AnimationDefinition.Builder.withLength(%(length))%(looping)%(channels).build();",
    looping: ".looping()",
    channel: ".addAnimation(\"%(name)\", new AnimationChannel(%(channel_type), %(keyframes)))",
    channelTypes: {
        rotation: "AnimationChannel.Targets.ROTATION",
        position: "AnimationChannel.Targets.POSITION",
        scale: "AnimationChannel.Targets.SCALE"
    },
    keyframeTypes: {
        rotation: "new Keyframe(%(time), KeyframeAnimations.degreeVec(%(x), %(y), %(z)), %(easing))",
        position: "new Keyframe(%(time), KeyframeAnimations.posVec(%(x), %(y), %(z)), %(easing))",
        scale: "new Keyframe(%(time), KeyframeAnimations.scaleVec(%(x), %(y), %(z)), %(easing))"
    },
    easingTypes: {
        linear: "AnimationChannel.Interpolations.LINEAR",
        catmullrom: "AnimationChannel.Interpolations.CATMULLROM",
        custom: "YAY"
    }
});
var ANIMATION_TEMPLATE_26_1_SNAPSHOT_1 = new AnimationTemplate(__assign(__assign({}, ANIMATION_TEMPLATE_1_21_11.config), { looping: ".loop()" }));


/***/ },

/***/ "./ts/format/templates/renderStateTemplates.ts"
/*!*****************************************************!*\
  !*** ./ts/format/templates/renderStateTemplates.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RENDER_STATE_TEMPLATE_1_21_11: () => (/* binding */ RENDER_STATE_TEMPLATE_1_21_11),
/* harmony export */   RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1: () => (/* binding */ RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1),
/* harmony export */   RenderStateTemplate: () => (/* binding */ RenderStateTemplate)
/* harmony export */ });
/* harmony import */ var _templateUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templateUtils */ "./ts/format/templates/templateUtils.ts");
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

var RenderStateTemplate = /** @class */ (function () {
    function RenderStateTemplate(config) {
        this.config = config;
    }
    RenderStateTemplate.prototype.createFileContent = function (animations) {
        var _this = this;
        if (animations === void 0) { animations = Animation["all"]; }
        var commentInfo = (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.createCommentInfo)();
        var file = new _templateUtils__WEBPACK_IMPORTED_MODULE_0__.FileBuilder(this.config.file);
        file.replaceVar("comment_info", commentInfo);
        file.replaceVar("renderstate_class", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.getProjectRenderStateClass)());
        file.replaceVar("renderstate_superclass", (0,_templateUtils__WEBPACK_IMPORTED_MODULE_0__.getProjectRenderStateSuperclass)());
        var animationStrings = [];
        animations.forEach(function (animation) {
            var animString = new _templateUtils__WEBPACK_IMPORTED_MODULE_0__.FileBuilder(_this.config.animationState);
            animString.replaceVar("name", animation.name);
            animationStrings.push(animString.build());
        });
        file.replaceVar("animation_states", animationStrings.join("\n\t"));
        return file.build();
    };
    return RenderStateTemplate;
}());

var RENDER_STATE_TEMPLATE_1_21_11 = new RenderStateTemplate({
    file: "%(comment_info)\n@Environment(EnvType.CLIENT)\npublic class %(renderstate_class) extends %(renderstate_superclass) {\n    %(animation_states)\n}",
    animationState: "public final AnimationState %(name)AnimationState = new AnimationState();"
});
var RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1 = new RenderStateTemplate(__assign({}, RENDER_STATE_TEMPLATE_1_21_11.config));


/***/ },

/***/ "./ts/format/templates/templateUtils.ts"
/*!**********************************************!*\
  !*** ./ts/format/templates/templateUtils.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileBuilder: () => (/* binding */ FileBuilder),
/* harmony export */   createCommentInfo: () => (/* binding */ createCommentInfo),
/* harmony export */   getModIdStringOrReference: () => (/* binding */ getModIdStringOrReference),
/* harmony export */   getProjectAnimationClass: () => (/* binding */ getProjectAnimationClass),
/* harmony export */   getProjectEntityClass: () => (/* binding */ getProjectEntityClass),
/* harmony export */   getProjectModelClass: () => (/* binding */ getProjectModelClass),
/* harmony export */   getProjectModelSuperclass: () => (/* binding */ getProjectModelSuperclass),
/* harmony export */   getProjectRenderStateClass: () => (/* binding */ getProjectRenderStateClass),
/* harmony export */   getProjectRenderStateSuperclass: () => (/* binding */ getProjectRenderStateSuperclass),
/* harmony export */   getProjectRendererClass: () => (/* binding */ getProjectRendererClass),
/* harmony export */   getProjectRendererSuperclass: () => (/* binding */ getProjectRendererSuperclass),
/* harmony export */   getVariableRegex: () => (/* binding */ getVariableRegex),
/* harmony export */   toFloat: () => (/* binding */ toFloat)
/* harmony export */ });
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates */ "./ts/format/templates.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./ts/constants.ts");
/* harmony import */ var _properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../properties */ "./ts/format/properties.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./ts/utils.ts");




var FileBuilder = /** @class */ (function () {
    function FileBuilder(file) {
        this.file = file;
        this.regex = getVariableRegex;
    }
    FileBuilder.prototype.replaceVar = function (key, value) {
        this.file = this.file.replace(this.regex(key), value);
    };
    FileBuilder.prototype.build = function () {
        return this.file;
    };
    return FileBuilder;
}());

function createCommentInfo() {
    var info = new FileBuilder(_templates__WEBPACK_IMPORTED_MODULE_0__.CLASS_COMMENT_INFO);
    info.replaceVar("bb_version", Blockbench.version);
    info.replaceVar("mahi_version", _constants__WEBPACK_IMPORTED_MODULE_1__.VERSION);
    info.replaceVar("mc_version", _templates__WEBPACK_IMPORTED_MODULE_0__.TEMPLATES[Project[_properties__WEBPACK_IMPORTED_MODULE_2__.EXPORT_VERSION_PROPERTY]].version);
    info.replaceVar("author", Settings.get("username").toString() || "Author");
    return info.build();
}
function getVariableRegex(name) {
    return new RegExp("%\\(".concat(name, "\\)"), 'g');
}
function getModIdStringOrReference() {
    var modelIdentifier = Project.model_identifier;
    if (!modelIdentifier || modelIdentifier == "")
        return '"mod_id"';
    if (modelIdentifier.includes(".")) { // assume modid entry is a static string reference
        return modelIdentifier;
    }
    return "\"".concat(modelIdentifier, "\"");
}
function getProjectEntityClass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.ENTITY_CLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.ENTITY_CLASS_PROPERTY];
    return "Entity";
}
function getProjectModelClass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.MODEL_CLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.MODEL_CLASS_PROPERTY];
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getEntityModelName)(getProjectEntityClass());
}
function getProjectAnimationClass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_CLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.ANIMATION_CLASS_PROPERTY];
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getEntityAnimationName)(getProjectEntityClass());
}
function getProjectRendererClass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDERER_CLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDERER_CLASS_PROPERTY];
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getEntityRendererName)(getProjectEntityClass());
}
function getProjectRenderStateClass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDER_STATE_CLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDER_STATE_CLASS_PROPERTY];
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getEntityRenderStateName)(getProjectEntityClass());
}
function getProjectModelSuperclass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.MODEL_SUPERCLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.MODEL_SUPERCLASS_PROPERTY];
    return "EntityModel";
}
function getProjectRendererSuperclass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDERER_SUPERCLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDERER_SUPERCLASS_PROPERTY];
    return "MobRenderer";
}
function getProjectRenderStateSuperclass() {
    if (Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDER_STATE_SUPERCLASS_PROPERTY])
        return Project[_properties__WEBPACK_IMPORTED_MODULE_2__.RENDER_STATE_SUPERCLASS_PROPERTY];
    return "LivingEntityRenderState";
}
function toFloat(number) {
    var trimmed = trimFloatNumber(number) + '';
    if (!trimmed.includes(".")) {
        trimmed += ".0";
    }
    return "".concat(trimmed, "F");
}


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
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   getEntityAnimationName: () => (/* binding */ getEntityAnimationName),
/* harmony export */   getEntityModelName: () => (/* binding */ getEntityModelName),
/* harmony export */   getEntityRenderStateName: () => (/* binding */ getEntityRenderStateName),
/* harmony export */   getEntityRendererName: () => (/* binding */ getEntityRendererName),
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
// End of Geckolib copy-pasted code
function getEntityModelName(entityName) {
    return getClassNameFromEntity(entityName, "Model");
}
function getEntityAnimationName(entityName) {
    return getClassNameFromEntity(entityName, "Animation");
}
function getEntityRendererName(entityName) {
    return getClassNameFromEntity(entityName, "Renderer");
}
function getEntityRenderStateName(entityName) {
    return getClassNameFromEntity(entityName, "RenderState");
}
function getClassNameFromEntity(entityName, suffix) {
    // if(entityName != "") entityName = Project[ENTITY_CLASS_PROPERTY];
    return entityName + suffix;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


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
/* harmony import */ var _format_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format/actions */ "./ts/format/actions.ts");
/* harmony import */ var _format_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./format/properties */ "./ts/format/properties.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./ts/utils.ts");
/* harmony import */ var _format_easing_keyframe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./format/easing/keyframe */ "./ts/format/easing/keyframe.ts");





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
            (0,_format_properties__WEBPACK_IMPORTED_MODULE_2__.loadMahiProperties)();
            (0,_format_actions__WEBPACK_IMPORTED_MODULE_1__.loadMahiActions)();
            (0,_format_easing_keyframe__WEBPACK_IMPORTED_MODULE_4__.loadMahiKeyframeEasings)();
        },
        onunload: function () {
            (0,_format_properties__WEBPACK_IMPORTED_MODULE_2__.unloadMahiProperties)();
            (0,_format_actions__WEBPACK_IMPORTED_MODULE_1__.unloadMahiActions)();
            (0,_format_easing_keyframe__WEBPACK_IMPORTED_MODULE_4__.unloadMahiKeyframeEasings)();
            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.removeMonkeypatches)();
        }
    });
})();

})();

/******/ })()
;