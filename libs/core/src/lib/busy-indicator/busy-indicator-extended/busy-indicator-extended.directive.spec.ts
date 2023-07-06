import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BusyIndicatorExtendedDirective } from './busy-indicator-extended.directive';
import { BusyIndicatorComponent } from '../busy-indicator.component';

@Component({
    template: ` <div class="fd-message-toast" #container>
        <div fd-busy-indicator-extended>
            <fd-busy-indicator [loading]="true" label="Please wait" ariaLabel="Please wait"></fd-busy-indicator>
        </div>
    </div>`
})
class TestComponent {
    @ViewChild('testTemplate', { static: true }) templateRef: TemplateRef<any>;
    @ViewChild('container') container: ElementRef;
}

describe('BusyIndicatorExtendedDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [BusyIndicatorExtendedDirective, BusyIndicatorComponent]
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

    it('should assign classes', async () => {
        await fixture.whenRenderingDone();
        expect(component.container.nativeElement.classList.contains('fd-busy-indicator-extended--message-toast')).toBe(
            true
        );
        expect(component.container.nativeElement.classList.contains('fd-busy-indicator-extended')).toBe(true);
    });
});
