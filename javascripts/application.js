$(function() {
  getValues();
  $('#section').css({'padding-bottom': footerHeight + 'px'});

  // Схема проезда
  $(".map-road").click(function() {
    $(".map-road").removeClass("current");
    $(this).addClass("current");
  });

  // Calc
  var PriceItem = Backbone.Model.extend({
    defaults: {
      quantity: 0
    },

    getTotalPrice: function() {
      return this.get('price') * this.get('quantity');
    }
  });

  var PriceItems = Backbone.Collection.extend({
    model: PriceItem,

    getGrandTotal: function() {
      return this.reduce(function(memo, e) {
        return memo + e.getTotalPrice();
      }, 0);
    }
  });

  var PriceItemVIew = Backbone.View.extend({
    tagName: 'tr',
    events: {
      'change select' : 'updateQuantity'
    },

    initialize: function() {
      this.model.on('change:quantity', this.render.bind(this));
    },

    updateQuantity: function(e) {
      var 
        qty = parseInt($(e.target).find(':selected').val());

        this.model.set('quantity', qty);
    },

    render: function() {
      if (this.model.hasChanged('quantity')) {
        this.$el.find('.totalPrice').find('strong').text(this.model.getTotalPrice().formatMoney());
      }
    }
  });

  var priceItems = (new PriceItems);

  $(".event-registration").find('tr').each(function() {
    var price = $(this).attr('data-price');
    if (price) {
      var model = (new PriceItem);
      model.set('price', parseInt(price));

      priceItems.add([model]);

      var view = new PriceItemVIew({model: model});
      view.setElement(this);
    }
  });

  priceItems.on('change:quantity', function() {
    $('#grandTotal').text(priceItems.getGrandTotal().formatMoney());
  });

});

$(window).load(function() {

});

function getValues() {
  footerHeight = $('#footer').outerHeight();
}

Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = c == undefined ? 0 : isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? " " : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};