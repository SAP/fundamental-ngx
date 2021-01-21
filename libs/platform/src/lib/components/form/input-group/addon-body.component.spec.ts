import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ContentDensity } from '../form-options';
import { PlatformInputGroupModule } from './input-group.module';
import { InputGroupAddonBodyComponent } from './addon-body.component';

@Component({
    template: `<fdp-input-group-addon-body [contentDensity]="contentDensity" [hasButton]="hasButton"
        >$</fdp-input-group-addon-body
    >`
})
class TextAddonHostComponent {
    @ViewChild(InputGroupAddonBodyComponent) addon: InputGroupAddonBodyComponent;

    contentDensity: ContentDensity = 'cozy';
    hasButton = false;
}
describe('Input group addon with a text', () => {
    let host: TextAddonHostComponent;
    let fixture: ComponentFixture<TextAddonHostComponent>;
    let addonComponent: InputGroupAddonBodyComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformInputGroupModule],
            declarations: [TextAddonHostComponent, InputGroupAddonBodyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextAddonHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        addonComponent = host.addon;
    });

    it('Should add "fd-input-group__addon" class to the host', () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonBodyComponent))
            .nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon')).toBeTruthy();
    });

    it('Should add "fd-input-group__addon--compact" class if it is compact mode', async () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonBodyComponent))
            .nativeElement as HTMLElement;

        expect(addonComponent.contentDensity !== 'compact').toBeTrue();
        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeFalsy();

        host.contentDensity = 'compact';
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
