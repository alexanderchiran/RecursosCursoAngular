import { Directive, Renderer2, OnInit, ElementRef, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  //constructor(private elRef: ElementRef,private renderer: Renderer2) { }
  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'magenta';
 // @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string=this.defaultColor;

  ngOnInit(){
    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'pink');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
     //this.backgroundColor = 'orange';
     this.backgroundColor = this.highlightColor;
     //this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    //this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
    //this.backgroundColor = this.defaultColor;
  }

}
