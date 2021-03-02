import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';
import { PaginationService } from './pagination.service';
import { SelectModule, SelectComponent } from '../select/public_api';

describe('Pagination Test', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let paginationServiceSpy: jasmine.SpyObj<PaginationService>;

    beforeEach(waitForAsync(() => {
        const paginationSpy = jasmine.createSpyObj('PaginationService', ['getTotalPages', 'getPages']);

        TestBed.configureTestingModule({
            declarations: [PaginationComponent],
            imports: [SelectModule],
            providers: [{ provide: PaginationService, useValue: paginationSpy }]
        }).overrideComponent(PaginationComponent, {
            set: {changeDetection: ChangeDetectionStrategy.Default}
        }).compileComponents();

        paginationServiceSpy = TestBed.get(PaginationService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        component.totalItems = 3;
        component.currentPage = 1;
        component.itemsPerPage = 2;
        fixture.detectChanges();
    });

    it('should default to first page', () => {
        component.currentPage = null;
        fixture.detectChanges();
        expect(component.currentPage).toEqual(1);
    });

    it('should get the pagination object for the service', () => {
        const retVal = component.getPaginationObject();

        expect(retVal).toEqual({ totalItems: 3, currentPage: 1, itemsPerPage: 2 });
    });

    it('should handle keypress', () => {
        const keyboardEvent = new KeyboardEvent('keypress', {
            key: 'Enter'
        });
        spyOn(keyboardEvent, 'preventDefault');
        spyOn(component, 'goToPage');

        component.onKeypressHandler(1, keyboardEvent);

        expect(keyboardEvent.preventDefault).toHaveBeenCalled();
        expect(component.goToPage).toHaveBeenCalledWith(1);
    });

    it('should have default select for item per page with options', async () => {
        component.totalItems = 100;
        component.itemsPerPageOptions = [2, 4, 6];
        fixture.detectChanges();
        const selectComponent = fixture.debugElement.query(By.directive(SelectComponent));
        const selectInstance = selectComponent.injector.get(SelectComponent);
        expect(selectInstance).toBeInstanceOf(SelectComponent);
    });

    it('should handle mouseevent', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'preventDefault');
        spyOn(component.pageChangeStart, 'emit');

        component.goToPage(1, mouseEvent);

        expect(component.pageChangeStart.emit).toHaveBeenCalledWith(1);
    });
});
