import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PlatformInputGroupModule } from '../input-group.module';
import { InputGroupComponent } from '../input-group.component';
import { InputGroupAddonComponent } from './addon.component';
import { PlatformButtonModule } from '../../button/public_api';

@Component({
    template: `<fdp-input-group-addon>$</fdp-input-group-addon>`,
    providers: [
        {
            provide: InputGroupComponent,
            useFactory: (): Partial<InputGroupComponent> => ({
                contentDensity: 'cozy'
            })
        }
    ]
})
class TextAddonHostComponent {
    @ViewChild(InputGroupAddonComponent) addon: InputGroupAddonComponent;
    constructor(public inputGroup: InputGroupComponent) {}
}
describe('Input group addon with a text', () => {
    let host: TextAddonHostComponent;
    let fixture: ComponentFixture<TextAddonHostComponent>;
    let addonComponent: InputGroupAddonComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformInputGroupModule],
            declarations: [TextAddonHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextAddonHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        addonComponent = host.addon;
    });

    beforeEach(() => {
        host.inputGroup.contentDensity = 'cozy';
    });

    it('Should add "fd-input-group__addon" class to the host', () => {
        const addonEl = addonComponent.elementRef().nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon')).toBeTruthy();
    });

    it('Should not add "fd-input-group__addon--button" class', () => {
        const addonEl = addonComponent.elementRef().nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon--button')).toBeFalsy();
    });

    it('Should inherit and add "fd-input-group__addon--compact" class if input-group is compact', async () => {
        const addonEl = addonComponent.elementRef().nativeElement as HTMLElement;
        expect(host.inputGroup.contentDensity === 'cozy').toBeTrue();
        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeFalsy();

        host.inputGroup.contentDensity = 'compact';
        addonComponent.buildComponentCssClass();
        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeTruthy();
    });
});

@Component({
    template: `<fdp-input-group-addon><fdp-button>Submit</fdp-button></fdp-input-group-addon>`,
    providers: [
        {
            provide: InputGroupComponent,
            useFactory: (): Partial<InputGroupComponent> => ({
                contentDensity: 'compact'
            })
        }
    ]
})
class ButtonAddonHostComponent {
    @ViewChild(InputGroupAddonComponent) addon: InputGroupAddonComponent;
    constructor(public inputGroup: InputGroupComponent) {}
}
describe('Input group addon with a button', () => {
    let host: ButtonAddonHostComponent;
    let fixture: ComponentFixture<ButtonAddonHostComponent>;
    let addonComponent: InputGroupAddonComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformInputGroupModule, PlatformButtonModule],
            declarations: [ButtonAddonHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonAddonHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        addonComponent = host.addon;
    });

    it('Should add "fd-input-group__addon--button" class', () => {
        const addonEl = addonComponent.elementRef().nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon--button')).toBeTruthy();
    });

    it('Should inherit contentDensity and pass it down to button component', () => {
        expect(addonComponent._fdpButtons.first.contentDensity === 'compact').toBeTrue();
    });
});
