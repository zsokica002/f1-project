export function getColor(position) {
    // console.log(position);
    switch (position) {
        case 1: return "#EFBF04";
            break;
        case 2: return "#C4C4C4";
            break;
        case 3: return "#C68346";
            break;
        case 4: return "#339933";
            break;
        case 5: return "#53c653";
            break;
        case 6: return "#79d279";
            break;
        case 7: return "#9fdf9f";
            break;
        case 8: return "#b3e6b3";
            break
        case 9: return "#c6ecc6";
            break;
        case 10: return "#d9f2d9";
            break;
        default: return "#EDE8D0";
            break;
    }
}

export function getTopThreeClassName(position) {
    switch (position) {
        case 1: "1st";
            break;
        case 2: "2nd";
            break;
        case 3: "3rd";
            break;
        default: "";
            break;
    }
}