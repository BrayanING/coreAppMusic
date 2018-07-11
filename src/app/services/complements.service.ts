import { Injectable } from '@angular/core';
declare var $: any;
@Injectable()
export class ComplementsService {
  constructor() {}

  message(models: string, query: string, type: string) {
    swal('APPTEST', `${models} se ha ${query} correctamente`, type);
  }

  plugin() {
    $(document).ready(function() {
      $('.input-field label').addClass('active');
    });
  }
}
