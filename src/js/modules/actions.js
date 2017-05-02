'use strict'

module.exports = function(dom) {

  $('#gallery').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var title = button.data('gallery')
    var src = button.data('src')
    var modal = $(this)
    var image = modal.find('.modal-image')

    var setImage = function(newSrc) {
      image.attr('src', newSrc)
      src = newSrc
    }

    var setTitle = function(newTitle) {
      modal.find('.modal-title').text(newTitle)
    }

    setTitle(title)
    setImage(src)

    modal.find('.modal-image-next').click(function(event) {
      setImage(navigate(src).next().src)
      setTitle(navigate(src).next().title)
    })

    modal.find('.modal-image-prev').click(function(event) {
      setImage(navigate(src).prev().src)
      setTitle(navigate(src).prev().title)
    })
  })

  $('#gallery').on('hidden.bs.modal', function(event) {
    $(this).find('.modal-image').unbind('click')
  })

  var navigate = function(src) {
    var list = $('[data-gallery]')
    var current = $('[data-gallery][data-src="' + src + '"]')[0]

    for (var key in list) {
      if (list.hasOwnProperty(key)) {
        if (list[key] === current) {
          // parse key to integer to calculate next and previouse items order
          key = parseInt(key)
          var nextNum = (list.hasOwnProperty(key + 1)) ? key + 1 : 0
          var prevNum = (list.hasOwnProperty(key - 1)) ? key - 1 : list.length - 1

          break
        }
      }
    }

    return {
      next: function() {
        return {
          src: $(list[nextNum]).data('src'),
          title: $(list[nextNum]).data('gallery')
        }
      },
      prev: function() {
        return {
          src: $(list[prevNum]).data('src'),
          title: $(list[prevNum]).data('gallery')
        }
      }
    }
  }

  return {}
}
