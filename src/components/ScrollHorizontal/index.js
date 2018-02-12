import ReactDOM from 'react-dom'
import scroll from 'scroll'
import scrollDoc from 'scroll-doc'

const page = scrollDoc()

function calculateScrollOffset(element, offset, alignment) {
  var body = document.body,
      html = document.documentElement;
  var elementRect = element.getBoundingClientRect();
  var clientWidth = html.clientWidth;
  var documentWidth = Math.max( body.scrollWidth, body.offsetWidth,
                                 html.clientWidth, html.scrollWidth, html.offsetWidth );
  offset = offset || 0; // additional offset to top
  const scrollPosition = elementRect.left;
  var maxScrollPosition = documentWidth - clientWidth;
  return Math.min(scrollPosition + offset + window.pageXOffset,
                  maxScrollPosition);
}

export default function (ref, options, callback) {
  options = options || {
    offset: 0,
    align: 'middle'
  };
  var element = ReactDOM.findDOMNode(ref);
  if (element === null) return 0;
  return page.scrollLeft = calculateScrollOffset(element, options.offset)

  //return scroll.left(page, calculateScrollOffset(element, options.offset, options.align), options, callback);
};