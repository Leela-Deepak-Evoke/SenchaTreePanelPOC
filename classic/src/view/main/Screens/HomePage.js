Ext.define('TaskTwoApp.view.main.Screens.HomePage', {
    extend: 'Ext.container.Container',
    xtype: 'homepage',
    layout: 'vbox',
    style: {
        backgroundColor: '#ADEFD1FF',
        padding: '20px'
    },

    initComponent: function () {
        const inventoryArray = [
            { productName: "Deepak's Widget", category: "Flutter Development Tools", quantity: 50, price: 29.99, supplier: "BMS", productID: 5466 },
            { productName: "Krishna Jahnavi's Widget", category: "Oracle Development Tools", quantity: 40, price: 35.50, supplier: "BMS", productID: 5469 },
            { productName: "Katy's Widget", category: "UiPath Development Tools", quantity: 60, price: 27.75, supplier: "Axalta", productID: 5460 },
            { productName: "Lochan's Widget", category: "Unreal Engine Development Tools", quantity: 30, price: 45.00, supplier: "Axalta", productID: 5462 },
            { productName: "Manikyam's Widget", category: "Flutter Development Tools", quantity: 55, price: 28.20, supplier: "Axalta", productID: 5463 },
            { productName: "Balaraju's Widget", category: "Oracle Development Tools", quantity: 70, price: 33.40, supplier: "BMS", productID: 5464 },
            { productName: "Vikas's Widget", category: "UiPath Development Tools", quantity: 80, price: 25.90, supplier: "Axalta", productID: 5461 },
            { productName: "Jessie's Widget", category: "Flutter Development Tools", quantity: 80, price: 25.90, supplier: "BMS", productID: 5467 },
            { productName: "Rajpal's Widget", category: "Unreal Engine Development Tools", quantity: 80, price: 25.90, supplier: "Axalta", productID: 5123 },
            { productName: "Kajal's Widget", category: "Oracle Development Tools", quantity: 80, price: 25.90, supplier: "BMS", productID: 5461 }
        ];

        
        const grouped = {};

        inventoryArray.forEach(item => {
            if (!grouped[item.category]) grouped[item.category] = [];
            grouped[item.category].push({
                text: `${item.productName} (ID: ${item.productID})`,
                leaf: true
            });
        });

        const children = Object.entries(grouped).map(([category, items]) => ({
            text: category,
            expanded: true,
            children: items
        }));

        const treeStore = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children
            }
        });

        this.items = [
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
                                        Ext.defer(() => {
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
                                emptyText: 'Search products...',
                                margin: '0 0 10 0',
                                listeners: {
                                    change: function (field, newVal) {
                                        const filterVal = newVal.toLowerCase();
                                        const rootNode = treeStore.getRoot();
                                        rootNode.cascadeBy(function (node) {
                                            if (!node.isRoot()) {
                                                const isMatch = node.get('text').toLowerCase().includes(filterVal);
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
                            fields: ['productName', 'category', 'quantity', 'price', 'supplier', 'productID'],
                            data: inventoryArray
                        },
                        columns: [
                            { text: 'Product Name', dataIndex: 'productName', flex: 1 },
                            { text: 'Category', dataIndex: 'category', flex: 1 },
                            { text: 'Quantity', dataIndex: 'quantity', flex: 1 },
                            { text: 'Price', dataIndex: 'price', flex: 1 },
                            { text: 'Supplier', dataIndex: 'supplier', flex: 1 },
                            { text: 'Product ID', dataIndex: 'productID', flex: 1 }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
