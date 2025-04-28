import { Request, Response } from 'express';
import Task from "../models/task.model";
import paginationHelper from "../../../helper/pagination";
import searchHelper from '../../../helper/search';

export const index = async (req: Request, res: Response) => {
    // find 
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp,

    }
    const find: Find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    // End find

    // Search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }
    // End Search

    // sort
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toLocaleString();
        sort[sortKey] = req.query.sortValue
    }
    // End Sort

    // Pagination
    const countPage = await Task.countDocuments();
    const pagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countPage
    )
    // End Pagination

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    res.json(tasks);
}

// [GET] api/v1/task/detai/:id
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })
    res.json(task);
}

// [PATCH] api/v1/task/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id:string = req.params.id;
        const status:string = req.body.status;

        await Task.updateOne({ _id: id }, { status: status });

        res.json({
            message: "Cập nhật trạng thái thành công!",
            code: 200
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }

}
