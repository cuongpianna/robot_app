export default {
    tools: [
        {
            id: 0,
            name: 'scada-label',
            config: {
                label: 'Label',
                width: 60,
                height: 28,
                keepRatio: false
            },
            imgUrl: '',
            attrs: [{ name: 'val1', label: '数据文字', type: 'String', value: '9999' }],
            params: [
                { name: 'text', label: '静态文字', type: 'String', value: '', hint: '将覆盖绑定' },
                { name: 'fill', label: '字体色', type: 'Color', value: '#333' },
                { name: 'background', label: '背景色', type: 'Color', value: '' },
                { name: 'fontSize', label: '文字尺寸', type: 'Int', value: '24' },
                {
                    name: 'fontFamily',
                    label: '字体',
                    type: 'Enum',
                    value: 'default',
                    opts: [{ label: '默认', value: 'default' }, { label: 'LCD字体', value: 'lcdmono' }]
                }]
        },
        {
            id: 1,
            name: 'scada-guage',
            config: {
                label: '计量表',
                width: 100,
                height: 75,
                keepRatio: true
            },
            imgUrl: '',
            attrs: [{ name: 'val1', label: '指示值', type: 'Number', value: 50 }],
            params: [{ name: 'minVal', label: '最小值', type: 'Number', value: '0' },
            { name: 'maxVal', label: '最大值', type: 'Number', value: '100' }]
        },
        {
            id: 2,
            name: 'scada-levelbar',
            config: {
                label: 'Level bar',
                width: 60,
                height: 100,
                keepRatio: false
            },
            imgUrl: '',
            attrs: [{ name: 'val1', label: 'Data', type: 'Number', value: 33 }],
            params: [{ name: 'fill', label: 'Màu', type: 'Color', value: '#43b5ff' },
            { name: 'background', label: 'Màu nền', type: 'Color', value: '#CCC' }]
        },
        {
            id: 3,
            name: 'scada-panel',
            config: {
                label: 'Panel',
                width: 80,
                height: 40,
                keepRatio: false
            },
            imgUrl: '',
            params: [
                { name: 'background', label: '背景色', type: 'Color', value: '#CCC' },
                { name: 'stroke', label: '边框色', type: 'Color', value: '' },
                { name: 'strokeWidth', label: '边框宽度', type: 'Int', value: '0' },
                { name: 'cornerRadius', label: '圆角大小', type: 'Int', value: '0' }
            ]
        },
        {
            id: 4,
            name: 'scada-library',
            config: {
                label: 'Thung rác',
                width: 60,
                height: 28,
                keepRatio: false
            },
            imgUrl: '',
            attrs: [{ name: 'Tọa độ điểm đầu', data: [{ name: 'X1', label: 'X1', type: 'String', value: '', isGroup: 'xy1' }, { name: 'Y1', label: 'Y1', type: 'String', value: '', isGroup: 'xy1' }] }, { name: 'Tọa độ điểm cuối', data: [{ name: 'X2', label: 'X2', type: 'String', value: '', isGroup: 'xy1' }, { name: 'Y2', label: 'Y2', type: 'String', value: '', isGroup: 'xy1' }] }, { name: 'Tọa độ điểm giữa', data: [{ name: 'X3', label: 'X3', type: 'String', value: '', isGroup: 'xy1' }, { name: 'Y3', label: 'Y3', type: 'String', value: '', isGroup: 'xy1' }] }, { name: 'Chỉ số Delta', data: [{ name: 'delta1', label: 'Delta 1', type: 'String', value: '', isGroup: 'xy1' }, { name: 'delta2', label: 'Delta 2', type: 'String', value: '', isGroup: 'xy1' }] }],
            params: [
                { name: 'text', label: 'Text', type: 'String', value: '', hint: '' },
                { name: 'fill', label: 'Màu chữ', type: 'Color', value: '#333' },
                { name: 'background', label: 'Màu nền', type: 'Color', value: '' },
                { name: 'fontSize', label: 'Cỡ chữ', type: 'Int', value: '12' },
                {
                    name: 'fontFamily',
                    label: 'Fonts',
                    type: 'Enum',
                    value: 'default',
                    opts: [{ label: 'Mặc định', value: 'default' }, { label: 'LCD Font', value: 'lcdmono' }]
                }]
        }
    ]
}
