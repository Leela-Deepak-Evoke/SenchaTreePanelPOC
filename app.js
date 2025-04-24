/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'TaskTwoApp.Application',

    name: 'TaskTwoApp',

   

    requires: [
        // This will automatically load all classes in the TaskTwoApp namespace
        // so that application classes do not need to require each other.
        'TaskTwoApp.*'
    ],

    launch: function () {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');

        // Check if both values exist
        if (savedUsername && savedPassword) {
            // Load HomePage directly
            Ext.create('TaskTwoApp.view.main.Screens.HomePage', {
                renderTo: Ext.getBody()
            });
        } else {
            // Load Login Screen
            const currentView = Ext.app.Application.instance.getMainView();
            if (currentView) {
                currentView.destroy();
            }
            Ext.app.Application.instance.setMainView('TaskTwoApp.view.main.Screens.Login');
        }
    }

    
});
