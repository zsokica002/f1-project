export function getFlagByNationality(flags, nationality) {
    if (nationality === "Azerbaijan") {
        return "AZ";
    }

    const flagA2 = flags.find(flag => flag.nationality === nationality);
    return flagA2?.alpha_2_code;
};

export function getFlagByRaceLocation(flags, location) {
    if (location === "Azerbaijan") {
        return "AZ";
    }

    const raceFlagA2 = flags.find(flag => flag.en_short_name === location)
    return raceFlagA2?.alpha_2_code;
}