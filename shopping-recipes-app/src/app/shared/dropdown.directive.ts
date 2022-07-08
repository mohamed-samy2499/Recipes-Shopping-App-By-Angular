import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs:'appDropDown'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') isOpen = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
  }

  @HostListener('click') clicked(eventData: Event)
  {
    this.isOpen = !this.isOpen;
    // if(this.isOpen)
    // {
    //     this.renderer.addClass(this.elementRef.nativeElement,'open');
    // }
    // else
    // {
    //   this.renderer.addClass(this.elementRef.nativeElement,'open');

    // }
  }

}
