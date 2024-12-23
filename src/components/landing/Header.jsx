import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import ToggleLang from "./ToggleLang";
import { useTranslation } from 'react-i18next';
const Header = () => {
  const { t } = useTranslation('landing');
  return (
    <div className="w-full shadow-md">
      <nav className="md:max-w-5xl mx-auto flex md:gap-0 justify-between px-4 py-2 items-center">
        <Link
          href="/"
          className="flex justify-start items-center gap-2 z-50"
        >
          <img
            src="/landing/alef_logo.svg"
            alt="logo"
            className="w-14 h-auto"
          />
          <div className="hidden md:block lg:whitespace-nowrap">
            <h1 className="text-base font-extrabold">
              {t("nav.logo_title")}
            </h1>
            <p className="text-sm">{t("nav.logo_subtitle")}</p>
          </div>
        </Link>
        <NavLinks />
        <ToggleLang />
      </nav>
    </div>
  );
};

export default Header;
