import React from 'react'
import './index.css'

const FilterButton = ({ filter }) => {
    return <button 
        className={'btn btn-filter btn-filter-all ' + (filter.active ? 'btn-filter-active' : '')} 
        data-filter-name={ filter.name }>{ filter.name }</button> }

export default FilterButton;
