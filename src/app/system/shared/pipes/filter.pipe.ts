import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, value: string, field: string): any {
    if (!items){return}
    if(items.length === 0 || !value){
      return items;
    }
    return items.filter((i:any)=>{
      const t = Object.assign({},i);

      if(!isNaN(t[field])){
        t[field] += '';
      }
      if(field === 'type'){
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }
      if(field === 'amount'){
        t[field] = t['amount'];
      }
      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    })
  }

}
