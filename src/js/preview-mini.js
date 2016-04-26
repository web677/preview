/**
 * 参数分别为：预览区域id,输入框id,自定义属性{是否压缩,图片格式,图片质量}
 * 如果仅仅是移动端使用，提交时获取window.sessionStorage并上传即可，
 * 如需考虑PC端，ie9及以下请先将window.sessionStorage转换为json格式然后上传
 */
;(function(){
	window.previewMini = function(previewid,inputid,options) {
		var imgUrl,
			dataBox,
			inputs   = [],
            p_style  = document.getElementById(previewid).style,
        	file     = document.getElementById(inputid),
        	iList    = document.getElementsByTagName('input'),
        	defaults = {
        		m : true ,   	//是否压缩
        		f : "jpeg",		//压缩后图片格式
        		q : 0.5    		//压缩后图片质量
	        };

	    function extend(op1,op2){
	    	for (var val in op2) {
	    		op1[val] = op2[val] ;
	    	}
	    };
	    extend(defaults,options);

	    // 确保sessionStorage key值唯一性
		try{
			Array.prototype.push.apply(inputs,iList);
			dataBox = "dataBox" + inputs.indexOf(file) || 0;
		}catch(e){
			for(var i = 0; i < iList.length; i++){
				if (iList[i] == file){
					dataBox = "dataBox" + i;
				}
			}
		}
// mini
		function picMini(imgUrl,ie){
			var tempImg = new Image();

			tempImg.style.visibility = "hidden";
			tempImg.src = imgUrl;
			document.body.appendChild(tempImg);
			
			if(ie === true){
				mini();
			}else{
				tempImg.onload = function(){
					mini();	
				}
			}
			function mini(){
				iw = tempImg.offsetWidth;
				ih = tempImg.offsetHeight;
				tempImg.style.display = "none";

				var myCvs = document.createElement("canvas");
				if ( !myCvs || !myCvs.getContext ) {
					window.sessionStorage.setItem(dataBox,file);
				}else {
					var myCTX = myCvs.getContext("2d");
					myCvs.width = iw;
					myCvs.height = ih;
					myCTX.drawImage(tempImg,0,0,iw,ih,0,0,iw,ih);
					window.sessionStorage.setItem(dataBox,myCvs.toDataURL("image/" + defaults.f ,defaults.q));
				}
			}
		}
// preview
	    (function(){
	    	var bro     = navigator.appName,
           		bro_v   = navigator.appVersion,
           		version = bro_v.split(";"),
           		trim_v  = version.length > 1 ? version[1].replace(/[ ]/g,"") : version[0].replace(/[ ]/g,"");
	    	
	    	switch(true){
	       		case !file.value.match(/.jpg|.png|.tiff|.jpeg/i):
	           			alert("您上传的图片格式不正确，请重新选择！");
	           			break;
				case bro == "Microsoft Internet Explorer" && (trim_v == "MSIE6.0" || trim_v == "MSIE7.0" || trim_v == "MSIE8.0" || trim_v == "MSIE9.0") :
	           			file.select();
	        			file.blur();
	        			imgUrl = document.selection.createRange().text;
	        			p_style.backgroundImage = "url("+imgUrl+")";  
		                p_style.backgroundSize = "100% 100%"; 
		                p_style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + imgUrl + ",sizingMethod='scale')";
					    if(defaults.m){
						    picMini(imgUrl,true);
					    }else{
					    	window.sessionStorage.setItem(dataBox,file);
					    }
	        			break;
	    		default :
	        		try {
						if(window.webkitURL.createObjectURL){
		        			imgUrl = window.webkitURL.createObjectURL(file.files[0]); 
		        			p_style.backgroundImage = "url("+imgUrl+")";  
			                p_style.backgroundSize = "100% 100%"; 
						    if(defaults.m){
							    picMini(imgUrl);
						    }else{
						    	window.sessionStorage.setItem(dataBox,file);
						    }
						}
					}catch(e){
							if(window.URL.createObjectURL){
			        			imgUrl = window.URL.createObjectURL(file.files[0]); 
			        			p_style.backgroundImage = "url("+imgUrl+")";  
				                p_style.backgroundSize = "100% 100%"; 
							    if(defaults.m){
								    picMini(imgUrl);
							    }else{
							    	window.sessionStorage.setItem(dataBox,file);
							    }
							}else{
								alert("您的手机暂不支持上传，请联系客服！")
						}
					};
	                break;
	       	}
	    })();
	}  
})();