import React from 'react'
import PriceMarquee from './price-marquee'
import MaxWidthWrapper from '../max-width-wrapper'
import Topbar from './topbar'
import Navigation from './navigation'
import LanguageSelector from './language-selector'

const Header = () => {
  return (
    <header className='py-3'>
      <MaxWidthWrapper className='flex flex-col gap-5'>
        <Topbar />
        <div className='flex items-center justify-between'>
          <Navigation />
          <LanguageSelector />
        </div>
        <PriceMarquee />
      </MaxWidthWrapper>
    </header>
  )
}

export default Header