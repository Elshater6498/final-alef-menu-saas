import { Link } from 'react-router-dom';
import { socialMediaLinks } from '../../data';
import { useTranslation } from 'react-i18next';

const Footer = () => {
const { t } = useTranslation('landing');
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-5 py-10 flex flex-col items-center justify-center text-center flex-wrap gap-8">
        {/* LOGO */}
        <Link href="/">
          <img
            src="/landing/logo_1.svg"
            className="invert brightness-0"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        {/* Social Media */}
        <div className="flex items-center flex-wrap gap-6">
          {socialMediaLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              key={link.id}
              className="rounded-full bg-landingMain-900"
            >
              <link.icon className="w-9 h-9 p-2 text-slate-900" />
            </a>
          ))}
        </div>
      </div>
      <p className="text-xs text-center py-2">
        &copy; {new Date().getFullYear()} {t("footer.copyright")}
      </p>
    </footer>
  );
}

export default Footer
