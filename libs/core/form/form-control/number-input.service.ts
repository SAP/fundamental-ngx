import { Injectable } from '@angular/core';

/** Keys that are always allowed in a numeric input (navigation, editing, control). */
const ALLOWED_CONTROL_KEYS = new Set([
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
    'PageUp',
    'PageDown'
]);

/**
 * Service to handle numeric input validation and behavior
 */
@Injectable()
export class NumberInputService {
    /**
     * Validates if a key press is allowed for numeric input
     * @param event The keyboard event
     * @param currentValue The current input value
     * @returns true if the key press is allowed, false otherwise
     */
    isValidKeyPress(event: KeyboardEvent, currentValue: string): boolean {
        const key = event.key;
        const inputElement = event.target as HTMLInputElement;
        const selectionStart = inputElement.selectionStart ?? 0;
        const selectionEnd = inputElement.selectionEnd ?? 0;

        // Allow control keys
        if (ALLOWED_CONTROL_KEYS.has(key)) {
            return true;
        }

        // Allow Ctrl/Cmd shortcuts (copy, paste, select all, etc.)
        if (event.ctrlKey || event.metaKey) {
            return true;
        }

        // Allow digits 0-9
        if (/^[0-9]$/.test(key)) {
            return true;
        }

        // Allow minus/plus sign at the beginning (leading sign) or directly after an exponent (e/E)
        if (key === '-' || key === '+') {
            const charBefore = currentValue.charAt(selectionStart - 1);

            // Exponent sign: allow a sign immediately after e/E, provided the exponent
            // doesn't already have a sign right after the cursor
            if (charBefore === 'e' || charBefore === 'E') {
                const charAfter = currentValue.charAt(selectionEnd);
                return charAfter !== '-' && charAfter !== '+';
            }

            // Only the minus sign is allowed as a leading sign
            if (key === '+') {
                return false;
            }

            // If replacing the entire value, a leading minus is always fine
            if (selectionStart === 0 && selectionEnd === currentValue.length) {
                return true;
            }

            // Leading minus: allow only at the start and when no leading minus already exists
            if (selectionStart === 0) {
                return currentValue.charAt(0) !== '-';
            }

            return false;
        }

        // Allow decimal separator (. or ,) only once
        // Accept both . and , as decimal separators for better UX - parsing will normalize them
        if (key === '.' || key === ',') {
            // Check if any decimal separator already exists in the value (outside selection)
            const valueBeforeCursor = currentValue.substring(0, selectionStart);
            const valueAfterCursor = currentValue.substring(selectionEnd);
            const hasDecimalBefore = /[.,]/.test(valueBeforeCursor);
            const hasDecimalAfter = /[.,]/.test(valueAfterCursor);

            // Allow if no decimal separator exists outside the selection
            return !hasDecimalBefore && !hasDecimalAfter;
        }

        // Allow scientific notation (e or E) only once
        if (key === 'e' || key === 'E') {
            // Check if scientific notation already exists outside selection
            const valueBeforeCursor = currentValue.substring(0, selectionStart);
            const valueAfterCursor = currentValue.substring(selectionEnd);
            const hasEBefore = /[eE]/.test(valueBeforeCursor);
            const hasEAfter = /[eE]/.test(valueAfterCursor);

            return !hasEBefore && !hasEAfter && currentValue.length > 0;
        }

        // Block all other keys
        return false;
    }

    /**
     * Validates if the paste content is valid numeric input
     * @param pastedText The text being pasted
     * @param decimalSeparator The decimal separator character (. or ,)
     * @param precision Optional maximum number of decimal places. When set, pastes with more
     * decimal digits than allowed are rejected.
     * @returns true if the paste is valid, false otherwise
     */
    isValidPaste(pastedText: string, decimalSeparator: '.' | ',' = '.', precision?: number): boolean {
        // Remove thousands separators (both , and space)
        let cleanedText = pastedText.replace(/[\s,]/g, '');

        // If using comma as decimal separator, replace it with period for validation
        if (decimalSeparator === ',') {
            cleanedText = cleanedText.replace(/,/g, '.');
        }

        // Validate numeric format: optional minus at start, digits, optional decimal, optional scientific notation
        const numericPattern = /^-?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;
        if (!numericPattern.test(cleanedText)) {
            return false;
        }

        // Enforce precision: reject if the pasted value has more decimal places than allowed
        if (typeof precision === 'number' && precision >= 0) {
            const parsed = this.parseNumericValue(pastedText, decimalSeparator);
            if (parsed !== null && this.countDecimals(parsed) > precision) {
                return false;
            }
        }

        return true;
    }

    /**
     * Parses a numeric string and returns the numeric value
     * @param value The string value to parse
     * @param decimalSeparator The decimal separator character (. or ,)
     * @returns The parsed number or null if invalid
     */
    parseNumericValue(value: string, decimalSeparator: '.' | ',' = '.'): number | null {
        if (!value || value.trim() === '' || value === '-') {
            return null;
        }

        let cleanedValue = value;

        if (decimalSeparator === ',') {
            // When comma is decimal separator:
            // Accept both . and , as decimal input, normalize to the locale's separator
            const hasPeriod = cleanedValue.includes('.');
            const hasComma = cleanedValue.includes(',');

            if (hasPeriod && hasComma) {
                // Has both - assume thousands separators exist
                // Common formats: "1.234,56" (de-DE) or "1,234.56" (should be rare)
                // Check which appears last to determine which is decimal
                const lastPeriod = cleanedValue.lastIndexOf('.');
                const lastComma = cleanedValue.lastIndexOf(',');

                if (lastComma > lastPeriod) {
                    // Comma is decimal: "1.234,56"
                    cleanedValue = cleanedValue.replace(/[\s.]/g, ''); // Remove spaces and periods (thousands)
                    cleanedValue = cleanedValue.replace(',', '.'); // Replace comma decimal with period
                } else {
                    // Period is decimal (unusual for comma locale): "1,234.56"
                    cleanedValue = cleanedValue.replace(/[\s,]/g, ''); // Remove spaces and commas (thousands)
                }
            } else if (hasPeriod && !hasComma) {
                // Only period - could be decimal OR thousands separator
                const periodCount = (cleanedValue.match(/\./g) || []).length;

                if (periodCount > 1) {
                    // Multiple periods = thousands separators: "1.000.000"
                    cleanedValue = cleanedValue.replace(/[\s.]/g, '');
                } else {
                    // Single period - check if it looks like thousands or decimal
                    const periodIndex = cleanedValue.indexOf('.');
                    const afterPeriod = cleanedValue.substring(periodIndex + 1);

                    // If there are exactly 3 digits after the period and more before, likely thousands
                    if (afterPeriod.length === 3 && /^\d+$/.test(afterPeriod) && periodIndex > 0) {
                        // Thousands separator
                        cleanedValue = cleanedValue.replace(/[\s.]/g, '');
                    } else {
                        // Decimal separator (user typed . in comma-locale input)
                        cleanedValue = cleanedValue.replace(/[\s]/g, '');
                    }
                }
            } else if (!hasPeriod && hasComma) {
                // Only comma - treat as decimal
                cleanedValue = cleanedValue.replace(/[\s]/g, ''); // Only remove spaces
                cleanedValue = cleanedValue.replace(',', '.'); // Replace comma decimal with period
            } else {
                // No separators
                cleanedValue = cleanedValue.replace(/[\s]/g, ''); // Only remove spaces
            }
        } else {
            // When period is decimal separator (default):
            // Accept both . and , as decimal input
            const hasPeriod = cleanedValue.includes('.');
            const hasComma = cleanedValue.includes(',');

            if (hasPeriod && hasComma) {
                // Has both - determine which is decimal by position (last one is decimal)
                const lastPeriod = cleanedValue.lastIndexOf('.');
                const lastComma = cleanedValue.lastIndexOf(',');

                if (lastPeriod > lastComma) {
                    // Period is decimal: "1,234.56"
                    cleanedValue = cleanedValue.replace(/[\s,]/g, ''); // Remove spaces and commas (thousands)
                } else {
                    // Comma is decimal (unusual for period locale): "1.234,56"
                    cleanedValue = cleanedValue.replace(/[\s.]/g, ''); // Remove spaces and periods (thousands)
                    cleanedValue = cleanedValue.replace(',', '.'); // Replace comma decimal with period
                }
            } else if (hasComma && !hasPeriod) {
                // Only comma - could be decimal OR thousands separator
                // If there are multiple commas, they're thousands separators: "1,000,000"
                // If there's one comma, check position:
                //   - If it appears every 3 digits from the right, it's thousands: "1,000"
                //   - Otherwise it's likely decimal: "1,5"
                const commaCount = (cleanedValue.match(/,/g) || []).length;

                if (commaCount > 1) {
                    // Multiple commas = thousands separators
                    cleanedValue = cleanedValue.replace(/[\s,]/g, '');
                } else {
                    // Single comma - check if it looks like thousands or decimal
                    const commaIndex = cleanedValue.indexOf(',');
                    const afterComma = cleanedValue.substring(commaIndex + 1);

                    // If there are exactly 3 digits after the comma and more before, likely thousands
                    // e.g., "1,000" or "123,456" but not "1,5" or "12,34"
                    if (afterComma.length === 3 && /^\d+$/.test(afterComma) && commaIndex > 0) {
                        // Thousands separator
                        cleanedValue = cleanedValue.replace(/[\s,]/g, '');
                    } else {
                        // Decimal separator
                        cleanedValue = cleanedValue.replace(/[\s]/g, '');
                        cleanedValue = cleanedValue.replace(',', '.'); // Normalize comma to period
                    }
                }
            } else {
                // Only period or no separators
                cleanedValue = cleanedValue.replace(/[\s]/g, ''); // Remove spaces only
            }
        }

        const parsed = parseFloat(cleanedValue);
        return isNaN(parsed) ? null : parsed;
    }

    /**
     * Formats a number for display
     * @param value The numeric value
     * @param precision Optional precision (decimal places)
     * @param decimalSeparator The decimal separator character (. or ,)
     * @param useGrouping Whether to use thousands separator
     * @param groupingSeparator Explicit thousands separator. When omitted, it is inferred from the
     * decimal separator (`,` → `.`, otherwise `,`). Pass this for locales whose grouping separator
     * is neither (e.g. fr-FR uses a narrow no-break space).
     * @returns The formatted string
     */
    formatNumber(
        value: number | null,
        precision?: number,
        decimalSeparator: '.' | ',' = '.',
        useGrouping = false,
        groupingSeparator?: string
    ): string {
        if (value === null || value === undefined) {
            return '';
        }

        let formatted: string;
        if (precision !== undefined && precision >= 0) {
            formatted = value.toFixed(precision);
        } else {
            formatted = value.toString();
        }

        // Add thousands separator if requested
        if (useGrouping) {
            const parts = formatted.split('.');
            const integerPart = parts[0];
            const decimalPart = parts[1];

            // Use the explicit grouping separator when provided, otherwise infer from the decimal
            // separator (if decimal is comma, use period for thousands, otherwise use comma).
            const thousandsSeparator = groupingSeparator ?? (decimalSeparator === ',' ? '.' : ',');
            const withGrouping = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

            // Reconstruct: integer part with grouping + decimal separator + decimal part
            if (decimalPart !== undefined) {
                formatted = `${withGrouping}${decimalSeparator}${decimalPart}`;
            } else {
                formatted = withGrouping;
            }
        } else {
            // No grouping: just replace decimal point if needed
            if (decimalSeparator === ',') {
                formatted = formatted.replace('.', ',');
            }
        }

        return formatted;
    }

    /**
     * Counts the number of decimal places in a numeric value.
     * Handles scientific notation (e.g. 1e-5 → 5 decimal places).
     * @param value The numeric value
     * @returns The number of digits after the decimal point
     */
    countDecimals(value: number): number {
        if (!isFinite(value) || Math.floor(value) === value) {
            return 0;
        }

        const str = value.toString();

        // Scientific notation, e.g. "1e-7" or "1.5e-7"
        const scientificMatch = str.match(/^-?(\d+)(?:\.(\d+))?e([-+]?\d+)$/i);
        if (scientificMatch) {
            const fractionDigits = scientificMatch[2]?.length ?? 0;
            const exponent = parseInt(scientificMatch[3], 10);
            return Math.max(0, fractionDigits - exponent);
        }

        const decimalPart = str.split('.')[1];
        return decimalPart ? decimalPart.length : 0;
    }

    /**
     * Determines whether typing a character at the current selection would exceed the allowed
     * number of decimal places. Used for live-validation blocking of digit input.
     * @param event The keyboard event for the character being typed
     * @param currentValue The current input value
     * @param precision The maximum number of decimal places allowed
     * @returns true if the keystroke would push the decimals past the precision limit
     */
    wouldExceedPrecision(event: KeyboardEvent, currentValue: string, precision: number): boolean {
        // Only plain digit input can grow the decimal part
        if (!/^[0-9]$/.test(event.key)) {
            return false;
        }

        const inputElement = event.target as HTMLInputElement;
        const selectionStart = inputElement.selectionStart ?? currentValue.length;
        const selectionEnd = inputElement.selectionEnd ?? currentValue.length;

        // Simulate the resulting value after the keystroke replaces the current selection
        const nextValue = currentValue.substring(0, selectionStart) + event.key + currentValue.substring(selectionEnd);

        // Count digits after the decimal separator in the simulated value
        const separatorIndex = nextValue.search(/[.,]/);
        if (separatorIndex === -1) {
            return false;
        }

        // Ignore scientific-notation exponents when counting the fractional part
        const fractional = nextValue.substring(separatorIndex + 1).split(/[eE]/)[0];
        return fractional.length > precision;
    }
}
