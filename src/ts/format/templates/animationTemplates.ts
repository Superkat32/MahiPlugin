// export const ANIMATION_TEMPLATE_1_21_11 = createAnimationTemplate(`
//     // Made with Blockbench %(bb_version) and Mahi %(mahi_version)
//     // Exported for Minecraft version %(mc_versions)
//     // Paste this class into your mod and generate all the required imports
//     public class %(animation_class) {
//
//     }
// `);
//
// export const ANIMATION_TEMPLATE_26_1_SNAPSHOT_1 = createAnimationTemplate(`
//     // Made with Blockbench %(bb_version) and Mahi %(mahi_version)
//     // Exported for Minecraft version %(mc_versions)
//     // Paste this class into your mod and generate all the required imports
//     public class %(animation_class) {
//
//     }
// `);

export const ANIMATION_TEMPLATE_1_21_11: AnimationTemplate = {
    file: `
    %(comment_info)
    public class %(animation_class) {
        %(animations)
    }`,
    animation: "public static final AnimationDefinition %(name) = AnimationDefinition.Builder.withLength(%(length))%(looping)%(channels).build();",
    looping: ".looping()"
}

export const ANIMATION_TEMPLATE_26_1_SNAPSHOT_1: AnimationTemplate = {
    ...ANIMATION_TEMPLATE_1_21_11,
    looping: ".loop()"
};

export interface AnimationTemplate {
    file: string
    animation: string
    looping: string
}
