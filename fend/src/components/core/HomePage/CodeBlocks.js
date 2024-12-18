import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation';
import './Border.css'


const CodeBlocks = ({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock, backgroundGradient,codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between items-center flex-col gap-10`}>
            {/* Section 1 */}
            <div className='w-[80%] flex flex-col  '>
                {heading}
                <div className='text-richblack-300 font-bold mt-3'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>
        
            {/* Section 2 */}
            <div className='h-fit code-border  flex flex-row text-[16px] w-[100%] leading-[18px] py-4 lg:w-[500px] relative'>
                {/* HW BG Gradiant */}
                <div className='gradient-custom bg-yellow-50 h-[257px] rounded-full blur-2xl opacity-20 -left-10 -top-1'></div>
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation
                         sequence={[codeblock,2000,""]}
                          repeat={Infinity}
                          cursor={true}
                          style={{
                            whiteSpace:'pre-line',
                            display:"block"
                          }}
                          omitDeletionAnimation={true}
                    />
                </div>
            </div>

    </div>
  )
}

export default CodeBlocks
