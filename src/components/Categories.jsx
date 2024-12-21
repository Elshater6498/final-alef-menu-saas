import { useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const Categories = ({
  setValue,
  activeCategory,
  categories,
  setActiveCategory,
}) => {
  const containerRef = useRef(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const scrollToCategory = (categoryId, index) => {
    setActiveCategory(categoryId);
    setValue(index);

    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const headerOffset = 35;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Center active category in the horizontal scroll
  const centerActiveCategory = useCallback(() => {
    if (!activeCategory || !containerRef.current) return;

    const container = containerRef.current;
    const activeElement = container.querySelector(
      `[data-category="${activeCategory}"]`
    );

    if (activeElement) {
      const containerWidth = container.offsetWidth;
      const elementWidth = activeElement.offsetWidth;
      const scrollMax = container.scrollWidth - containerWidth;

      if (isRTL) {
        // For RTL mode
        const elementRight =
          container.scrollWidth -
          (activeElement.offsetLeft +
            elementWidth +
            (containerWidth - elementWidth) / 2);
        const centerPosition =
          elementRight - (containerWidth - elementWidth) / 2;

        // Invert the scroll position for RTL and ensure it stays within bounds
        const boundedPosition = Math.max(
          -scrollMax,
          Math.min(0, -centerPosition)
        );

        container.scrollTo({
          left: boundedPosition,
          behavior: "smooth",
        });
      } else {
        // For LTR mode
        const centerPosition =
          activeElement.offsetLeft - (containerWidth - elementWidth) / 2;
        const boundedPosition = Math.max(
          0,
          Math.min(scrollMax, centerPosition)
        );

        container.scrollTo({
          left: boundedPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeCategory, isRTL]);

  // Run centering effect when active category changes or language changes
  useEffect(() => {
    if (activeCategory) {
      // Add small delay to ensure DOM is updated
      setTimeout(centerActiveCategory, 0);
    }
  }, [activeCategory, centerActiveCategory, isRTL]);

  return (
    <div
      ref={containerRef}
      className={`sticky top-0 p-2 flex gap-2 overflow-x-auto dark:bg-gray-700 whitespace-nowrap w-full z-[50] bg-white shadow-[0_1px_2px_rgb(0,0,0,5%)] hide-scrollbar`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="inline-flex gap-2">
        {categories?.map((item, i) => (
          <div
            key={i}
            data-category={item.id}
            className={`inline-flex items-center font-bold h-10 whitespace-nowrap justify-center rounded-full gap-2 text-sm px-4 py-1 dark:bg-gray-900 dark:text-white cursor-pointer transition-colors duration-200 ${
              activeCategory === item.id
                ? "text-white bg-main dark:bg-main"
                : "bg-gray-100"
            }`}
            onClick={() => scrollToCategory(item.id, i)}
          >
            <span className="text-sm whitespace-nowrap font-semibold">
              {item?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
