import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListSublineDirective } from '@fundamental-ngx/core/list';

@Component({
    template: ` <div #componentElement fd-list-subline>List Subline Test Text</div> `,
    standalone: true,
    imports: [ListSublineDirective]
})
class TestComponent {
    @ViewChild('directiveElement', { static: true })
    ref!: ElementRef;
}

describe('ListSublineDirective', () => {
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

    it('should assign class', () => {
        expect(component.ref.nativeElement.classList.contains('fd-list__subline')).toBeTrue();
    });
});
