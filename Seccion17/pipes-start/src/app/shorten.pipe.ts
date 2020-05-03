import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  /**
   * para pasar los parametros | shorten:5:otroparameto
   * @param value 
   * @param limit 
   */
  transform(value: any, limit: number, prueba: string) {
    console.log("entra: "+value+" prueba: "+prueba)
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }

  // transform(value: any) {
  //   if (value.length > 10) {
  //     console.log("entra: "+value)
  //     return value.substr(0, 10) + '...';
  //   }
  //   return value;
  // }
}
