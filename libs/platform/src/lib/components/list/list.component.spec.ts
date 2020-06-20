import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { PlatformListModule } from './list.module';

@Component({
    template: `
        <fdp-list #componentElement
            [noBorder]="noBorder"
            [hasByLine]="hasByLine"
            [hasNavigation]="hasNavigation"
            [showNavigationArrow]="showNavigationArrow">List Title Test Text</fdp-list>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef, static: false })
    c
    noBorder: boolean = false;
    hasByLine: boolean = false;
    multiSelect: boolean = false;
    showNavigationArrow: boolean = false;
    hasNavigation: boolean = false;
}


describe('ListComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, ListComponent],
            imports: [PlatformListModule]
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

    it('should render a list container', () => {
        const listElement = fixture.debugElement.query(By.css('ul'));
        expect(listElement.nativeElement.classList).toContain('fd-list');
    });

    it('should contain list--no-border class', () => {
        component.noBorder = true;
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('ul'));
        expect(listElement.nativeElement.classList).toContain('fd-list--no-border');
    });

    it('should contain by Line class', () => {
        component.hasByLine = true;
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('ul'));
        expect(listElement.nativeElement.classList).toContain('fd-list--byline');
    });


    it('should contain show navigation arrow', () => {
        component.showNavigationArrow = true;
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('ul'));
        expect(listElement.nativeElement.classList).toContain('fd-list--navigation-indication');
    });

    it('should contain navigation', () => {
        component.hasNavigation = true;
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('ul'));
        expect(listElement.nativeElement.classList).toContain('fd-list--navigation');
    });

    it('should have aria roles property', () => {
        fixture.detectChanges();
        const list = fixture.debugElement.query(By.css('fdp-list'));
        expect(list.nativeElement.getAttribute('role')).toEqual('list');
    });
});

