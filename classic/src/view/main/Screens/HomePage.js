Ext.define('TaskTwoApp.view.main.Screens.HomePage', {
    extend: 'Ext.container.Container',
    xtype: 'homepage',
    layout: 'vbox',
    style: {
        backgroundColor: '#ADEFD1FF',
        padding: '20px'
    },

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.plugin.RowEditing',
        'Ext.toolbar.Paging',
        'Ext.form.field.Text',
        'TaskTwoApp.store.Employees'
    ],

    initComponent: function () {
        var me = this;

        // Create the employee store
        var employeeStore = Ext.create('TaskTwoApp.store.Employees');

        // Create an empty TreeStore
        var treeStore = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: []
            }
        });

        // After loading the employeeStore
        employeeStore.load({
            callback: function (records, operation, success) {
                try {
                    if (success) {
                        var treeData = [];
                        var projects = {};
        
                        Ext.Array.each(records, function (record) {
                            var project = record.get('project');
                            if (!projects[project]) {
                                projects[project] = {
                                    text: project,
                                    expanded: true,
                                    children: []
                                };
                                treeData.push(projects[project]);
                            }
                            projects[project].children.push({
                                text: record.get('name'),
                                leaf: true
                            });
                        });
        
                        treeStore.setRoot({
                            expanded: true,
                            children: treeData
                        });
                    } else {
                        Ext.Msg.alert('Error', 'Failed to load employee data.');
                    }
                } catch (error) {
                    Ext.Msg.alert('Exception', 'An error occurred: ' + error.message);
                    console.error('Error in employeeStore load callback:', error);
                }
            }
        });
        
        


        me.items = [
            // Header with Logout button
            {
                xtype: 'container',
                layout: { type: 'hbox', align: 'middle', pack: 'space-between' },
                width: '100%',
                height: 60,
                padding: '0 10 10 10',
                items: [
                    {
                        xtype: 'component',
                        html: '<h1 style="margin: 0; color: #02326A;">Welcome To Deepak Inventory Store</h1>',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        text: 'Log Out',
                        style: {
                            backgroundColor: '#02326A',
                            color: '#ADEFD1FF',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        },
                        listeners: {
                            mouseover: function (btn) {
                                btn.getEl().setStyle('backgroundColor', '#035397');
                            },
                            mouseout: function (btn) {
                                btn.getEl().setStyle('backgroundColor', '#02326A');
                            },
                            click: function () {
                                Ext.Msg.confirm('Confirm Logout', 'Are you sure you want to log out?', function (choice) {
                                    if (choice === 'yes') {
                                        localStorage.removeItem('username');
                                        localStorage.removeItem('password');
                                        Ext.getBody().dom.innerHTML = '';
                                        Ext.defer(function () {
                                            Ext.app.Application.instance.setMainView('TaskTwoApp.view.main.Screens.Login');
                                        }, 50);
                                    }
                                });
                            }
                        }
                    }
                ]
            },

            // Tab Panel with Tree Panel and Grid
            {
                xtype: 'tabpanel',
                reference: 'mainTabs',
                flex: 1,
                width: '100%',
                activeTab: 0,
                style: {
                    backgroundColor: '#02326A',
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
                },
                tabBar: {
                    style: {
                        backgroundColor: '#02326A',
                        borderRadius: '12px 12px 0 0'
                    }
                },
                defaults: {
                    padding: 20,
                    style: {
                        backgroundColor: '#ffffff',
                        borderRadius: '0 0 12px 12px',
                        color: '#02326A'
                    }
                },
                items: [
                    {
                        title: 'Tree Panel',
                        xtype: 'panel',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'textfield',
                                emptyText: 'Search employees...',
                                margin: '0 0 10 0',
                                listeners: {
                                    change: function (field, newVal) {
                                        var filterVal = newVal.toLowerCase();
                                        var rootNode = treeStore.getRoot();
                                        rootNode.cascadeBy(function (node) {
                                            if (!node.isRoot()) {
                                                var isMatch = node.get('text').toLowerCase().includes(filterVal);
                                                node.set('visible', isMatch);
                                                if (isMatch) {
                                                    node.bubble(function (parent) {
                                                        if (!parent.isRoot()) {
                                                            parent.expand();
                                                            parent.set('visible', true);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                xtype: 'treepanel',
                                store: treeStore,
                                rootVisible: false,
                                flex: 1,
                                width: '100%',
                                columns: [
                                    {
                                        xtype: 'treecolumn',
                                        text: 'Project / Employee',
                                        dataIndex: 'text',
                                        flex: 1
                                    }
                                ],
                                listeners: {
                                    beforeitemexpand: function (node) {
                                        node.set('visible', true);
                                    }
                                },
                                viewConfig: {
                                    getRowClass: function (record) {
                                        return record.get('visible') === false ? 'x-hidden-display' : '';
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: 'Grid Panel',
                        xtype: 'gridpanel',
                        store: {
                            type: 'Employees'
                        },
                        columns: [
                            { text: 'Name', dataIndex: 'name', flex: 1 },
                            { text: 'Email', dataIndex: 'email', flex: 1 },
                            { text: 'Project', dataIndex: 'project', flex: 1 },
                            { text: 'Phone', dataIndex: 'phone', flex: 1 }
                        ]
                    }
                ]
            }
        ];

        me.callParent(arguments);
    }
});
