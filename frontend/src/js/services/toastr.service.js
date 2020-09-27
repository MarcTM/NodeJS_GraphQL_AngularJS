export default class Toastr {
    constructor (toastr) {
      'ngInject';
  
      this._toastr = toastr;
    }
  
    showToastr(type, message){
      switch (type) {
        case 'success':
          this._toastr.success(message);
          break;
        case 'error':
          this._toastr.error(message);
          break;
        case 'info':
          this._toastr.info(message);
          break;
        case 'warning':
          this._toastr.warning(message);
          break;
        
      }
    }
  }
  