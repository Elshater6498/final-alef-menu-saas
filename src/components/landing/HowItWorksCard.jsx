import { useTranslation } from "react-i18next";

const HowItWorksCard = ({ item }) => {
  const { t } = useTranslation("landing");

  return (
    <div className='grid grid-cols-[30px_1fr] items-start gap-4'>
      <item.icon className='text-3xl text-gray-900' />
      <div className='flex flex-col gap-2'>
        <h3 className='text-xl font-bold'>{item.title}</h3>
        <p>{item.subtitle}</p>
      </div>
    </div>
  )
}

export default HowItWorksCard
