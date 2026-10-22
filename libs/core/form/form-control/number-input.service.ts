import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

/**
 * Service to handle numeric input validation and behavior
 */
@Injectable()
export class NumberInputService {
    private readonly _document = inject(DOCUMENT);

    /**
     * Validates if a key press is allowed for numeric input
     * @param event The keyboard event
     * @param currentValue The current input value
     * @param decimalSeparator The decimal separator character (. or ,)
     * @returns true if the key press is allowed, false otherwise
     */
    isValidKeyPress(event: KeyboardEvent, currentValue: string, decimalSeparator: '.' | ',' = '.'): boolean {
        const key = event.key;
        const inputElement = event.target as HTMLInputElement;
        const selectionStart = inputElement.selectionStart ?? 0;
        const selectionEnd = inputElement.selectionEnd ?? 0;

        // Allow control keys
        if (
            key === 'Backspace' ||
            key === 'Delete' ||
            key === 'Tab' ||
            key === 'Escape' ||
            key === 'Enter' ||
            key === 'ArrowLeft' ||
            key === 'ArrowRight' ||
            key === 'ArrowUp' ||
            key === 'ArrowDown' ||
            key === 'Home' ||
            key === 'End' ||
            key === 'PageUp' ||
            key === 'PageDown'
        ) {
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

        // Allow minus sign only at the beginning
        if (key === '-') {
            // Check if minus would be at the start (considering selection)
            const valueBeforeCursor = currentValue.substring(0, selectionStart);
            const valueAfterCursor = currentValue.substring(selectionEnd);
            const hasMinusInValue = currentValue.includes('-');

            // Allow if selection will replace the entire value, or if at the beginning and no minus exists
            if (selectionStart === 0 && !hasMinusInValue) {
                return true;
            }
            // If replacing entire value
            if (selectionStart === 0 && selectionEnd === currentValue.length) {
                return true;
            }
            return false;
        }

        // Allow decimal separator (. or ,) only once
        if (
            key === decimalSeparator ||
            (decimalSeparator === '.' && key === '.') ||
            (decimalSeparator === ',' && key === ',')
        ) {
            // Check if decimal separator already exists in the value (outside selection)
            const valueBeforeCursor = currentValue.substring(0, selectionStart);
            const valueAfterCursor = currentValue.substring(selectionEnd);
            const hasDecimalBefore = valueBeforeCursor.includes(decimalSeparator);
            const hasDecimalAfter = valueAfterCursor.includes(decimalSeparator);

            // Allow if no decimal separator exists outside the selection
            return !hasDecimalBefore && !hasDecimalAfter;
        }

        // Allow scientific notation (e or E) only once
        if (key === 'e' || key === 'E') {
            const hasScientificNotation = /[eE]/.test(currentValue);
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
     * @returns true if the paste is valid, false otherwise
     */
    isValidPaste(pastedText: string, decimalSeparator: '.' | ',' = '.'): boolean {
        // Remove thousands separators (both , and space)
        let cleanedText = pastedText.replace(/[\s,]/g, '');

        // If using comma as decimal separator, replace it with period for validation
        if (decimalSeparator === ',') {
            cleanedText = cleanedText.replace(/,/g, '.');
        }

        // Validate numeric format: optional minus at start, digits, optional decimal, optional scientific notation
        const numericPattern = /^-?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/;
        return numericPattern.test(cleanedText);
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
            // Check if value has a period - it might be from ngModel (always uses period)
            const hasPeriod = cleanedValue.includes('.');
            const hasComma = cleanedValue.includes(',');

            if (hasPeriod && !hasComma) {
                // Value like "1234.56" from ngModel - period is the decimal, not thousands separator
                // Just parse it directly
                cleanedValue = cleanedValue.replace(/[\s]/g, ''); // Only remove spaces
            } else {
                // Value like "1.234,56" or "1234,56" - comma is decimal, period is thousands
                cleanedValue = cleanedValue.replace(/[\s.]/g, ''); // Remove spaces and periods (thousands)
                cleanedValue = cleanedValue.replace(',', '.'); // Replace comma decimal with period
            }
        } else {
            // When period is decimal separator (default):
            // Remove thousands separators (commas and spaces)
            cleanedValue = cleanedValue.replace(/[\s,]/g, '');
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
     * @returns The formatted string
     */
    formatNumber(
        value: number | null,
        precision?: number,
        decimalSeparator: '.' | ',' = '.',
        useGrouping = false
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

            // Determine thousands separator based on decimal separator
            // If decimal is comma, use period for thousands, otherwise use comma
            const thousandsSeparator = decimalSeparator === ',' ? '.' : ',';
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
}
