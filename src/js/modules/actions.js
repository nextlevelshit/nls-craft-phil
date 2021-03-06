'use strict'

module.exports = function(dom) {

  $('#gallery').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var title = button.data('gallery')
    var src = button.data('src')
    var modal = $(this)
    var image = modal.find('.modal-image')

    var setCurrentImage = function(newImage) {
      var newSrc = (newImage) ? newImage.src : src
      var newTitle = (newImage) ? newImage.title : title
      var galleryEl = $('[data-gallery="' + newTitle + '"]')
      var galleryTotal = galleryEl.length
      var galleryCurrent = 1
      var titleSuffix = ''

      for (var i = 0; i < galleryTotal; i++) {
        if ($(galleryEl[i]).data('src') == newSrc) {
          var n = i + 1
          titleSuffix = '(' + n + '/' + galleryTotal + ')'
          break
        }
      }

      modal.find('.modal-title').text(title + ' ' + titleSuffix)
      image.attr('src', newSrc)
      src = newSrc
    }

    var showNext = function() {
      setCurrentImage(navigate(src).next)
    }

    var showPrev = function() {
      setCurrentImage(navigate(src).prev)
    }

    setCurrentImage()

    modal.find('.modal-image-next').click(function(event) {
      showNext();
    })

    modal.find('.modal-image-prev').click(function(event) {
      showPrev();
    })

    $('body').keydown(function(e) {
      // left arrow
      if ((e.keyCode || e.which) == 37) {
        showPrev()
      }
      // right arrow
      if ((e.keyCode || e.which) == 39) {
        showNext()
      }
    })
  })

  $('#gallery').on('hidden.bs.modal', function(event) {
    $(this).find('.modal-image').unbind('click')
  })

  $('#gallery').on('show.bs.modal', function(event) {
    console.log('test')
    $(this).css({display: 'flex'});
  })

  // $('#gallery').on('hide.bs.modal', function(event) {
  //   $(this).css({display: 'flex'});
  // })

  $('#gallery').on('shown.bs.modal', function(event) {
    $(this).css({display: 'flex'});
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
      next: {
        src: $(list[nextNum]).data('src'),
        title: $(list[nextNum]).data('gallery')
      },
      prev: {
        src: $(list[prevNum]).data('src'),
        title: $(list[prevNum]).data('gallery')
      }
    }
  }

  return {}
}
