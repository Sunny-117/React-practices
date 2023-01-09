<template>
	<div class="add">
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
						@click="getTip()"
					>
					</el-option>
				</el-select>
			</li>
			<li class="item">
				<h4 class="itemTitle">目标页面</h4>
				<input
					class="el-input__inner"
					type="text"
					:placeholder="argument.tip"
					v-model="argument.value"
				/>
			</li>
		</ul>
		<button class="cancel" @click="cancel">取 消</button>
		<button class="comfirm" @click="comfirm">确 定</button>
	</div>
</template>

<script>
import { defineComponent, ref, reactive, inject } from "vue";

export default defineComponent({
	name: "AddEvent",
	setup(props, { emit }) {
		let event = reactive({ // inject("oriEvent"); //inject("editEvent") || ;
			type: "mouse",
			action: "click",
			handleType: "model",
			argument: "",
		});
		let options = reactive({
			type: {
				name: "type",
				title: "触发方式", // 事件类型
				value: event.type,
				data: [
					{
						value: "mouse",
						label: "鼠标",
					},
					{
						value: "keydow",
						label: "键盘按下",
					},
					{
						value: "keyup",
						label: "键盘弹起",
					},
				],
			},
			action: {
				name: "action",
				title: "交互功能", // 事件动作
				value: event.action,
				data: [
					{
						value: "click",
						label: "单击",
					},
					{
						value: "dbClick",
						label: "双击",
					},
				],
			},
			handleType: {
				name: "handleType",
				title: "打开类型", // 如何处理事件
				value: event.handleType,
				data: [
					{
						value: "toast",
						label: "弹框",
					},
					{
						value: "model",
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
			value: event.argument,
			tip: "请输入文本",
		});

		function getTip() {
			let tip = "请输入";
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

		function comfirm() {
			// 添加事件
			// if (options.type.value) {
			event.type = options.type.value;
			event.action = options.action.value;
			event.handleType = options.handleType.value;
			// }
			console.log(event);
			if (argument.value) {
				event.argument = argument.value;

				emit("addEvent", event);
				this.triggleIsAdd("cur");
			} else {
				alert("目标页面不能为空");
			}
		}
		function cancel() {
			// 取消

			this.triggleIsAdd("cur");
		}
		const triggleIsAdd = (val) => {
			emit("triggleIsAdd", val);
		};
		return {
			options,
			comfirm,
			cancel,
			triggleIsAdd,
			argument,
			getTip,
		};
	},
});
</script>

<style>
</style>


<style scoped>
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