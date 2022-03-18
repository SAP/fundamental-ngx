import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlatformColorPalettePopoverModule } from './color-palette-popover.module';
import { RtlService } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ColorPalettePopoverComponent } from '@fundamental-ngx/platform/color-palette-popover';

@Component({
    selector: 'fdp-test-component',
    template: ` <fdp-color-palette-popover name="name" id="id"></fdp-color-palette-popover> `
})
class TestComponent {
    @ViewChild(ColorPalettePopoverComponent) colorPalettePopover: ColorPalettePopoverComponent;
}

describe('ColorPalettePopoverHeaderComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [FormsModule, ButtonModule, PlatformColorPalettePopoverModule],
                providers: [RtlService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the popover', () => {
        spyOn(component.colorPalettePopover.popoverComponent.nativeElement, 'showAt');
        component.colorPalettePopover.showPopover(component.colorPalettePopover.popoverComponent);
        expect(component.colorPalettePopover.popoverComponent.nativeElement.showAt).toHaveBeenCalled();
    });

    it('should set the value', () => {
        spyOn(component.colorPalettePopover, 'onChange');
        spyOn(component.colorPalettePopover, 'onTouched');

        component.colorPalettePopover.value = 'testVal';

        expect(component.colorPalettePopover.onChange).toHaveBeenCalledWith('testVal');
        expect(component.colorPalettePopover.onTouched).toHaveBeenCalled();
        expect(component.colorPalettePopover.value).toBe('testVal');
    });

    it('should test click', () => {
        spyOn(component.colorPalettePopover, 'onTouched');
        component.colorPalettePopover.onClick();

        expect(component.colorPalettePopover.onTouched).toHaveBeenCalled();
    });

    it('should set the color', () => {
        component.colorPalettePopover.colorChange({
            detail: {
                color: 'blue'
            }
        });

        expect(component.colorPalettePopover.value).toBe('blue');
    });
});
