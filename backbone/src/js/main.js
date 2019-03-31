var IssueModel = BaseModel.extend({
  objectClass: 'list'
})
var IssueCollection = BaseCollection.extend({
  model: IssueModel
})
var IssueItemView = Backbone.View.extend({
  _template: _.template($('#issue-item-view').html()),
  tagName: 'a',
  className: 'list-group-item',
  events: {
    "click .del-hook": "delItem"
  },
  delItem: function (e) {
    e.preventDefault();
    this.model.destroy();
  },
  initialize: function () {
    this.listenTo(this.model, 'destroy', this.remove)
    this.listenTo(this.model, 'change', this.render)
  },
  attributes: {
    href: '#'
  },
  render: function () {
    var json = this.model.toJSON()
    this.$el.html(this._template(json))
    this.$el.attr("href", "#issue/" + json.id)
    return this;
  }
})
var IssueCollectionView = BaseCollectionView.extend({
  subView: IssueItemView,
  initialize: function () {
    this._initialize()
  },
  // render:function(){
  //   console.log(this.collection)
  // }
})
var PageIssueList = BasePage.extend({
  el: '#page-issue-list',
  initialize: function () {
    this.IssueCollection = new IssueCollection()
    this.IssueCollectionView = new IssueCollectionView({
      collection: this.IssueCollection,
      el: "#issue-list"
    })

    this.IssueCollection.fetch({
      reset: true
    })
  }
})
var PageIssueCreate = BasePage.extend({
  el: '#page-issue-create',
  events: {
    "click #btn-save": "doSave"
  },
  doSave: function (e) {
    // e.preventDefault();
    var _this = this;
    var _title = this.$el.find("#title").val()
    var _des = this.$el.find("#des").val()
    // var newIssue = new IssueModel({
    //   title: _title,
    //   des: _des,
    // })
    // _this.router.PageIssueList.IssueCollection.create(newIssue, {
    //   wait: true
    // })
    // _this.router.navigate('', {
    //   trigger: true
    // })

    var newIssue = new IssueModel()
    newIssue.save({
      title: _title,
      des: _des,
    }, {
      success: function (model, data) {
        if (data.code === 1) {
          _this.router.navigate('', {
            trigger: true
          })
          _this.router.PageIssueList.IssueCollection.add(model)
        } else {
          alert(data.success)
        }
      }
    });

  },
  initialize: function (options) {
    this.router = options.router
  }
})
var PageIssueEdit = BasePage.extend({
  el: '#page-issue-edit',
  events: {
    "click #do-save": "doSave"
  },
  doSave: function (e) {
    e.preventDefault();
    var _title = this.$el.find('#edit-title').val()
    var _des = this.$el.find('#edit-des').val()
    this.model.set({
      title:_title,
      des:_des
    })
    this.model.save();
    this.router.navigate('', {
      trigger: true
    })
  },
  show: function (issue) {
    if (issue) {
      this.model = issue;
      this.render()
      this.$el.show()
    }
  },
  render: function () {
    this.$el.find('#edit-title').val(this.model.get('title'))
    this.$el.find('#edit-des').val(this.model.get('des'))
    return this;
  },
  initialize:function(options){
    this.router=options.router
  }
})
var AppRouter = Backbone.Router.extend({
  initialize: function () {
    this.PageIssueList = new PageIssueList()
    this.PageIssueCreate = new PageIssueCreate({
      router: this
    })
    this.PageIssueEdit = new PageIssueEdit({
      router:this
    })
  },
  routes: {
    "issue/new": 'issueCreate',
    'issue/:id': 'issueEdit',
    '': 'issueList'
  },
  issueEdit(id) {

    this.hideAllPages()
    var issue = this.PageIssueList.IssueCollection.find(function (model) {
      return model.id == id
    })
    console.log(id)
    console.log(issue)
    this.PageIssueEdit.show(issue)
  },
  issueCreate() {
    console.log('creat')
    this.hideAllPages()
    this.PageIssueCreate.show()
  },
  issueList() {
    this.hideAllPages()
    this.PageIssueList.show()
  },
  hideAllPages() {
    this.PageIssueEdit.hide()
    this.PageIssueCreate.hide()
    this.PageIssueList.hide()
  }
})
new AppRouter()
Backbone.history.start()