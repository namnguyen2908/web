var express = require('express');
const UserModel = require('../models/UserModel');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
})

router.post('/', async (req, res) => {


  // Cách 2: dùng hàm findOne của mongoose
  var login = await UserModel.findOne(
    {
      username: req.body.username,
      password: req.body.password
    }
  )
  try {
        // Tìm tài khoản trong bảng tài khoản đã đăng ký (register)
        const registeredUser = await RegisterModel.findOne({ username });
    
        if (!registeredUser) {
          // Nếu không tìm thấy tài khoản trong bảng tài khoản đã đăng ký, tiếp tục tìm trong bảng tài khoản thông thường (UserModel)
          const user = await UserModel.findOne({ username });
    
          if (!user) {
            // Nếu không tìm thấy tài khoản, hiển thị thông báo lỗi và quay lại trang đăng nhập
            return res.render('login', { error: 'Tài khoản không tồn tại' });
          }
    
          if (password === user.password) {
            // Đăng nhập thành công, chuyển hướng đến trang '/toy' hoặc trang khác
            res.redirect('/toy/admin');
          } else {
            // Mật khẩu không khớp, hiển thị thông báo lỗi và quay lại trang đăng nhập
            res.render('login', { error: 'Mật khẩu không đúng' });
          }
        } else {
          // Kiểm tra mật khẩu có khớp với mật khẩu đã đăng ký không
          if (password === registeredUser.password) {
            // Đăng nhập thành công, chuyển hướng đến trang '/toy' hoặc trang khác
            res.redirect('/toy');
          } else {
            // Mật khẩu không khớp, hiển thị thông báo lỗi và quay lại trang đăng nhập
            res.render('/login', { error: 'Mật khẩu không đúng' });
          }
        }
      } catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.render('login', { error: 'Lỗi đăng nhập, vui lòng thử lại.' });
      }
  //điều hướng web khi login succeed (vào trang admin) hoặc login fail (về lại trang login)
  if (login)  //login == true
    res.redirect('/toy/admin')
  else
    res.redirect('/login');
})

module.exports = router;



