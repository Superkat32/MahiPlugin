import {CODEC_NAME} from "../constants";
import {TEMPLATES} from "./templates";
import {openMahiProjectSettingsDialog} from "./mahiPluginProperties";

export const MAHI_CODEC: Codec = new Codec(CODEC_NAME, {
    name: "Mahi Entity",
    extension: "java",
    remember: true,
    support_partial_export: true,
    load_filter: {
        type: "text",
        extensions: ["java"],
    },
    compile(options?: any): any {

    },
    parse(data: any, path: string, args?: LoadOptions) {

    },
    afterDownload(path: any) {

    },
    afterSave(path: any) {

    },
    fileName(): string {
        return "file"
    }
});
MAHI_CODEC.templates = TEMPLATES;

MAHI_CODEC.compileAnimations = function(animations = Animation["all"]) {

}

export const MAHI_FORMAT: ModelFormat = new ModelFormat(CODEC_NAME, {
    id: CODEC_NAME,
    name: "Mahi Entity",
    description: "Entity model for Minecraft Java mods using the Mahi Library. Exports to '.java' class files to load directly in your Minecraft mod.",
    icon: "fa-fish-fins",
    category: "minecraft",
    target: "Minecraft: Java Edition",
    format_page: {
        content: [
            {type: 'h3', text: tl('mode.start.format.informations')},
            {text: `* ${tl('format.modded_entity.info.integer_size')}
					* ${tl('format.modded_entity.info.format')}`.replace(/\t+/g, '')
            },
            {type: `h3`, text: tl('mode.start.format.resources')},
            {text: `* [Mahi Wiki](https://github.com/Superkat32/Mahi)
					* [Mahi Modrinth](https://github.com/Superkat32/Mahi)
					* [Mahi GitHub](https://github.com/Superkat32/Mahi)`.replace(/\t+/g, '')
            },
        ]
    },
    codec: MAHI_CODEC,
    node_name_regex: "\\w",
    box_uv: true,
    box_uv_float_size: true,
    single_texture: true,
    bone_rig: true,
    centered_grid: true,
    rotate_cubes: true,
    integer_size: true,
    animation_mode: true,
    pbr: true,
    new() {
        if (newProject(this)) {
            return openMahiProjectSettingsDialog();
        }
    },
})
MAHI_CODEC.format = MAHI_FORMAT;

export function isFormatMahiEntity(): boolean {
    return Format == MAHI_FORMAT;
}