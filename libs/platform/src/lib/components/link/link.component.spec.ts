import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { Component, ViewChild, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

/** Standard link functionality tests */
@Component({
    selector: 'fdp-link-test',
    template: `
        <fdp-link [href]="href" [type]="type">StandardLink</fdp-link>
    `
})
class TestComponent {
    @ViewChild(LinkComponent, { static: false }) link: LinkComponent;
    @Input() href = 'https://www.google.com/';
    @Input() type: string = 'standard';
    constructor() {}
}

describe('LinkComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkComponent, TestComponent],
            providers: []
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

    /** Tooltip visibility disappear on focus-out event */
    it('should not display tooltip', () => {
        component.link.onFocusOutEvent();
        expect(component.link.isfocused).toBeFalsy();
        expect(component.link.tooltipVisibility).toBeFalsy();
    });

    /** Tooltip visibility on Focus event */
    it('should display tooltip', fakeAsync(() => {
        component.link.onFocusEvent();
        tick(2000);
        expect(component.link.isfocused).toBeTruthy();
        expect(component.link.tooltipVisibility).toBeTruthy();
    }));
});

/** Disabled link test */
@Component({
    selector: 'fdp-disabled-link',
    template: `
        <fdp-link [href]="href" [type]="type" [disabled]="disabled">EmphasizedLink</fdp-link>
    `
})
class DisabledLinkComponent {
    @ViewChild(LinkComponent, { static: false }) link: LinkComponent;
    @Input() href = 'https://www.google.com/';
    @Input() disabled: boolean = true;
    @Input() type: string = 'emphasized';

    constructor() {}
}

describe('LinkComponent Disabled', () => {
    let component: DisabledLinkComponent;
    let fixture: ComponentFixture<DisabledLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkComponent, DisabledLinkComponent],
            providers: []
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
