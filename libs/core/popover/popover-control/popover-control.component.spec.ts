import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverControlComponent } from './popover-control.component';

@Component({
    template: `
        <fd-popover-control>
            <button class="trigger-button">Open Menu</button>
        </fd-popover-control>
    `,
    standalone: true,
    imports: [PopoverControlComponent]
})
class TestHostComponent {
    @ViewChild(PopoverControlComponent) popoverControl: PopoverControlComponent;
}

describe('PopoverControlComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let popoverControl: PopoverControlComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
        popoverControl = hostComponent.popoverControl;
    });

    it('should create', () => {
        expect(popoverControl).toBeTruthy();
    });

    describe('content projection', () => {
        it('should project trigger content', () => {
            const button = fixture.debugElement.query(By.css('.trigger-button'));
            expect(button).toBeTruthy();
            expect(button.nativeElement.textContent).toContain('Open Menu');
        });
    });

    describe('tabbable functionality', () => {
        it('should make child element tabbable when _tabbable is true', () => {
            popoverControl._tabbable = true;
            popoverControl.ngAfterContentChecked();

            const button = fixture.nativeElement.querySelector('.trigger-button');
            expect(button.tabIndex).toBe(0);
        });
    });
});
