Ext.define('TaskTwoApp.view.main.Controllers.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function () {
        var vm = this.getViewModel();
        var formData = vm.get('formData');

        if (!formData.email || !formData.password) {
            Ext.Msg.alert('Validation', 'Please fill in all required fields.');
            console.log("Please fill in all required fields.");
            return;
        }

        
        if (formData.email === 'admin@store.com' && formData.password === '1234') {
            localStorage.setItem('username', formData.email);
            localStorage.setItem('password', formData.password);
            this.getView().destroy();
            Ext.create({
                xtype: 'homepage',
                renderTo: Ext.getBody()
            });
        } else {
            console.log("Invalid credentials.");
        }

    }
});
