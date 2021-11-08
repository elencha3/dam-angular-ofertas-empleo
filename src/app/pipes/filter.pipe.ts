import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchText?: any): any {
  
    if(!value)return null;
    if(!searchText)return value;

    //Convertir a lowercase los inputs del usuario
    searchText = searchText.toLowerCase();
    //filtrar por los datos del array que incluyen el searchtext
    return value.filter(function(data){
        return JSON.stringify(data).toLowerCase().includes(searchText);
    });
  
  }

}
