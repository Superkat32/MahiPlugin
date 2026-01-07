import {
    easeInBack,
    easeInBounce,
    easeInCirc,
    easeInCubic,
    easeInElastic,
    easeInExpo,
    easeInOutBack,
    easeInOutBounce,
    easeInOutCirc,
    easeInOutCubic,
    easeInOutElastic,
    easeInOutExpo,
    easeInOutQuad,
    easeInOutQuart,
    easeInOutQuint,
    easeInOutSine,
    easeInQuad,
    easeInQuart,
    easeInQuint,
    easeInSine,
    easeOutBack,
    easeOutBounce,
    easeOutCirc,
    easeOutCubic,
    easeOutElastic,
    easeOutExpo,
    easeOutQuad,
    easeOutQuart,
    easeOutQuint,
    easeOutSine
} from "./easings";

// List of all easing types available. Select icon SVGs(except square) copy-pasted from the Geckolib Blockbench Plugin:
// https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/animationUi.ts

export const FADE_IN_SVG: string = `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 4.23333333,0 5.29166663,-1.05833 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`
export const FADE_OUT_SVG: string = `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 0,-4.23333 1.05833333,-5.29166 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`
export const FADE_IN_OUT_SVG: string = `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 5.55625003,0 -0.26458334,-5.29166 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`

export const EASING_TYPES: Easings = {
    "linear": {
        in: (amount: number) => amount,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="M 0.52916667,296.47081 5.8208333,291.17915" style="fill:none;stroke-width:0.52916667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("linear", true)
    },
    "square": {
        in: () => 0,
        out: () => 1,
        selectSvg: `<svg width="24" height="24" viewBox="0 0 6.35 6.35"><g transform="translate(0 -290.65)"><path d="m0.52917 296.47h2.6458v-2.6458-2.6458h2.6458" style="fill:none;stroke-width:0.52916667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: {
            inIcon: "easing-square-in",
            outIcon: "easing-square-out",
            inOutIcon: "easing-square-in",
        }
    },
    "sine": {
        in: easeInSine,
        out: easeOutSine,
        inOut: easeInOutSine,
        selectSvg: `<svg width="24" height="24" viewBox="0 0 6.3499999 6.3500002"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 1.32291663,0 4.23333333,-3.43958 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("sine")
    },
    "quad": {
        name: "Quadratic",
        in: easeInQuad,
        out: easeOutQuad,
        inOut: easeInOutQuad,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="M 0.52916667,296.47081 C 3.175,296.47081 4.7625,293.03123 5.8208333,291.17915" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("quad")
    },
    "cubic": {
        in: easeInCubic,
        out: easeOutCubic,
        inOut: easeInOutCubic,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="M 0.52916667,296.47081 C 3.175,296.47081 4.7625,293.82498 5.8208333,291.17915" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("cubic")
    },
    "quart": {
        name: "Quartic",
        in: easeInQuart,
        out: easeOutQuart,
        inOut: easeInOutQuart,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 3.17500003,0 4.23333333,-2.64583 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("quart")
    },
    "quint": {
        name: "Quintic",
        in: easeInQuint,
        out: easeOutQuint,
        inOut: easeInOutQuint,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 3.43958333,0 4.23333333,-1.85208 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("quint")
    },
    "expo": {
        name: "Exponential",
        in: easeInExpo,
        out: easeOutExpo,
        inOut: easeInOutExpo,
        selectSvg: FADE_IN_SVG,
        keyframeIconSet: icon("expo")
    },
    "circ": {
        name: "Circle",
        in: easeInCirc,
        out: easeOutCirc,
        inOut: easeInOutCirc,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="M 0.52916667,296.47081 C 5.8208333,295.67706 5.8208333,293.82498 5.8208333,291.17915" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("circ")
    },
    "back": {
        in: easeInBack,
        out: easeOutBack,
        inOut: easeInOutBack,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,295.94165 c 3.17500003,0 4.23333333,2.91041 5.29166663,-4.7625" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("back")
    },
    "elastic": {
        in: easeInElastic,
        out: easeOutElastic,
        inOut: easeInOutElastic,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,295.67706 c 0.79375003,0 0.79375003,-0.26458 1.32291663,-0.26458 0.5291667,0 0.79375,0.52917 1.3229167,0.52917 0.5291667,0 1.0094474,-1.83865 1.3229167,-0.79375 0.79375,2.64583 1.3229166,1.32292 1.3229166,-3.96874" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("elastic")
    },
    "bounce": {
        in: easeInBounce,
        out: easeOutBounce,
        inOut: easeInOutBounce,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 0.26458333,-0.26458 0.52916673,-0.26458 0.79375003,0 0.5291666,-0.52916 0.5291666,-0.52916 1.0583333,0 0.79375,-2.11666 1.5875,-2.11666 2.38125,0 0.2645833,-4.23333 1.0583333,-5.29165 1.0583333,-5.29165" style="fill:none;stroke-width:0.52899998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("bounce")
    }
}

function icon(name: string, onlyInOut: boolean = false): EasingKeyframeIconSet {
    if(onlyInOut) return {
        inOutIcon: `easing-${name}`
    }
    return {
        inIcon: `easing-in_${name}`,
        outIcon: `easing-out_${name}`,
        inOutIcon: `easing-in_out_${name}`,
    }
}

export type FadeType = "in" | "out" | "inout"

export interface Easings {
    [key: string]: EasingType
}

export interface EasingType {
    name?: string,
    in: Function,
    out?: Function,
    inOut?: Function,
    selectSvg: string,
    keyframeIconSet: EasingKeyframeIconSet
}

export interface EasingKeyframeIconSet {
    inIcon?: IconString,
    outIcon?: IconString,
    inOutIcon: IconString
}


