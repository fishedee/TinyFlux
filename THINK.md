#0.1.0
想法很直接，觉得action与store的部分是重叠的
没有必要分开
所以将reflux中的action与store合并起来，让store的接口自动生成为action
然后让store与component用connet起来就可以了

#0.3.0
去掉store的每次新建
每个App一个业务应该只有一个store

#0.4.3
优化了store与component的连接语法
不用connect，
而是让component listenTo store
最后让component每次都渲染数据就可以了

#0.5.0
写了很多async的代码，渐渐发现store里写trigger是很不靠谱的
有时候改了数据，但忘了trigger
有时候写aysnc，要密切留意着写trigger
由于有trigger，所以对于async的代码要重用就会很难看。
可以看看0.4.3中real-world中对于分页代码的重用

重新看了reflux与redux的思想
##reflux启示，action与store必须要分开
终于明白了action与store分开的必要性
让store处理本地同步数据，让action处理异步数据，
这样store就不需要写trigger了，而且store的复用更容易的
action与store分开是很用必要的！！！

##redux启示，全局只有一个store
不要将store分散开来，
应该组合成一个store
这样就没有关于listen的某个store代码，
每次都是listen整个store

#0.5.1
0.5.0的开发让代码比以前更易懂
但是代码量大增
而且store的代码与action的代码是一一对应的，很是不爽
下一步的考虑是切离出store，用reducers来生成store。
从而减少代码

#0.5.2
action与store分开代码冗余似乎解决不了，如果用reducer方案感觉又太复杂了
再次将action与store合并
将以前的trigger去掉，改用object __setSetter__来监听state是否有变化
然后将原来的createStore改为createClass，避免难看的复用代码的问题
复用代码有三个案例
1.复用分页代码
2.列表复用列表元素代码，构成组合
3.组合单个元素以及另外一个store，来构成代码。
有三种store与action组合的方法
1.用createClass，复用性最差
2.用class，同时复用数据与接口
3.用reducer，只复用数据，不复用代码
最后选择第二种
