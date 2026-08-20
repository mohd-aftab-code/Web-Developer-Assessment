/**
 * Formats a number as a currency string.
 * @param amount The amount to format
 * @param currency The currency code (default: USD)
 * @returns A formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formats a date string into a readable format.
 * @param date The date string or object
 * @returns A formatted date string
 */
export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};
