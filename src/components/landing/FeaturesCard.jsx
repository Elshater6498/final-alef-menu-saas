const FeaturesCard = ({ item }) => (
  <div className='grid grid-cols-[48px_1fr] items-start gap-4'>
    <img
      src={item.image}
      alt={item.title}
      className='w-12 brightness-0 invert'
    />
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl font-semibold text-gray-200'>{item.title}</h3>
      <p className='lg:max-w-[230px] font-medium text-base text-gray-300'>
        {item.subtitle}
      </p>
    </div>
  </div>
)

export default FeaturesCard
