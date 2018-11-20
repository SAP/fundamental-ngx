import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let ngbModalSpy: jasmine.SpyObj<NgbModal>;

    beforeEach(async(() => {
        const modalSpy = jasmine.createSpyObj('NgbModal', ['open']);

        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            providers: [{ provide: NgbModal, useValue: modalSpy }]
        }).compileComponents();

        ngbModalSpy = TestBed.get(NgbModal);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
