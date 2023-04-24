import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';

import { SplitterModule } from '../splitter.module';
import { SplitterPaginationComponent } from './splitter-pagination.component';
import { SplitterComponent } from './../splitter.component';

describe('SplitterPaginationComponent', () => {
    let component: SplitterPaginationComponent;
    let fixture: ComponentFixture<SplitterPaginationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SplitterModule],
            providers: [SplitterComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SplitterPaginationComponent);
        component = fixture.debugElement.componentInstance;

        await whenStable(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change page', () => {
        const spy = jest.spyOn(component.onPageChange, 'emit');
        const pages = ['1', '2', '3'];

        component.pages = pages;
        fixture.detectChanges();

        component._changePage(pages[1]);

        expect(component.currentPage).toEqual(pages[1]);
        expect(spy).toHaveBeenCalledTimes(1);

        component._changePage(pages[1]);

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
