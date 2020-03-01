# AddEdit

## 传入参数

| 参数 | 说明 | 类型 | 默认值 | 必传 | 版本 |
| --- | --- | --- | --- | --- | --- |
| show | 是否显示 | string | true | 1 |  |
| title | 标题 | string | - | 1 |  |
| labelWidth | 表单左侧文字 | number | 140 | 0 |  |
| tpls | 模板数据 | array | - | 1 |  |
| records | 实例数据 | object | - | 1 |  |
| dicts | 字典s | object | - | 0 |  |

## tpls 模板数据格式示例

| 参数 | 说明 | 类型 | 默认值 | 必传 |
| --- | --- | --- | --- | --- |
| key | 参数名 | string | - | 1 |
| title | 参数名称 | string | - | 1 |
| type | 工作项类型 | string | input(可选select、textarea等) | 0 |
| dict | 依赖的字典名，使用时yhzhlxList for循环 | array | - | 0 |
| isRequired | 是否必填 | boolean | - | 0 |
| isHidden | 是否隐藏 | boolean | - | 0 |

## records 实例数据格式示例

```
records: {
  c_id: "",
  ...
}
```

## dicts 字典数据格式示例

```
dicts: {
  yhzhlxList: [], //账号类型
  sexList: [], //性别
  zzmmList: [], //政治面貌
  mzList: [], //民族
  whcdList: [], //文化程度
  hyList: [], //婚姻
  jgList: [] //籍贯
}
```
