import {
    createCommentInfo,
    FileBuilder,
    getProjectRenderStateClass,
    getProjectRenderStateSuperclass
} from "./templateUtils";

interface RenderStateTemplateConfig {
    file: string
    animationState: string
}

export class RenderStateTemplate {
    public config: RenderStateTemplateConfig

    constructor(config: RenderStateTemplateConfig) {
        this.config = config;
    }

    public createFileContent(animations = Animation["all"]): string {
        let commentInfo = createCommentInfo();

        let file: FileBuilder = new FileBuilder(this.config.file);
        file.replaceVar("comment_info", commentInfo);
        file.replaceVar("renderstate_class", getProjectRenderStateClass());
        file.replaceVar("renderstate_superclass", getProjectRenderStateSuperclass());

        let animationStrings: string[] = [];
        animations.forEach(animation => {
            let animString: FileBuilder = new FileBuilder(this.config.animationState);
            animString.replaceVar("name", animation.name);
            animationStrings.push(animString.build());
        });

        file.replaceVar("animation_states", animationStrings.join("\n\t"))
        return file.build();
    }
}

export const RENDER_STATE_TEMPLATE_1_21_11: RenderStateTemplate = new RenderStateTemplate({
    file: `%(comment_info)
@Environment(EnvType.CLIENT)
public class %(renderstate_class) extends %(renderstate_superclass) {
    %(animation_states)
}`,
    animationState: "public final AnimationState %(name)AnimationState = new AnimationState();"
});

export const RENDER_STATE_TEMPLATE_26_1_SNAPSHOT_1: RenderStateTemplate = new RenderStateTemplate({
    ...RENDER_STATE_TEMPLATE_1_21_11.config
});