import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ThemesService {

    themes = [
        {
            id: 'sap_fiori_3',
            name: 'Fiori 3'
        },
        {
            id: 'sap_fiori_3_dark',
            name: 'Fiori 3 Dark'
        },
        {
            id: 'sap_fiori_3_hcb',
            name: 'High Contrast Black'
        },
        {
            id: 'sap_fiori_3_hcw',
            name: 'High Contrast White'
        }
    ];

    constructor(private sanitizer: DomSanitizer) {}

    setTheme(theme: string): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + theme + '.css');
    }
}
