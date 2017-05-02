'use strict'

module.exports = function(dom) {

  $('#gallery').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var title = button.data('gallery')
    var src = button.data('src')
    var modal = $(this)
    var image = modal.find('.modal-image')

    var setImage = function() {
      image.attr('src', src)
    }

    var setTitle = function() {
      modal.find('.modal-title').text(title)
    }

    setTitle()
    setImage()

    modal.find('.modal-image-next').click(function(event) {
      src = navigate(title, src).next()
      setImage()
    })

    modal.find('.modal-image-prev').click(function(event) {
      src = navigate(title, src).prev()
      setImage()
    })
  })

  $('#gallery').on('hidden.bs.modal', function(event) {
    $(this).find('.modal-image').unbind('click')
  })

  var navigate = function(title, src) {
    var list = $('[data-gallery="' + title + '"]')
    var current = $('[data-gallery="' + title + '"][data-src="' + src + '"]')[0]

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
        return $(list[nextNum]).data('src')
      },
      prev: function() {
        return $(list[prevNum]).data('src')
      }
    }
  }

  return {}
}
