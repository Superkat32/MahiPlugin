import {
    ANIMATION_TEMPLATE_1_21_11,
    ANIMATION_TEMPLATE_26_1_SNAPSHOT_1,
    AnimationTemplate
} from "./templates/animationTemplates";
import {EXPORT_VERSION_PROPERTY} from "./properties";
import {
    RENDER_STATE_TEMPLATE_1_21_11,
    RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1,
    RenderStateTemplate
} from "./templates/renderStateTemplates";

type TemplateType = "model" | "animation" | "renderer" | "renderState";

export const CLASS_COMMENT_INFO: string =
`/**
 * Made with Blockbench %(bb_version) and Mahi %(mahi_version).
 * Exported for Minecraft %(mc_version) or later.
 * <br><br>Copy this file into your mod and generate all the required imports.
 * @author %(author)
 */`

export const TEMPLATES: Templates = {
    "1.21.11-mojmaps": {
        name: "Fabric 1.21.11 (Mojmaps)",
        version: "1.21.11",
        // model: MODEL_TEMPLATE_1_21_11,
        animation: ANIMATION_TEMPLATE_1_21_11,
        // renderer: RENDERER_TEMPLATE_1_21_11,
        renderState: RENDER_STATE_TEMPLATE_1_21_11
    },
    "26.1-snapshot1-mojmaps": {
        name: "Fabric 26.1-snapshot1 (Mojmaps)",
        version: "26.1-snapshot1",
        // model: MODEL_TEMPLATE_26_1_SNAPSHOT_1,
        animation: ANIMATION_TEMPLATE_26_1_SNAPSHOT_1,
        // renderer: RENDERER_TEMPLATE_26_1_SNAPSHOT_1,
        renderState: RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1
    }
}

export function getProjectTemplateSet(): TemplateSet {
    return TEMPLATES[Project[EXPORT_VERSION_PROPERTY]];
}

export function getTemplateOptionNames(whitespace: boolean = false): any {
    let options: any = {};
    for (let key in TEMPLATES) {
        options[key] = TEMPLATES[key].name;
    }

    if(whitespace) {
        options["whitespace"] = true;
    }

    return options;
}

export interface Templates {
    [key: string]: TemplateSet
}

export interface TemplateSet {
    name: string;
    version: string,
    model?: any;
    animation: AnimationTemplate;
    renderer?: any;
    renderState: RenderStateTemplate;
}