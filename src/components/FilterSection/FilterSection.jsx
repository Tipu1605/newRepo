import React from 'react'

const FilterSection = ({setFilter}) => {
  return (
    <div>
        <button onClick={() => setFilter(0)}>ALL</button>
        <button onClick={() => setFilter(1)}>DONE</button>
        <button onClick={() => setFilter(2)}>LEFT</button>
    </div>
  )
}

export default FilterSection