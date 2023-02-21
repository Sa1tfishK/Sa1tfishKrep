# kaige-score

## 注意：插件仅测试谷歌浏览器。按道理来说支持所有的端。

### 使用方式

### 当前示例的图片文件均在项目的static文件内（非当前组件），请查看完整的示例文件。路径 项目名/static


* 默认
```html
<kaige-score></kaige-score>
```
* 不显示动画
```html
<kaige-score :value="2" :displayAnimation="false"></kaige-score>
```
* 禁止点击
```html
<kaige-score :value="2" :disabled="true"></kaige-score>
```
* 单图标 不用提示
```html
<kaige-score :multipleIcons="false" :displayToast="false"></kaige-score>
```
* 单图标 不用提示 默认值
```html
<kaige-score :value="2" :multipleIcons="false" :displayToast="false"></kaige-score>
```
* 多图标
```html
<kaige-score :value="2" :multipleIcons="true"></kaige-score>
```
* 多图标
```html
<kaige-score :value="3" :multipleIcons="true"></kaige-score>
```
* 多图标 自定义静态多图标
```html
<kaige-score :value="2" :multipleIcons="true" :num="4" :subscriptBeforeList='["/static/starIcon07.png", "/static/starIcon07.png",
						"/static/starIcon08.png", "/static/starIcon09.png"
					]' :subscriptList='["/static/starIcon03.png", "/static/starIcon04.png",
						"/static/starIcon05.png", "/static/starIcon06.png"
					]' :toast='["差", "一般", "还可以", "满意"]'></kaige-score>
```
* 自定义生成图标 生成提示(可以单个设置，设置任意一个也会生效)
```html
<kaige-score ref="score" :value="3" :num="6" @change="change"></kaige-score>
```
```javascript
export default {
    data() {
        return {
            title: 'Hello'
        }
    },
    onLoad() {

    },
    onReady() {
        this.$refs.score.setAutoToast((index) => {
            return index + "下标";
        });
        this.$refs.score.setAutoScoreIcon((value, index) => {
            return "https://img95.699pic.com/element/40118/4203.png_300.png";
        });
    },
    methods: {
        change(index) {
            console.log(index);
        }
    }
}
```

### 变量
* value 当前的值 不支持双向绑定 支持切换
* num 图标的数量
* styleItem 每个图标的样式 通过margin调节间距 height/width 调节大小 优先级大于size变量
* styleText 文本的样式 toast展示的文本
* size 图标大小，内置[small,default,large],优先级小于styleItem。当前值可以通过调节styleItem的值来自定义，支持 small 小 / default 默认 / large 大
* multipleIcons 是否多图标 [false 生效 background,activeBackground][true 生效 background,subscriptBeforeList,subscriptList]
* background 背景图标
* activeBackground 突出项的背景图片
* subscriptBeforeList 当前下标前展示的图片数组 需：同num变量相同的数组数量
* subscriptList 当前下标展示的图片数组 需：同num变量相同的数组数量
* displayToast 是否展示提示 默认 true 展示
* toast 文字提示 需：同num变量相同的数组数量
* displayAnimation 是否显示动画
* disabled 是否禁止点击 false 不禁止 true 禁止

### 注意
* 使用toast固定数组提示时需要 数组数量同num一样
* 多图标设置时一样 subscriptBeforeList,subscriptBeforeList 数组数量同num一样

### 绑定的事件（@click这种）
```
@change Fucntion(int value) 值更改事件
参数：
value 当前值（点击项的下标）
```


### 函数（ref.function()使用这种）
* setAutoToast 设置自定义生成提示
```javascript
setAutoToast Function(Function(int value)) 设置自定义生成提示
参数：
Function(int value) value 当前值 
返回值为字符串显示 代替toast变量显示
```

* setAutoScoreIcon 设置自定义生成图标
```javascript
setAutoScoreIcon Function(Function(int value,int index)) 设置自定义生成图标
参数：
Function(int value,int index) value 当前值 index 图标的下标
返回值为字符串 代替图标(返回图片的URL地址)
```
