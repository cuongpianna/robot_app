export default {
  rotateParam: {
    name: 'rotate',
    label: 'Xoay',
    type: 'Enum',
    value: 0,
    opts: [{ label: '0°', value: 0 }, { label: '90°', value: 90 }, { label: '180°', value: 180 },
      { label: '270°', value: 270 }]
  },
  colorMaskParam: {
    name: 'colorMask',
    label: 'Phủ màu',
    type: 'Enum',
    value: '',
    opts: [{ label: 'Mặc định', value: '' },
      { label: 'Màu đỏ', value: 'cf-red' },
      { label: 'Màu vàng', value: 'cf-yellow' },
      { label: 'Xanh lá', value: 'cf-green' },
      { label: 'Xanh da trời', value: 'cf-blue' },
      { label: 'Xanh nhạt', value: 'cf-lightblue' }]
  }
}
