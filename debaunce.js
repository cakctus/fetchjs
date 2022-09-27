function debaunce() {
  let timer = null

  return (cb) => {
    console.log(cb)
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(cb, 2000)
  }
}
