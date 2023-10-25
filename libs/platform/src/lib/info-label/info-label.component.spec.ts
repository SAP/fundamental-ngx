import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InfoLabelComponent } from './info-label.component';

@Component({
    selector: 'fdp-test-numeric-info-label',
    template: `<fdp-info-label [color]="color" [glyph]="glyph">Info Label</fdp-info-label>`,
    standalone: true,
    imports: [InfoLabelComponent]
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
            imports: [TestInfoLabelNumericComponent]
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
