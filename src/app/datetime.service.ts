import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  normalizeDate(date: Date): string {
    const normalized =
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-` +
      `${date.getDate().toString().padStart(2, '0')}T` +
      `${date.getHours().toString().padStart(2, '0')}` +
      `:${date.getMinutes().toString().padStart(2, '0')}`;

    return normalized;
  }

  get todayDate() {
    return new Date().toISOString().split('T')[0];
  }

  get dateTimeNowNormalized() {
    return this.normalizeDate(new Date());
  }
}
