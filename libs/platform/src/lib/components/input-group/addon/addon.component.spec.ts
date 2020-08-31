import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from '../../button/button.component';
import { PlatformButtonModule } from '../../button/button.module';
import { PlatformInputGroupModule } from '../input-group.module';
import { InputGroupAddonComponent } from './addon.component';

@Component({
    template: `<fdp-input-group-addon>$</fdp-input-group-addon>`
})
class TextAddonHostComponent {
    @ViewChild(InputGroupAddonComponent) addon: InputGroupAddonComponent;
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

    it('Should add "fd-input-group__addon" class to the host', () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonComponent)).nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon')).toBeTruthy();
    });

    it('Should not add "fd-input-group__addon--button" class', () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonComponent)).nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon--button')).toBeFalsy();
    });

    it('Should inherit and add "fd-input-group__addon--compact" class if input-group is compact', async () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonComponent)).nativeElement as HTMLElement;

        expect(addonComponent.contentDensity !== 'compact').toBeTrue();
        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeFalsy();

        addonComponent.contentDensity = 'compact';
        fixture.detectChanges();
        expect(addonEl.classList.contains('fd-input-group__addon--compact')).toBeTruthy();
    });
});

@Component({
    template: `<fdp-input-group-addon><fdp-button>Submit</fdp-button></fdp-input-group-addon>`
})
class ButtonAddonHostComponent {
    @ViewChild(InputGroupAddonComponent) addon: InputGroupAddonComponent;
    @ViewChild(ButtonComponent) button: ButtonComponent;
}
describe('Input group addon with a button', () => {
    let host: ButtonAddonHostComponent;
    let fixture: ComponentFixture<ButtonAddonHostComponent>;
    let addonComponent: InputGroupAddonComponent;
    let buttonComponent: ButtonComponent;

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
        buttonComponent = host.button;
    });

    it('Should add "fd-input-group__addon--button" class', () => {
        const addonEl = fixture.debugElement.query(By.directive(InputGroupAddonComponent)).nativeElement as HTMLElement;
        expect(addonEl.classList.contains('fd-input-group__addon--button')).toBeTruthy();
    });

    it('Should inherit contentDensity and pass it down to button component', () => {
        expect(buttonComponent.contentDensity !== 'compact').toBeTrue();

        addonComponent.contentDensity = 'compact';
        fixture.detectChanges();
        expect(buttonComponent.contentDensity === 'compact').toBeTrue();
    });
});
