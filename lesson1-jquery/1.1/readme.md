# JQuery版本1

实现了从接口请求数据，渲染到页面上的过程。

## 代码实现

先要引入jquery，选择了一个cdn版本，省事。然后在main.js里，DOM加载完成后执行一个ajax请求。向服务器发起get请求，将拿到的数据在控制台里打印出来可以看到是一个数组。遍历数组完成字符串拼接。这里使用了ES6的遍历数组的方法，for (let item of list)，和for in的差别自行了解，请不要使用IE等过时浏览器预览效果。

服务器接口提供的是一个简单的留言板的功能，请求接口可以拿到所有的留言数据，每条数据有title(标题)，content（内容），time（发布时间），id（唯一标识符）。我们需要显示的内容就只是标题内容时间，id不需要管。

在把数据插入到html中时有一个可优化的点。插入有两种插法，一是循环时每条数据造一个字符串，append进去，另一种是在循环前声明好字符串，每次循环只拼接字符串，最后循环完成时一次性append进去。而JS的DOM操作是非常费时需要性能的，所以1法有多少条就要进行多少次DOM操作，而2法只用进行1次DOM操作，用2法更优秀，给出的代码中也是使用的2法。

至此，从服务器端获取数据并渲染到页面上就完成了。

## 服务器端接口说明

接口地址：http://115.159.184.76:3001/api/comments

REST接口，支持CORS跨域请求，所以不会有跨域问题，请自行了解跨域相关问题，参考资料：[MDN-浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)  [阮一峰-浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)

接口功能：暂时只需要知道get请求会返回所有的comment（留言）