import { useTranslation } from 'react-i18next'
import { FiCheckCircle } from 'react-icons/fi'
const Pricing = () => {
const {t}=useTranslation("landing")


const sharedFeatures = [
  t("pricing.features.dinamicMenu"),
  t("pricing.features.qr"),
  t("pricing.features.logo"),
  t("pricing.features.appearance"),
  t("pricing.features.dashboard"),
  t("pricing.features.socialMedia"),
  t("pricing.features.googleMap"),
  t("pricing.features.hours"),
  t("pricing.features.language"),
  t("pricing.features.intro"),
  t("pricing.features.products"),
  t("pricing.features.categories"),
  t("pricing.features.customerReviews"),
  t("pricing.features.whatsapp"),
  t("pricing.features.edits"),
  t("pricing.features.team"),
  t("pricing.features.manager"),
  t("pricing.features.support"),
]

  const plans = [
    {
      id: 1,
      planType:t("pricing.basic"),
      title: t("pricing.basicTitle"),
      subTitle:t("pricing.basicSubtitle"),
      best_seller: false,
      month_price: 150,
      half_year_price: 600,
      features: sharedFeatures
    },
    {
      id: 2,
      planType:t("pricing.traditional"),
      title: t("pricing.traditionalTitle"),
      subTitle:t("pricing.traditionalSubtitle"),
      best_seller: true,
      month_price: 100,
      half_year_price: 400,
      features: [
        ...sharedFeatures,
        t("pricing.features.order"),
        t("pricing.features.type"),
        t("pricing.features.location"),
        t("pricing.features.table"),
        t("pricing.features.tableNumber"),
        t("pricing.features.notes"),
        t("pricing.features.print"),
        t("pricing.features.tracking"),
      ]
    }
  ]

  return (
    <section className='py-10' id='pricing'>
      <div className='flex flex-col w-full gap-2'>
        <h2 className='font-bold text-2xl md:text-3xl text-center'>
          {t("pricing.title")}
        </h2>
        <div className='flex gap-0 items-center mx-auto pl-[20px]'>
          <div className='w-[10px] h-[10px] bg-landingMain-900 rounded-full'></div>
          <div className='h-[2px] w-[60px] bg-landingMain-900'></div>
        </div>
        <p className='mx-auto font-medium text-sm md:text-base'>
          {t("pricing.subtitle")}
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-20 py-10'>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`shadow-[0px_5px_20px_0px_rgba(0,0,0,0.2)] flex flex-col rounded-lg relative h-fit pt-10 px-4 ${
              plan.best_seller ? 'bg-white' : 'bg-slate-900 text-white'
            }`}
          >
            {plan.best_seller ? (
              <>
                <div className='absolute right-[110px] -top-3 border-[7px] border-gray-700'></div>
                <div className='absolute -right-3 top-[120px] border-[7px] border-gray-700'></div>
                <div className='w-[150px] h-[150px] absolute -top-3 -right-3 overflow-hidden'>
                  <h3 className='text-center bg-landingMain-900 text-white font-medium py-3 absolute top-8 left-0 rotate-[47deg] w-[200px]'>
                    {t("pricing.best_seller")}
                  </h3>
                </div>
              </>
            ) : null}
            <h4 className='text-center py-4 text-3xl font-bold'>
              {plan.planType}
            </h4>
            <p className="text-center text-base sm:text-lg mb-2">{plan.title}</p>
            <p className="text-center text-base sm:text-lg">{plan.subTitle}</p>
            {/* <p className='text-center text-3xl font-bold'>
              {plan.month_price}{' '}
              <span className='text-base'>{t("pricing.pound")}</span> /{' '}
              <span className='text-lg font-normal'>{t("pricing.month")}</span>
            </p>
            <p className='text-center text-3xl font-bold'>
              {plan.half_year_price}{' '}
              <span className='text-base'>{t("pricing.pound")}</span> /{' '}
              <span className='text-lg font-normal'>6 {t("pricing.months")}</span>
            </p> */}
            <div className='py-6'>
              {plan.features.map((item, i) => (
                <div key={i} className='flex items-center gap-2 px-2 py-3'>
                  <FiCheckCircle className='text-xl text-landingMain-900' />
                  <p
                    className={`${
                      plan.best_seller ? 'text-slate-800' : 'text-gray-200'
                    }`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <a
              href='https://api.whatsapp.com/send?phone=+201100124479&text=Hello,%20more%20information!'
              target='_blank'
              rel='noreferrer'
              className={`py-2 px-8 rounded-full text-center mx-auto items-center font-semibold tracking-wider text-lg my-6 ${
                plan.best_seller
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-900'
              }`}
            >
              {t("pricing.start_now")}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
