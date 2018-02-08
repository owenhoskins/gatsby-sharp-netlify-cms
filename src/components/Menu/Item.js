import React from 'react'

import { basekick } from '../../utils/typography'

console.log('basekick: ', basekick)

const Item = ({ title, active }) => (
  <div
    css={{
      opacity: active ? 1 : 0.3,
      filter: 'blur(1px)',
      letterSpacing: '2px',
      textTransform: 'lowercase',
      ...basekick({
        typeSizeModifier: 1, //0.875,
        typeRowSpan: 3,
      })
    }}
  >
    {title}
  </div>
)

export default Item
