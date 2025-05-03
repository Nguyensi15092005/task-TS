"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_1 = require("../../../helper/generate");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existEmail = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (existEmail) {
            res.json({
                code: 400,
                message: "Email đã tồn tại!"
            });
            return;
        }
        else {
            req.body.password = (0, md5_1.default)(req.body.password);
            req.body.token = (0, generate_1.generateRandomString)(30);
            const user = new user_model_1.default(req.body);
            const data = yield user.save();
            const token = data.token;
            res.cookie("token", token);
            res.json({
                code: 200,
                message: "Đăng ký thành công!",
                token: token
            });
        }
    }
    catch (error) {
        res.json({
            code: 404,
            message: "Đăng ký thất bại!"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (!user) {
            res.json({
                code: 400,
                message: "Email không tồn tại!"
            });
            return;
        }
        else if ((0, md5_1.default)(password) !== user.password) {
            res.json({
                code: 400,
                message: "Sai mật khẩu!"
            });
            return;
        }
        else {
            req.body.token = (0, generate_1.generateRandomString)(30);
            const token = user.token;
            res.cookie("token", token);
            res.json({
                code: 200,
                message: "Đăng nhập thành công!",
                token: token
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Đăng nhập thất bại!"
        });
    }
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: "Thanh công",
            info: req["user"]
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "thất bại!"
        });
    }
});
exports.detail = detail;
