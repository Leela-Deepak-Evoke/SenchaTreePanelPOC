Ext.define('TaskTwoApp.model.Employee', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'project', type: 'string' },
        { name: 'phone', type: 'int' }
    ]
});