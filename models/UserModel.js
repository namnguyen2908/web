const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true
      }
   }
)
const UserModel = mongoose.model('user', UserSchema, 'user');
UserModel.signup = async function (username, password) {
   try {
     // Kiểm tra xem tài khoản có tồn tại trong cơ sở dữ liệu chưa
     const existingUser = await this.findOne({ username });
 
     if (existingUser) {
       throw new Error('Tài khoản đã tồn tại.');
     }
 
     // Nếu tài khoản chưa tồn tại, tạo một tài khoản mới và lưu vào cơ sở dữ liệu
     const newUser = new this({ username, password });
     await newUser.save();
     return newUser;
   } catch (error) {
     throw error;
   }
 };
module.exports = UserModel;