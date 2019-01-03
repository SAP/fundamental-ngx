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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
