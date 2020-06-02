import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { PlatformListModule } from './list.module';

@Component({
    template: `
        <fdp-list #componentElement
            [noBorder]="noBorder"
            [compact]="compact">List Title Test Text</fdp-list>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef, static: false })
    ref: ElementRef;

    compact: boolean = false;
    noBorder: boolean = false
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

    it('should contain class', () => {
        const listElement = fixture.debugElement.query(By.css('ul'));
        expect(listElement.nativeElement.classList).toContain('fd-list');
    });

    it('should contain additional classes', () => {
        component.compact = true;
        component.noBorder = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).toContain('fd-list--no-border');
        expect(component.ref.nativeElement.classList).toContain('fd-list--compact');
    });
});
