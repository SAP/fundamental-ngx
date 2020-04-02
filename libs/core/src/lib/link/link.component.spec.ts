import { LinkComponent } from './link.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-tabs',
    template: `
        <a fd-link>Test Link</a>
    `
})
class TestLinkComponent {
    @ViewChild(LinkComponent, { static: true })
    linkComponent: LinkComponent;
}

describe('LinkComponent', () => {
    let component: LinkComponent;
    let fixture: ComponentFixture<TestLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkComponent, TestLinkComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLinkComponent);
        component = fixture.componentInstance.linkComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add emphasized class', () => {
        component.ngOnChanges();
        component.emphasized = true;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-link--emphasized')).toBe(true);
    });

    it('Should Add inverted class', () => {
        component.ngOnChanges();
        component.inverted = true;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('fd-link--inverted')).toBe(true);
    });

    it('Should Add disabled class', () => {
        component.ngOnChanges();
        component.disabled = true;
        component.ngOnChanges();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains('is-disabled')).toBe(true);
    });
});
