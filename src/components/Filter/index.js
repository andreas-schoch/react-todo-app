import React from 'react'
import './index.css'
import FilterButton from './FilterButton'
import { connect } from 'react-redux'


const Filter = ({ filters, dispatch }) => {
    const setFilter = (evt) => {
        const filterName = evt.target.getAttribute('data-filter-name');

        if (filterName) {
            filters = filters.map(filter => {
                filter.active = (filter.name === filterName);
                return filter;
            });
            
            dispatch({ type: 'SET_FILTER', payload: filters })
        }
    }

return <div className='filter-container' onClick={ setFilter }>
            <span></span>
            { filters.map( (filter, i) => <FilterButton filter={ filter } key={i} />)}
            <span></span>
        </div>
}
    

const mapStateToProps = (state) => ({filters: state.filters});
export default connect(mapStateToProps)(Filter);
