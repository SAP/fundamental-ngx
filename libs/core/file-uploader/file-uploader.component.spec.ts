import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDetectorRef } from '@angular/core';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderComponent } from './file-uploader.component';

interface MockFile extends File {
    size: number;
}

describe('FileUploaderComponent', () => {
    let component: FileUploaderComponent;
    let fixture: ComponentFixture<FileUploaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should setDisabledState', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBeTruthy();
    });

    it('should selectHandler with no maxFileSize', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedFilesChanged, 'emit');
        const file1: MockFile = new File([''], 'file1');
        jest.spyOn(file1, 'size', 'get').mockReturnValue(1024);
        const event: File[] = [file1];
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith(event);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith(event);
    });

    it('should selectHandler with maxFileSize', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedFilesChanged, 'emit');
        jest.spyOn(component.selectedInvalidFiles, 'emit');
        const file1: MockFile = new File([''], 'file1');
        jest.spyOn(file1, 'size', 'get').mockReturnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        jest.spyOn(file2, 'size', 'get').mockReturnValue(1048580);
        const event: File[] = [file1, file2];
        component.maxFileSize = '1MB';
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith([file1]);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
        expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
    });

    it('should selectHandler with minFileSize', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedFilesChanged, 'emit');
        jest.spyOn(component.selectedInvalidFiles, 'emit');
        const file1: MockFile = new File([''], 'file1');
        jest.spyOn(file1, 'size', 'get').mockReturnValue(1048580);
        const file2: MockFile = new File([''], 'file2');
        jest.spyOn(file2, 'size', 'get').mockReturnValue(1024);
        const event: File[] = [file1, file2];
        component.minFileSize = '1MB';
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith([file1]);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
        expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
    });
    it('should selectHandler with minFileSize and maxFileSize', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedFilesChanged, 'emit');
        jest.spyOn(component.selectedInvalidFiles, 'emit');
        const file1: MockFile = new File([''], 'file1');
        jest.spyOn(file1, 'size', 'get').mockReturnValue(104858);
        const file2: MockFile = new File([''], 'file2');
        jest.spyOn(file2, 'size', 'get').mockReturnValue(1022);
        const event: File[] = [file1, file2];
        component.maxFileSize = '1MB';
        component.minFileSize = '1KB';
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith([file1]);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
        expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
    });
    it('should handle open', () => {
        jest.spyOn(component.inputRef.nativeElement, 'click');
        component.open();
        expect(component.inputRef.nativeElement.click).toHaveBeenCalled();
    });

    it('should handle clear', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component, 'onChange');
        jest.spyOn(component, 'setInputValue');
        const file1: MockFile = new File([''], 'file1');
        const event: File[] = [file1];
        component.selectHandler(event);
        component.clear();
        expect(component.inputRef.nativeElement.value).toEqual('');
        expect(component.inputRef.nativeElement.placeholder).toEqual('');
        expect(component.inputRef.nativeElement.title).toEqual('');
        expect(component.validFiles).toEqual([]);
        expect(component.invalidFiles).toEqual([]);
        expect(component.setInputValue).toHaveBeenCalledWith([]);
    });

    it('should call clear when files array is set to empty', () => {
        component.validFiles = [new File([''], 'file1')];
        jest.spyOn(component, 'clear');
        component.writeValue([]);
        expect(component.clear).toHaveBeenCalled();
    });

    it('should be manageable width', () => {
        const width = '300px';
        component.width = width;
        fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
        expect(component.inputRefText.nativeElement.style.width).toEqual(width);
    });
});
