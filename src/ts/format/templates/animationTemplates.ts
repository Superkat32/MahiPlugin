import {createCommentInfo, FileBuilder, getProjectAnimationClass, toFloat} from "./templateUtils";

interface AnimationTemplateConfig {
    file: string
    animation: string
    looping: string
    channel: string
    channelTypes: ChannelTypes
    keyframeTypes: KeyframeTypes
    easingTypes: EasingTypes;
}

interface ChannelTypes {
    rotation: string
    position: string
    scale: string
}

interface KeyframeTypes {
    rotation: string
    position: string
    scale: string
}

interface EasingTypes {
    linear: string
    catmullrom: string
}

export class AnimationTemplate {
    public config: AnimationTemplateConfig

    constructor(config: AnimationTemplateConfig) {
        this.config = config;
    }

    public createFileContent(animations = Animation["all"]): string {
        let commentInfo: string = createCommentInfo();

        let file: FileBuilder = new FileBuilder(this.config.file);
        file.replaceVar("comment_info", commentInfo);
        file.replaceVar("animation_class", getProjectAnimationClass());

        let animationStrings: string[] = [];
        animations.forEach(animation => {
            let animString: FileBuilder = new FileBuilder(this.config.animation);
            animString.replaceVar("name", animation.name.toUpperCase());
            animString.replaceVar("length", toFloat(animation.length));
            animString.replaceVar("looping", animation.loop == "loop" ? this.config.looping : "");

            let channelStrings: string[] = [];
            let channelTypes: ChannelTypes = this.config.channelTypes;
            for (let id in animation.animators) {
                let animator: GeneralAnimator = animation.animators[id];
                if(!(animator instanceof BoneAnimator)) continue;

                for (let channelId in channelTypes) {
                    if (!(animator[channelId] && animator[channelId].length)) continue;
                    let keyframes = animator[channelId].slice().sort((a, b) => a.time - b.time);
                    let keyframeStrings: string[] = [];

                    keyframes.forEach((keyframe, index) => {
                        let keyframeString = this.addKeyframe(channelId, keyframe.time, keyframe.calc("x"), keyframe.calc("y"), keyframe.calc("z"), keyframe.interpolation);
                        keyframeStrings.push(keyframeString);
                        if (keyframe.data_points[1]) {
                            let keyframeString1 = this.addKeyframe(channelId, keyframe.time+0.001, keyframe.calc("x", 1), keyframe.calc("y", 1), keyframe.calc("z", 1), keyframe.interpolation);
                            keyframeStrings.push(keyframeString1);
                        } else if (keyframe.interpolation == "step" && keyframes[index+1]) {
                            let nextKeyframe = keyframes[index+1];
                            let nextKeyframeString = this.addKeyframe(channelId, nextKeyframe.time-0.001, keyframe.calc("x"), keyframe.calc("y"), keyframe.calc("z"), "linear");
                            keyframeStrings.push(nextKeyframeString);
                        }
                    });

                    let channelBuilder: FileBuilder = new FileBuilder(this.config.channel);
                    channelBuilder.replaceVar("name", animator.name);
                    channelBuilder.replaceVar("channel_type", channelTypes[channelId]);
                    channelBuilder.replaceVar("keyframes", "\n\t\t\t" + keyframeStrings.join(",\n\t\t\t") + "\n\t\t");

                    channelStrings.push(channelBuilder.build());
                }
            }

            animString.replaceVar("channels", "\n\t\t" + channelStrings.join("\n\t\t") + "\n\t\t")
            animationStrings.push(animString.build());
        });

        file.replaceVar("animations", animationStrings.join("\n\n\t"));
        return file.build();
    }

    private addKeyframe(channelId: string, time: number, x: number, y: number, z: number, easing: string): string {
        if(channelId == "position") x *= -1;
        if(channelId == "rotation") {
            x *= -1;
            y *= -1;
        }

        let keyframeBuilder: FileBuilder = new FileBuilder(this.config.keyframeTypes[channelId]);
        keyframeBuilder.replaceVar("time", toFloat(time));
        keyframeBuilder.replaceVar("x", toFloat(x));
        keyframeBuilder.replaceVar("y", toFloat(y));
        keyframeBuilder.replaceVar("z", toFloat(z));
        keyframeBuilder.replaceVar("easing", this.config.easingTypes[easing] || this.config.easingTypes.linear);
        return keyframeBuilder.build();
    }
}

export const ANIMATION_TEMPLATE_1_21_11: AnimationTemplate = new AnimationTemplate({
    file: `%(comment_info)
public class %(animation_class) {
    %(animations)
}`,
    animation: "public static final AnimationDefinition %(name) = AnimationDefinition.Builder.withLength(%(length))%(looping)%(channels).build();",
    looping: ".looping()",
    channel: `.addAnimation("%(name)", new AnimationChannel(%(channel_type), %(keyframes)))`,
    channelTypes: {
        rotation: "AnimationChannel.Targets.ROTATION",
        position: "AnimationChannel.Targets.POSITION",
        scale: "AnimationChannel.Targets.SCALE"
    },
    keyframeTypes: {
        rotation: "new Keyframe(%(time), KeyframeAnimations.degreeVec(%(x), %(y), %(z)), %(easing))",
        position: "new Keyframe(%(time), KeyframeAnimations.posVec(%(x), %(y), %(z)), %(easing))",
        scale: "new Keyframe(%(time), KeyframeAnimations.scaleVec(%(x), %(y), %(z)), %(easing))"
    },
    easingTypes: {
        linear: "AnimationChannel.Interpolations.LINEAR",
        catmullrom: "AnimationChannel.Interpolations.CATMULLROM",
    }
})

export const ANIMATION_TEMPLATE_26_1_SNAPSHOT_1: AnimationTemplate = new AnimationTemplate({
    ...ANIMATION_TEMPLATE_1_21_11.config,
    looping: ".loop()"
})
