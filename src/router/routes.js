import HelloWorld from '../components/HelloWorld'
import con from '../components/context'



import login from '../pages/common/login'

import adminMain from '../pages/admin/main'
import adminRegister from '../pages/admin/adminRegister'
import userManager from '../pages/admin/userManager'
import merchantManager from '../pages/admin/merchantManager'

import dishesManager from '../pages/dishes/dishesManager'

import goodsManager from '../pages/goods/goodsManager'
import goodsClassifyManager from '../pages/goods/goodsClassifyManager'

import merchantMain from '../pages/merchant/main'
import merchantRegister from '../pages/merchant/merchantRegister'
import comment from '../pages/merchant/comment'

import orderManager from '../pages/order/orderManager'
import orderGoodsManager from '../pages/order/orderGoodsManager'

import storeManager from '../pages/store/store'
import storeClassifyManager from '../pages/store/storeClassify'



const routes = [
    {path:"/hello" ,component:HelloWorld,children:[
        {path:"/hello/con" ,component:con},
    ]},
    {path:"/con" ,component:con},
    
    {path:"/" ,component:login},
    {path:"/adminRegister" ,component:adminRegister},
    {path:"/merchantRegister",component:merchantRegister},

    {path:"/adminMain" ,component:adminMain,children:[
        {path:"/adminMain/userManager",component:userManager},
        {path:"/adminMain/goodsManager",component:goodsManager},
        {path:"/adminMain/goodsClassifyManager",component:goodsClassifyManager},
        {path:"/adminMain/userManager",component:userManager},
        {path:"/adminMain/merchantManager",component:merchantManager},
        {path:"/adminMain/dishesManager",component:dishesManager},
        {path:"/adminMain/orderManager",component:orderManager},
        {path:"/adminMain/orderGoodsManager",component:orderGoodsManager},
        {path:"/adminMain/storeManager",component:storeManager},
        {path:"/adminMain/storeClassifyManager",component:storeClassifyManager}

    ]},
 
    {path:"/merchantMain" ,component:merchantMain,children:[
        {path:"/merchantMain/storeManager",component:storeManager},
        {path:"/merchantMain/orderManager",component:orderManager},
        {path:"/merchantMain/orderGoodsManager",component:orderGoodsManager},
        {path:"/merchantMain/goodsManager",component:goodsManager},
        {path:"/merchantMain/goodsClassifyManager",component:goodsClassifyManager},
        {path:"/merchantMain/dishesManager",component:dishesManager},
        {path:"/merchantMain/comment",component:comment},
    ]}
  ]


  export default routes