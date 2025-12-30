import {CODEC_NAME} from "../constants";
import {TEMPLATES} from "./templates";

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

// codec.compileAnimations = function(animations = Animation.all) {
//
// }

export const MAHI_FORMAT: ModelFormat = new ModelFormat(CODEC_NAME, {
    id: CODEC_NAME,
    icon: "fa-fish-fins",
    category: "minecraft",
    target: "Minecraft: Java Edition",
    format_page: {
        content: [
            {type: 'h3', text: tl('mode.start.format.informations')},
            {text: `* ${tl('format.modded_entity.info.integer_size')}
					* ${tl('format.modded_entity.info.format')}`.replace(/\t+/g, '')
            }
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
    pbr: true
})
MAHI_CODEC.format = MAHI_FORMAT;

export function isFormatMahiEntity(): boolean {
    return Format == MAHI_FORMAT;
}