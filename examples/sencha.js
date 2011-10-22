require("node-extjs");

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'age',   type: 'int'},
        {name: 'phone', type: 'string'}
    ],

    changeName: function() {
        var oldName = this.get('name'),
            newName = oldName + " The Barbarian";

        this.set('name', newName);
    }
});

var user = Ext.create('User', {
    name : 'Conan',
    age  : 24,
    phone: '555-555-5555'
});

user.changeName();

console.log(user.get('name'));
