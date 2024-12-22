import Lottie from 'lottie-react'
import animate from '../../../animate.json'

const LottieAnimation = () => (
  <Lottie
    animationData={animate}
    color='#009cc8'
    className='w-fit lg:w-[500px] h-96 '
  />
)

export default LottieAnimation
