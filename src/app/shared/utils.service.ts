import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  validatePage(rawPage: any) {
    const pageNum = parseInt(rawPage, 0);
    if (isNaN(pageNum) || pageNum <= 0) {
      return 1;
    }
    return pageNum;
  }
}
