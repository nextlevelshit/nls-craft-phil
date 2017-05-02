'use strict'

module.exports = function(dom) {

  $('#gallery').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var title = button.data('gallery')
    var src = button.data('src')
    var modal = $(this)
    var image = modal.find('.modal-image')

    modal.find('.modal-title').text(title)
    image.attr('src', src)
    image.click(function(event) {
      navigate(title, src).next()
    })
  })

  $('#gallery').on('hidden.bs.modal', function(event) {
    var modal = $(this)
    var image = modal.find('.modal-image')
    image.unbind('click')
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
          var prevNum = (list.hasOwnProperty(key - 1)) ? key - 1 : list.length

          break
        }
      }
    }

    return {
      next: function () {
        console.log('show next ' + $(list[nextNum]).data('src'))
      },
      prev: function () {
        console.log('show prev ' + $(list[prevNum]).data('src'))
      }
    }
  }

  return {}
}
