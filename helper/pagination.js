"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (objectPagenation, query, countPage) => {
    if (query.page) {
        objectPagenation.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPagenation.limitItems = parseInt(query.limit);
    }
    objectPagenation.skip = (objectPagenation.currentPage - 1) * objectPagenation.limitItems;
    const totalPage = Math.ceil(countPage / objectPagenation.limitItems);
    objectPagenation.totalPage = totalPage;
    return objectPagenation;
};
exports.default = paginationHelper;
