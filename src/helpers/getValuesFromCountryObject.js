const getValueFromCountryObject = (dataType, dataObj, geo) => {
    if (typeof dataObj[(geo.properties.ISO_A2)] !== "undefined") {
        return dataObj[(geo.properties.ISO_A2)][dataType].toLocaleString();
    } else if (typeof dataObj[(geo.properties.WB_A2)] !== "undefined") {
        return dataObj[(geo.properties.WB_A2)][dataType].toLocaleString();
    }
    return 0;
};

export default getValueFromCountryObject;