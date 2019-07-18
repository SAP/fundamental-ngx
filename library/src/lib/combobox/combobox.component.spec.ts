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
            {text: 'Apple', callback: () => {}}
        ];
        component.searchFunction = () => {};
        fixture.detectChanges();
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
        spyOn(component.menuItems.first.itemEl.nativeElement.children[0], 'focus');
        component.onInputKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.menuItems.first.itemEl.nativeElement.children[0].focus).toHaveBeenCalled();
    });

    it('should fire selected event onMenuKeydownHandler, arrow down', () => {
        component.inputText = 'test';
        const event = {
            code: 'Enter',
            preventDefault: () => {}
        };
        const term = 'test';
        component.dropdownValues = [term];
        spyOn(component.itemClicked, 'emit');
        component.onMenuKeydownHandler(event, term);
        expect(component.itemClicked.emit).toHaveBeenCalled();
        spyOn(event, 'preventDefault');
        const item1 = <MenuItemDirective>{
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        const item2 = <MenuItemDirective>{
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        spyOn(component.menuItems, 'toArray').and.returnValue([
            item1,
            item2
        ]);
        spyOnProperty(document, 'activeElement').and.returnValue(item1.itemEl.nativeElement.children[0]);
        event.code = 'ArrowDown';
        component.onMenuKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(item2.itemEl.nativeElement.children[0].focus).toHaveBeenCalled();
    });

    it('should handle onMenuKeydownHandler, arrow up', () => {
        const event = {
            code: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(event, 'preventDefault');
        const item1 = <MenuItemDirective>{
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        const item2 = <MenuItemDirective>{
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        spyOn(component.menuItems, 'toArray').and.returnValue([
            item1,
            item2
        ]);
        spyOnProperty(document, 'activeElement').and.returnValue(item2.itemEl.nativeElement.children[0]);
        event.code = 'ArrowUp';
        component.onMenuKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(item1.itemEl.nativeElement.children[0].focus).toHaveBeenCalled();
    });

    it('should handle onMenuKeydownHandler, arrow up on the first item', () => {
        const event = {
            code: 'ArrowUp',
            preventDefault: () => {}
        };
        spyOn(event, 'preventDefault');
        const item1 = <MenuItemDirective>{
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        const item2 = <MenuItemDirective>{
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        spyOn(component.menuItems, 'toArray').and.returnValue([
            item1,
            item2
        ]);
        spyOnProperty(document, 'activeElement').and.returnValue(item1.itemEl.nativeElement.children[0]);
        spyOn(component.searchInputElement.nativeElement, 'focus');
        event.code = 'ArrowUp';
        component.onMenuKeydownHandler(event);
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
