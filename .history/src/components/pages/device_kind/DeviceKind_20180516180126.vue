<template>
    <div style="background-color:#eee">
        <Tree :data="data5" :render="renderContent"></Tree>    
    </div>
</template>

<script>
  export default {
    name: "device-kind",
    data: function() {
      return {
        title: '设备种类',
        nodename: 'test node',
        currentNodeData: null,
        data5: [
            {
                title: '设备种类',
                expand: true,
                selected: true,
                render: (h, { root, node, data }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-folder-outline'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', {
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => { this.clickLeaf(data)}
                                }
                            },data.title)
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-plus-empty',
                                    type: 'success'
                                }),
                                style: {
                                    width: '52px'
                                },
                                on: {
                                    click: () => { this.append(data) }
                                }
                            })
                        ])
                    ]);
                },
                children: []
            }
        ],
        buttonProps: {
            type: 'ghost',
            size: 'small',
        }
      }
    },
    methods: {
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', {
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => { this.clickLeaf(data)}
                        }
                    }, data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty',
                            type: 'success'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty',
                            type: 'success'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            this.currentNodeData = data
            this.ok()
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        clickLeaf (data) {
            // alert(data.title)
        },
        ok () {
            const children = this.currentNodeData.children || [];
            let nodeTitle = this.nodename
            children.push({
                title: nodeTitle,
                selected: true,
                expand: true
            });
            this.$set(this.currentNodeData, 'children', children);
        },
        cancel () {
            
        },
        handleSelect (ary) {
            alert(ary.lengtj)
        }
    }
  }
</script>

<style scoped>
</style>
