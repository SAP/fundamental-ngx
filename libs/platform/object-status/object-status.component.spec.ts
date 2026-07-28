import { Component, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ObjectStatusComponent } from './object-status.component';

@Component({
    selector: 'fdp-test-numeric-info-label',
    template: ` <fdp-object-status
        [status]="status()"
        [glyph]="glyph()"
        [indicationColor]="indicationColor()"
        [clickable]="clickable()"
        [inverted]="inverted()"
        [large]="large()"
        label="Info Label"
    ></fdp-object-status>`,
    standalone: true,
    imports: [ObjectStatusComponent]
})
class TestPlatformObjectStatusComponent {
    @ViewChild(ObjectStatusComponent, { static: true }) component: ObjectStatusComponent;
    readonly indicationColor = input<string>();
    readonly status = input<string>();
    readonly glyph = input<string>();
    readonly clickable = input<boolean>();
    readonly large = input<boolean>();
    readonly inverted = input<boolean>();

    constructor() {}
}

describe('ObjectStatusComponent', () => {
    let component: ObjectStatusComponent;
    let host: TestPlatformObjectStatusComponent;
    let fixture: ComponentFixture<TestPlatformObjectStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestPlatformObjectStatusComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPlatformObjectStatusComponent);
        host = fixture.componentInstance;
        component = host.component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Validate diffrent object states and icon', () => {
        fixture.componentRef.setInput('status', 'negative');
        fixture.componentRef.setInput('glyph', 'status-negative');
        fixture.detectChanges();
        let linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--negative')).toBe(true);
        const iconEl = fixture.debugElement.query(By.css('fd-icon.fd-object-status__icon'));
        expect(iconEl.nativeElement.classList.contains('sap-icon--status-negative')).toBe(true);
        fixture.componentRef.setInput('status', 'positive');
        fixture.componentRef.setInput('glyph', 'status-positive');
        fixture.detectChanges();
        linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--positive')).toBe(true);
        expect(iconEl.nativeElement.classList.contains('sap-icon--status-positive')).toBe(true);
    });

    it('Should Validate inverted object states and clickable', () => {
        fixture.componentRef.setInput('inverted', true);
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();
        let linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--inverted')).toBe(true);
        expect(linkElement.nativeElement.classList.contains('fd-object-status--link')).toBe(true);
        fixture.componentRef.setInput('inverted', false);
        fixture.componentRef.setInput('clickable', false);
        fixture.detectChanges();
        linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--inverted')).toBe(false);
        expect(linkElement.nativeElement.classList.contains('fd-object-status--link')).toBe(false);
    });

    it('Should Validate large status object', () => {
        fixture.componentRef.setInput('large', true);
        fixture.detectChanges();
        const linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--large')).toBe(true);
    });
});
