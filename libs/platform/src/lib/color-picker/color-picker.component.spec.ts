import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlatformColorPickerModule } from './color-picker.module';
import { RtlService } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdp-test-component',
    template: ` <fdp-color-picker></fdp-color-picker> `
})
class TestComponent {
    //
}

describe('ColorPickerHeaderComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [FormsModule, ButtonModule, PlatformColorPickerModule],
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
