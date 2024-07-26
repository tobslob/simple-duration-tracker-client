import {
  parsePhoneNumberFromString,
  CountryCode,
  NumberFormat,
} from "libphonenumber-js";

export function formatPhone(
  phoneNumberString: string,
  country: CountryCode | string | undefined = "UK",
  format: NumberFormat = "INTERNATIONAL"
): string | undefined {
  try {
    const phoneNumber = parsePhoneNumberFromString(
      phoneNumberString,
      country as CountryCode
    );
    return phoneNumber?.format(format);
  } catch (e) {
    return phoneNumberString;
  }
}
