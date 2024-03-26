import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IconComponent } from '@fundamental-ngx/core/icon';
import { PlatformObjectMarkerComponent } from './object-marker.component';

@Component({
    selector: 'fdp-test-object-marker',
    template: ` <fdp-object-marker [glyph]="glyph" [clickable]="clickable">Object marker</fdp-object-marker>`,
    standalone: true,
    imports: [PlatformObjectMarkerComponent]
})
class TestPlatformPlatformObjectMarkerComponent {
    @ViewChild(PlatformObjectMarkerComponent, { static: true }) component: PlatformObjectMarkerComponent;
    public glyph: string;
    public clickable: boolean;

    constructor() {}
}

describe('PlatformObjectMarkerComponent', () => {
    let component: PlatformObjectMarkerComponent;
    let host: TestPlatformPlatformObjectMarkerComponent;
    let fixture: ComponentFixture<TestPlatformPlatformObjectMarkerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestPlatformPlatformObjectMarkerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPlatformPlatformObjectMarkerComponent);
        host = fixture.componentInstance;
        component = host.component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Validate diffrent object icon', () => {
        host.glyph = 'add-favorite';
        fixture.detectChanges();
        let linkElement = fixture.debugElement.query(By.directive(IconComponent));
        expect(linkElement.nativeElement.classList.contains('fd-object-marker__icon')).toBe(true);
        expect(linkElement.nativeElement.classList.contains('sap-icon--add-favorite')).toBe(true);
        host.glyph = 'private';
        fixture.detectChanges();
        linkElement = fixture.debugElement.query(By.directive(IconComponent));
        expect(linkElement.nativeElement.classList.contains('fd-object-marker__icon')).toBe(true);
        expect(linkElement.nativeElement.classList.contains('sap-icon--private')).toBe(true);
    });

    it('Should Validate inverted object states and clickable', () => {
        host.clickable = true;
        fixture.detectChanges();
        let linkElement = fixture.debugElement.query(By.css('a'));
        expect(linkElement.nativeElement.classList.contains('fd-object-marker--link')).toBe(true);
        host.clickable = false;
        fixture.detectChanges();
        linkElement = fixture.debugElement.query(By.css('span'));
        expect(linkElement.nativeElement.classList.contains('fd-object-marker--link')).toBe(false);
    });
});
