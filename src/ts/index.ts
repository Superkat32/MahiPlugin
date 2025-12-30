import {ID, VERSION} from "./constants";

(function() {
    BBPlugin.register(ID, {
        title: "Mahi",
        icon: "icon.png",
        author: "Superkat32",
        description: "Plugin for the Mahi Minecraft Java Library",
        tags: ["Minecraft: Java Edition", "Animation", "Likely Janky"],
        version: VERSION,
        min_version: "4.9.0",
        variant: "both",

        onload() {

        },

        onunload() {

        }
    })
})();