Y = require('./Yincludes');

Y({
    db: {
      name: 'memory'
    },
    connector: {
      name: 'webrtc',
      room: 'richtext-example'
    },
    share: {
      richtext: 'Richtext' // y.share.richtext is of type Y.Richtext
    }
  }).then(function (y) {
    window.yquill = y
  
    // create quill element
    window.quill = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' },
        'link-tooltip': true
      },
      theme: 'snow'
    })
    // bind quill to richtext type
    y.share.richtext.bindQuill(window.quill)
  })

  module.exports = Y;