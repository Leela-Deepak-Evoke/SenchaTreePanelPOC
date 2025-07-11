Ext.define('TaskTwoApp.store.Employees',{
    extend:'Ext.data.Store',
    alias:'store.Employees',
    model:'TaskTwoApp.model.Employee',
    storeId:'Employees',
    autoLoad:true,
    proxy:{
        type:'ajax',
        url:'http://localhost:3000/employees/all-emp',
        reader:{
            type:'json',
            rootProperty:'employees'
        }
    }
});