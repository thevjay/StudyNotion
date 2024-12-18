import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import HightlightText2 from '../HomePage/HightlightText2'
import HightlightText3 from '../HomePage/HightlightText3'

const Quote = () => {
  return (
    <div >
        We are passionate about revolutionizing the way we learn. Our innovative platform

        <HighlightText text={"combines technology"}/>

        {','}
        <HightlightText2 text={"expertise"}/>
          , and community to create an 
        <HightlightText3 text={"unparalleled educational experience."}/>

    </div>
  )
}

export default Quote
