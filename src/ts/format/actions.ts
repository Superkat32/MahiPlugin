import {isFormatMahiEntity} from "./format";
import {CODEC_NAME} from "../constants";
import {addMonkeypatch, Monkeypatches} from "../utils";
import {openMahiProjectSettingsDialog} from "./properties";
import {getProjectTemplateSet} from "./templates";
import {AnimationTemplate} from "./templates/animationTemplates";
import {getProjectAnimationClass, getProjectRenderStateClass} from "./templates/templateUtils";
import {RenderStateTemplate} from "./templates/renderStateTemplates";

const exportMahiProject: Action = new Action("export_mahi_project", {
    name: "Export Mahi Entity",
    icon: "fa-fish-fins",
    condition: () => isFormatMahiEntity(),
    click: function() {
        openExportProjectSettings();
    }
});

const exportMahiModel: Action = new Action("export_mahi_model", {
    name: "Export Mahi Model",
    icon: "view_in_ar",
    condition: () => isFormatMahiEntity(),
    click: function() {
        openExportProjectSettings(true, false, false, false);
    }
})

const exportMahiAnimations: Action = new Action("export_mahi_animations", {
    name: "Export Mahi Animations",
    icon: "animation",
    condition: () => isFormatMahiEntity(),
    click: function() {
        openExportProjectSettings(false, true, false, true);
    }
})

const buttonOfHope: Action = new Action("button_of_hope", {
    name: "Button of Hope",
    icon: "fa-frog",
    condition: () => isFormatMahiEntity() && Animator.open && Timeline.selected.length && Timeline.selected.find(kf => kf.transform),
    click: function() {
        Undo.initEdit({keyframes: Timeline.selected});
        Timeline.selected.forEach((keyframe) => {
            if(keyframe.transform) {
                keyframe["easing"] = "custom";

                const element = document.getElementById(keyframe.uuid);
                if(element && element.children && keyframe["easing"]) {
                    element.children[0].className = "apparently-you-can-just-change-the-class-name";
                }
            }
        })
        Undo.finishEdit("Change keyframes interpolation");
        updateKeyframeSelection();
    }
})

export function loadMahiActions(): void {
    MenuBar.addAction(exportMahiModel, "file.export");
    MenuBar.addAction(exportMahiAnimations, "file.export");
    MenuBar.addAction(exportMahiProject, "file.export");

    MenuBar.addAction(buttonOfHope, "animation");

    addMonkeypatch(BarItems, "project_window", "click", monkeypatchMahiProjectWindowClick);
}

export function unloadMahiActions(): void {
    exportMahiModel.delete();
    exportMahiAnimations.delete();
    exportMahiProject.delete();
}

function monkeypatchMahiProjectWindowClick() {
    if (Format.id === CODEC_NAME) {
        openMahiProjectSettingsDialog();
    } else {
        return Monkeypatches.get(BarItems).click();
    }
}

function openExportProjectSettings(
    exportModel: boolean = true,
    exportAnimation: boolean = true,
    exportRenderer: boolean = true,
    exportRenderState: boolean = true
): void {
    const form: InputFormConfig = createExportInputForm(exportModel, exportAnimation, exportRenderer, exportRenderState);
    form.select_all_none = {
        type: "buttons",
            buttons: ["generic.select_all", "generic.select_none", "Model Change", "Animation Change"],
            click(index) {
            switch(index) {
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
    }
    const dialog = new Dialog({
        id: "mahi_project_export",
        title: "Mahi Entity Export Settings",
        form,
        onConfirm(formResult: any, event: Event): void | boolean {
            if(formResult.export_animation) {
                openExportAnimationSettings(formResult);
            } else {
                exportProject(formResult);
            }
            dialog.hide();
        }
    })
    dialog.show();
}

function createExportInputForm(
    exportModelDefault: boolean,
    exportAnimationDefault: boolean,
    exportRendererDefault: boolean,
    exportRenderStateDefault: boolean
): InputFormConfig {
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
    }
}

function openExportAnimationSettings(exportFormResults?: any): void {
    let form: InputFormConfig = {};
    let keys: any[] = [];
    let animations = Animation["all"].slice();
    if (Format.animation_files) animations.sort((a, b) => a.path.hashCode() - b.path.hashCode());
    animations.forEach(animation => {
        let key = animation.name;
        keys.push(key);
        form[key.hashCode()] = {
            label: key,
            type: "checkbox",
            value: true
        }
    });
    form.select_all_none = {
        type: "buttons",
        buttons: ["generic.select_all", "generic.select_none"],
        click(index) {
            const values = {};
            keys.forEach((key) => values[key.hashCode()] = (index == 0));
            dialog.setFormValues(values);
        }
    }

    const dialog = new Dialog({
        id: "mahi_animation_export",
        title: "dialog.animation_export.title",
        form,
        onConfirm(formResult: any, event: Event): void | boolean {
            if(exportFormResults != undefined) {
                exportProject(exportFormResults, formResult, keys);
            }
            dialog.hide();
        }
    })
    dialog.show();
}

function exportProject(exportFormResults: any, animationFormResults?: any, animationKeys?: any): void {
    if(exportFormResults.export_model) {
        exportModel();
    }
    if(exportFormResults.export_animation && animationFormResults != undefined && animationKeys != undefined) {
        exportAnimation(animationFormResults, animationKeys);
    }
    if(exportFormResults.export_renderer) {
        exportRenderer();
    }
    if(exportFormResults.export_renderstate) {
        exportRenderState(animationFormResults, animationKeys);
    }
}

function exportModel(): void {

}

function exportAnimation(animationFormResult: any, animationKeys: any): void {
    let animationTemplate: AnimationTemplate = getProjectTemplateSet().animation;

    let keys: any = animationKeys.filter(key => animationFormResult[key.hashCode()]);
    let animations: any = keys.map(k => Animation["all"].find(anim => anim.name == k));
    let content: string = animationTemplate.createFileContent(animations);
    Blockbench.export({
        resource_id: "mahi_animations",
        type: "Mahi Modded Entity Animations",
        extensions: ["java"],
        name: getProjectAnimationClass(),
        content
    });
}

function exportRenderer(): void {

}

function exportRenderState(animationFormResult?: any, animationKeys?: any): void {
    let renderStateTemplate: RenderStateTemplate = getProjectTemplateSet().renderState;

    let animations: any = "";
    if(animationFormResult != undefined && animationKeys != undefined) {
        let keys: any = animationKeys.filter(key => animationFormResult[key.hashCode()]);
        animations = keys.map(k => Animation["all"].find(anim => anim.name == k));
    }
    let content: string = renderStateTemplate.createFileContent(animations);
    Blockbench.export({
        resource_id: "mahi_renderstate",
        type: "Mahi Modded Render State",
        extensions: ["java"],
        name: getProjectRenderStateClass(),
        content
    })
}