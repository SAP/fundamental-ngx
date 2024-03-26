import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContentDensityMode, ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { InputGroupAddonBodyComponent } from './addon-body.component';

@Component({
    template: `<fdp-input-group-addon-body [fdContentDensity]="contentDensity" [hasButton]="hasButton"
        >$</fdp-input-group-addon-body
    >`,
    standalone: true,
    imports: [InputGroupAddonBodyComponent, ContentDensityModule]
})
class TextAddonHostComponent {
    @ViewChild(InputGroupAddonBodyComponent) addon: InputGroupAddonBodyComponent;

    contentDensity = ContentDensityMode.COZY;
    hasButton = false;
}
describe('Input group addon with a text', () => {
    let host: TextAddonHostComponent;
    let fixture: ComponentFixture<TextAddonHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TextAddonHostComponent]
        }).compileComponents();
    }));

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

    it('Should add "is-compact" class if it is compact mode', async () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonBodyComponent))
            .nativeElement as HTMLElement;

        expect(addonEl.classList.contains('is-compact')).toBeFalsy();

        host.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        expect(addonEl.classList.contains('is-compact')).toBeTruthy();
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
