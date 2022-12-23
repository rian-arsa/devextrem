import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    moment.locale('id');
    const date = new Date(value)
    return moment(date).format('D MMMM YYYY');;
  }

}
