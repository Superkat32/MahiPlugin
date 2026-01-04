// Util file with all the easings from https://easings.net/

export function lerp(start: number, end: number, amount: number): number {
    return amount * (end - start) + start;
}

// Sine
export function easeInSine(amount: number): number {
    return 1 - Math.cos(amount * (Math.PI / 2));
}

export function easeOutSine(amount: number): number {
    return Math.sin((amount * Math.PI) / 2);
}

export function easeInOutSine(amount: number): number {
    return -(Math.cos(Math.PI * amount) - 1) / 2;

}

