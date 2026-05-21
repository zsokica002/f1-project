export function getFlagByNationality(flags, nationality) {
    if (nationality === "Azerbaijani") {
        return flags ="AZ";
    } else if(nationality === "British"){
        return flags = "UK";
    } else if(nationality === "Emirati"){
        return flags = "AE";
    }

    const flagA2 = flags.find(flag => flag.nationality === nationality);
    return flagA2?.alpha_2_code;
};

export function getFlagByRaceLocation(flags, location) {
    if (location === "Azerbaijan") {
        return  flags = "AZ";
    }
     else if(location === "UK"){
        return flags = "GB";
    } else if (location === "UAE"){
        return flags = "AE";
    }

    const raceFlagA2 = flags.find(flag => flag.en_short_name === location)
    return raceFlagA2?.alpha_2_code;
}