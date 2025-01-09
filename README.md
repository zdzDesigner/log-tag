## log-tag
> 无侵入, prod 编译清除console 即可删除日志代码
![snapshot](./log_tag.png)

### Install
```bash
yarn add browser-log-tag --dev
```

### used
- rollup and vite 
```bash
import Logtag from 'browser-log-tag'
{
  ...
  plugins: [Logtag({ fname = "Logtag" })]
  ...
}


```


