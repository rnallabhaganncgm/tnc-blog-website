import React from 'react'
import PriceMarquee from './price-marquee'
import MaxWidthWrapper from '../max-width-wrapper'
import Topbar from './topbar'

const Header = () => {
  return (
    <header className='py-3'>
      <MaxWidthWrapper className='flex flex-col gap-5'>
        <Topbar />
        <PriceMarquee />
      </MaxWidthWrapper>
    </header>
  )
}

export default Header