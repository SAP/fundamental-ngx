import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitButtonComponent, splitButtonTextClass, splitButtonTextCompactClass } from './split-button.component';
import { MenuModule } from '../menu/menu.module';
import { ButtonModule } from '../button/button.module';
import createSpy = jasmine.createSpy;

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-split-button>
            <fd-menu>
                <li fd-menu-item>
                    <div fd-menu-interactive>
                        <span fd-menu-title>Option 1</span>
                    </div>
                </li>
                <li fd-menu-item>
                    <div fd-menu-interactive>
                        <span fd-menu-title>Option 2</span>
                    </div>
                </li>
            </fd-menu>
        </fd-split-button>
    `
})
export class TestComponent {}

describe('SplitButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement, element: HTMLElement;

    let component, componentInstance: SplitButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MenuModule, ButtonModule],
            declarations: [SplitButtonComponent, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(SplitButtonComponent));
        componentInstance = component.injector.get(SplitButtonComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(componentInstance).toBeTruthy();
    });

    it('should handle content init - no selected item', () => {
        spyOn(componentInstance, 'selectMenuItem');
        componentInstance.mainActionTitle = null;
        componentInstance.ngAfterContentInit();
        expect(componentInstance.selectMenuItem).toHaveBeenCalledWith(componentInstance.menu.menuItems.first);
        expect(componentInstance.selected).toBe(componentInstance.menu.menuItems.first);
    });

    it('should handle content init - selected item', () => {
        spyOn(componentInstance, 'selectMenuItem');
        componentInstance.selected = componentInstance.menu.menuItems.last;
        componentInstance.mainActionTitle = null;
        componentInstance.ngAfterContentInit();
        expect(componentInstance.selectMenuItem).toHaveBeenCalledWith(componentInstance.menu.menuItems.last);
        componentInstance.menu.menuItems.last.onSelect.emit();
        fixture.detectChanges();
        expect(componentInstance.mainActionTitle).toBe('Option 2');
    });

    it('should handle the main button click - no selected item', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'stopPropagation');
        spyOn(componentInstance.primaryButtonClicked, 'emit');
        componentInstance.selected = null;
        componentInstance.mainAction = {
            mainActionTitle: 'title',
            callback: createSpy()
        };

        componentInstance.onMainButtonClick(mouseEvent);

        expect(componentInstance.primaryButtonClicked.emit).toHaveBeenCalledWith(mouseEvent);
        expect(componentInstance.mainAction.callback).toHaveBeenCalled();
        expect(mouseEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should handle the main button click - selected item', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'stopPropagation');
        spyOn(componentInstance.primaryButtonClicked, 'emit');
        componentInstance.selected = componentInstance.menu.menuItems.first;
        spyOn(componentInstance.selected.elementRef.nativeElement, 'click');

        componentInstance.onMainButtonClick(mouseEvent);

        expect(componentInstance.primaryButtonClicked.emit).toHaveBeenCalledWith(mouseEvent);
        expect(mouseEvent.stopPropagation).toHaveBeenCalled();
        expect(componentInstance.selected.elementRef.nativeElement.click).toHaveBeenCalled();
    });

    it('should add button text class', () => {
        fixture.detectChanges();
        componentInstance.ngAfterViewInit();
        const textElement = componentInstance.mainActionBtn?.nativeElement.querySelector('.fd-button__text');
        expect(textElement.classList.contains(splitButtonTextClass));
        componentInstance.compact = true;
        componentInstance.ngOnChanges(<any>{'compact': true});
        expect(textElement.classList.contains(splitButtonTextCompactClass));

    })
});
