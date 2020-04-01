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
        // this.setState(
        //     { selectedOption },
        //     () => console.log(`Option selected:`, this.state.selectedOption)
        // );
    };

    useEffect( () => {
        const countries =[]
        geos.forEach(geo => {
        if(geo && typeof geo !== "undefined") {
            countries.push(optionReducer(geo))}
        });

        // let countries = [];
        // console.log('starting', countries);
        // geos.forEach((geo) => {
        //     console.log('aa',geo)
        //     countries.push(optionReducer(geo))
        // })
        // console.log(countries)
        setOptions(countries);
        // const countryList = [...options, optionReducer()]

    }, [geos])

    const handleSelect = (e) => {
        // console.log('bla bla bla',e)
        // const country = getName(e.target.value.toLowerCase());
        setGraphGeo(e.value)
    };

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
        control: () => ({
            width: 400,
            display: 'flex'
        }),
    }

    return (
        <div className="dashboard-header">
            <h2 className="dashboard-header-title">See live outbreaks, reports and statistics</h2>

            <span className="select-wrapper">
                <Select
                styles={customStyles}
                className="dashboard-header-select"
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