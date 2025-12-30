import {MODEL_TEMPLATE_1_21_11, MODEL_TEMPLATE_26_1_SNAPSHOT_1} from "./templates/modelTemplates";
import {ANIMATION_TEMPLATE_1_21_11, ANIMATION_TEMPLATE_26_1_SNAPSHOT_1} from "./templates/animationTemplates";
import {RENDERER_TEMPLATE_1_21_11, RENDERER_TEMPLATE_26_1_SNAPSHOT_1} from "./templates/rendererTemplates";
import {RENDER_STATE_TEMPLATE_1_21_11, RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1} from "./templates/renderStateTemplates";

type TemplateType = "model" | "animation" | "renderer" | "renderState";

export const TEMPLATES: Templates = {
    "1.21.11-mojmaps": {
        name: "Fabric 1.21.11 (Mojmaps)",
        model: MODEL_TEMPLATE_1_21_11,
        animation: ANIMATION_TEMPLATE_1_21_11,
        renderer: RENDERER_TEMPLATE_1_21_11,
        renderState: RENDER_STATE_TEMPLATE_1_21_11,
    },
    "26.1-snapshot1-mojmaps": {
        name: "Fabric 26.1-snapshot1 (Mojmaps)",
        model: MODEL_TEMPLATE_26_1_SNAPSHOT_1,
        animation: ANIMATION_TEMPLATE_26_1_SNAPSHOT_1,
        renderer: RENDERER_TEMPLATE_26_1_SNAPSHOT_1,
        renderState: RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1
    }
}

interface Template {
    file: string;
    type: TemplateType;
}

interface TemplateSet {
    name: string;
    model: Template;
    animation: Template;
    renderer: Template;
    renderState: Template;
}

interface Templates {
    [key: string]: TemplateSet
}

export function createModelTemplate(file: string): Template {
    return {file: file, type: "model"} as Template;
}

export function createAnimationTemplate(file: string): Template {
    return {file: file, type: "animation"} as Template;
}

export function createRendererTemplate(file: string): Template {
    return {file: file, type: "renderer"} as Template;
}

export function createRenderStateTemplate(file: string): Template {
    return {file: file, type: "renderState"} as Template;
}
