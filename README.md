
#preview实现了什么功能?
图片预览、压缩、存储

##preview实现思路

* #####获取图片路径
    *  ######非ie9-浏览器使用[URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)获取file中图片路径
    *  ######ie9-浏览器通过获取file中value值获取图片路径
* #####将获取到的路径设置为img的src中或者是background-image的url中
* #####利用canvas的[drawimage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)方法，将图片重新绘制进canvas画布中
* #####使用canvas的[toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)方法将画布导出，生成base64位图片格式并进行压缩
* #####将生成的base64位格式数据存入本地存储sessionStorage中，提交时获取并上传

##参数说明
###previewMini(previewid,inputid,options);
```javascript
 previewid:预览区域ID
 inputid：输入框ID
 options：{
   m : true/false,              //是否压缩
   f : "jpeg/png/svg/···",      //生成图片格式,默认jpeg
   q : 0-1                      //压缩后图片质量，越低压缩比例越高
 }
```

##兼容性

图片预览：FF/Chrome/safari/O/ie7+

图片压缩：FF/Chrome/safari/O/ie9+

图片上传：

* FF/Chrome/safari/O/ie9+直接获取sessionStorage.getItem("dataBox0")(此处的dataBox + 当前input的index值)；
* ie9-需获取file中文件并转换为json并上传


##关于作者
* 前端小白，插件更多是整理自己的解决思路，写法上也是入门级水平，自知一定有极大改进空间，欢迎大神批评、指正、鼓励
* 个人博客[李小白的学习园地](http://www.web677.com/)
