import { OverflowItemsDirective } from './overflow-items.directive';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';

const LIST_ITEM_WIDTH = 100;
const LIST_WIDTH = 500;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-component',
  template: `
    <div #dirRoot class="list" fdOverflowItems itemSelector="[data-overflowItem]" (overflowChanged)="onOverflowed($event)">
      <div *ngFor="let item of items" data-overflowItem class="list-item">{{item}}</div>
    </div>
  `,
  styles: [`
    .list {
      position: relative;
      display: flex;
      overflow: hidden;
      width: ${LIST_WIDTH}px;
    }
    .list-item {
      display: block;
      box-sizing: border-box;
      min-width: ${LIST_ITEM_WIDTH}px;
      height: 40px;
    }
  `],
})
class TestComponent {

  @Input()
  items: any[];

  @Output()
  selected = new EventEmitter();

  onOverflowed(extraItems: number): void {
    this.selected.emit(extraItems);
  }
}

@Component({
  template: `
    <test-component [items]="items" (selected)="onOverflowed($event)"></test-component>
  `,
})
class WrapperComponent {

  items: any[] = Array(100).fill(0);

  currentExtraItems = 0;

  onOverflowed(extraItems: number): void {
    this.currentExtraItems = extraItems;
  }
}

describe('OverflowItemsDirective', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WrapperComponent, TestComponent, OverflowItemsDirective],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculated extra items', () => {
    expect(component.currentExtraItems).not.toBe(0);
  });

  it('should recalculate on resize page',  async () => {
    const initialStateOfExtraItems = component.currentExtraItems;

    component.items.push(1231);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    await whenStable(fixture);
    const stateOfExtraItemsAfterResize = component.currentExtraItems;
    expect(initialStateOfExtraItems).not.toBe(stateOfExtraItemsAfterResize);
  });
});
