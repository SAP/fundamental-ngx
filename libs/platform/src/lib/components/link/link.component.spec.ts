import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { Component, ViewChild, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LinkModule } from '@fundamental-ngx/core';

/** Standard link functionality tests */
@Component({
    selector: 'fdp-link-test',
    template: `
        <fdp-link [href]="'https://www.google.com/'" [type]="'standard'">StandardLink</fdp-link>
    `
})
class TestComponent {
    constructor() {}
}

describe('LinkComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [LinkModule],
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
});

/** Disabled link test */
@Component({
    selector: 'fdp-disabled-link',
    template: `
        <fdp-link [href]="href" [type]="'emphasized'" [disabled]="true">DisabledLink</fdp-link>
    `
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [LinkModule],
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
