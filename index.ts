export const format =
  (themes: string[]) =>
  (...arg: any) => {
    const [prefix, ...more] = arg
    const maxLength = (a: string, b: string) => b.length - a.length
    const color = [
      "#38976e",
      "#bb970f",
      "#ff6685",
      "#303644",
      "#00b1a2",
      "#2133aa",
      "#55c1bb",
    ]
    const colors = [...color, ...color, ...color]
    const theme_colors = themes.reduce(
      (memo: Record<string, string>, key: string, i: number) => {
        memo[key] = colors[i]
        return memo
      },
      {},
    )

    // console.log(arg)
    const ignore_themes: string[] = []
    if (ignore_themes.includes(prefix)) return ""

    const theme = themes
      .sort(maxLength)
      .filter((t) => (prefix == t || prefix.indexOf(`${t}:`)) != -1)[0]
    if (!!theme) {
      const color = theme_colors[theme]
      const fmt_theme = [
        `%c${theme}`,
        `color:${color};font-weight:bold;background:#f5f5f5;padding:1px 2px;border-radius:3px;border:1px solid #aaa;`,
        prefix.replace(theme, ""),
        ...more,
      ]
      return fmt_theme
    }
    if (arg.length == 1) return arg
    return ""
  }

const logtag = ({ fname = "Logtag" } = { fname: String }) => {
  const reg = new RegExp(`${fname}\\((?<args>.+)\\)(?<merge>\s*&&)?`, "g")
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
