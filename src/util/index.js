const util = {
  mockAPI: () => {
    return new Promise((res) => {
      setTimeout(() => {
        res('')
      }, 1500)
    })
  }
}

export default util
