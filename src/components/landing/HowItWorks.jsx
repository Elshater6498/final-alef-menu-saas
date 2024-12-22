import { BiMoney, BiShareAlt, BiQrScan, BiMessageCheck } from 'react-icons/bi'

import HowItWorksCard from './HowItWorksCard'
import LottieAnimation from './LottieAnimation'
import { useTranslation } from 'react-i18next'

const HowItWorks = () => {
  const { t } = useTranslation('landing')
  const howToUseData = [
    {
      id: 1,
      title: t('how.step1_title'),
      subtitle: t('how.step1_desc'),
      image: '/landing/step1.png',
      icon: BiMessageCheck,
    },
    {
      id: 2,
      title: t('how.step2_title'),
      subtitle: t('how.step2_desc'),
      image: '/landing/step2.png',
      icon: BiQrScan,
    },
    {
      id: 3,
      title: t('how.step3_title'),
      subtitle: t('how.step3_desc'),
      image: '/landing/step3.png',
      icon: BiShareAlt,
    },
    {
      id: 4,
      title: t('how.step4_title'),
      subtitle: t('how.step4_desc'),
      image: '/landing/step4.png',
      icon: BiMoney,
    },
  ]

  return (
    <section className='w-full py-14 px-2 md:px-4' id='how'>
      <div className='flex flex-col items-start px-4 w-full gap-2'>
        <h2 className='font-bold text-2xl md:text-3xl max-w-6xl mx-auto px-4'>
          {t("how.title")}
        </h2>
        <div className='flex gap-0 items-center max-w-7xl mx-auto pl-[117px]'>
          <div className='w-[10px] h-[10px] bg-landingMain-900 rounded-full'></div>
          <div className='h-[2px] w-[100px] bg-landingMain-900'></div>
        </div>
        <p className='mx-auto font-medium text-sm md:text-base'>
          {t("how.subtitle")}
        </p>
      </div>
      <div className='w-full lg:pt-14 flex flex-col lg:flex-row gap-8'>
        <LottieAnimation />
        <div className='flex flex-col gap-6'>
          {howToUseData.map((item, i) => (
            <HowItWorksCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
