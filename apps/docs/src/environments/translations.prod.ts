import {
    FD_LANGUAGE_ALBANIAN,
    FD_LANGUAGE_BULGARIAN,
    FD_LANGUAGE_CHINESE,
    FD_LANGUAGE_CZECH,
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_GEORGIAN,
    FD_LANGUAGE_GERMAN,
    FD_LANGUAGE_HINDI,
    FD_LANGUAGE_ITALIAN,
    FD_LANGUAGE_POLISH,
    FD_LANGUAGE_PORTUGUESE,
    FD_LANGUAGE_RUSSIAN,
    FD_LANGUAGE_UKRAINIAN,
    FdLanguage
} from '@fundamental-ngx/i18n';
import { Observable, of } from 'rxjs';

export function translations(): Observable<Array<{ value: FdLanguage; name: string }>> {
    return of([
        { name: 'Shqip', value: FD_LANGUAGE_ALBANIAN },
        { name: 'Български', value: FD_LANGUAGE_BULGARIAN },
        { name: '简体中文', value: FD_LANGUAGE_CHINESE },
        { name: 'Český', value: FD_LANGUAGE_CZECH },
        { name: 'Deutsch', value: FD_LANGUAGE_GERMAN },
        { name: 'English', value: FD_LANGUAGE_ENGLISH },
        { name: 'Français', value: FD_LANGUAGE_FRENCH },
        { name: 'ქართული', value: FD_LANGUAGE_GEORGIAN },
        { name: 'हिन्दी', value: FD_LANGUAGE_HINDI },
        { name: 'Italiano', value: FD_LANGUAGE_ITALIAN },
        { name: 'Polski', value: FD_LANGUAGE_POLISH },
        { name: 'Português(Brazil)', value: FD_LANGUAGE_PORTUGUESE },
        { name: 'Русский', value: FD_LANGUAGE_RUSSIAN },
        { name: 'Türkçe', value: FD_LANGUAGE_POLISH },
        { name: 'Українська', value: FD_LANGUAGE_UKRAINIAN }
    ]);
}
