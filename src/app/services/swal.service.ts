import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }


  ok(msg){
    swal({title: "<h1>Success!</h1>", text: msg, type: "success"});
  }

  err(msg){
    swal({title: "<h1>Error!</h1>", html: "<p style='font-size: 25px;'>" + msg + "</p>", type: "error"});
  }

  warning(msg){
    swal({title: "<h1>Warning!</h1>", text: msg, type: "warning"});
  }

  showLoading(msg, allowOutsideClick){
    swal({html: "<h1>" + msg + "</h1>", allowOutsideClick: allowOutsideClick});
    swal.showLoading();
  }

  hideLoading(){
    swal.hideLoading();
    swal.close();
  }
  

  confirmDelete(fnSuccess, fnError){
    swal({
      title: 'Jeste li sigurni?',
      text: 'Podatak će biti trajno obrisan iz sustava!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Da, nastavi!',
      cancelButtonText: 'Ne, odustani!'
    }).then((result) => {
      if (result.value) {
        fnSuccess();
      } else if (result.dismiss === swal.DismissReason.cancel) {
        fnError();
      }
    });
  }

  confirmUpdate(fnSuccess, fnError){
    swal({
      title: 'Spremi?',
      text: "Želite li spremiti izmjenu?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Da, nastavi!',
      cancelButtonText: 'Ne, odustani!'
    }).then((result) => {
      if (result.value) {
        fnSuccess();
      } else if (result.dismiss === swal.DismissReason.cancel) {
        fnError();
      }
    });
  }


  handleResponse(res){
    if(res.StatusCode == 1){
      this.ok(res.Message);
    }
    else if(res.StatusCode == 0){
      this.warning(res.Message);
    }
    else if(res.StatusCode == -1){  
      this.err(res.Message);
    }
    return res.StatusCode > 0;
  }
}
