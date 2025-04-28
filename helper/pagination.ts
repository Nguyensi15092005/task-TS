interface ObjectPagination {
    currentPage:number,
    limitItems: number,
    skip?:number,
    totalPage?: number
}

const paginationHelper = (objectPagenation: ObjectPagination, query: Record<string, any>, countPage: number): ObjectPagination => {
    if (query.page) {
        objectPagenation.currentPage = parseInt(query.page);
    }

    if (query.limit) {
        objectPagenation.limitItems = parseInt(query.limit);
    }
    objectPagenation.skip = (objectPagenation.currentPage - 1) * objectPagenation.limitItems;
    const totalPage = Math.ceil(countPage / objectPagenation.limitItems);
    objectPagenation.totalPage = totalPage;
    return objectPagenation
}
export default paginationHelper;