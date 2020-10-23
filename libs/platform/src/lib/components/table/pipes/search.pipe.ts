import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'docsSearch'
})
export class SearchPipe implements PipeTransform {
    transform(value: { url: string; name: string }, searchTerm: string): boolean {
        return (
            searchTerm === '' ||
            !searchTerm ||
            value.url.toLocaleUpperCase().indexOf(searchTerm.toLocaleUpperCase()) !== -1 ||
            value.name.toLocaleUpperCase().indexOf(searchTerm.toLocaleUpperCase()) !== -1
        );
    }
}
