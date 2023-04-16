import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[error-msg]',
})
export class ErrorMsgDirective implements OnInit {
  constructor() {
    console.log('constructor directiva');
  }
  ngOnInit(): void {
    console.log('ngOnInit directiva');
  }
}
