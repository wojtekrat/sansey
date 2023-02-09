import React from 'react'

const Category = ({name, active, handleClick}) => {

  return (
    <div>
        <div className={active === name ? 'sale-category-on' : 'sale-category-off'} onClick={() => handleClick(name)}>{name}

        </div>
        <div>
            
        </div>
    </div>
    
  )
}

export default Category