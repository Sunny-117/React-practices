<template>
	<div class="interaction">
		<div class="curAdd" v-show="isAdd == 'cur'">
			<h4 class="title" @click="getEvent">当前添加</h4>
			<ul class="curAddItem" v-for="(item, index) in curEvent" :key="item">
				<li>
					触发方式 <span>{{ item.type }}</span>
				</li>
				<li>
					交互功能 <span>{{ item.action }}</span>
				</li>
				<li>
					打开类型 <span>{{ item.handleType }}</span>
				</li>
				<li>
					目标页面 <span>{{ item.argument }}</span>
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

		<AddEvent
			v-show="isAdd == 'add'"
			@triggleIsAdd="triggleIsAdd"
			@addEvent="addEvent"
		></AddEvent>
	</div>
</template>

<script>
import { ref, reactive, defineComponent, provide } from "vue";
import { useStore } from "vuex";
import AddEvent from "./AddEvent.vue";

export default defineComponent({
	name: "Interaction",
	components: {
		AddEvent,
	},
	setup() {
		const store = useStore();

		let isAdd = ref("cur");
		let curEvent = reactive([]);
		function triggleIsAdd(val) {
			isAdd.value = val;
		}

		let oriEvent = {
			type: "mouse",
			action: "click",
			handleType: "model",
			argument: "",
		};
		provide("oriEvent", oriEvent);

		provide("editEvent", null);

		function addEvent(arr) {
			curEvent.push(arr);
		}
		function deleteEvent(index) {
			curEvent.splice(index, 1);
		}
		function editEvent(index) {
			provide("editevent", curEvent[index]);
			this.deleteEvent(index);
			this.triggleIsAdd("add");
		}
		function getEvent() {
			if (store.getters["editPage/activeComponent"]) {
				curEvent = store.getters["editPage/activeComponent"].event;
			}
		}

		function changeEvent() {
			store.commit("editPage/setActiveComponentEvent", {
				event: [
					// 想添加或更新啥事件就写啥对象
					{},
				],
			});
		}

		return {
			isAdd,
			curEvent,
			triggleIsAdd,
			getEvent,
			oriEvent,
			deleteEvent,
			changeEvent,
			addEvent,
			editEvent,
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
</style>
