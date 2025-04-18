import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LinkComponent } from './link.component';
import { PlatformLinkModule } from './link.module';

/** Standard link functionality tests */
@Component({
    selector: 'fdp-link-test',
    template: ` <fdp-link [href]="'https://www.google.com/'" [linkType]="'standard'">StandardLink</fdp-link> `,
    standalone: true,
    imports: [PlatformLinkModule]
})
class TestComponent {
    constructor() {}
}

describe('LinkComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /** check if link css class attached */
    it('should have fd-link class', () => {
        const linkElement = fixture.debugElement.query(By.css('a'));
        expect(linkElement.nativeElement.classList.contains('fd-link')).toBe(true);
        expect(linkElement.nativeElement.textContent).toContain('StandardLink');
    });
});

/** Disabled link test */
@Component({
    selector: 'fdp-disabled-link',
    template: ` <fdp-link [href]="href" [linkType]="'emphasized'" [disabled]="true">DisabledLink</fdp-link> `,
    standalone: true,
    imports: [PlatformLinkModule]
})
class DisabledLinkComponent {
    @ViewChild(LinkComponent)
    link: LinkComponent;

    @Input()
    href = 'https://www.google.com/';

    constructor() {}
}

describe('LinkComponent Disabled', () => {
    let component: DisabledLinkComponent;
    let fixture: ComponentFixture<DisabledLinkComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DisabledLinkComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisabledLinkComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('href should be blank for disabled link', () => {
        const linkElement = fixture.debugElement.query(By.css('a'));
        expect(linkElement.nativeElement.getAttribute('href')).toBeFalsy();
    });
});
