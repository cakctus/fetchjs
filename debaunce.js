function debaunce() {
  let timer = null

  return (cb) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(cb, 2000)
  }
}
