import ClientsSlider from './ClientsSlider'
import { useTranslation } from 'react-i18next'

const Clients = () => {
  const { t } = useTranslation('landing')

  return (
    <section
      id='clients'
      className='bg-slate-900 text-white shadow-[0_0_0_100vmax_rgb(15_23_42)] [clip-path:inset(0_-100vmax)] py-16'
    >
      <div className='flex flex-col justify-center w-fit mx-auto gap-2'>
        <h2 className='font-bold text-3xl'>{t("clients.title")}</h2>
        <div className='flex gap-0 items-center'>
          <div className='w-[10px] h-[10px] bg-landingMain-900 rounded-full'></div>
          <div className='h-[2px] w-[50px] bg-landingMain-900'></div>
        </div>
      </div>
      <ClientsSlider />
    </section>
  )
}

export default Clients
