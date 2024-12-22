import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BsX, BsList } from 'react-icons/bs'

const NavLinks = () => {
  const [menuOn, setMenuOn] = useState(false)
  const { t, i18n } = useTranslation("landing");

  const navLinks = [
    { id: 1, name: t('nav.features'), route: '#features' },
    { id: 2, name: t('nav.how'), route: '#how' },
    { id: 4, name: t('nav.clients'), route: '#clients' },
    { id: 3, name: t('nav.pricing'), route: '#pricing' },
  ]

  return (
    <>
      <div
        className={`flex items-center justify-center lg:w-full lg:gap-6 gap-4 lg:flex-row flex-col absolute inset-x-0 lg:static z-40 bg-white lg:bg-transparent mx-4 transition-all duration-500 rounded-lg p-4 shadow-lg lg:shadow-none ${
          menuOn ? 'top-28' : 'top-[-100vh]'
        }`}
      >
        {navLinks.map((link) => (
          <a
            href={link.route}
            onClick={() => setMenuOn(false)}
            key={link.id}
            className='touch-none select-none text-muted-foreground transition-colors lg:py-2 lg:text-sm font-medium hover:text-primary text-lg'
          >
            {link.name}
          </a>
        ))}
      </div>
      <button
        className='lg:hidden block order-3 lg:order-2 font-bold text-gray-600 text-4xl'
        onClick={() => setMenuOn(!menuOn)}
      >
        {menuOn ? <BsX /> : <BsList />}
      </button>
    </>
  )
}

export default NavLinks
