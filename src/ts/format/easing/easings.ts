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

// Quad
export function easeInQuad(amount: number): number {
    return amount * amount;
}
export function easeOutQuad(amount: number): number {
    return 1 - (1 - amount) * (1 - amount);
}
export function easeInOutQuad(amount: number): number {
    return amount < 0.5 ? 2 * amount * amount : 1 - Math.pow(-2 * amount + 2, 2) / 2;
}

// Cubic
export function easeInCubic(amount: number): number {
    return amount * amount * amount;
}
export function easeOutCubic(amount: number): number {
    return 1 - Math.pow(1 - amount, 3);
}
export function easeInOutCubic(amount: number): number {
    return amount < 0.5 ? 4 * amount * amount * amount : 1 - Math.pow(-2 * amount + 2, 3) / 2;
}

// Quart
export function easeInQuart(amount: number): number {
    return amount * amount * amount * amount;
}
export function easeOutQuart(amount: number): number {
    return 1 - Math.pow(1 - amount, 4);
}
export function easeInOutQuart(amount: number): number {
    return amount < 0.5 ? 8 * amount * amount * amount * amount : 1 - Math.pow(-2 * amount + 2, 4) / 2;
}

// Quint
export function easeInQuint(amount: number): number {
    return amount * amount * amount * amount * amount;
}
export function easeOutQuint(amount: number): number {
    return 1 - Math.pow(1 - amount, 5);
}
export function easeInOutQuint(amount: number): number {
    return amount < 0.5 ? 16 * amount * amount * amount * amount * amount : 1 - Math.pow(-2 * amount + 2, 5) / 2;
}

// Expo
export function easeInExpo(amount: number): number {
    return amount === 0 ? 0 : Math.pow(2, 10 * amount - 10);
}
export function easeOutExpo(amount: number): number {
    return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
}
export function easeInOutExpo(amount: number): number {
    return amount === 0
        ? 0
        : amount === 1
            ? 1
            : amount < 0.5 ? Math.pow(2, 20 * amount - 10) / 2
                : (2 - Math.pow(2, -20 * amount + 10)) / 2;
}

// Circ
export function easeInCirc(amount: number): number {
    return 1 - Math.sqrt(1 - Math.pow(amount, 2));
}
export function easeOutCirc(amount: number): number {
    return Math.sqrt(1 - Math.pow(amount - 1, 2));
}
export function easeInOutCirc(amount: number): number {
    return amount < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * amount, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * amount + 2, 2)) + 1) / 2;
}

// Back
export function easeInBack(amount: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * amount * amount * amount - c1 * amount * amount;
}
export function easeOutBack(amount: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(amount - 1, 3) + c1 * Math.pow(amount - 1, 2);
}
export function easeInOutBack(amount: number): number {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return amount < 0.5
        ? (Math.pow(2 * amount, 2) * ((c2 + 1) * 2 * amount - c2)) / 2
        : (Math.pow(2 * amount - 2, 2) * ((c2 + 1) * (amount * 2 - 2) + c2) + 2) / 2;
}

// Elastic
export function easeInElastic(amount: number): number {
    const c4 = (2 * Math.PI) / 3;

    return amount === 0
        ? 0
        : amount === 1
            ? 1
            : -Math.pow(2, 10 * amount - 10) * Math.sin((amount * 10 - 10.75) * c4);
}
export function easeOutElastic(amount: number): number {
    const c4 = (2 * Math.PI) / 3;

    return amount === 0
        ? 0
        : amount === 1
            ? 1
            : Math.pow(2, -10 * amount) * Math.sin((amount * 10 - 0.75) * c4) + 1;
}
export function easeInOutElastic(amount: number): number {
    const c5 = (2 * Math.PI) / 4.5;

    return amount === 0
        ? 0
        : amount === 1
            ? 1
            : amount < 0.5
                ? -(Math.pow(2, 20 * amount - 10) * Math.sin((20 * amount - 11.125) * c5)) / 2
                : (Math.pow(2, -20 * amount + 10) * Math.sin((20 * amount - 11.125) * c5)) / 2 + 1;
}

// Bounce
export function easeInBounce(amount: number): number {
    return 1 - easeOutBounce(1 - amount);
}
export function easeOutBounce(amount: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (amount < 1 / d1) {
        return n1 * amount * amount;
    } else if (amount < 2 / d1) {
        return n1 * (amount -= 1.5 / d1) * amount + 0.75;
    } else if (amount < 2.5 / d1) {
        return n1 * (amount -= 2.25 / d1) * amount + 0.9375;
    } else {
        return n1 * (amount -= 2.625 / d1) * amount + 0.984375;
    }
}
export function easeInOutBounce(amount: number): number {
    return amount < 0.5
        ? (1 - easeOutBounce(1 - 2 * amount)) / 2
        : (1 + easeOutBounce(2 * amount - 1)) / 2;
}