import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemDirective } from '../menu/menu-item.directive';
import { ComboboxComponent } from './combobox.component';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { ButtonModule } from '../button/button.module';

describe('ComboboxComponent', () => {
    let component: ComboboxComponent;
    let fixture: ComponentFixture<ComboboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComboboxComponent],
            imports: [
                CommonModule,
                PopoverModule,
                FormsModule,
                MenuModule,
                PipeModule,
                ButtonModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboboxComponent);
        component = fixture.componentInstance;
        component.dropdownValues = [
            'Apple',
            'Banana'
        ];
        component.searchFunction = () => {};
        fixture.detectChanges();

        /** That's focus trap testing workaround */
        component.focusTrap = {
            activate: () => {},
            deactivate: () => {},
            pause: () => {},
            unpause: () => {},
        }
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchFunction onInputKeydownHandler', () => {
        spyOn(component, 'searchFunction');
        const event = {
            code: 'Enter',
            preventDefault: () => {}
        };
        component.onInputKeydownHandler(event);
        expect(component.searchFunction).toHaveBeenCalled();
        event.code = 'ArrowDown';
        spyOn(event, 'preventDefault');
        spyOn(component.menuItems.first, 'focus');
        component.onInputKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.first.focus).toHaveBeenCalled();
    });

    it('should fire selected event onMenuKeydownHandler, arrow down', () => {
        component.inputText = 'test';
        const event: any = {
            code: 'Enter',
            preventDefault: () => {}
        };
        const term = 'test';
        component.dropdownValues = [term];
        spyOn(component.itemClicked, 'emit');
        component.onMenuKeydownHandler(event, 0);
        expect(component.itemClicked.emit).toHaveBeenCalled();
        spyOn(event, 'preventDefault');
        spyOn(component.menuItems.toArray()[1], 'focus');
        event.code = 'ArrowDown';
        component.onMenuKeydownHandler(event, 0);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.toArray()[1].focus).toHaveBeenCalled();
    });

    it('should handle onMenuKeydownHandler, arrow up', () => {
        const event: any = {
            code: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(component.menuItems.first, 'focus');
        spyOn(event, 'preventDefault');
        event.code = 'ArrowUp';
        component.onMenuKeydownHandler(event, 1);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.first.focus).toHaveBeenCalled();
    });

    it('should handle onMenuKeydownHandler, arrow up on the first item', () => {
        const event: any = {
            code: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(event, 'preventDefault');
        spyOn(component.searchInputElement.nativeElement, 'focus');
        event.code = 'ArrowUp';
        component.onMenuKeydownHandler(event, 0);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.searchInputElement.nativeElement.focus).toHaveBeenCalled();
    });

    it('should set inputText', () => {
        spyOn(component, 'onChange');
        spyOn(component, 'onTouched');
        component.inputText = 'someValue';
        expect(component.onChange).toHaveBeenCalledWith('someValue');
        expect(component.onTouched).toHaveBeenCalled();
    });

    it('should registerOnChange and registerOnTouched', () => {
        component.registerOnChange('function');
        component.registerOnTouched('function');
        expect(component.onChange).toBe('function');
        expect(component.onTouched).toBe('function');
    });
});
