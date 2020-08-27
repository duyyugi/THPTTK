function timKiemHoaDon() {
    let trangthaiHD = $('#trangthaiHD').val();
    let cachthucTT = $('#cachthucTTinput').val();
    let maHD = $('#maHoaDon').val();
    let url = '/thuquy?trangthaiHD=' + trangthaiHD + '&maHD=' + maHD +'&cachthucTT=' + cachthucTT;
    location.href = url;
}
function chiTietHoaDon(maHD, cachthucTT) {
    $.ajax({
        url: '/thuquy/chitiethoadon',
        type: 'POST',
        data: {
            maHD: maHD
        },
        success: function (result) {
            let stringTableHTML = '';
            for (let i in result.chiTietHD) {
                stringTableHTML = stringTableHTML +
                    `   <tr>
                    <td class="counterCell text-center"></td>
                    <td>`+ result.chiTietHD[i].TenMH + `</td>
                    <td>`+ result.chiTietHD[i].SoLuong + `</td>
                    <td>`+ result.chiTietHD[i].DonGia + `</td>
                    <td>`+ result.chiTietHD[i].ThanhTien + `</td>
                </tr>
            `
            }
            let buttonCTT = ``;
            let hinhThucThanhToan = ``;
            let formLapHDTTT = ``;
            if (result.lienQuanHD.TrangThaiHD == 'Chưa thanh toán') {
                if (cachthucTT == 1) {
                    buttonCTT = `
                <div class="row rowCTHD" style="padding-top: 30px">
                    <div class="col text-center">
                        <button class="btn btn-dark" onclick = "xacNhanThanhToan(`+ result.lienQuanHD.MaHD + `,` + cachthucTT + `)">Xác nhận thanh toán</button>
                    </div>
                </div>                    
                `
                } else {
                    if (cachthucTT == 0) {
                        buttonCTT=``;
                    } else {
                        if (!result.lienQuanHD.cachTTThe) {
                            buttonCTT = `
                            <div class="row rowCTHD" style="padding-top: 30px">
                                <div class="col text-center">
                                    <button class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">Lập HD thanh toán thẻ</button>
                                    <button class="btn btn-dark" disabled onclick = "xacNhanThanhToan(`+ result.lienQuanHD.MaHD + `,` + cachthucTT + `)">Xác nhận thanh toán thẻ</button>
                                </div>
                            </div>                    
                            `
                            formLapHDTTT = `
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Lập hóa đơn thanh toán thẻ</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col">
                                                    <p>Mã hóa đơn: `+ result.lienQuanHD.MaHD + `</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-5">
                                                    <p>Cách thức thanh toán:</p>
                                                </div>
                                                <div class="col-lg-7" style="transform: translate(0,-20%); padding-bottom: 15px">
                                                    <select class="custom-select" id="chonPTTT">
                                                        <option value="Momo" selected>Momo</option>
                                                        <option value="ZaloPay">ZaloPay</option>
                                                        <option value="Vietcombank">Vietcombank</option>
                                                        <option value="Agribank">Agribank</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-5">
                                                    <p>Mã giao dịch:</p>
                                                </div>
                                                <div class="col-lg-7" style="transform: translate(0,-20%);">
                                                    <input type="text" class="form-control" id="maGiaoDich">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger"
                                                data-dismiss="modal">Thoát</button>
                                            <button type="button" class="btn btn-dark" onclick="lapHDThanhToanThe(`+ result.lienQuanHD.MaHD + `)">Lập hóa đơn</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                `
                        } else {
                            buttonCTT = `
                            <div class="row rowCTHD" style="padding-top: 30px">
                                <div class="col text-center">
                                    <button class="btn btn-danger" disabled data-toggle="modal" data-target="#exampleModal">Đã lập HD thanh toán thẻ</button>
                                    <button class="btn btn-dark" onclick = "xacNhanThanhToan(`+ result.lienQuanHD.MaHD + `,` + cachthucTT + `)">Xác nhận thanh toán</button>
                                </div>
                            </div>                    
                            `
                        }
                    }
                }
            } else {
                if (result.lienQuanHD.HinhThucThanhToan == 1) {
                    hinhThucThanhToan = `
                <p>- Hình thức thanh toán: Tiền mặt</p>
                `
                } else {
                    hinhThucThanhToan = `
                <p>- Hình thức thanh toán: Thẻ</p>
                `
                }

            }
            $('#formCTDH').html(`
            <div class="row rowCTHD">
                `+ formLapHDTTT + `
                <div class="col-lg-6">
                    <p>- Chi tiết hóa đơn: `+ result.lienQuanHD.MaHD + `</p>
                </div>
                <div class="col-lg-6">
                    <p style="display: inline-block" >- Trạng thái: &nbsp;</p><b style="display: inline-block">`+ result.lienQuanHD.TrangThaiHD + `</b>
                </div>                      
            </div>
            <div class="row rowCTHD">
                <div class="col-lg-12">
                    `+ hinhThucThanhToan + `   
                </div>           
            </div>
            <table class="row" style="margin-left: 5px;">
                    <tr>
                        <th>STT</th>
                        <th>Tên Mặt hàng</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                    `+ stringTableHTML + `
                </table>
            <div class="row rowCTHD">
                <div class="col-lg-6">
                    - NV Bán Hàng: `+ result.lienQuanHD.NVBH + `
                </div>
                <div class="col-lg-6">
                    - NV Giao Hàng: `+ result.lienQuanHD.NVGH + `
                </div>
            </div>
            <div class="row rowCTHD">
                <div class="col-lg-6">
                    - Khách hàng: `+ result.lienQuanHD.TenKH + `
                 </div>
                <div class="col-lg-6">
                    - Tổng tiền: `+ result.lienQuanHD.TongTien + `
                </div>
            </div>
            `+ buttonCTT + `
        `)
        }
    })
}
function xacNhanThanhToan(maHD, cachthucTT) {
    Swal.fire({
        title: 'Xác nhận!',
        text: "Bạn có muốn xác nhận thanh toán cho hóa đơn số " + maHD,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có!',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: '/thuquy/xacnhanhoadon',
                type: 'POST',
                data: {
                    maHD: maHD,
                    cachthucTT: cachthucTT
                },
                success: function (result) {
                    if (result.status) {
                        Swal.fire({
                            title: 'Xác nhận thanh toán thành công'
                        }).then(() => {
                            chiTietHoaDon(maHD, cachthucTT);
                            $('.modal-backdrop').remove()
                        })
                    } else {
                        Swal.fire({
                            title: 'Xác nhận thanh toán thất bại'
                        })
                    }
                }
            })
        }
    })
}

function lapHDThanhToanThe(maHD) {
    let cachTTThe = $('#chonPTTT').val();
    let maGiaoDich = $('#maGiaoDich').val();
    Swal.fire({
        title: 'Xác nhận!',
        text: "Bạn có lập hóa đơn thanh toán thẻ cho hóa đơn " + maHD,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có!',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: '/thuquy/laphoadonthanhtoanthe',
                type: 'POST',
                data: {
                    maHD: maHD,
                    maGiaoDich: maGiaoDich,
                    cachTTThe: cachTTThe
                },
                success: function (result) {
                    if (result.status) {
                        Swal.fire({
                            title: 'Lập HD thanh toán thẻ thành công'
                        }).then(() => {
                            chiTietHoaDon(maHD, 2);
                            $('.modal-backdrop').remove()
                        })
                    } else {
                        Swal.fire({
                            title: 'Lập HD thanh toán thẻ thất bại'
                        })
                    }
                }
            })
        }
    })
}
function thanhtoanThe() {
    location.href = "/thuquy?cachthucTT=2";
}
function thanhToanTienMat() {
    location.href = "/thuquy?cachthucTT=1";
}
function traCuuHoaDon() {
    location.href = "/thuquy?cachthucTT=0";
}