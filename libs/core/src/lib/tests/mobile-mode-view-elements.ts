import { ComponentFixture } from '@angular/core/testing';

interface MobileElements {
    dialogTitle: HTMLElement;
    dialogFooter: HTMLElement;
    footerButtons: HTMLElement[];
    dialogCloseBtn: HTMLElement;
}
/**
 * @returns Set of HTML references to configurable elements of MobileMode dialog view
 * */
export function getMobileModeViewElements(fixture: ComponentFixture<any>): MobileElements {
    return {
        dialogTitle: fixture.nativeElement.querySelector('[fd-title]'),
        dialogFooter: fixture.nativeElement.querySelector('fd-dialog-footer'),
        dialogCloseBtn: fixture.nativeElement.querySelector('[fd-dialog-close-button]'),
        footerButtons: fixture.nativeElement.querySelectorAll('fd-button-bar')
    }
}
