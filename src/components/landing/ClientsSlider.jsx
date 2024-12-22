import { useRef } from 'react'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { partners } from '../../data'
import { useTranslation } from 'react-i18next'

const ClientsSlider = () => {
  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)

  const { t } = useTranslation('landing')

  return (
    <div className='mt-5 py-12'>
      <Swiper
        dir='ltr'
        loop={true}
        navigation={{
          prevEl: swiperPrevRef.current,
          nextEl: swiperNextRef.current,
        }}
        slidesPerView={2}
        centeredSlides={true}
        grabCursor={true}
        autoplay={true}
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        breakpoints={{
          425: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = swiperPrevRef.current
          swiper.params.navigation.nextEl = swiperNextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        className='max-w-6xl mx-auto px-5'
      >
        {partners.map((item, i) => (
          <SwiperSlide key={i} className='flex items-center justify-center'>
            <div onClick={()=>{
              window.open(item.link)
            }} className='bg-white rounded-xl p-2 w-36 h-36 overflow-hidden '>
              <img
                src={item.logo}
                alt={`service-${i}`}
                className='w-full h-full object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
        <span
          ref={swiperPrevRef}
          className='absolute -left-7 -translate-y-1/2 top-1/2 z-20 p-2 group transition cursor-pointer text-landingMain-700 hover:text-landingMain-900 flex items-center justify-center'
        >
          <GoChevronLeft className='text-7xl' />
        </span>
        <span
          ref={swiperNextRef}
          className='absolute -right-7 -translate-y-1/2 top-1/2 z-20  p-2 group transition cursor-pointer text-landingMain-700 hover:text-landingMain-900 flex items-center justify-center'
        >
          <GoChevronRight className='text-7xl' />
        </span>
      </Swiper>
    </div>
  )
}

export default ClientsSlider
