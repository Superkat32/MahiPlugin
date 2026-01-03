import {CLASS_COMMENT_INFO, TEMPLATES} from "../templates";
import {VERSION} from "../../constants";
import {
    ANIMATION_CLASS_PROPERTY,
    ENTITY_CLASS_PROPERTY,
    EXPORT_VERSION_PROPERTY,
    MODEL_CLASS_PROPERTY,
    MODEL_SUPERCLASS_PROPERTY,
    RENDER_STATE_CLASS_PROPERTY,
    RENDER_STATE_SUPERCLASS_PROPERTY,
    RENDERER_CLASS_PROPERTY,
    RENDERER_SUPERCLASS_PROPERTY
} from "../properties";
import {getEntityAnimationName, getEntityModelName, getEntityRendererName, getEntityRenderStateName} from "../../utils";

export class FileBuilder {
    public file: string;
    public regex;

    constructor(file: string) {
        this.file = file;
        this.regex = getVariableRegex;
    }

    public replaceVar(key: string, value: string): void {
        this.file = this.file.replace(this.regex(key), value);
    }

    public build(): string {
        return this.file;
    }
}

export function createCommentInfo(): string {
    let info: FileBuilder = new FileBuilder(CLASS_COMMENT_INFO);

    info.replaceVar("bb_version", Blockbench.version);
    info.replaceVar("mahi_version", VERSION);
    info.replaceVar("mc_version", TEMPLATES[Project[EXPORT_VERSION_PROPERTY]].version);
    info.replaceVar("author", Settings.get("username").toString() || "Author");
    return info.build();
}

export function getVariableRegex(name: string): RegExp {
    return new RegExp(`%\\(${name}\\)`, 'g');
}

export function getModIdStringOrReference(): string {
    let modelIdentifier: string = Project.model_identifier;
    if(!modelIdentifier || modelIdentifier == "") return '"mod_id"';

    if(modelIdentifier.includes(".")) { // assume modid entry is a static string reference
        return modelIdentifier;
    }
    return `"${modelIdentifier}"`;
}

export function getProjectEntityClass(): string {
    if(Project[ENTITY_CLASS_PROPERTY]) return Project[ENTITY_CLASS_PROPERTY];
    return "Entity";
}

export function getProjectModelClass(): string {
    if(Project[MODEL_CLASS_PROPERTY]) return Project[MODEL_CLASS_PROPERTY];
    return getEntityModelName(getProjectEntityClass());
}

export function getProjectAnimationClass(): string {
    if(Project[ANIMATION_CLASS_PROPERTY]) return Project[ANIMATION_CLASS_PROPERTY];
    return getEntityAnimationName(getProjectEntityClass());
}

export function getProjectRendererClass(): string {
    if(Project[RENDERER_CLASS_PROPERTY]) return Project[RENDERER_CLASS_PROPERTY];
    return getEntityRendererName(getProjectEntityClass());
}

export function getProjectRenderStateClass(): string {
    if(Project[RENDER_STATE_CLASS_PROPERTY]) return Project[RENDER_STATE_CLASS_PROPERTY];
    return getEntityRenderStateName(getProjectEntityClass());
}

export function getProjectModelSuperclass(): string {
    if(Project[MODEL_SUPERCLASS_PROPERTY]) return Project[MODEL_SUPERCLASS_PROPERTY];
    return "EntityModel";
}

export function getProjectRendererSuperclass(): string {
    if(Project[RENDERER_SUPERCLASS_PROPERTY]) return Project[RENDERER_SUPERCLASS_PROPERTY];
    return "MobRenderer"
}

export function getProjectRenderStateSuperclass(): string {
    if(Project[RENDER_STATE_SUPERCLASS_PROPERTY]) return Project[RENDER_STATE_SUPERCLASS_PROPERTY];
    return "LivingEntityRenderState"
}

export function toFloat(number: number): string {
    let trimmed: string = trimFloatNumber(number) + '';
    if(!trimmed.includes(".")) {
        trimmed += ".0";
    }
    return `${trimmed}F`;
}