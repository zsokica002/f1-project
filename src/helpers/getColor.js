export function getTopThreeClassName(position) {
    if (position === 1) {
        return "first";
    } else if (position === 2) {
        return "second";
    } else if (position === 3) {
        return "third";
    } else {
        return null;
    }
}