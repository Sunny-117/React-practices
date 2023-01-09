<template>
	<div id="c-panel">
		<div class="sidebar">
			<button @click="sideExtension">
				<img :src="'/img/EditIcons/左右切换' + btnSrc + '.png'" />
			</button>
		</div>
		<div class="panel-content">
			<div :class="checkedOne === 0 ? 'L' : ''">
				<ul class="btn">
					<li
						@click="tabChange(index), changeShowInteraction()"
						:class="checkedOne == index ? 'tabSelected' : ''"
						:key="item.id"
						v-for="(item, index) in panelSwitchOptions"
					>
						{{ item.tag }}
					</li>
				</ul>

				<div
					class="attributes-panel"
					:class="checkedOne == 0 ? 'panelSelected' : ''"
				>
					<AttrStyle></AttrStyle>
				</div>
				<div
					class="interact-panel"
					:class="checkedOne != 0 ? 'panelSelected' : ''"
				>
					<Interaction v-show="showInteraction"></Interaction>
				</div>
			</div>
		</div>
		<!-- <div class="sidebar"></div> -->
	</div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useStore } from "vuex";

import AttrStyle from "../ControlPanel/AttrStyle.vue";
import Interaction from "../ControlPanel/Interaction.vue";

export default {
	name: "ControlPanel",
	components: {
		AttrStyle,
		Interaction,
	},
	setup() {
		const store = useStore();

		let showInteraction = ref(
			store.getters["editPage/activeComponent"] != null
		);
		function changeShowInteraction() {
			console.log(store.getters["editPage/activeComponent"] != null);
			showInteraction.value = store.getters["editPage/activeComponent"] != null;
		}
		watch(
			() => store.getters["editPage/activeComponent"],
			() => {
				showInteraction.value =
					store.getters["editPage/activeComponent"] != null;
			}
		);
		let btnSrc = ref("L");
		let checkedOne = ref(0);

		const sideExtension = () => {
			btnSrc.value = btnSrc.value == "L" ? "R" : "L";
			let cPanel = document.getElementById("c-panel");
			cPanel.style.left = cPanel.style.left != "0px" ? "0px" : "337px";
			// cPanel.style.transform = 'translate(' + (cPanel.style.marginLeft != '0px' ? '0%' : '95%') + ')';
			cPanel.style.marginLeft =
				cPanel.style.marginLeft != "0px" ? "0px" : "-285px";
		};

		const panelSwitchOptions = reactive([
			{
				id: 1,
				tag: "属性样式",
			},
			{
				id: 2,
				tag: "交  互",
			},
		]);

		const tabChange = (index) => {
			checkedOne.value = index;
		};

		return {
			btnSrc,
			checkedOne,
			sideExtension,
			panelSwitchOptions,
			tabChange,
			showInteraction,
			changeShowInteraction,
		};
	},
};
</script>
<style>
#c-panel button {
	transition: all 0.3s;
}
#c-panel button:hover {
	box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
}
</style>

<style scoped>
#c-panel {
	display: flex;
	margin-left: -285px;
	position: relative;
	width: 380px;
	height: 100%;
	left: 337px;
	background: #ffffff;
	box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
	border: 1px solid #eeeeee;
	box-sizing: border-box;
	transition: ease-in-out all 0.5s;
}
#c-panel .panel-content > .L {
	height: 100%;
	width: 100%;
	box-sizing: border-box;
}
.sidebar {
	position: relative;
	height: 100%;
}

.sidebar > button {
	position: absolute;
	width: 25px;
	height: 100px;
	left: -25px;
	top: 45%;
	outline: none;
	background-color: #4a8af4;
	border-radius: 6px 0px 0px 6px;
	border: none;
	box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.1607843137254902);
	cursor: pointer;
}

.sidebar > button img {
	width: 20px;
}
.panel-content {
	width: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	padding-left: 0.9375rem;
}

/* ----------- 滚动条 ----------- */
.panel-content::-webkit-scrollbar {
	width: 10px;
	height: 10px;
	background-color: #e9ebed;
}

/*定义滚动条轨道 内阴影+圆角*/
.panel-content::-webkit-scrollbar-track {
	border-radius: 6px;
	background-color: #e9ebed;
}

/*定义滑块 内阴影+圆角*/
.panel-content::-webkit-scrollbar-thumb {
	border-radius: 8px;
	background-color: #888888;
	-webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}

.attributes-panel,
.interact-panel {
	padding-right: 0.9375rem;
	display: none;
	margin: 0 auto;
}

.attributes-panel {
	padding-right: 0;
}
/* 选项啥啥的 */
.panel-content ul.btn {
	width: 100%;
	height: 5.625rem;
	list-style: none;
	overflow: hidden;
	background-color: #fff;
	transition: all 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
}
.panel-content .L ul.btn {
	background-color: #fafafb;
	border: 1px solid #e8e8e8;
	border-top: 0;
	border-right: 0;
}

.panel-content ul.btn li {
	float: left;
	width: 5.5rem;
	height: 36px;
	color: #333333;
	line-height: 36px;
	text-align: center;
	border-radius: 6px 0 0 6px;
	background-color: #fff;
	cursor: pointer;
	transition: all 0.3s;
	box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.1607843137254902);
}
.panel-content ul.btn li:nth-of-type(2) {
	border-radius: 0 6px 6px 0;
	margin-right: 5px;
}
.panel-content ul.btn li.tabSelected {
	color: #ffffff !important;
	background: #4a8af4;
}

.panelSelected {
	display: block !important;
}
</style>
