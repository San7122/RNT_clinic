import '@testing-library/jest-dom';

// IntersectionObserver is not available in jsdom — mock it as a class
class IntersectionObserverMock {
  constructor(cb) {
    this._cb = cb;
  }
  observe(el) {
    this._cb([{ isIntersecting: true, target: el }]);
  }
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserverMock;
window.HTMLElement.prototype.scrollIntoView = () => {};
