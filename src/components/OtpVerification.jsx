import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  useSendOtp,
  useVerifyOtp,
} from "../lib/react-query/queriesAndMutations";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const OtpVerification = ({ onVerificationSuccess }) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phone, setPhone] = useState("");
  const { t } = useTranslation();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const onSendOtpSuccess = () => {
    toast.success(t("otp:otpSent"));
    setShowOtpInput(true);
  };

  const onSendOtpError = () => {
    toast.error(t("otp:sendError"));
  };

  const onVerifySuccess = () => {
    toast.success(t("otp:verifySuccess"));
    onVerificationSuccess(phone);
  };

  const onVerifyError = () => {
    toast.error(t("otp:verifyError"));
  };

  const { mutate: sendOtp, isLoading: isSendingOtp } = useSendOtp(
    onSendOtpSuccess,
    onSendOtpError
  );

  const { mutate: verifyOtp, isLoading: isVerifyingOtp } = useVerifyOtp(
    onVerifySuccess,
    onVerifyError
  );

  const handlePhoneSubmit = () => {
    if (!phone) {
      toast.error(t("customerData:fieldRequired"));
      return;
    }
    sendOtp({ phone: `+${phone}` });
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      nextInput?.focus();
    }

    // Combine OTP values and update form
    const otpString = newOtpValues.join("");
    if (otpString.length === 6) {
      setValue("otp", otpString);
    }
  };

  const handleOtpSubmit = (data) => {
    verifyOtp({ phone: `+${phone}`, code: data.otp });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t("otp:verifyPhone")}</h2>

      {!showOtpInput ? (
        <div className="flex flex-col gap-4">
          <div className="phone-input-container">
            <PhoneInput
              country="sa"
              value={phone}
              onChange={(value) => setPhone(value)}
              inputProps={{
                required: true,
              }}
            />
          </div>
          <button
            className="bg-main text-white py-2 px-4 rounded-full"
            onClick={handlePhoneSubmit}
            disabled={isSendingOtp}
          >
            {isSendingOtp ? t("common:loading") : t("otp:sendOtp")}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleOtpSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-2 justify-center" dir="ltr">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength={1}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl border rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !value && index > 0) {
                    const prevInput = document.querySelector(
                      `input[name=otp-${index - 1}]`
                    );
                    prevInput?.focus();
                  }
                }}
              />
            ))}
          </div>
          {errors.otp && (
            <span className="text-red-500 text-sm text-center">
              {errors.otp.message}
            </span>
          )}
          <button
            type="submit"
            className="bg-main text-white py-2 px-4 rounded-full"
            disabled={isVerifyingOtp}
          >
            {isVerifyingOtp ? t("common:loading") : t("otp:verify")}
          </button>
        </form>
      )}
    </div>
  );
};

export default OtpVerification;
