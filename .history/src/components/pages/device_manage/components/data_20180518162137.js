export const deviceManageData = [
    {
        devicecode: "09920403290",
        devicetype: 'JT1-CZ2000',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "835929521421",
        devicetype: 'JT1-CZ2000',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "29741912752",
        devicetype: 'JT2-XX333',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "3757828621841",
        devicetype: 'JT1-CZ2000',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "810248072124",
        devicetype: 'JT1-CZ2000',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "082057291311",
        devicetype: 'JT2-XX333',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "375871984201",
        devicetype: 'JT3-SAF111',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "923597917241",
        devicetype: 'JT1-CZ2000',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    },
    {
        devicecode: "7329579691624",
        devicetype: 'JT3-SAF111',
        devicekind: '一体化主机',
        firstusedate: "2018-01-01 00:00:00",
        devicestatus: "入所",
        traintypeid: 'HXD1',
        trainid: '1234',
        parentid: '22222222'
    }
]

export const deviceManageTree = [
    {
        
        value: '电脑',
        model: {
            typeid: 'ssssssss'
        },
        children: [
            {
                
                value: '鼠标',
                model: {
                    typeid: 'sdgds221'
                },
                children: []
            },
            {
                
                value: '键盘',
                model: {
                    typeid: '24s1231'
                },
                children: []
            }
        ]
    }
]

export const deviceTypeData = [
    {
        typeValue: 'JT1-CZ2000'
    },
    {
        typeValue: 'JT2-XX333'
    },
    {
        typeValue: 'JT3-SAF111'
    }
]

const tableData = {
    deviceManageData: deviceManageData,
    deviceManageTree: deviceManageTree,
    deviceTypeData: deviceTypeData
}

export default tableData