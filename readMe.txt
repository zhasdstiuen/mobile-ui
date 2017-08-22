1、#{&}
	.block{
		color: red;
		#{&}__element{
			color: green;
		}
		#{&}--modifier{
			color: blue;
		}
	}
	编译后：
	.block {
		clolor: red;
	}
	.block .block__element {
		color: green;
	}
	.block .block--modifier {
		color: blue;
	}

2、.test{
		& + input{
			//选择兄弟节点
		}
	}
