import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('nextSection') nextSection!: ElementRef;
  translateYValue = 0;

  constructor() {
  }

  ngOnInit(): void {
    // console.log('Component initialized');
    // if (this.loadNextElements) {
    //   console.log('loadNextElements:', this.loadNextElements.nativeElement);
    //   this.loadNextElements.nativeElement.addEventListener('click', (event: Event) => {
    //     event.preventDefault(); 
    //     console.log('Link clicked');
    //     const nextElements = document.getElementById('nextElements');
    //     if (nextElements) {
    //       console.log('nextElements:', nextElements);
    //       nextElements.style.display = 'block'; 
    //       window.scrollTo({ top: nextElements.offsetTop, behavior: 'smooth' }); 
    //     }
    //   });
    // } 
  }
  
  scrollToNextSection() {
  this.nextSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

