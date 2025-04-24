Ext.define('TaskTwoApp.view.main.Screens.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',

    data: {
        formData: {
            email: '',
            password: ''
        },
        loginText: 'Log In'
    }
});