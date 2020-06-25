import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
    transform(values: any[], searchTerm: string, key: string): any[] {
        console.log(searchTerm);
        if (values && key && searchTerm) {
            values = values.filter(item => item[key].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        }
        return values;
    }
}
