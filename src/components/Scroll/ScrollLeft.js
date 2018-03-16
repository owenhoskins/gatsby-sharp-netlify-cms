import ReactDOM from 'react-dom'
//import scrollDoc from 'scroll-doc'
//const page = scrollDoc()

function calculateScrollOffset(element, offset, alignment) {

  const page = document.querySelectorAll('.overflow-touch')[0]

  var elementRect = element.getBoundingClientRect();
  var clientWidth = page.offsetWidth;
  var documentWidth = Math.max( page.scrollWidth, page.offsetWidth );
  offset = offset || 0; // additional offset to top
  const scrollPosition = elementRect.left;
  var maxScrollPosition = documentWidth - clientWidth;
  return Math.min(scrollPosition + offset + page.scrollLeft,
                  maxScrollPosition);
}

export default function (ref, options, callback) {
  options = options || {
    offset: 0,
    align: 'middle'
  };
  var element = ReactDOM.findDOMNode(ref);
  if (element === null) return 0;

  const page = document.querySelectorAll('.overflow-touch')
  console.log('overflow-touch: ', page, page[0])
  return page[0].scrollLeft = calculateScrollOffset(element, options.offset)

  //return scroll.left(page, calculateScrollOffset(element, options.offset, options.align), options, callback);
};