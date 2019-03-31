var reSpiderSQL = {
    getList2:'SELECT * FROM Backbone',
    insert2: "insert into Backbone set ?",
    delete:'DELETE FROM Backbone WHERE id = ?',
    updateItem:'update  Backbone  set title = ?,des = ? WHERE id = ?'
}
module.exports = {
    'reSpiderSQL': reSpiderSQL,
};
