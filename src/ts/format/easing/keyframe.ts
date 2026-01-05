import {addMonkeypatch, capitalize, Monkeypatches} from "../../utils";
import {CODEC_NAME} from "../../constants";
import {lerp} from "./easings";
import {EASING_TYPES, EasingType, FADE_IN_OUT_SVG, FADE_IN_SVG, FADE_OUT_SVG} from "./easingTypes";

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

// Replace this with a special identifier - used to remove the buttons/bars without messing up other project types.
const keyframeProjectId: string = "mahi";

// Replace the CODEC_NAME with your plugin's format id.
function applyToProject(): boolean {
    return Format.id === CODEC_NAME; // Codec name from my constants.ts file
}

// Change the file path here as needed (`../` is go backwards a folder)
const EASING_CSS = require("../../../resources/easing_keyframes.css").toString();

const BAR_MENU_IDS: Set<string> = new Set();

export function loadMahiKeyframeEasings(): void {
    // Add our custom keyframe easing CSS for the keyframe icons
    Blockbench.addCSS(EASING_CSS);

    // Listen to Blockbench events for various activities
    Blockbench.on("update_keyframe_selection", createEasingMenu);
    Blockbench.on("render_frame", renderCustomKeyframeIcons);

    // Monkeypatch custom easing function which handles a keyframe's "easing" property
    // @ts-ignore
    addMonkeypatch(Keyframe, "prototype", "getLerp", monkeypatchMahiKeyframeLerping);
}

export function unloadMahiKeyframeEasings(): void {
    // Remove our listened events
    Blockbench.removeListener("update_keyframe_selection", createEasingMenu);
    Blockbench.removeListener("render_frame", renderCustomKeyframeIcons);
    // Monkeypatches are automatically removed in the index.ts unload function
}

const createEasingMenu = () => {
    // Remove all added menus to prevent duplication - if they should still be visible, they'll be recreated here
    // Needs to be removed regardless of if custom easings should apply to this project in case of project tab switch
    BAR_MENU_IDS.forEach((barId) => {
        $(`#${barId}`).remove(); // Prevent added inputs from duplicating somehow
    })

    if(!applyToProject()) return; // Don't apply to projects this shouldn't be applied too
    if(!document.getElementById("panel_keyframe")) return; // Don't apply if no keyframe panel


    // List of all available easing types
    let easingBar: HTMLElement = createAndAppendKeyframeBar("easing");

    // Add all easing types to the easing bar
    for (let easingKey in EASING_TYPES) {
        let easingType: EasingType = EASING_TYPES[easingKey];
        addEasingTypeButton(easingBar, easingKey, easingType);
    }

    const selectedEasingKey: string = getSelectedKeyframesEasingKey();

    // Highlight the selected easing type by making its color the accent color (blue by default)
    const selectedEasingElement = document.getElementById("kf_easing_type_" + selectedEasingKey);
    selectedEasingElement.style.stroke = "var(--color-accent)";
    selectedEasingElement.classList.add("selected_kf_easing");

    if(selectedEasingKey !== "linear") {
        // Change the interpolation dropdown text content to say "Custom (Mahi)"
        document.getElementById("panel_keyframe").querySelector("div.bb-select").textContent = "Custom (Mahi)";
    }

    // Add the fade types to the easing bar based on the currently selected easing type
    if(selectedEasingKey !== null && EASING_TYPES[selectedEasingKey]) {
        const easingType: EasingType = EASING_TYPES[selectedEasingKey];

        // EasingTypes always have an "in" function, but may not have an "out" or "inOut" function
        // If they have either an "out" or "inOut", display both that one and the "in" as an option
        if(easingType.out || easingType.inOut) {
            // List of all available fade types
            let fadeBar: HTMLElement = createAndAppendKeyframeBar("easing_fade", "Fade");
            addFadeTypeButton(fadeBar, "in", "In", FADE_IN_SVG);

            if(easingType.out)
                addFadeTypeButton(fadeBar, "out", "Out", FADE_OUT_SVG);

            if(easingType.inOut)
                addFadeTypeButton(fadeBar, "inout", "In & Out", FADE_IN_OUT_SVG);

            const selectedFadeKey: string = getSelectedKeyframesFadeKey();
            const selectedFadeElement = document.getElementById("kf_fade_type_" + selectedFadeKey);
            selectedFadeElement.style.stroke = "var(--color-accent)";
            selectedFadeElement.classList.add("selected_kf_fade");
        }
    }
}

// Adds an element to the easing bar which has an SVG icon and sets the easing type of all selected keyframes on click
function addEasingTypeButton(easingBar: HTMLElement, easingId: string, easingType: EasingType): void {
    const div: HTMLElement = createButtonElement(
        `kf_easing_type_${easingId}`,
        `Switch to ${capitalize(easingId)} easing`,
        easingType.selectSvg
    );

    div.onclick = function () {
        // Start the undo-able edit, adding all the currently selected keyframes
        Undo.initEdit({keyframes: Timeline.selected});
        for (let keyframe in Timeline.selected) {
            Timeline.selected[keyframe]["easing"] = easingId;
        }
        // Ensure the changes are visible
        window.updateKeyframeSelection();

        // End undo-able edit
        Undo.finishEdit("Edit keyframe easing");
    }
    easingBar.appendChild(div);
}

function addFadeTypeButton(fadeBar: HTMLElement, fadeId: string, fadeName: string, svg: string): void {
    const div: HTMLElement = createButtonElement(
        `kf_fade_type_${fadeId}`,
        `Fade ${fadeName} easing`,
        svg
    );

    div.onclick = function () {
        for (let keyframe in Timeline.selected) {
            Timeline.selected[keyframe]["easing_fade"] = fadeId;
        }
        window.updateKeyframeSelection();
    }
    fadeBar.appendChild(div);
}

function createAndAppendKeyframeBar(id: string, name: string = capitalize(id)): HTMLElement {
    let barId = `${keyframeProjectId}_keyframe_bar_${id}`;

    // Keep track of all created bar menu ids so they can be removed before creating them again
    // I opted to keep track of them instead of removing them before creating them again
    // because menus may need to be removed without being recreated(e.g. remove fade menu without having fade options)
    BAR_MENU_IDS.add(barId);

    // Get the keyframe panel and append our menu to it
    const keyframePanel = document.getElementById("panel_keyframe");
    let bar: HTMLElement = document.createElement("div");
    keyframePanel.appendChild(bar);

    bar.outerHTML =
        `<div class="bar flex" style="flex-wrap: wrap" id=${barId}>
            <label class="tl" style="font-weight: bolder; min-width: 47px;">${name}</label>
        </div>`;

    return document.getElementById(barId);
}

function createButtonElement(id: string, title: string, innerHTML: string): HTMLElement {
   const div: HTMLDivElement = document.createElement("div");
   div.id = id;
   div.innerHTML = innerHTML;
   div.setAttribute("style", "stroke:var(--color-text); margin:0px; padding:3px; width:30px; height:30px");
   div.setAttribute("title", title);
   return div;
}

function renderCustomKeyframeIcons() {
    if(!applyToProject()) return;

    Timeline.keyframes.forEach(keyframe => {
        updateKeyframeIcon(keyframe);
    })
}

function updateKeyframeIcon(keyframe: _Keyframe) {
    const element: HTMLElement = document.getElementById(keyframe.uuid);

    if(element && element.children && keyframe["easing"]) {
        let easingKey: string = keyframe["easing"];
        let easingType: EasingType = EASING_TYPES[easingKey];
        let fadeType: string = keyframe["easing_fade"];

        let keyframeBackground: string = easingType.keyframeIconSet.inOutIcon;
        if (fadeType == "in" && easingType.keyframeIconSet.inIcon) {
            keyframeBackground = easingType.keyframeIconSet.inIcon;
        } else if (fadeType == "out" && easingType.keyframeIconSet.outIcon) {
            keyframeBackground = easingType.keyframeIconSet.outIcon;
        }

        element.children[0].className = keyframeBackground;
    }
}

function getSelectedKeyframesEasingKey(): string {
    return getSelectedKeyframesProperty("easing", "linear");
}

function getSelectedKeyframesFadeKey(): string {
    return getSelectedKeyframesProperty("easing_fade", "in");
}

function getSelectedKeyframesProperty(property: string, defaultValue: any, conflictValue: any = null): any {
    const selectorFunction: Function = keyframe => (keyframe[property] === undefined ? defaultValue : keyframe[property]);

    if(Timeline.selected.length > 1) {
        // Check if all selected keyframes have the same value as the last selected keyframe
        const lastValue = selectorFunction(Timeline.selected[Timeline.selected.length - 1]);
        for (let keyframe in Timeline.selected) {
            const keyframeValue = selectorFunction(Timeline.selected[keyframe]);
            if(lastValue !== keyframeValue) {
                return conflictValue;
            }
        }
        return lastValue;
    } else {
        // Return either the only selected keyframes' value, or just the default value if none are selected
        if(Timeline.selected[0]) return selectorFunction(Timeline.selected[0]);
        return defaultValue;
    }
}

function monkeypatchMahiKeyframeLerping(other, axis, amount, allow_expression) {
    if (!applyToProject()) { // Don't apply custom easings if the project is not a Mahi Entity project
        // @ts-ignore
        return Monkeypatches.get(Keyframe).getLerp.apply(this, arguments); // Return original getLerp function
    }

    const easingKey: string = other["easing"] || "linear";
    const easingType: EasingType = EASING_TYPES[easingKey];
    if(easingType) {
        let easeAmount = easingType.in(amount);
        if(other["easing_fade"]) {
            let fadeType = other["easing_fade"];
            if(fadeType === "out" && easingType.out)
                easeAmount = easingType.out(amount);

            if(fadeType === "inout" && easingType.inOut)
                easeAmount = easingType.inOut(amount);
        }

        const start = this.data_points.length == 1 ? this.calc(axis) : this.calc(axis, 1);
        const end = other.calc(axis);
        const result = lerp(start, end, easeAmount);

        if(!Number.isNaN(result)) {
            return result;
        }

    }

    // @ts-ignore
    return Monkeypatches.get(Keyframe).getLerp.apply(this, arguments); // Backup original return in case of error
}