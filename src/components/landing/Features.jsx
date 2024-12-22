
import FeaturesCard from './FeaturesCard'
import { useTranslation } from 'react-i18next'

const Features = () => {
  const { t } = useTranslation("landing")

  const features1 = [
    {
      id: 1,
      title: t("features.feature1_title"),
      subtitle: t("features.feature1_desc"),
      image: '/landing/services6.png',
    },
    {
      id: 2,
      title: t("features.feature2_title"),
      subtitle: t("features.feature2_desc"),
      image: '/landing/step4.png',
    },
    {
      id: 3,
      title: t("features.feature3_title"),
      subtitle: t("features.feature3_desc"),
      image: '/landing/step1.png',
    },
  ]
  const features2 = [
    {
      id: 1,
      title: t("features.feature4_title"),
      subtitle: t("features.feature4_desc"),
      image: '/landing/services5.png',
    },
    {
      id: 2,
      title: t("features.feature5_title"),
      subtitle: t("features.feature5_desc"),
      image: '/landing/services4.png',
    },
    {
      id: 3,
      title: t("features.feature6_title"),
      subtitle: t("features.feature6_desc"),
      image: '/landing/services1.png',
    },
  ]

  return (
    <section
      className='bg-slate-900 text-white shadow-[0_0_0_100vmax_rgb(15_23_42)] [clip-path:inset(0_-100vmax)] w-full flex flex-col items-center gap-2 lg:gap-4 py-14'
      id='features'
    >
      <div className='flex flex-col items-start px-5 w-full gap-2'>
        <h2 className='font-bold text-2xl md:text-3xl max-w-6xl mx-auto px-4'>
          {t('features.title')}
        </h2>
        <div className='flex gap-0 items-center max-w-7xl mx-auto pl-[88px]'>
          <div className='w-[10px] h-[10px] bg-landingMain-900 rounded-full'></div>
          <div className='h-[2px] w-[100px] bg-landingMain-900'></div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-20 items-center py-10 '>
        <div className='flex flex-col gap-8 order-1 px-4'>
          {features1.map((item) => (
            <FeaturesCard item={item} key={item.id} />
          ))}
        </div>
        <img
          src='/landing/F.png'
          alt='icon'
          className='order-last lg:order-2 w-32 lg:w-48'
        />
        <div className='flex flex-col gap-8 order-3 px-4'>
          {features2.map((item) => (
            <FeaturesCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
