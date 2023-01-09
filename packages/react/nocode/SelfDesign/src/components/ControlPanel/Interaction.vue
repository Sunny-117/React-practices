<template>
	<div class="interaction">
		<div class="curAdd" v-show="isAdd == 'cur'">
			<h4 class="title">当前添加</h4>
			<ul class="curAddItem" v-for="(item, index) in curEvent" :key="item">
				<li>
					触发方式 <span>{{ item.type.label }}</span>
				</li>
				<li>
					交互功能 <span>{{ item.action.label }}</span>
				</li>
				<li>
					打开类型 <span>{{ item.handleType.label }}</span>
				</li>
				<li>
					目标页面 <span>{{ item.argument.value }}</span>
				</li>
				<div class="hoverCom">
					<span class="edit" @click="editEvent(index)" :event="curEvent[index]">
						<i></i>
					</span>
					<span class="delete" @click="deleteEvent(index)">
						<i></i>
					</span>
				</div>
			</ul>
			<button class="addbtn" @click="triggleIsAdd('add')">
				<i class="plusBtn"></i>
			</button>
		</div>

		<div class="add" v-show="isAdd != 'cur'">
			<ul>
				<li v-for="item in options" class="item" :key="item.name">
					<h4 class="itemTitle">{{ item.title }}</h4>
					<el-select v-model="item.value" placeholder="请选择">
						<el-option
							class="select"
							v-for="data in item.data"
							:key="data.value"
							:label="data.label"
							:value="data.value"
							:disabled="data.disabled"
							@click="getTip()"
						>
						</el-option>
					</el-select>
				</li>
				<li class="item">
					<h4 class="itemTitle">目标{{ argument.tip }}</h4>
					<input
						class="el-input__inner"
						type="text"
						:placeholder="argument.tip"
						v-model="argument.value"
					/>
				</li>
			</ul>
			<button class="cancel" @click="cancel">取 消</button>
			<button class="comfirm" @click="comfirm()">确 定</button>
		</div>
	</div>
</template>

<script>
import { ref, reactive, defineComponent, handleError, watch } from "vue";
import { useStore } from "vuex";
import { tagToOptions } from "@/utils/tagToOptions/index.js";

export default defineComponent({
	name: "Interaction",

	setup() {
		const store = useStore();

		let isAdd = ref("cur");
		let curEvent = reactive([]);
		function triggleIsAdd(val) {
			isAdd.value = val;
		}
		function deleteEvent(index) {
			curEvent.splice(index, 1);
			changeEvent();
		}
		function editEvent(index) {
			originAddEvent(curEvent[index]);
			this.triggleIsAdd(index);
		}

		let currentlySelected = reactive({});
		let Tagoptions = reactive({
			align: false,
			appearance: false,
			change: false,
			event: {
				mouse: false,
				keydown: false,
				keyup: false,
			},
			image: false,
			order: false,
			position: false,
			text: false,
			textContent: false,
		});

		watch(
			() => store.getters["editPage/activeComponent"],
			() => {
				currentlySelected = store.getters["editPage/activeComponent"];

				if (currentlySelected) {
					// console.log(currentlySelected);
					Tagoptions = tagToOptions(currentlySelected.tag);

					// 选取的元素 不为 null
					if (currentlySelected.event) {
						// 是有event
						// event 的 length 不等于 0

						let event = currentlySelected.event;

						curEvent.length = 0;

						for (let i = 0; i < event.length; i++) {
							curEvent[i] = {
								type: {
									value: event[i].type,
									label: getLabel(event[i].type),
								},
								action: {
									value: event[i].action,
									label: getLabel(event[i].action),
								},
								handleType: {
									value: event[i].handleType,
									label: getLabel(event[i].handleType),
								},
								argument: {
									value: event[i].argument,
								},
							};
						}
					}
				}
			}
		);

		function changeEvent() {
			if (curEvent.length == 0) {
				store.commit("editPage/setActiveComponentEvents", {
					event: [],
				});
			} else {
				let event = reactive([]);
				for (let i = 0; i < curEvent.length; i++) {
					let item = {};
					item.type = curEvent[i].type.value;
					item.action = curEvent[i].action.value;
					item.handleType = curEvent[i].handleType.value;
					item.argument = curEvent[i].argument.value;
					event.push(item);
				}
				store.commit("editPage/setActiveComponentEvents", {
					event: JSON.parse(JSON.stringify(event)),
				});
			}
		}

		let oriEvent = reactive({
			type: {
				value: "mouse",
				label: "鼠标",
			},
			action: {
				value: "click",
				label: "单击",
			},
			handleType: {
				value: "blank",
				label: "新窗口跳转",
			},
			argument: {
				value: "",
				tip: "请输入文本",
			},
		});

		let options = reactive({
			type: {
				name: "type",
				title: "触发方式", // 事件类型
				value: oriEvent.type.value,
				label: oriEvent.type.label,
				data: [
					{
						value: "mouse",
						label: "鼠标",
						disabled: !Tagoptions.event.mouse,
					},
					{
						value: "keydown",
						label: "键盘按下",
						disabled: !Tagoptions.event.keydown,
					},
					{
						value: "keyup",
						label: "键盘弹起",
						disabled: !Tagoptions.event.keyup,
					},
				],
			},
			action: {
				name: "action",
				title: "交互功能", // 事件动作
				value: oriEvent.action.value,
				label: oriEvent.action.label,
				data: [
					{
						value: "click",
						label: "单击",
					},
				],
			},
			handleType: {
				name: "handleType",
				title: "打开类型", // 如何处理事件
				value: oriEvent.handleType.value,
				label: oriEvent.handleType.label,
				data: [
					{
						value: "toast",
						label: "弹框",
					},
					{
						value: "modal",
						label: "模态框",
					},
					{
						value: "target",
						label: "当前页面跳转",
					},
					{
						value: "blank",
						label: "新窗口跳转",
					},
					{
						value: "jump",
						label: "没过渡的锚点",
					},
					{
						value: "slide",
						label: "有过渡的锚点",
					},
				],
			},
		});

		let argument = reactive({
			value: oriEvent.argument.value,

			tip: "请输入文本",
		});

		function getTip() {
			let tip = "";
			switch (options.handleType.value) {
				case "toast":
				case "modal":
					tip = tip + "文本";
					break;
				case "target":
				case "blank":
					tip = tip + "链接";
					break;
				case "jump":
				case "slide":
					tip = tip + "节点ID";
					break;
			}
			argument.tip = tip;
		}
		function getLabel(key) {
			let res = "";
			// console.log(key);
			switch (key) {
				case "mouse":
					res = "鼠标";
					break;
				case "keyup":
					res = "键盘弹起";
					break;
				case "keydown":
					res = "键盘按下";
					break;
				case "click":
					res = "单击";
					break;
				case "dbClick":
					res = "双击";
					break;
				case "toast":
					res = "弹框";
					break;
				case "modal":
					res = "模态框";
					break;
				case "target":
					res = "当前页面跳转";
					break;
				case "blank":
					res = "新窗口跳转";
					break;
				case "jump":
					res = "没过渡的锚点";
					break;
				case "slide":
					res = "有过渡的锚点";
					break;
			}
			return res;
		}
		function comfirm() {
			let event = {};
			// 添加事件
			if (options.type.value) {
				event.type = {
					value: options.type.value,
					label: getLabel(options.type.value),
				};
			}
			if (options.action.value) {
				event.action = {
					value: options.action.value,
					label: getLabel(options.action.value),
				};
			}
			if (options.handleType.value) {
				event.handleType = {
					value: options.handleType.value,
					label: getLabel(options.handleType.value),
				};
			}
			if (argument.value) {
				event.argument = {
					value: argument.value,
				};
				if (isAdd.value != "add") {
					// console.log(curEvent);
					curEvent.splice(isAdd.value, 1);
					curEvent.splice(isAdd.value, 0, event);
				} else {
					curEvent.push(JSON.parse(JSON.stringify(event)));
				}
				this.triggleIsAdd("cur");
			} else {
				alert("目标页面不能为空");
			}
			// originAddEvent(oriEvent);
			changeEvent();
		}
		function originAddEvent(obj) {
			options.type.value = obj.type.value;
			options.type.label = obj.type.label;
			options.action.value = obj.action.value;
			options.action.label = obj.action.label;
			options.handleType.value = obj.handleType.value;
			options.handleType.label = obj.handleType.label;
			argument.value = obj.argument.value;
		}
		function cancel() {
			// 取消
			this.triggleIsAdd("cur");
		}

		return {
			isAdd,
			curEvent,
			triggleIsAdd,

			originAddEvent,
			getLabel,

			deleteEvent,
			changeEvent,

			editEvent,
			options,
			comfirm,
			cancel,
			argument,
			getTip,
		};
	},
});
</script>

<style>
li {
	list-style-type: none;
}

.interaction .el-input__inner {
	height: 1.5rem;
	font-size: 0.8125rem;
	border-color: #cacaca;
}
.interaction .el-scrollbar .el-select-dropdown__list .el-select-dropdown__item {
	padding: 0 1.25rem;
	box-sizing: border-box;
	height: 1.5625rem;
}
.interaction {
	/* padding: 0.3125rem 0; */
	box-sizing: border-box;
	margin: 0 auto;
	padding: 0;
}
.interaction .add .itemTitle,
.interaction .title {
	font-size: 0.9rem;
	margin-bottom: 0.9375rem;
}
.interaction ul {
	padding-inline-start: 0;
}

button {
	outline: none;
	cursor: pointer;
}
</style>

<style scoped>
.curAdd {
	width: 95%;
	margin: 0 auto;
	height: 100%;
}

.curAdd .curAddItem {
	width: 100%;
	padding: 0.5rem;
	box-sizing: border-box;
	border: 1px solid #bbbbbb;
	border-radius: 2px 2px 2px 2px;
	margin-bottom: 0.75rem;
	cursor: pointer;
	position: relative;
}
.curAdd .curAddItem:hover,
.curAdd .curAdd:active {
	box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.25098039215686274);
}

.curAdd .curAddItem li {
	font-size: 0.75rem;
	color: #666666;
	margin-bottom: 0.125rem;
	border-radius: 0.125rem;
}
.curAdd .curAddItem li:nth-last-of-type(1) {
	margin-bottom: 0;
}
.curAdd .curAddItem li span {
	color: #fff;
	background-color: #4a8af4;
	font-size: 0.75rem;
	border: 1px solid #4a8af4;
	display: inline-block;
	padding: 0.1875rem 0.5rem;
	border-radius: 1.25rem;
	margin-left: 0.3125rem;
	/* vertical-align: middle; */
	transition: all 0.3s;
}
.curAdd .curAddItem:hover li span,
.curAdd .curAdd:active li span {
	background-color: #eef2f7;
	border: 1px solid #dddddd;
	color: #666666;
}
.curAdd .curAddItem:hover .hoverCom,
.curAdd .curAdd:active .hoverCom {
	opacity: 1;
}
.curAdd .hoverCom {
	opacity: 0;
	position: absolute;
	right: 0;
	top: 0.3125rem;
	display: flex;
	justify-items: center;
	width: 3.375rem;
	height: 25px;
	transition: all 0.3s;
}
.curAdd .hoverCom span {
	display: block;
	width: 1.45rem;
	height: 1.45rem;
	background-color: #1ba160;
	border-radius: 360px;
	margin-right: 0.125rem;
}
.curAdd .hoverCom span i {
	display: block;
	width: 100%;
	height: 100%;
	background: url(/img/edit.png) no-repeat 4px;
	background-size: 70%;
}
.curAdd .hoverCom span.delete {
	background-color: #dd5145;
}
.curAdd .hoverCom span.delete i {
	background-image: url(/img/delete.png);
}
.curAdd .hoverCom span:hover {
	box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.25098039215686274);
}
.curAdd .addbtn {
	width: 100%;
	padding: 0.9375rem;
	border: 2px dashed #bbbbbb;
	background-color: transparent;
}
.curAdd .addbtn .plusBtn {
	width: 1.25rem;
	height: 1.25rem;
	box-sizing: border-box;
	display: block;
	margin: 0 auto;
	background: url(/img/EditIcons/zoom_icon.png) -1px -1px;
	background-size: 450%;
	border: 0.075rem dashed #bbb;
}

.add {
	width: 11rem;
	margin: 0 auto;
	/* padding-right: 1.25rem; */
}
.add .item {
	margin-bottom: 1.5625rem;
}
.add .item:nth-last-of-type(1) {
	margin-bottom: 1.875rem;
}

.add > button {
	width: 5rem;
	height: 2rem;
	float: left;
	display: block;
	background-color: #f0f3f4;
	border: 1px #dddddd solid;
	font-size: 0.825rem;
	color: #000;
	border-radius: 0.375rem;
	outline: none;
	cursor: pointer;
}
.add > button.comfirm {
	background-color: #4a8af4;
	float: right;
	color: #fff;
	border: 1px #4a8af4 solid;
}
</style>
