import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.pages.length && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
