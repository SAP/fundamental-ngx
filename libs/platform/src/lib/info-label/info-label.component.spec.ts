import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { InfoLabelComponent } from './info-label.component';

@Component({
    selector: 'fdp-test-numeric-info-label',
    template: `<fdp-info-label [color]="color" [glyph]="glyph">Info Label</fdp-info-label>`
})
class TestInfoLabelNumericComponent {
    @ViewChild(InfoLabelComponent, { static: true }) component: InfoLabelComponent;
    public color: string;
    public glyph: string;
    constructor() {}
}

describe('InfoLabelComponent', () => {
    let component: InfoLabelComponent;
    let host: TestInfoLabelNumericComponent;
    let fixture: ComponentFixture<TestInfoLabelNumericComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InfoLabelModule],
            declarations: [InfoLabelComponent, TestInfoLabelNumericComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInfoLabelNumericComponent);
        host = fixture.componentInstance;
        component = host.component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add label with color', () => {
        host.color = '2';
        host.glyph = 'hide';
        fixture.detectChanges();
        let hostEl = fixture.debugElement.query(By.css('fd-info-label'));
        let linkElement = fixture.debugElement.query(By.css('fd-icon'));
        expect(hostEl.nativeElement.classList.contains('fd-info-label--accent-color-2')).toBe(true);
        expect(linkElement.nativeElement.classList.contains('sap-icon--hide')).toBe(true);
        host.color = '4';
        fixture.detectChanges();
        hostEl = fixture.debugElement.query(By.css('fd-info-label'));
        linkElement = fixture.debugElement.query(By.css('fd-icon'));
        expect(hostEl.nativeElement.classList.contains('fd-info-label--accent-color-4')).toBe(true);
    });
});
