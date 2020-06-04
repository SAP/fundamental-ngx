import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationService } from './pagination.service';

describe('Pagination Test', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let paginationServiceSpy: jasmine.SpyObj<PaginationService>;

    beforeEach(async(() => {
        const paginationSpy = jasmine.createSpyObj('PaginationService', ['getTotalPages', 'getPages']);

        TestBed.configureTestingModule({
            declarations: [PaginationComponent],
            providers: [{ provide: PaginationService, useValue: paginationSpy }]
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

    it('should handle mouseevent', () => {
        const mouseEvent = new MouseEvent('click');
        spyOn(mouseEvent, 'preventDefault');
        spyOn(component.pageChangeStart, 'emit');

        component.goToPage(1, mouseEvent);

        expect(component.pageChangeStart.emit).toHaveBeenCalledWith(1);
    });

    it('should get the pagination object for the service', () => {
        const retVal = component.getPaginationObject();

        expect(retVal).toEqual({ totalItems: 3, currentPage: 1, itemsPerPage: 2 });
    });
});
