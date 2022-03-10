import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlatformColorPalettePopoverModule } from './color-palette-popover.module';
import { RtlService } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdp-test-component',
    template: ` <fdp-color-palette-popover></fdp-color-palette-popover> `
})
class TestComponent {
    //
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
});
