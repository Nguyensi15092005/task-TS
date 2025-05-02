import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomString } from "../../../helper/generate";

// [POST] api/v1/users/register
export const register = async (req: Request, res: Response) =>{
    try {
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false
        });
        if(existEmail){
            res.json({
                code: 400,
                message: "Email đã tồn tại!"
            });
            return;
        }
        else{
            req.body.password = md5(req.body.password);
            req.body.token = generateRandomString(30);

            const user = new User(req.body);
            const data = await user.save();

            const token = data.token;
            // lưu token vào trong cookie cho FronEnd
            res.cookie("token", token);

            res.json({
                code: 200,
                message: "Đăng ký thành công!",
                token:token
            });
        }
    } catch (error) {
        res.json({
            code: 404,
            message: "Đăng ký thất bại!"
        });
    }
}

// [POST] api/v1/users/login
export const login = async (req: Request, res: Response) =>{
    try {
        const email: string = req.body.email;
        const password: string = req.body.password;
        const user = await User.findOne({
            email: email,
            deleted: false
        });

        if(!user){
            res.json({
                code: 400,
                message: "Email không tồn tại!"
            }); 
            return;
        }
        else if(md5(password) !== user.password){
            res.json({
                code: 400,
                message: "Sai mật khẩu!"
            }); 
            return;
        }
        else{
            req.body.token = generateRandomString(30);
            const token = user.token;

            res.cookie("token", token);

            res.json({
                code: 200,
                message: "Đăng nhập thành công!",
                token:token
            });
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Đăng nhập thất bại!"
        });
    }
}

// [GET] api/v1/users/detail/:id
export const detail = async (req: Request, res:Response) =>{
    try {
        const id: string = req.params.id;
        
        const user = await User.findOne({
            _id:id,
            deleted: false
        }).select("-password -token")
        res.json({
            code: 200,
            message: "Thanh công",
            info: user
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "thất bại!"
        });
    }
}