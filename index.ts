const logtag = ({ fname = "Logtag" }) => {
  const reg = new RegExp(`${fname}\((?<args>.+)\)(?<merge>\s*&&)?`, "g")
  return {
    name: "log-tag-plugin",
    transform(code: string) {
      // var isok = false
      const replaceLog = ($1: string, $2: string) => {
        if ($1.includes("&&")) {
          const [before, after] = $1.split("&&")
          const ret = `(${before.replace(reg, replaceLog)} || true) && ${after}`
          // isok = true
          return ret
        }
        return `console.log(...${fname}(${$2}))`
      }
      const res = code.replace(reg, replaceLog)
      // if (isok) {
      //   // console.log(res)
      // }
      return {
        code: res,
        map: null, // 可以提供 Source Map 支持
      }
    },
  }
}

export default logtag
