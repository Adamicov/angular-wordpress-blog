export class Pagination {
  private currentPage: number;
  private totalItems: number;

  constructor(public itemsPerPage) {}

  public getConfig() {
    return this;
  }

  public setTotalItems(itemsCount: number) {
    this.totalItems = itemsCount;
  }

  public setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  public getCurrentPage() {
    return this.currentPage;
  }
}
