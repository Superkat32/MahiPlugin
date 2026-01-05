import {easeInOutSine, easeInSine, easeOutSine} from "./easings";

// List of all easing types available. Select icon SVGs copy-pasted from the Geckolib Blockbench Plugin:
// https://github.com/JannisX11/blockbench-plugins/blob/master/plugins/geckolib/src/ts/animationUi.ts

export const FADE_IN_SVG: string = `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 4.23333333,0 5.29166663,-1.05833 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`
export const FADE_OUT_SVG: string = `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 0,-4.23333 1.05833333,-5.29166 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`
export const FADE_IN_OUT_SVG: string = `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 5.55625003,0 -0.26458334,-5.29166 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`

export const EASING_TYPES: Easings = {
    "linear": {
        in: (amount) => amount,
        selectSvg: `<svg viewBox="0 0 6.3499999 6.3500002" height="24" width="24"><g transform="translate(0,-290.64998)"><path d="M 0.52916667,296.47081 5.8208333,291.17915" style="fill:none;stroke-width:0.52916667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("linear", true)
    },
    "sine": {
        in: easeInSine,
        out: easeOutSine,
        inOut: easeInOutSine,
        selectSvg: `<svg width="24" height="24" viewBox="0 0 6.3499999 6.3500002"><g transform="translate(0,-290.64998)"><path d="m 0.52916667,296.47081 c 1.32291663,0 4.23333333,-3.43958 5.29166663,-5.29166" style="fill:none;stroke-width:0.5291667;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></g></svg>`,
        keyframeIconSet: icon("sine")
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

export interface Easings {
    [key: string]: EasingType
}

export interface EasingType {
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


