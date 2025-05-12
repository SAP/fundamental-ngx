import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderComponent } from './file-uploader.component';

interface MockFile extends File {
    size: number;
}

const createMockFile = (name: string, size: number): MockFile => {
    const file = new File([''], name) as MockFile;
    jest.spyOn(file, 'size', 'get').mockReturnValue(size);
    return file;
};

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

    describe('selectHandler', () => {
        beforeEach(() => {
            jest.spyOn(component, 'onChange');
            jest.spyOn(component.selectedFilesChanged, 'emit');
            jest.spyOn(component.selectedInvalidFiles, 'emit');
        });

        it('should handle file selection without maxFileSize', () => {
            const file = createMockFile('file1', 1024);
            component.selectHandler([file]);
            expect(component.onChange).toHaveBeenCalledWith([file]);
            expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file]);
        });

        it('should handle file selection with maxFileSize', () => {
            const file1 = createMockFile('file1', 1024);
            const file2 = createMockFile('file2', 1048580);
            component.maxFileSize = '1MB';
            component.selectHandler([file1, file2]);
            expect(component.onChange).toHaveBeenCalledWith([file1]);
            expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
            expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
        });

        it('should handle file selection with minFileSize', () => {
            const file1 = createMockFile('file1', 1048580);
            const file2 = createMockFile('file2', 1024);
            component.minFileSize = '1MB';
            component.selectHandler([file1, file2]);
            expect(component.onChange).toHaveBeenCalledWith([file1]);
            expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
            expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
        });

        it('should handle file selection with both minFileSize and maxFileSize', () => {
            const file1 = createMockFile('file1', 104858);
            const file2 = createMockFile('file2', 1022);
            component.maxFileSize = '1MB';
            component.minFileSize = '1KB';
            component.selectHandler([file1, file2]);
            expect(component.onChange).toHaveBeenCalledWith([file1]);
            expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
            expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
        });
    });

    it('should handle open', () => {
        jest.spyOn(component.inputRef.nativeElement, 'click');
        component.open();
        expect(component.inputRef.nativeElement.click).toHaveBeenCalled();
    });

    it('should handle clear', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component, 'setInputValue');
        const file = createMockFile('file1', 1024);
        component.selectHandler([file]);
        component.clear();
        expect(component.inputRef.nativeElement.value).toEqual('');
        expect(component.validFiles).toEqual([]);
        expect(component.invalidFiles).toEqual([]);
        expect(component.setInputValue).toHaveBeenCalledWith([]);
    });

    it('should call clear when files array is set to empty', () => {
        component.validFiles = [createMockFile('file1', 1024)];
        jest.spyOn(component, 'clear');
        component.writeValue([]);
        expect(component.clear).toHaveBeenCalled();
    });

    it('should manage width properly', () => {
        const width = '300px';
        component.width = width;
        fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
        expect(component.inputRefText.nativeElement.style.width).toEqual(width);
    });
});
