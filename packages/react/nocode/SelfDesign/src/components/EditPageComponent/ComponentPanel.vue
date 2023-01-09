<template>
	<div id="component-panel">
		<ul>
			<li
				@click="tabChange(index)"
				:class="checkedOne == index ? 'tabSelected' : ''"
				:key="item.id"
				v-for="(item, index) in componentOptions"
			>
				{{ item.tag }}
			</li>
		</ul>
		<div
			id="component-options"
			:class="checkedOne == index ? 'current' : ''"
			:key="item.id"
			v-for="(item, index) in componentOptions"
		>
			<ul>
				<li
					v-for="p in item.componentData"
					:key="p.cid"
					@click="addComponent(p.template)"
				>
					<img :src="p.img" />
					<span>{{ p.cname }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
export default {
	name: "ComponentPanel",
	setup() {
		let checkedOne = ref(0);
		// 组件选项（容器/组件）
		const componentOptions = reactive([
			{
				id: 1,
				tag: "容  器",
				componentData: [
					{
						cid: 1,
						cname: "定位布局",
						img: "/img/EditIcons/布局.png",
						template: {
							tag: "PositionLayout",
							style: {},
							children: [],
							event: [],
						},
					},
					{
						cid: 2,
						cname: "横向布局",
						img: "/img/EditIcons/横向布局.png",
						template: {
							tag: "HorizontalLayout",
							style: {},
							children: [],
							event: [],
						},
					},
					{
						cid: 3,
						cname: "纵向布局",
						img: "/img/EditIcons/纵向布局.png",
						template: {
							tag: "VerticalLayout",
							style: {},
							children: [],
							event: [],
						},
					},
					// {
					//   cid: 4,
					//   cname: '轮播图',
					//   img: '/img/EditIcons/轮播图.png',
					// },
					// {
					//   cid: 5,
					//   cname: '二级导航',
					//   img: '/img/EditIcons/二级导航.png',
					// },
					// {
					//   cid: 6,
					//   cname: '列表',
					//   img: '/img/EditIcons/列表.png',
					// },
					// {
					//   cid: 7,
					//   cname: '表格',
					//   img: '/img/EditIcons/表格.png',
					// },
				],
			},
			{
				id: 2,
				tag: "组  件",
				componentData: [
					{
						cid: 1,
						cname: "图片",
						img: "/img/EditIcons/图片.png",
						template: {
							tag: "Image",
							style: {},
							values: {
								url: "",
							},
							event: [],
						},
					},
					{
						cid: 2,
						cname: "文本框",
						img: "/img/EditIcons/文本框.png",
						template: {
							tag: "Text",
							style: {},
							values: {
								content: "",
							},
							event: [],
						},
					},
					{
						cid: 3,
						cname: "按钮",
						img: "/img/EditIcons/按钮.png",
						template: {
							tag: "Button",
							style: {},
							values: {
								content: "",
							},
							event: [],
						},
					},
				],
			},
		]);

		// tag栏更改
		const tabChange = (index) => {
			checkedOne.value = index;
		};

		// 点击添加到画布
		const store = useStore();
		const addComponent = (node) => {
			store.commit("editPage/addComponent", { node });
		};

		return {
			checkedOne,
			componentOptions,
			tabChange,
			addComponent,
		};
	},
};
</script>
<style scoped>
#component-panel {
	width: 240px;
	height: 100%;
	background: #ffffff;
	border-left: 1px solid #bfbfbf;
	border-right: 1px solid #bfbfbf;
	box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
	box-sizing: border-box;
}

ul {
	display: flex;
	list-style: none;
}
#component-panel > ul li {
	width: 120px;
	height: 36px;
	text-align: center;
	line-height: 36px;
	color: #333333;
	font-weight: bold;
	border: 1px solid #bfbfbf;
	transition: ease-in-out all 0.3s;
	cursor: pointer;
}
#component-panel > ul li:hover {
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
}

.tabSelected {
	color: #ffffff !important;
	background: #4a8af4;
}
/* 当前：被选中显示 */
.current {
	display: block !important;
}

/* 下方的内容 */
#component-options {
	display: none;
}

/* #component-options p {
    padding: 33px 0 15px 23px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    letter-spacing: 1px;
  } */

#component-options ul {
	margin: 33px 30px 0;
	flex-wrap: wrap;
}

#component-options ul > li {
	margin-bottom: 12px;
	width: 80px;
	height: 88px;
	box-sizing: border-box;
	border-radius: 4px;
	border: 1px solid #eeeeee;
	transition: ease-in-out all 0.3s;
	cursor: pointer;
}
#component-options ul > li:nth-child(2n + 1) {
	margin-right: 18px;
}
#component-options ul > li:hover {
	background: #eef2f7;
	border: 1px solid #eef2f7;
}

#component-options ul > li > img {
	margin: 17px 24px 8px;
	width: 32px;
}

#component-options ul > li > span {
	display: block;
	text-align: center;
	font-size: 14px;
	color: #666666;
}
</style>
