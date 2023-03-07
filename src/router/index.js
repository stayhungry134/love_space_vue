import VueRouter from 'vue-router'
// 引入组件
import TimeOfMeet from "@/components/cout_down.vue";


// 创建一个路由
export default VueRouter({
    router: [
        {
            path: '/about',
            component: TimeOfMeet
        }
    ]
})