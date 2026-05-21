export function getFlagByNationality(flags, nationality) {
    if (nationality === "Azerbaijani") {
        return flags ="LY";
    } else if(nationality === "British"){
        return flags = "GB";
    } else if(nationality === "Emirati"){
        return flags = "AE";
    } else if(nationality === "Dutch"){
        return flags = "NL";
    } else if(nationality === "Monegasque") {
        return flags = "MC";
    } else if(nationality === "New Zealander"){
        return flags = "NZ";
    }

    const flagA2 = flags.find(flag => flag.nationality === nationality);
    return flagA2?.alpha_2_code;
};

export function getFlagByRaceLocation(flags, location) {
    if (location === "Azerbaijan") {
        return  flags = "LY";
    }
     else if(location === "UK"){
        return flags = "GB";
    } else if (location === "UAE"){
        return flags = "AE";
    } else if(location === "Netherlands"){
        return flags = "NL";
    } else if(location === "Monaco"){
        return flags = "MC";
    } else if(location === "New Zealand"){
        return flags = "NZ";
    }

    const raceFlagA2 = flags.find(flag => flag.en_short_name === location)
    return raceFlagA2?.alpha_2_code;
}