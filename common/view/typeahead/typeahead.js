define("Typeahead", function(require, exports, module) {
    var $ = require('jquery');
    var app = require('app');
    
    var Typeahead = app.ViewBase.extend({
      module: module,
      init: function(options){
        this.defaults = {
            source: [],
            items: 8,
            menu: '<ul class="g-menu typeahead" style="display:none"></ul>',
            item: '<li><a href="#"></a></li>',
            wrapper:"body",
            css:{
                top:0,
                left:0,
                width:"100%"
            }
        }
        this.options = $.extend({}, this.defaults, options)
        this.$element = $(this.options.targetElement)
        this.matcher = this.options.matcher || this.matcher
        this.sorter = this.options.sorter || this.sorter
        this.highlighter = this.options.highlighter || this.highlighter
        this.updater = this.options.updater || this.updater
        this.wrapper = this.options.wrapper || this.wrapper
        this.css = this.options.css || this.css
        if (this.wrapper.find(".g-menu")){
          this.wrapper.find(".g-menu").remove()
        }
        this.$menu = $(this.options.menu).appendTo(this.wrapper)
        this.source = this.options.source
        this.callback = this.options.callback
        this.shown = false
        this.isInput = true
        this.listen()
      },

      select: function () {
          var val = this.$menu.find('.active').attr('data-value')
          if (val){
            this.$element
              .val(this.updater(val))
              .change()
            this.callback&&this.callback(this.$menu.find('.active').attr("id"))
          }
          return this.hide()
        },

        updater: function (item) {
          return item
        },

        show: function () {
          var pos = $.extend({}, this.$element.offset(), {
            height: this.$element[0].offsetHeight
          })
          // {
          //   top: 20 //pos.top + pos.height
          // , left: 0 //pos.left
          // , position:"absolute"
          // , width:"100%"
          // }
          this.$menu.css(this.css)

          this.$menu.show()
          this.shown = true
          return this
        },

        hide: function () {
          this.$menu.hide()
          this.shown = false
          return this
        },

        lookup: function (event) {
          var that = this
            , items
            , q

          this.query = this.$element.val().trim()

          if (!this.query) {
            return this.shown ? this.hide() : this
          }

          items = $.grep(this.source, function (item) {
            return that.matcher(item)
          })

          items = this.sorter(items)

          if (!items.length) {
            return this.shown ? this.hide() : this
          }

          return this.render(items.slice(0, this.options.items)).show()
        },

        matcher: function (item) {
          return ~item.toLowerCase().indexOf(this.query.toLowerCase())
        },

        sorter: function (items) {
          var beginswith = []
            , caseSensitive = []
            , caseInsensitive = []
            , item

          while (item = items.shift()) {
            if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
            else if (~item.indexOf(this.query)) caseSensitive.push(item)
            else caseInsensitive.push(item)
          }

          return beginswith.concat(caseSensitive, caseInsensitive)
        },

        highlighter: function (item) {
          var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
          return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
            return '<strong>' + match + '</strong>'
          })
        },

        render: function (items) {
          var that = this

          items = $(items).map(function (i, item) {
            var s = item.split("!")[0];
            var id= item.split("!")[1];
            i = $(that.options.item).attr({
              'data-value':s,
              "id":id
            });

            var matchHTML = that.highlighter(s)
            var query = that.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
            var temp = s.match(/[^"]+/g);
            temp = temp[temp.length - 1].match(/\d+/g)[0];
            if (temp === query){
              that.$menu.attr("match-value", s)
            } else {
              that.$menu.removeAttr("match-value", s)
            }
            i.find('a').html(matchHTML)
            return i[0]
          })

          //items.first().addClass('active')
          this.$menu.html(items)
          return this
        },

        next: function (event) {
          var active = this.$menu.find('.active').removeClass('active')
            , next = active.next()
          if (!next.length && this.isInput == true) {
            next = $(this.$menu.find('li')[0])
            this.isInput = false
          } else if (!next.length && this.isInput == false){
            this.isInput = true
            this.$menu.find('.active').removeClass('active')
            return
          }
          next.addClass('active')
        },

        prev: function (event) {
          var active = this.$menu.find('.active').removeClass('active')
            , prev = active.prev()

          if (!prev.length && this.isInput == true) {
            prev = this.$menu.find('li').last()
            this.isInput = false
          } else if (!prev.length && this.isInput == false){
            this.isInput = true
            this.$menu.find('.active').removeClass('active')
            return
          }
          prev.addClass('active')
        },

        listen: function () {
          this.$element
            .on('blur',     $.proxy(this.blur, this))
            .on('keydown', $.proxy(this.keypress, this))
            .on('keyup',    $.proxy(this.keyup, this))
            //.on('textInput',    $.proxy(this.textInput, this))
          // if ($.browser.webkit || $.browser.msie) {
          //   this.$element.on('keydown', $.proxy(this.keypress, this))
          // }

          this.$menu
            .on('click', $.proxy(this.click, this))
            .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
            .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
        },

        // textInput: function (e){
        //   console.log("test");
        //   this.lookup()
        // },

        keyup: function (e) {
          switch(e.keyCode) {
            case 32:
              return false;
              break
            case 40: // down arrow
            case 38: // up arrow
              break

            case 9: // tab
            case 13: // enter
              if (!this.shown) return
              this.select()
              break

            case 27: // escape
              if (!this.shown) return
              this.hide()
              break

            default:
              this.lookup()
          }

          e.stopPropagation()
          e.preventDefault()
        },

        keypress: function (e) {
          if (!this.shown) return
          switch(e.keyCode) {
            case 32:
              return false;
              break
            case 9: // tab
            case 13: // enter
            case 27: // escape
              e.preventDefault()
              break

            case 38: // up arrow
              if (e.type != 'keydown') break
              e.preventDefault()
              this.prev()
              break

            case 40: // down arrow
              if (e.type != 'keydown') break
              e.preventDefault()
              this.next()
              break
          }

          e.stopPropagation()
        },

        blur: function (e) {
          var that = this
          setTimeout(function () { that.hide() }, 150)
        },

        click: function (e) {
          e.stopPropagation()
          e.preventDefault()
          this.select()
        },

        mouseenter: function (e) {
          this.$menu.find('.active').removeClass('active')
          $(e.currentTarget).addClass('active')
        },

        mouseleave: function (e){
          this.$menu.find('.active').removeClass('active')
          //$(e.currentTarget).addClass('active')
        }
    });

    return Typeahead;

}); 