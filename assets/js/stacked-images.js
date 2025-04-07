export const UTILS = {
  isNumber: (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
};

export class SlidesModule {
  constructor() {
    this.sections = document.querySelectorAll('.slyde');
    this.KEYS = {
      RIGHT: 39,
      LEFT: 37
    };
    this.init();
  }

  init = () => {
    this.moduleListeners();
  };

  getSlideIndex = () => {
    return Array.from(this.sections).findIndex(section => 
      section.classList.contains('active')
    );
  };

  nextSlide = () => {
    const nextIndex = this.getSlideIndex() + 1;
    const activeSlide = document.querySelector('.active');
    const len = this.sections.length;

    if (UTILS.isNumber(nextIndex) && nextIndex <= len) {
      activeSlide?.classList.add('leave');
      activeSlide?.classList.remove('active');

      if (nextIndex < len) {
        this.sections[nextIndex].classList.add('active');
      }
    }
  };

  previousSlide = () => {
    let previousIndex = this.getSlideIndex() - 1;
    const activeSlide = document.querySelector('.active');
    
    if (!activeSlide) {
      previousIndex = this.sections.length - 1;
    }

    if (UTILS.isNumber(previousIndex) && previousIndex > -1) {
      this.sections[previousIndex].classList.add('active');
      this.sections[previousIndex].classList.remove('leave');
      
      activeSlide?.classList.remove('active');
    }
  };

  moduleListeners = () => {
    Array.from(this.sections).forEach(this.sectionsHandler);
    document.querySelector('.reload-button')?.addEventListener('click', this.resetHandler);
  };

  sectionsHandler = (section) => {
    section.addEventListener('click', this.nextSlide);
  };

  resetHandler = () => {
    Array.from(this.sections).reverse().forEach(section => {
      section.classList.remove('leave');
      section.scrollTop = 0;
    });
    this.sections[0].classList.add('active');
  };
}

// Initialize
new SlidesModule();