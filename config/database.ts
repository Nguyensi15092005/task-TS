import mongoose from "mongoose"; // mongoose

//hàm kiểm tra kết nối database
export const connect = async (): Promise<void> => { // nếu dùng async thì phải dùng Promise
    try {
        await mongoose.connect(process.env.MONGO_URL);// ẩn link mongo để bảo mật ở env
        console.log("Connect Success!")
    } catch (error) {
        console.log("Connect Error!")
    }
}
