let express= require('express');
let router = express.Router();
let managerController = require('../controllers/quanly.controller');


router.get('/dang-ky',managerController.postDangKyNhanVien)
router.post('/dang-ky', managerController.getDangKyNhanVien)

router.get('/',(req,res)=>{
    res.render("VquanLy/index");
})

module.exports = router;