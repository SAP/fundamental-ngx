import {
  Component, ViewChild
} from '@angular/core';
import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import {
  MenuComponent
} from './menu.component';
import { By } from '@angular/platform-browser';
import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'afi-test-component',
  template: `<afi-menu id="test-menu"
    [separateItems]="separateItems"
    [useColumns]="useColumns"
    [textAlign]="textAlign"
  #menu></afi-menu>`
})
class TestComponent {
  @ViewChild(MenuComponent) menu: MenuComponent;

  public separateItems = false;
  public useColumns = false;
  public textAlign: string;

  constructor() {}
}

describe('MenuComponent', () => {

  let component: TestComponent;
  let fixture: ComponentFixture < TestComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [
          TestComponent,
          MenuComponent,
          MenuItemComponent
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.separateItems = false;
    component.useColumns = false;
  });

  describe('Simple Menu', () => {

    let firstItemClicked = false;
    let secondItemClicked = false;
    let thirdItemClicked = false;

    beforeEach(() => {
      firstItemClicked = false;
      secondItemClicked = false;
      thirdItemClicked = false;
      const data = [{
        label: 'First Item',
        callback: () => {
          firstItemClicked = true;
        }
      }, {
        label: 'Second Item',
        callback: () => {
          secondItemClicked = true;
        }
      }, {
        label: 'Third Item',
        callback: () => {
          thirdItemClicked = true;
        }
      }];
      component.menu.load(data);
      fixture.detectChanges();
    });

    it('should be able to display the labels', () => {
      const menuItems = fixture.debugElement.queryAll(By.css('[data-tag="menu-item"]'));
      expect(menuItems.length).toBe(3);

      const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
      expect(firstItem.nativeElement.textContent).toBe('First Item');

      const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
      expect(secondItem.nativeElement.textContent).toBe('Second Item');

      const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));
      expect(thirdItem.nativeElement.textContent).toBe('Third Item');
    });

    it('should be able to bind the callbacks to click events', () => {
      expect(firstItemClicked).toBeFalsy();
      expect(secondItemClicked).toBeFalsy();
      expect(thirdItemClicked).toBeFalsy();

      const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"] [role="button"]'));
      firstItem.nativeElement.click();
      expect(firstItemClicked).toBeTruthy();

      const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"] [role="button"]'));
      secondItem.nativeElement.click();
      expect(secondItemClicked).toBeTruthy();

      const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"] [role="button"]'));
      thirdItem.nativeElement.click();
      expect(thirdItemClicked).toBeTruthy();
    });

    it('should not separate items by default', () => {
      const menuList = fixture.debugElement.query(By.css('[data-tag="menu__list'));
      expect(menuList.nativeElement.classList.contains('fd-menu__list--separated')).toBeFalsy();
    });

    it('should separate items if "separateItems" is true', () => {
      component.separateItems = true;
      fixture.detectChanges();
      const menuList = fixture.debugElement.query(By.css('[data-tag="menu__list'));
      expect(menuList.nativeElement.classList.contains('fd-menu__list--separated')).toBeTruthy();
    });

    it('should allow user to switch between normal and column display', () => {
      const menu = fixture.debugElement.query(By.css('[data-tag="menu'));
      expect(menu.nativeElement.classList.contains('columns')).toBeFalsy();
      component.useColumns = true;
      fixture.detectChanges();
      expect(menu.nativeElement.classList.contains('columns')).toBeTruthy();
    });

    it('should allow the text alignment to be set', () => {
      const menu = fixture.debugElement.query(By.css('[data-tag="menu'));
      expect(menu.nativeElement.style['text-align']).toBe('');

      component.textAlign = 'left';
      fixture.detectChanges();
      expect(menu.nativeElement.style['text-align']).toBe('left');

      component.textAlign = 'right';
      fixture.detectChanges();
      expect(menu.nativeElement.style['text-align']).toBe('right');
    });

  });

  describe('Grouped Menu', () => {
    let firstItemClicked = false;
    let secondItemClicked = false;
    let thirdItemClicked = false;

    beforeEach(() => {
      firstItemClicked = false;
      secondItemClicked = false;
      thirdItemClicked = false;
      const data = [{
        label: 'Actions',
        children: [{
          label: 'First Item',
          callback: () => {
            firstItemClicked = true;
          }
        }, {
          label: 'Second Item',
          callback: () => {
            secondItemClicked = true;
          }
        }, {
          label: 'Third Item',
          callback: () => {
            thirdItemClicked = true;
          }
        }]
      }];

      component.menu.load(data);
      fixture.detectChanges();
    });

    it('should be able to display the labels', () => {
      const menuGroups = fixture.debugElement.queryAll(By.css('[data-tag="menu__group"]'));
      expect(menuGroups.length).toBe(1);

      const firstGroupTitle = fixture.debugElement
        .query(By.css('[data-tag="menu__group"][data-index="0"] [data-tag="menu__group--title"]'));
      expect(firstGroupTitle.nativeElement.textContent).toBe('Actions');

      const menuItems = fixture.debugElement.queryAll(By.css('[data-tag="menu-item"]'));
      expect(menuItems.length).toBe(3);

      const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
      expect(firstItem.nativeElement.textContent).toBe('First Item');

      const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
      expect(secondItem.nativeElement.textContent).toBe('Second Item');

      const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));
      expect(thirdItem.nativeElement.textContent).toBe('Third Item');
    });

  });

  describe('Selectable Items Menu', () => {

    let firstItemClicked = false;
    let secondItemClicked = false;
    let thirdItemClicked = false;

    beforeEach(() => {
      firstItemClicked = false;
      secondItemClicked = false;
      thirdItemClicked = false;
      const data = [{
        label: 'First Item',
        selectable: true,
        selected: true,
        callback: () => {
          firstItemClicked = true;
        }
      }, {
        label: 'Second Item',
        selectable: true,
        callback: () => {
          secondItemClicked = true;
        }
      }, {
        label: 'Third Item',
        selectable: true,
        callback: () => {
          thirdItemClicked = true;
        }
      }];

      component.menu.load(data);
      fixture.detectChanges();
    });

    it('should show selected item', () => {
      const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
      const firstItemIcon = firstItem.query(By.css('[data-tag="menu-item__icon"]'));
      expect(firstItemIcon.nativeElement.classList.contains('sap-icon--accept')).toBeTruthy();

      const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
      const secondItemIcon = secondItem.queryAll(By.css('[data-tag="menu-item__icon"]'));
      expect(secondItemIcon.length).toBe(0);

      const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
      const thirdItemIcon = thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]'));
      expect(thirdItemIcon.length).toBe(0);
    });

    it('should toggle selectable item on click', () => {
      const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
      const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
      const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));

      const firstItemButton = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"] [role="button"]'));
      const secondItemButton = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"] [role="button"]'));
      const thirdItemButton = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"] [role="button"]'));

      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);

      secondItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);

      thirdItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);

      firstItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);

      thirdItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
    });


  });

  describe('Selectable Radio Group Menu', () => {

    let firstItemClicked = false;
    let secondItemClicked = false;
    let thirdItemClicked = false;

    beforeEach(() => {
      firstItemClicked = false;
      secondItemClicked = false;
      thirdItemClicked = false;
      const data = [{
        isRadioGroup: true,
        children: [{
          label: 'First Item',
          selectable: true,
          selected: true,
          callback: () => {
            firstItemClicked = true;
          }
        }, {
          label: 'Second Item',
          selectable: true,
          callback: () => {
            secondItemClicked = true;
          }
        }, {
          label: 'Third Item',
          selectable: true,
          callback: () => {
            thirdItemClicked = true;
          }
        }]
      }];

      component.menu.load(data);
      fixture.detectChanges();
    });

    it('should allow menu groups to "act-like" a radio group', () => {
      const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
      const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
      const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));

      const firstItemButton = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"] [role="button"]'));
      const secondItemButton = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"] [role="button"]'));
      const thirdItemButton = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"] [role="button"]'));

      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);

      secondItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);

      thirdItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);

      firstItemButton.nativeElement.click();
      expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(1);
      expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
      expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon"]')).length).toBe(0);
    });

  });

  describe('Selectable Menu with Custom Icons', () => {
    let firstItemClicked = false;
    let secondItemClicked = false;
    let thirdItemClicked = false;

    beforeEach(() => {
      firstItemClicked = false;
      secondItemClicked = false;
      thirdItemClicked = false;
      const data = [{
        icon: 'sap-icon--favorite',
        children: [{
          label: 'First Item',
          selectable: true,
          selected: true,
          callback: () => {
            firstItemClicked = true;
          }
        }, {
          label: 'Second Item',
          selectable: true,
          selected: true,
          callback: () => {
            secondItemClicked = true;
          }
        }, {
          label: 'Third Item',
          selectable: true,
          selected: true,
          icon: 'sap-icon--bed',
          callback: () => {
            thirdItemClicked = true;
          }
        }]
      }];

      component.menu.load(data);
      fixture.detectChanges();
    });

    it('should allow for button group select icon to be customized', () => {

      const firstItemIcon = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"] [data-tag="menu-item__icon"]'));
      const secondItemIcon = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"] [data-tag="menu-item__icon"]'));
      const thirdItemIcon = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"] [data-tag="menu-item__icon"]'));

      expect(firstItemIcon.nativeElement.classList.contains('sap-icon--favorite')).toBeTruthy();
      expect(secondItemIcon.nativeElement.classList.contains('sap-icon--favorite')).toBeTruthy();
      expect(thirdItemIcon.nativeElement.classList.contains('sap-icon--bed')).toBeTruthy();
    });

  });

});
