Ext.define('TaskTwoApp.view.main.Screens.Login', {
    extend: 'Ext.container.Container',
    xtype: 'login',
    controller: 'login',
    viewModel: {
        type: 'login'
    },
    layout: 'center',
    renderTo: Ext.getBody(),

    style: {
        background: '#ADEFD1FF'
    },

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            width: '90%',
            maxWidth: 1200,
            style: {
                background: '#02326A',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                padding: '40px'
            },
            items: [

                {
                    xtype: 'component',
                    flex: 1,
                    html: `
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <img src="resources/images/store.png" 
                                alt="Login Illustration" 
                                style="width: 100%; max-width: 550px; height: 420px; object-fit: cover; border-radius: 20px;">
                        </div>
                    `
                },

                {
                    xtype: 'container',
                    layout: 'vbox',
                    width: 450,
                    style: {
                        marginLeft: '40px',
                        backgroundColor: '#ADEFD1FF',
                        borderRadius: '16px',
                    },
                    items: [
                        {
                            xtype: 'form',
                            reference: 'loginForm',
                            bodyPadding: 20,
                            width: '100%',
                            
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                xtype: 'textfield',
                                labelAlign: 'top',
                                allowBlank: false,
                                msgTarget: 'side',
                                padding: '10 0',
                                bind: '{formData}',
                                fieldStyle: {
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '15px',
                                    backgroundColor: '#f9f9f9',
                                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                                },
                                labelStyle: 'font-weight: bold; font-size: 14px; color: #02326A;'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'image',
                                            src: 'resources/images/logo.png',
                                            width: 84,
                                            height: 84,
                                            style: {
                                                objectFit: 'cover',
                                                borderRadius: '20px'
                                            }
                                        },
                                        {
                                            xtype: 'component',
                                            html: '<h2 style="color: #02326A; margin-top: 20px;">Login To Deepak Store</h2>'
                                        }
                                    ]
                                },                                                               
                                {
                                    name: 'email',
                                    inputType: 'email',
                                    fieldLabel: 'Email',
                                    vtype: 'email',
                                    bind: '{formData.email}',
                                    emptyText: 'Enter your email'
                                },
                                {
                                    name: 'password',
                                    inputType: 'password',
                                    fieldLabel: 'Password',
                                    bind: '{formData.password}',
                                    emptyText: 'Enter your password'
                                },
                                {
                                    xtype: 'button',
                                    bind: {
                                        text: '{loginText}'
                                    },
                                    margin: '20 0 0 0',
                                    style: {
                                        backgroundColor: '#1976D2',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    },
                                    listeners: {
                                        mouseover: function (btn) {
                                            btn.getEl().setStyle('transform', 'scale(1.02)');
                                        },
                                        mouseout: function (btn) {
                                            btn.getEl().setStyle('transform', 'scale(1)');
                                        }
                                    },
                                    handler: 'onLoginClick'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
