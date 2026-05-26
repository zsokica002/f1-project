// export function getColor(position) {
//     switch (position) {
//         case 1: return "rgba(18, 19, 20)";
//             break;
//         case 2: return "rgba(18, 19, 20)";
//             break;
//         case 3: return "rgba(18, 19, 20)";
//             break;
//         case 4: return "#339933";
//             break;
//         case 5: return "#53c653";
//             break;
//         case 6: return "#79d279";
//             break;
//         case 7: return "#9fdf9f";
//             break;
//         case 8: return "#b3e6b3";
//             break
//         case 9: return "#c6ecc6";
//             break;
//         case 10: return "#d9f2d9";
//             break;
//         default: return "#EDE8D0";
//             break;
//     }
// }

export function getTopThreeClassName(position) {
    // switch (position) {
    //     case 1: "first";
    //         break;
    //     case 2: "second";
    //         break;
    //     case 3: "third";
    //         break;
    //     default: "";
    //         break;
    // }

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