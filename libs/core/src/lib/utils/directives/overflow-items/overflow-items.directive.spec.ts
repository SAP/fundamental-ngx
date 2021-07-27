import { OverflowItemsDirective } from './overflow-items.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { whenStable } from '@fundamental-ngx/core/tests';

const LIST_ITEM_WIDTH = 100;
const LIST_WIDTH = 500;

@Component({
  template: `
    <div class="list" fdOverflowItems itemSelector="[data-overflowItem]" (overflowChanged)="onOverflowed($event)">
      <li *ngFor="let item of items" data-overflowItem class="list-item">{{item}}</li>
    </div>
  `,
  styles: [`
    .list {
      padding: 0;
      margin: 0;
      display: flex;
      list-style: none;
      overflow: hidden;
      /*width: ${LIST_WIDTH}px;*/
      width: 500px;
      height: 50px;
    }
    .list-item {
      display: block;
      box-sizing: border-box;
      /*width: ${LIST_ITEM_WIDTH}px;*/
      width: 100px!important;
      height: 40px!important;
    }
  `],
})
class TestComponent {

  @ViewChild(OverflowItemsDirective)
  dir: OverflowItemsDirective;

  items: any[] = Array(100).fill(0);

  currentExtraItems = 0;

  counter = 0;

  onOverflowed(extraItems: number): void {
    this.currentExtraItems = extraItems;
  }
}

describe('OverflowItemsDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, OverflowItemsDirective],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    await whenStable(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculated extra items', () => {
    fixture.detectChanges();
    expect(component.currentExtraItems).not.toBe(0);
  });

  it('should recalculate on resize page', async () => {
    const initialStateOfExtraItems = component.currentExtraItems;
    window.dispatchEvent(new Event('resize'));
    await whenStable(fixture);
    const stateOfExtraItemsAfterResize = component.currentExtraItems;
    expect(initialStateOfExtraItems).not.toBe(stateOfExtraItemsAfterResize);
  });
});
