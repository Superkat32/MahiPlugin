import {CODEC_NAME, FANCY_VANILLA_ENTITIES} from "../constants";
import {getTemplateOptionNames, TEMPLATES} from "./templates";

// export const MOD_ID_PROPERTY: string = "mahi_modid";
export const ENTITY_CLASS_PROPERTY: string = "mahi_entity_class";
export const EXPORT_VERSION_PROPERTY: string = "mahi_export_version";

export const FLIP_Y_PROPERTY: string = "mahi_flip_y";

export const MODEL_CLASS_PROPERTY: string = "mahi_model_class";
export const ANIMATION_CLASS_PROPERTY: string = "mahi_animation_class";
export const RENDERER_CLASS_PROPERTY: string = "mahi_renderer_class";
export const RENDER_STATE_CLASS_PROPERTY: string = "mahi_render_state_class";

export const MODEL_SUPERCLASS_PROPERTY: string = "mahi_model_superclass";
export const RENDERER_SUPERCLASS_PROPERTY: string = "mahi_renderer_superclass";
export const RENDER_STATE_SUPERCLASS_PROPERTY: string = "mahi_render_state_superclass";

let pluginProperties: Property<any>[];

export function loadMahiProperties() {
    pluginProperties = createPluginProperties();
}

export function unloadMahiProperties() {
    for(const property of pluginProperties) {
        property.delete();
    }
}

function createPluginProperties(): Property<any>[] {
    const exampleEntity: string = getExampleEntityName();

    return [
        createMahiPluginProperty("string", ENTITY_CLASS_PROPERTY, {
            label: "Entity Class",
            description: "Your Entity Class name.",
            placeholder: `${exampleEntity}`,
            condition: isMahiProject(),
        }),

        createMahiPluginProperty("string", EXPORT_VERSION_PROPERTY, {
            label: "Export Version",
            description: "The Minecraft version to export your project to.",
            default: TEMPLATES[0],
            options: getTemplateOptionNames(),
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
    ]
}

export function createMahiFormConfig(): InputFormConfig {
    const form: InputFormConfig = {
        format: {
            label: "data.format",
            text: "Mahi Model",
            description: "Formatted to the Mahi Minecraft Java Library Model format.",
            type: "info",
        },
    }

    for (const key in ModelProject.properties) {
        let property = ModelProject.properties[key];
        if (property.exposed === false || !Condition(property.condition)) continue;

        let entry = form[property.name] = {
            label: property.label,
            description: property.description,
            value: Project[property.name],
            placeholder: property.placeholder,
            type: property.type
        }

        if (property.name === "name") { // Replace name label & description
            entry.label = "Project File Name"
            entry.placeholder = property.placeholder
            entry.description = "The file name of your Blockbench project."
        } else if (property.name === "model_identifier") { // Replace model id label (used as mod id in export)
            entry.label = "Mod ID"
            entry.placeholder = "example_mod || ExampleMod.MOD_ID"
            entry.description = "Your mod's mod id. Can reference a static string (e.g. in your main class), otherwise will be exported as a string."
        } else if (property.name === FLIP_Y_PROPERTY) { // Add texture size after Flip Y Axis
            form.texture_size = {
                label: "dialog.project.texture_size",
                description: "The model's texture size.",
                type: "vector",
                dimensions: 2,
                linked_ratio: true,
                value: [Project.texture_width, Project.texture_height],
                min: 1
            }
            form[`${property.name}_whitespace`] = {label: "", text: "", type: "info"} // whitespace
        } else if (property.name === EXPORT_VERSION_PROPERTY) { // Add whitespace after Export Version
            form[`${property.name}_whitespace`] = {label: "", text: "", type: "info"}
        }

        if (property.type == "boolean") entry.type = "checkbox";
        if (property.type == "string") entry.type = "text";
        if (property["options"]) {
            let entryOptions = property["options"];
            if(entryOptions["whitespace"]) {
                // TODO - readd whitespace option to templates function and after flip y/texture size
                // TODO - classes dynamic placeholders
                // TODO - visible toggles for class/superclasses
                // TODO - pass example entity through create form config function
                form[`${property.name}_whitespace`] = {label: "", text: "", type: "info"} // whitespace
                const clone = { ...entryOptions };
                delete clone["whitespace"];
                entryOptions = clone;
            }
            delete entryOptions["class_export"]
            delete entryOptions["superclass_export"]

            if(Object.keys(entryOptions).length > 0) {
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
    }

    return form;
}

export function openMahiProjectSettingsDialog() {
    if (Project instanceof ModelProject) {
        const form = createMahiFormConfig();

        const dialog = new Dialog({
            id: "mahi_project_settings",
            title: "Mahi Project Settings",
            width: 500,
            form,
            onConfirm(formResult: any, event: Event): void | boolean {
                Blockbench.showQuickMessage(formResult.filename, 5000);
                dialog.hide();
            }
        });

        dialog.show();
    }
    return true;
}



// Util methods
function getExampleEntityName() {
    let index = Math.floor(Math.random() * FANCY_VANILLA_ENTITIES.length);
    return FANCY_VANILLA_ENTITIES[index];
}

function getEntityModelName(entityName: string, fallbackName: string) {
    return getClassNameFromEntity(entityName, fallbackName, "Model");
}

function getEntityAnimationName(entityName: string, fallbackName: string) {
    return getClassNameFromEntity(entityName, fallbackName, "Animation");
}

function getEntityRendererName(entityName: string, fallbackName: string) {
    return getClassNameFromEntity(entityName, fallbackName, "Renderer");
}

function getEntityRenderStateName(entityName: string, fallbackName: string) {
    return getClassNameFromEntity(entityName, fallbackName, "RenderState");
}

function getClassNameFromEntity(entityName: string, fallbackName: string, suffix: string): string {
    return (entityName === "" ? fallbackName : entityName) + suffix;
}

function createMahiPluginProperty<T extends keyof IPropertyType>(type: T, id: string, options: PropertyOptions): Property<T> {
    return new Property<T>(ModelProject, type, id, options);
}

function isMahiProject(): ConditionResolvable {
    return {formats: [CODEC_NAME]}
}
