import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlatformColorPaletteModule } from './color-palette.module';
import { RtlService } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdp-test-component',
    template: ` <fdp-color-palette></fdp-color-palette> `
})
class TestComponent {
    //
}

describe('ColorpaletteHeaderComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [FormsModule, ButtonModule, PlatformColorPaletteModule],
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
