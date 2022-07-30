import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { InputGroupAddonBodyComponent } from './addon-body.component';
import { ContentDensityModule, ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    template: `<fdp-input-group-addon-body [fdContentDensity]="contentDensity" [hasButton]="hasButton"
        >$</fdp-input-group-addon-body
    >`
})
class TextAddonHostComponent {
    @ViewChild(InputGroupAddonBodyComponent) addon: InputGroupAddonBodyComponent;

    contentDensity: ContentDensity = ContentDensityMode.COZY;
    hasButton = false;
}
describe('Input group addon with a text', () => {
    let host: TextAddonHostComponent;
    let fixture: ComponentFixture<TextAddonHostComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TextAddonHostComponent, InputGroupAddonBodyComponent],
                imports: [ContentDensityModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TextAddonHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should add "fd-input-group__addon" class to the host', () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonBodyComponent))
            .nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon')).toBeTruthy();
    });

    it('Should add "fd-input-group__addon--compact" class if it is compact mode', async () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonBodyComponent))
            .nativeElement as HTMLElement;

        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeFalsy();

        host.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeTruthy();
    });

    it('Should add "fd-input-group__addon--button" if "hasButton" true ', () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonBodyComponent))
            .nativeElement as HTMLElement;

        expect(addonEl.classList.contains('fd-input-group__addon--button')).toBeFalsy();

        host.hasButton = true;
        fixture.detectChanges();
        expect(addonEl.classList.contains('fd-input-group__addon--button')).toBeTruthy();
    });
});
