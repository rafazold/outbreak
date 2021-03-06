import React, {useEffect, useState} from 'react';
import "./GraphHeader.scss";
import Select from 'react-select';
const { getCode, getName } = require('country-list');

function GraphHeader({geos, setGraphGeo, graphGeo}) {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState({value: 'US', label: 'United States of America'})

    const handleChange = selectedOption => {
        setSelected(selectedOption);
        setGraphGeo(selectedOption.value);
    };

    useEffect( () => {
        const countries =[]
        geos.forEach(geo => {
        if(geo && typeof geo !== "undefined") {
            countries.push(optionReducer(geo))}
        });

        setOptions(countries);

    }, [geos])

    const optionReducer = (value) => {
        if (value) {
            return {
                value: getName(value),
                label: getName(value)
            }
        }
        console.log('really??? ', value)
        return {value:'', label:''}
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 20,
        }),
        control: () => {
            const screenWidth = () => {
                const width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

                if (width > 800) {
                    return 400;
                } else {
                    return 300;
                }
            };

            return ({
            width: screenWidth,
            display: 'flex'
        })},
    }

    return (
        <div className="graph-header">
            <span className="select-wrapper">
                <Select
                styles={customStyles}
                className="graph-header-select"
                defaultValue={options[0]}
                value={selected}
                onChange={handleChange}
                options={options}
                />
            </span>
        </div>
    );
}

export default GraphHeader;