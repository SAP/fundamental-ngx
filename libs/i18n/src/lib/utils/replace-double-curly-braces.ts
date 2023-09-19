// Regular expression to find and replace double curly braces
import { FdLanguageKeyFunction } from '../models/lang';

const regex = /{{\s*([^{}]+?)\s*}}/g;

/**
 * Replaces double curly braces with single curly braces.
 */
export function replaceDoubleCurlyBraces(input: string | FdLanguageKeyFunction): string | FdLanguageKeyFunction {
    if (typeof input !== 'string') {
        return input;
    }

    // Use a callback function to preserve ICU expressions
    return input.replace(regex, (_match, group) => `{${group}}`);
}
