import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

// Form validation schema

const Contact = () => {
  const { t } = useTranslation();
  const formSchema = z.object({
    businessName: z.string().min(2, t("landing:contact.formSchema.businessName")),
    responsiblePersonName: z.string().min(2, t("landing:contact.formSchema.responsiblePersonName")),
    mobile: z.string()
      .min(10, t("landing:contact.formSchema.mobileNumber"))
      .regex(/^[0-9+\s-]+$/, t("landing:contact.formSchema.mobileIvalid")),
    email: z.string().email(t("landing:contact.formSchema.email")).optional().or(z.literal('')),
    country: z.string().min(2, t("landing:contact.formSchema.country")),
    city: z.string().optional().or(z.literal(''))
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    try {
      emailjs.init("sclLwJLraT_ZFNTaf");

      const templateParams = {
        to_email: 'menusoftcontact@gmail.com',
        business_name: data.businessName,
        responsible_person: data.responsiblePersonName,
        mobile: data.mobile,
        email: data.email || 'Not provided',
        country: data.country,
        city: data.city || 'Not provided'
      };

      const response = await emailjs.send(
        'service_02knlo8',
        'template_3th7h9t',
        templateParams
      );

      if (response.status === 200) {
        reset();
        toast.success(t("landing:contact.successMessage"), {
          position: 'top-center',
          duration: 3000
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t("landing:contact.errorMessage"), {
        position: 'top-center',
        duration: 3000
      });
    }
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto bg-gray-200 p-10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">{t("landing:contact.title")}</h2>
        <p className="text-center text-lg mb-4">{t("landing:contact.subtitle1")}</p>
        <p className="text-center text-lg mb-4">{t("landing:contact.subtitle2")}</p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="businessName" className={labelClasses}>
                {t("landing:contact.businessName")}
              </label>
              <input
                id="businessName"
                type="text"
                {...register('businessName')}
                className={inputClasses}
              />
              {errors.businessName && (
                <p className={errorClasses}>{errors.businessName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="responsiblePersonName" className={labelClasses}>
                {t("landing:contact.responsiblePersonName")}
              </label>
              <input
                id="responsiblePersonName"
                type="text"
                {...register('responsiblePersonName')}
                className={inputClasses}
              />
              {errors.responsiblePersonName && (
                <p className={errorClasses}>{errors.responsiblePersonName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="mobile" className={labelClasses}>
                {t("landing:contact.mobileNumber")}
              </label>
              <input
                id="mobile"
                type="tel"
                {...register('mobile')}
                className={inputClasses}
              />
              {errors.mobile && (
                <p className={errorClasses}>{errors.mobile.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                {t("landing:contact.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={inputClasses}
              />
              {errors.email && (
                <p className={errorClasses}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="country" className={labelClasses}>
                {t("landing:contact.country")}
              </label>
              <input
                id="country"
                type="text"
                {...register('country')}
                className={inputClasses}
              />
              {errors.country && (
                <p className={errorClasses}>{errors.country.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className={labelClasses}>
                {t("landing:contact.city")}
              </label>
              <input
                id="city"
                type="text"
                {...register('city')}
                className={inputClasses}
              />
              {errors.city && (
                <p className={errorClasses}>{errors.city.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors block mx-auto px-10"
            >
              {t("landing:contact.send")}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;