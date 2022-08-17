import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectStatusComponent } from './object-status.component';

@Component({
    selector: 'fdp-test-numeric-info-label',
    template: ` <fdp-object-status
        [status]="status"
        [glyph]="glyph"
        [indicationColor]="indicationColor"
        [clickable]="clickable"
        [inverted]="inverted"
        [large]="large"
        >Info Label
    </fdp-object-status>`
})
class TestPlatformObjectStatusComponent {
    @ViewChild(ObjectStatusComponent, { static: true }) component: ObjectStatusComponent;
    public indicationColor: string;
    public status: string;
    public glyph: string;
    public clickable: boolean;
    public large: boolean;
    public inverted: boolean;

    constructor() {}
}

describe('ObjectStatusComponent', () => {
    let component: ObjectStatusComponent;
    let host: TestPlatformObjectStatusComponent;
    let fixture: ComponentFixture<TestPlatformObjectStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ObjectStatusModule],
            declarations: [ObjectStatusComponent, TestPlatformObjectStatusComponent]
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
        host.status = 'negative';
        host.glyph = 'status-negative';
        fixture.detectChanges();
        let linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--negative')).toBe(true);
        const iconEl = fixture.debugElement.query(By.css('fd-icon.fd-object-status__icon'));
        expect(iconEl.nativeElement.classList.contains('sap-icon--status-negative')).toBe(true);
        host.status = 'positive';
        host.glyph = 'status-positive';
        fixture.detectChanges();
        linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--positive')).toBe(true);
        expect(iconEl.nativeElement.classList.contains('sap-icon--status-positive')).toBe(true);
    });

    it('Should Validate inverted object states and clickable', () => {
        host.inverted = true;
        host.clickable = true;
        fixture.detectChanges();
        let linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--inverted')).toBe(true);
        expect(linkElement.nativeElement.classList.contains('fd-object-status--link')).toBe(true);
        host.inverted = false;
        host.clickable = false;
        fixture.detectChanges();
        linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--inverted')).toBe(false);
        expect(linkElement.nativeElement.classList.contains('fd-object-status--link')).toBe(false);
    });

    it('Should Validate large status object', () => {
        host.large = true;
        fixture.detectChanges();
        const linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-status--large')).toBe(true);
    });
});
