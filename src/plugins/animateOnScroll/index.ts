import ScrollAnimate from "./scroll-animate";

export default {
  install: (app, options) => {
    app.directive('animate-onscroll', {
      mounted(el, binding) {
        const scrollAnimate = ScrollAnimate()
        const params = binding.value;
        const useParent = el.parentNode.childNodes.length == 1
        const offset = parseInt(el.dataset.animateOnscrollOffset || 0);
        let previousClassName = el.className
        let lastScrollTop = window.scrollY
        previousClassName = previousClassName.replace((params.in || params),'').replace(params.out,'');
        window.addEventListener('scroll', function() {
          let scrollTop = window.scrollY || document.documentElement.scrollTop
          const isUpwards = scrollTop < lastScrollTop
          scrollAnimate.run(el, binding, {useParent, offset, isUpwards, previousClassName})
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        }, false)
      }
    })
  }
}
