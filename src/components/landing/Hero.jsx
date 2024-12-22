import { useTranslation } from "react-i18next"

const Hero = () => {
  const { t } = useTranslation("landing")
  return (
    <section id='hero' className='w-full flex flex-col justify-between lg:flex-row-reverse items-center gap-10 lg:gap-10 pt-16 pb-32'>
      <img
        src='/landing/hero.png'
        alt='hero'
        className='lg:w-[410px]'
        loading='eager'
      />
      <div className='flex flex-col gap-10 md:gap-16'>
        <div className='flex flex-col'>
          <h2 className='text-landingMain-900 text-sm mb-4 font-semibold'>
            {t("hero.subtitle")}
          </h2>
          <h1 className='font-bold text-3xl lg:text-4xl xl:text-5xl leading-relaxed mb-4'>
            {t("hero.title_pt1")}
          </h1>
          <h1 className='font-bold text-3xl lg:text-4xl xl:text-5xl leading-relaxed mb-8'>
            {t("hero.title_pt2")}
          </h1>
          <p className='max-w-sm'>{t("hero.desc")}</p>
        </div>
        <a
          href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello,%20more%20information!'
          target='_blank'
          rel='noreferrer'
          className='font-semibold bg-landingMain-900 py-2 px-8 rounded-full text-white outline-none w-fit'
        >
          {t("hero.button")}
        </a>
      </div>
    </section>
  )
}

export default Hero
