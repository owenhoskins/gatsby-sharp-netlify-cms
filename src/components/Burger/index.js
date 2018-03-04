import React from 'react'

import Emdash from '../Emdash'

const Burger = ({ onClick }) => {

  return (
    <div
      onClick={onClick}
      css={{
        cursor: `pointer`,
        position: `fixed`,
        top: `47px`,
        left: `14.25rem`,
        height: `2.5rem`,
        width: `2.5rem`,
        padding: `0.75rem`,
      }}
    >
      <div
        css={{position: `relative`}}
      >
        <Emdash top={`0`} opacity={0.3} />
        <Emdash top={`8px`} opacity={0.3} />
        <Emdash top={`16px`} opacity={0.3} />
      </div>
    </div>
  )

}

Burger.defaultProps = {
}

export default Burger
