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


