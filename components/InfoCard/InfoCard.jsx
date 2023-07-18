import React from 'react'
import Tag from './Tag'

function InfoCard({text, tag}) {
  return (
    <div className='info-card'>
        <p>{text}</p>
        <Tag text={tag} />
    </div>
  )
}

export default InfoCard