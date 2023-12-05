import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from "dayjs";

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: any): string {
    if (date === 'Check-in' || date === 'Check-out') {
      return date;
    } else {
      return dayjs(date).format('YYYY-MM-DD');
    }
  }
}
