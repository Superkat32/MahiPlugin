import {ID, VERSION} from "./constants";
import {loadMahiActions, unloadMahiActions} from "./format/actions";
import {loadMahiProperties, unloadMahiProperties} from "./format/properties";
import {removeMonkeypatches} from "./utils";
import {loadMahiKeyframeEasings, unloadMahiKeyframeEasings} from "./format/easing/keyframe";

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
            loadMahiProperties();
            loadMahiActions();
            loadMahiKeyframeEasings();
        },

        onunload() {
            unloadMahiProperties();
            unloadMahiActions();
            unloadMahiKeyframeEasings();
            removeMonkeypatches();
        }
    })
})();