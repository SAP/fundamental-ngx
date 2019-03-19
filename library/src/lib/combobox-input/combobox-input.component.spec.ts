import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';
import { SearchInputModule } from '../search-input/search-input.module';

import { ComboboxInputComponent } from './combobox-input.component';
import { FdSearchPipe } from '../search-input/search-input.component';

describe('ComboboxInputComponent', () => {
  let component: ComboboxInputComponent;
  let pipe: FdSearchPipe;
  let fixture: ComponentFixture<ComboboxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [FormsModule, MenuModule, PopoverModule, SearchInputModule],
        declarations: [ComboboxInputComponent]
    }).compileComponents();
}));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboboxInputComponent);
        component = fixture.componentInstance;
        component.dropdownValues = [
            {text: 'Apple', callback: () => {}}
        ];
        component.searchFunction = () => {};
        pipe = new FdSearchPipe();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle newItemKeydown', () => {
        component.newItemCallback = () => {};
        spyOn(component, 'newItemCallback');
        const event = {
            code: 'Enter',
            preventDefault: () => {}
        };
        component.newItemKeydownHandler(event);
        expect(component.newItemCallback).toHaveBeenCalledWith(event);
    });

    it('should handle onNewItemKeydownHandler, arrow up', () => {
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
        component.newItemKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(item1.itemEl.nativeElement.children[0].focus).toHaveBeenCalled();
    });

    it('should handle onNewItemKeydownHandler, arrow up on the first item', () => {
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
        component.newItemKeydownHandler(event);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(component.searchInputElement.nativeElement.focus).toHaveBeenCalled();
    });
});
