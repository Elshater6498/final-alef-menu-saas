import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ToggleLang = () => {
  const { i18n } = useTranslation();
  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };
  return (
    <div className="grid gap-4 order-2 lg:order-3 w-fit">
      <Select
        defaultValue={i18n.language}
        onValueChange={() => switchLanguage()}
      >
        <SelectTrigger id="area">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="!min-w-fit">
          <SelectItem value="ar">AR</SelectItem>
          <SelectItem value="en">EN</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ToggleLang;
