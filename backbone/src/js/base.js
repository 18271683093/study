// $(document).ajaxSend(function (e, jqxhp, potions) {
//   var now = new Date();
//   jqxhp.setRequestHeader('X-LC-Id', now)
// })
var BaseModel = Backbone.Model.extend({
  idAttribute: 'id', //唯一标识
  objectClass: '',
  urlRoot: function () {
    return (
      'http://127.0.0.1:3000/api/' +
      this.objectClass
    )
  },
  toJSON(options) {
    console.log(options)
    console.log(this)
    if (options && options.onlyChanged) {
      return this.changedAttribute
    } else {
      return _.clone(this.attributes)
    }
  }
})
var BaseCollection = Backbone.Collection.extend({
  url: function () {
    return 'http://127.0.0.1:3000/api/' + this.model.prototype.objectClass
  },
  parse: function (res) {
    if (res && res.data) {
      return res.data
    }
    return res
  }
})
var BaseCollectionView = Backbone.View.extend({
  subView: null,
  _initialize: function () {
    this.listenTo(this.collection, 'reset', this.render)
    this.listenTo(this.collection, 'add', this.addOne)
    this._views = []
  },
  createsubView: function (model) {
    var viewClass = this.subView || Backbone.View
    var v = new viewClass({
      model: model
    })
    this._views.push(v)
    return v
  },
  addOne(model) {
    this.$el.append(this.createsubView(model).render().$el)
  },
  render() {
    var _this = this
    _.each(this._views, function (subview) {
      subview.remove().off()
    })
    this._views = []
    if (!this.collection) return this
    this.collection.each(function (model) {
      _this.addOne(model)
    })
  }
})
var BasePage = Backbone.View.extend({
  hide() {
    this.$el.hide()
  },
  show() {
    this.$el.show()
  }
})