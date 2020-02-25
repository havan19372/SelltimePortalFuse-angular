import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(array: Array<any>, args: any): Array<any> {
    // debugger;
    array.sort((a: any, b: any) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        // debugger;
        return -1;
      } else if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        // debugger;
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
