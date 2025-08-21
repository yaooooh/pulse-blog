Mixin 的基本操作过程

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.16"></script>
<div id="app">
    {{ componentData }}
</div>
<script>
    const mixin = {
        data() {
            return {
                componentData: 1,
                complexObj: {
                    name: 'zhangsan',
                    age: 18,
                    mixinProperty: 'mixin'
                }
            }
        },
        created() {
            console.log('mixin created: ', this.componentData)
            this.conflictFunction()
        },
        methods: {
            conflictFunction() {
                console.log('mixin function', this.complexObj)
            }
        }
    }
</script>
<script>
    const app = new Vue({
        el: '#app',
        mixins: [mixin],
        data() {
            return {
                componentData: 2,
                complexObj: {
                    name: 'lisi',
                    age: 20,
                    componentProperty: 'component'
                }
            }
        },
        created() {
            console.log('component created', this.componentData)
            this.conflictFunction()
        },
        methods: {
            conflictFunction() {
                console.log('component function', this.complexObj)
            }
        }
    })
</script>
```

output

```
mixin created:  2
component function {
	age: 20
	componentProperty: "component"
	mixinProperty: "mixin"
	name: "lisi"
}
component created 2
component function {
	age: 20
	componentProperty: "component"
	mixinProperty: "mixin"
	name: "lisi"
}
```

合并问题

- 当 data 进行合并时，将会两者进行递归合并，当发生冲突时，将会以组件内部优先
- 生命周期函数：两者都会存在，并且混入函数中的生命周期会优先执行
- 当 methods，components，directives 合并时，将会被合并为同一个对象，键名冲突时，将会使用组件内部的键值对

*注意 `Vue.extend` 也使用同样的规则进行*