import {CODEC_NAME, FANCY_VANILLA_ENTITIES} from "../constants";
import {getTemplateOptionNames, TEMPLATES} from "./templates";
import {getEntityAnimationName, getEntityModelName, getEntityRendererName, getEntityRenderStateName} from "../utils";

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
    const exampleEntity: string = generateExampleEntityName();

    return [
        createMahiPluginProperty("string", ENTITY_CLASS_PROPERTY, {
            label: "Entity Class",
            description: "Your Entity Class name.",
            placeholder: `${exampleEntity}`,
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
            default: TEMPLATES[0],
            options: getTemplateOptionNames(),
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
            placeholder: getEntityModelName(exampleEntity),
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
            placeholder: getEntityAnimationName(exampleEntity),
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
            placeholder: getEntityRendererName(exampleEntity),
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
            placeholder: getEntityRenderStateName(exampleEntity),
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
    ]
}

export function createMahiFormConfig(exampleEntity: string, placeholderEntity: string): InputFormConfig {
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

        let entry = {
            label: property.label,
            description: property.description,
            value: Project[property.name],
            placeholder: property.placeholder,
            type: property.type
        }

        if (property.name === "name") { // Replace name label & description
            entry.label = "Project File Name"
            entry.placeholder = `${exampleEntity}Project`
            entry.description = "The file name of your Blockbench project."
        } else if (property.name === "model_identifier") { // Replace model id label (used as mod id in export)
            entry.label = "Mod ID"
            entry.placeholder = "example_mod || ExampleMod.MOD_ID"
            entry.description = "Your mod's mod id. Can reference a static string (e.g. in your main class), otherwise will be exported as a string."
        }

        if (property.type == "boolean") entry.type = "checkbox";
        if (property.type == "string") entry.type = "text";
        if (property["options"]) {
            let entryOptions = property["options"];

            if(entryOptions["whitespace"]) { // apply whitespace before value
                form[`${property.name}_whitespace`] = {label: "", text: "", type: "info"} // whitespace value
            }

            if(entryOptions["info"]) {
                let infoOptions: any = entryOptions["info"];
                form[`${property.name}_info`] = {
                    label: infoOptions["label"],
                    text: infoOptions["text"],
                    type: "info"
                };
            }

            if(entryOptions["entityPlaceholder"]) {
                let entityPlaceholderOptions: any = entryOptions["entityPlaceholder"];
                let prefix = entityPlaceholderOptions["prefix"] ? entityPlaceholderOptions["prefix"] : "";
                let suffix = entityPlaceholderOptions["suffix"] ? entityPlaceholderOptions["suffix"] : "";
                let usedEntity: string = entityPlaceholderOptions["exampleOnly"] ? exampleEntity : placeholderEntity;
                entry.placeholder = `${prefix}${usedEntity}${suffix}`;
            }

            // exclude whitespace and custom_class keys in export version dropdown (I don't know why this works LOL)
            const {whitespace, info, entityPlaceholder, ...selectableOptions} = entryOptions;
            if(Object.keys(selectableOptions).length > 0) {
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
            }
        }
    }

    return form;
}

export function openMahiProjectSettingsDialog() {
    if (Project instanceof ModelProject) {
        let exampleEntity: string = generateExampleEntityName();
        let placeholderEntity: string = exampleEntity;
        if(Project[ENTITY_CLASS_PROPERTY] != "") placeholderEntity = Project[ENTITY_CLASS_PROPERTY];

        const form = createMahiFormConfig(exampleEntity, placeholderEntity);

        const dialog = new Dialog({
            id: "mahi_project_settings",
            title: "Mahi Project Settings",
            width: 500,
            part_order: ["form", "component"],
            form,
            onFormChange(formResult: { [p: string]: FormResultValue }) {
                try {
                    // Update the dynamic options based on the input Entity Class
                    let inputEntityName = formResult[ENTITY_CLASS_PROPERTY] != "" ? formResult[ENTITY_CLASS_PROPERTY] : exampleEntity;

                    // @ts-ignore
                    document.getElementById(MODEL_CLASS_PROPERTY)["placeholder"] = getEntityModelName(inputEntityName);
                    // @ts-ignore
                    document.getElementById(ANIMATION_CLASS_PROPERTY)["placeholder"] = getEntityAnimationName(inputEntityName);
                    // @ts-ignore
                    document.getElementById(RENDERER_CLASS_PROPERTY)["placeholder"] = getEntityRendererName(inputEntityName);
                    // @ts-ignore
                    document.getElementById(RENDER_STATE_CLASS_PROPERTY)["placeholder"] = getEntityRenderStateName(inputEntityName);

                } catch (error) {}
            },
            onConfirm(formResult: any, event: Event): void | boolean {
                let save: any;
                let was_changed: boolean = false;
                let box_uv: boolean = formResult.uv_mode == "box_uv";
                let texture_width: number = Math.clamp(formResult.texture_size[0], 1, Infinity);
                let texture_height: number = Math.clamp(formResult.texture_size[1], 1, Infinity);

                if(Project.box_uv != box_uv
                    || Project.texture_width != texture_width
                    || Project.texture_height != texture_height) {
                    was_changed = true;

                    if(Project.box_uv != box_uv
                        && ((box_uv && !Cube.all.find(cube => cube.box_uv))
                        || !(box_uv && !Cube.all.find(cube => !cube.box_uv)))
                    ) {
                        // @ts-ignore
                        if (!save) save = Undo.initEdit({elements: Cube.all, uv_only: true, uv_mode: true})
                        Cube.all.forEach(cube => {cube.setUVMode(box_uv)});

                        if(!save) save = Undo.initEdit({uv_mode: true});
                        Project.texture_width = texture_width;
                        Project.texture_height = texture_height;

                        if(Format.optional_box_uv) Project.box_uv = box_uv;
                        Canvas.updateAllUVs();
                        updateSelection();
                    }
                }

                for (let key in ModelProject.properties) {
                    if (formResult[key] != undefined && Project[key] != formResult[key] && typeof Project[key] != "object") {
                        was_changed = true;
                    }
                    ModelProject.properties[key].merge(Project, formResult);
                }
                Project.name = Project.name.trim();
                Project.model_identifier = Project.model_identifier.trim();

                if(save) Undo.finishEdit("Change project UV settings");
                if(was_changed) Project.saved = false;

                Blockbench.dispatchEvent("update_project_settings", formResult);
                BARS.updateConditions();

                if(Project.EditSession) {
                    let metadata = {
                        texture_width: Project.texture_width,
                        texture_height: Project.texture_height,
                        box_uv: Project.box_uv
                    }
                    for (let key in ModelProject.properties) {
                        ModelProject.properties[key].copy(Project, metadata);
                    }
                    Project.EditSession.sendAll("change_project_meta", JSON.stringify(metadata));
                }

                dialog.hide();
            }
        });

        dialog.show();
    }
    return true;
}

// Util methods
function generateExampleEntityName() {
    let index = Math.floor(Math.random() * FANCY_VANILLA_ENTITIES.length);
    return FANCY_VANILLA_ENTITIES[index];
}

function createMahiPluginProperty<T extends keyof IPropertyType>(type: T, id: string, options: PropertyOptions): Property<T> {
    return new Property<T>(ModelProject, type, id, options);
}

function isMahiProject(): ConditionResolvable {
    return {formats: [CODEC_NAME]}
}
