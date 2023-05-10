/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
export function sweetalertsuccess(msg) {
  Swal.fire({
    position: 'top',
    text: msg,
    background: 'green',
    color: 'white',
    confirmButtonText: 'OK',
    showConfirmButton: false,
    timer: 1500
  });
}
export function sweetalertwarning(msg) {
  Swal.fire({
    position: 'top',
    text: msg,
    background: 'red',
    color: 'white',
    confirmButtonText: 'OK',
    showConfirmButton: false,
    timer: 1500
  });
}
export function sweetalertconfirm(msg) {
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`
  }).then((result) => {});
}
