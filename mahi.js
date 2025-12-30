/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
(function () {
    var button;
    var exportAll;
    var exportModel;
    var exportAnimations;
    var exportRenderer;
    var exportRenderState;
    BBPlugin.register("mahi", {
        title: "Mahi",
        icon: "icon.png",
        author: "Superkat32",
        description: "Plugin for the Mahi Minecraft Java Library",
        tags: ["Minecraft: Java Edition", "Animation", "Likely Janky"],
        version: "0.0.1",
        min_version: "4.9.0",
        variant: "both",
        onload: function () {
            button = new Action("gather_input", {
                name: "Gather Input",
                description: "Gathers an input",
                icon: "input",
                click: function () {
                    var exampleEntity = getExampleEntityName();
                    var form = {
                        format: { type: "info", label: "data.format", text: "Mahi Model", description: "Formatted to the Mahi (Minecraft Java Library) Model format." },
                    };
                    form.filename = {
                        label: "Project Filename",
                        description: "The filename of your project.",
                        placeholder: "".concat(exampleEntity, " Entity Project"),
                        type: "text"
                    };
                    form.modid = {
                        label: "Mod ID",
                        description: "Your mod's mod id. Can refer to a static string variable (e.g. from your main class) if you wish. Otherwise exports as a string.",
                        placeholder: "example_mod || ExampleMod.MOD_ID",
                        type: "text"
                    };
                    form.entityName = {
                        label: "Entity Class",
                        description: "Your entity's class name.",
                        placeholder: "".concat(exampleEntity),
                        type: "text"
                    };
                    form.exportVersion = {
                        label: "Export Version",
                        description: "The Minecraft version to export your project to.",
                        type: "select",
                        options: {
                            "1.21.11_mojmaps": "Fabric 1.21.11 (Mojmaps)",
                            "26.1_mojmaps.snapshot1": "Fabric 26.1 (Snapshot 1) (Mojmaps)"
                        }
                    };
                    form.texturesWhitespace = {
                        label: "",
                        text: "",
                        type: "info",
                    };
                    form.texturesInfo = {
                        label: "Texture Info",
                        text: "UV Type & Texture Size",
                        type: "info",
                    };
                    form.uvMode = {
                        label: "UV Mode",
                        description: "Your uv mode for this project.",
                        type: "select",
                        options: {
                            box_uv: "Box UV Mode",
                            face_uv: "Face UV Mode",
                        },
                        value: "box_uv"
                    };
                    form.textureSize = {
                        label: "Texture Size",
                        description: "Your texture size for this project.",
                        type: "vector",
                        dimensions: 2,
                        linked_ratio: true,
                        value: [16, 16],
                        min: 1
                    };
                    form.extrasWhitespace = {
                        label: "",
                        text: "",
                        type: "info",
                    };
                    form.extrasInfo = {
                        label: "Extra Info",
                        text: "Exported Class Names (Optional)",
                        type: "info",
                    };
                    form.entityModelClassName = {
                        label: "Model Class",
                        description: "Your entity's model class name.",
                        placeholder: "".concat(exampleEntity, "Model"),
                        condition: true,
                        type: "text"
                    };
                    form.entityAnimationClassName = {
                        label: "Animation Class",
                        description: "Your entity's animation class name.",
                        placeholder: "".concat(exampleEntity, "Animation"),
                        type: "text"
                    };
                    form.entityRendererClassName = {
                        label: "Renderer Class",
                        description: "Your entity's renderer class name.",
                        placeholder: "".concat(exampleEntity, "Renderer"),
                        type: "text"
                    };
                    form.entityRenderStateClassName = {
                        label: "Render State Class",
                        description: "Your entity's render state class name.",
                        placeholder: "".concat(exampleEntity, "RenderState"),
                        type: "text"
                    };
                    form.extendedRenderStateClassName = {
                        label: "Render State Superclass",
                        description: "The Render State class your entity Render State should extend.",
                        placeholder: "LivingEntityRenderState",
                        type: "text"
                    };
                    var dialog = new Dialog({
                        id: "gather_input",
                        title: "Gather Input",
                        width: 500,
                        form: form,
                        onConfirm: function (formResult) {
                            Blockbench.showQuickMessage(formResult.modid, 5000);
                            dialog.hide();
                        },
                        onFormChange: function (formResult) {
                            try {
                                document.getElementById("entityModelClassName")["placeholder"] = getClassNameFromEntity(formResult.entityName, exampleEntity, "Model");
                                document.getElementById("entityAnimationClassName")["placeholder"] = getClassNameFromEntity(formResult.entityName, exampleEntity, "Animation");
                                document.getElementById("entityRendererClassName")["placeholder"] = getClassNameFromEntity(formResult.entityName, exampleEntity, "Renderer");
                                document.getElementById("entityRenderStateClassName")["placeholder"] = getClassNameFromEntity(formResult.entityName, exampleEntity, "RenderState");
                            }
                            catch (error) { }
                        }
                    });
                    dialog.show();
                },
            });
            MenuBar.addAction(button, "filter");
            exportModel = new Action("export_model", {
                name: "Export Mahi Model",
                icon: "view_in_ar",
                click: function () { }
            });
            MenuBar.addAction(exportModel, "file.export");
            exportAnimations = new Action("export_animations", {
                name: "Export Mahi Animations",
                icon: "animation",
                click: function () { }
            });
            MenuBar.addAction(exportAnimations, "file.export");
            exportRenderer = new Action("export_renderer", {
                name: "Export Mahi Renderer",
                icon: "videocam",
                click: function () { }
            });
            MenuBar.addAction(exportRenderer, "file.export");
            exportRenderState = new Action("export_render_state", {
                name: "Export Mahi Render State",
                icon: "movie_creation",
                click: function () { }
            });
            MenuBar.addAction(exportRenderState, "file.export");
            exportAll = new Action("export_all", {
                name: "Export Full Mahi Entity",
                icon: "fa-fish-fins",
                click: function () { }
            });
            MenuBar.addAction(exportAll, "file.export");
        },
        onunload: function () {
            button.delete();
            exportAll.delete();
            exportModel.delete();
            exportAnimations.delete();
            exportRenderer.delete();
            exportRenderState.delete();
        }
    });
    function getClassNameFromEntity(entityName, fallbackName, suffix) {
        return (entityName === "" ? fallbackName : entityName) + suffix;
    }
    function getExampleEntityName() {
        var entities = ["Armadillo", "Bat", "Breeze", "Camel", "CopperGolem", "Creaking", "Frog", "Nautilus", "Sniffer", "Warden"];
        var index = Math.floor(Math.random() * entities.length);
        return entities[index];
    }
})();

/******/ })()
;