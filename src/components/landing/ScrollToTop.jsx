import { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

const ScrollToTop = () => {
  const [scrollTop, setScrollTop] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const showScrollBtn = () => {
    if (window.scrollY >= 200) {
      setScrollTop(true)
    } else {
      setScrollTop(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', showScrollBtn, { passive: true })
    return () => window.removeEventListener('scroll', showScrollBtn)
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={`h-12 w-12 shadow-md rounded-lg bg-landingMain-800 hover:bg-landingMain-900 text-white transition items-center justify-center md:w-14 md:h-14 fixed bottom-8 md:bottom-12 right-8 md:right-12 z-40 ${
        scrollTop ? 'flex' : 'hidden'
      }`}
    >
      <AiOutlineArrowUp className='text-2xl' />
    </button>
  )
}

export default ScrollToTop
