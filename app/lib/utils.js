function divisionRecursion (num, cb = () => {}) {
  if (num >= 1024) {
    const _num = +(num / 1024).toFixed(2)
    cb(_num)
    return divisionRecursion(_num, cb)
  }
  return num
}

exports.computeFileSize = (byte) => {
  let unitNum = 0
  const size = divisionRecursion(byte, () => unitNum++)
  switch (unitNum) {
    case 0:
      return size + 'B'
    case 1:
      return size + 'KB'
    case 2:
      return size + 'MB'
    case 3:
      return size + 'GB'
    case 4:
      return size + 'TB'
  }
}
