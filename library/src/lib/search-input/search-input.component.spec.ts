import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
    let component: SearchInputComponent;
    let fixture: ComponentFixture<SearchInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchInputComponent],
            imports: [FormsModule, MenuModule, PopoverModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchInputComponent);
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

    it('should call search term callback onMenuKeydownHandler, arrow down', () => {
        const event = {
            code: 'Enter',
            preventDefault: () => {}
        };
        const term = {
            callback: () => {}
        };
        spyOn(term, 'callback');
        component.onMenuKeydownHandler(event, term);
        expect(term.callback).toHaveBeenCalled();
        spyOn(event, 'preventDefault');
        const item1 = {
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        const item2 = {
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
        const item1 = {
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        const item2 = {
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
        const item1 = {
            itemEl: {
                nativeElement: {
                    children: [
                        jasmine.createSpyObj(['focus'])
                    ]
                }
            }
        };
        const item2 = {
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
