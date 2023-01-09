<template>
	<div class="attrStyle">
		<div v-if="tagOptions.text" class="text">
			<h4 class="title">文本</h4>
			<div class="core">
				<div>
					<el-select
						v-model="fontFamilys.value"
						class="fontFamily"
						placeholder="fontFamily"
					>
						<el-option
							v-for="item in fontFamilys.options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
					<el-color-picker
						class="colorChoose shadow-color"
						v-model="fontColor"
            show-alpha
					/>
				</div>
				<div>
					<el-select
						v-model="fontSizes.value"
						class="fontSize"
						placeholder="fontSize"
					>
						<el-option
							v-for="item in fontSizes.options"
							:key="item.value"
							:label="item.value"
							:value="item.value"
						/>
					</el-select>
				</div>
				<div>
					<span :class="getBIUSAClass('b')" @click="changeBIUSA('b')">
						<i />
					</span>
					<span :class="getBIUSAClass('i')" @click="changeBIUSA('i')">
						<i />
					</span>
					<span :class="getBIUSAClass('u')" @click="changeBIUSA('u')">
						<i />
					</span>
					<span :class="getBIUSAClass('s')" @click="changeBIUSA('s')">
						<i />
					</span>
					<span :class="getBIUSAClass('a')" @click="changeBIUSA('a')">
						<i />
					</span>
				</div>
				<div class="align">
					<span :class="getBIUSAClass('left')" @click="changeBIUSA('left')">
						<i />
					</span>
					<span :class="getBIUSAClass('center')" @click="changeBIUSA('center')">
						<i />
					</span>
					<span :class="getBIUSAClass('right')" @click="changeBIUSA('right')">
						<i />
					</span>
				</div>
			</div>
		</div>
		<div v-if="tagOptions.change" class="change">
			<h4 class="title">变换</h4>
			<div class="core">
				<div>
					<b>形状</b>
          <div style="flex-direction: column;">
            <div>
            	<em>W</em>
              <input style="max-width:36px; text-align:center" :value="width" @change="changeWidth" class="editable" contenteditable="true" />
              <el-select :model-value="widthUnits.value"  @change="changeWidthUnit" class="unit" placeholder="units">
                <el-option
                  v-for="item in widthUnits.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <em>H</em>
              <input style="max-width:36px; text-align:center" :value="height" @change="changeHeight" class="editable" contenteditable="true" />

              <el-select :model-value="heightUnits.value"  @change="changeHeightUnit"  class="unit" placeholder="units">
                <el-option
                  v-for="item in heightUnits.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
				
				</div>
				<div class="whole">
					<b>旋转</b>
					<i class="rotate" />
					<input @change="uncultivated" class="editable" contenteditable="true" />

					<span class="scale">
						<i />
					</span>
				</div>
			</div>
		</div>
		<div v-if="tagOptions.appearance" class="appearance">
			<h4 class="title">外观</h4>
			<div class="core">
				<div>
					<span class="square" @click="uncultivated">
						<i />
					</span>
					<span class="foursquare" @click="uncultivated">
						<i />
					</span>
					<input class="editable" contenteditable="true" />
					<input class="editable" contenteditable="true" />
					<input class="editable" contenteditable="true" />
					<input class="editable" contenteditable="true" />
				</div>
				<div class="alaph">
					<el-color-picker
						class="colorChoose background-color"
						v-model="BgColor"
            show-alpha
					/>
					<em class="bg">背景</em>

					<i class="water" />
					<input class="editable" contenteditable="true" v-model="opacity" />
					<em class="per">%</em>
					<b>不透明度</b>
				</div>

				<div>
          <input
            type="checkbox"
            :checked="hasBorder"
            @change="onSetBorder"
          >
          <b>边框</b>
          <el-color-picker
            class="colorChoose border-color"
            :model-value="borderColor"
            @update:model-value="(color) => onBorderChange('color', color)"
          />
        </div>
        <div class="border">
          <b>粗细</b>
          <input
            class="editable"
            contenteditable="true"
            :value="borderThickness"
            @change="(e) => onBorderChange('thickness', e.target.value)"
          >
          <b>类型</b>
          <el-select
            v-model="borderTypes.value"
            class="borderType"
            placeholder="borderType"
            @change="(type) => onBorderChange('type', type)"
          >
            <el-option
              v-for="item in borderTypes.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <input
            type="checkbox"
            :checked="hasShadow"
            @change="onSetShadow"
          >
          <b>阴影</b>
          <el-color-picker
            class="colorChoose shadow-color"
            :model-value="shadowColor"
            @update:model-value="(color) => onShadowChange('color', color)"
            show-alpha
          />
        </div>
        <div>
          <b>X轴</b>
          <b>Y轴</b>
          <b>模糊</b>
          <b>尺寸</b>
        </div>
        <div>
          <input
            class="editable"
            contenteditable="true"
            :value="shadowX"
            @change="(e) => onShadowChange('x', e.target.value)"
          >
          <input
            class="editable"
            contenteditable="true"
            :value="shadowY"
            @change="(e) => onShadowChange('y', e.target.value)"
          >
          <input
            class="editable"
            contenteditable="true"
            :value="shadowBlur"
            @change="(e) => onShadowChange('blur', e.target.value)"
          >
          <input
            class="editable"
            contenteditable="true"
            :value="shadowSpread"
            @change="(e) => onShadowChange('spread', e.target.value)"
          >
        </div>
      </div>
		</div>
		<div v-if="tagOptions.align" class="special WholeLayout">
			<h4 class="title">
				<span>特有 |</span>
				<span>HorizontalLayout VerticalLayout</span>
			</h4>
			<div class="core">
				<div class="vertical">
					<b>垂直方向</b>
					<span class="v-top" @click="changeVertical('flex-start')">
						<i />
					</span>
					<span class="v-center" @click="changeVertical('center')">
						<i />
					</span>
					<span class="v-bottom" @click="changeVertical('flex-end')">
						<i />
					</span>
					<span class="v-justify" @click="changeVertical('space-between')">
						<i />
					</span>
				</div>
				<div class="align">
					<b>水平方向</b>
					<span class="a-left" @click="changeAlign('flex-start')">
						<i />
					</span>
					<span class="a-center" @click="changeAlign('center')">
						<i />
					</span>
					<span class="a-right" @click="changeAlign('flex-end')">
						<i />
					</span>
					<span class="a-justify" @click="changeAlign('space-between')">
						<i />
					</span>
				</div>
			</div>
		</div>
		<div v-if="tagOptions.order" class="special childLayout">
			<h4 class="title">
				<span>特有 |</span>
				<span>HorizontalLayout-childNode VerticalLayout-childNode</span>
			</h4>
			<div class="core">
				<div>
					<button class="tobefore">次序前移</button>
					<button class="toafter">次序后移</button>
				</div>
				<div>
					<button class="tofirst">置于首位</button>
					<button class="tolast">置于末位</button>
				</div>
			</div>
		</div>
		<div v-if="tagOptions.position" class="special childPosition">
			<h4 class="title">
				<span>特有 |</span>
				<span>PositionLayout-childNode</span>
			</h4>
			<div class="core">
				<div>
					<b>位置</b>
					<em>X</em>
					<input class="editable" contenteditable="true" />

					<em>Y</em>
					<input class="editable" contenteditable="true" />
				</div>
				<div>
					<button class="toup">上移一层</button>
					<button class="todown">下移一层</button>
				</div>
				<div>
					<button class="totopmost">置于顶层</button>
					<button class="tobottommost">置于底层</button>
				</div>
			</div>
		</div>
		<div v-if="tagOptions.image" class="special image">
			<h4 class="title">
				<span>特有 |</span>
				<span>Image</span>
			</h4>
			<div class="core">
				<div class="i-percentage">
					<b>比例</b>
					<span class="11" @click="uncultivated">
						<b>1 : 1</b>
					</span>
					<span class="43" @click="uncultivated">
						<b>4 : 3</b>
					</span>
					<span class="169" @click="uncultivated">
						<b>16 : 9</b>
					</span>
				</div>
				<div>
					<b>图片地址[网络]</b>
				</div>
				<div>
					<input
						ref="urlContent"
						class="i-url"
						type="text"
						:value="compData.values.url"
					/>
				</div>
				<div>
					<button class="i-changeImg" @click="modifyUrl">确认更改</button>
				</div>
				<div>
					<input
						type="file"
						class="uploading"
						accept="image/*"
						@change="changeImageFile"
					/>
					<button class="i-uploading">上传图片</button>
				</div>
			</div>
		</div>
		<div v-if="tagOptions.textContent" class="special text">
			<h4 class="title">
				<span>特有 |</span>
				<span>Text</span>
			</h4>
			<div class="core">
				<div>
					<b>内容</b>
					<input
						ref="textContent"
						class="content"
						type="text"
						:value="compData.values.content"
					/>
				</div>
				<div>
					<button class="confirm" @click="modifyText(true)">确 定</button>
					<button class="cancel" @click="modifyText(false)">清 空</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue';
import { useStore } from "vuex";
import { tagToOptions } from "@/utils/tagToOptions/index.js";
import api from "@/api/index.js";
import style from "@/utils/style.json";
import {throttle} from 'lodash-es'

export default {
	name: "AttrStyle",
	setup() {
		// #region 超旭start
		const store = useStore();

		let initStatus = false;

		// 给当前组件设置样式
		function setStyle(obj) {
			if (initStatus) {
				return;
			}
			for (let attr in obj) {
				if (obj[attr].__v_isRef) {
					obj[attr] = obj[attr].value;
				}
			}
			store.commit("editPage/setActiveComponentStyle", obj);
		}

		// 这个就是判断组件都可以改那些值的对象
		let tagOptions = ref({
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

		let compData = ref();

		let textContent = ref(null);

		// 监听当前选择节点变化
		watch(
			() => store.getters["editPage/activeComponent"],
      throttle(
			() => {
				compData.value = store.getters["editPage/activeComponent"];
				if (compData.value != null) {
					tagOptions.value = tagToOptions(compData.value.tag);
					tagOptions.value.order = [
						"VerticalLayout",
						"HorizontalLayout",
					].includes(compData.value.parentTag);
					tagOptions.value.position = ["PositionLayout"].includes(
						compData.value.parentTag
					);
					initStatus = true;

					// text
					if (tagOptions.value.text) {
						// font-familys
						let cFontFamily = compData.value.style["font-family"];
						fontFamilys.value = cFontFamily
							? cFontFamily
							: style[compData.value.tag]["font-family"];

						// font-size
						let cFontSize = compData.value.style["font-size"];
						fontSizes.value = parseInt(
							cFontSize ? cFontSize : style[compData.value.tag]["font-size"]
						);

						// color
						let cColor = compData.value.style["color"];
						fontColor.value = cColor
							? cColor
							: style[compData.value.tag]["color"];
					}

					// appearance
					if (tagOptions.value.appearance) {
						// background-color
						let cBackgroundColor = compData.value.style["background-color"];
						BgColor.value = cBackgroundColor
							? cBackgroundColor
							: style[compData.value.tag]["background-color"];

						// opacity
						let cOpacity = compData.value.style["opacity"];
						opacity.value =
							parseFloat(
								cOpacity ? cOpacity : style[compData.value.tag]["opacity"]
							) * 100;
					}

          // change
          if(tagOptions.value.change){
            let reg = /[px | %]/ig
            // width
            // widthUnits
            let curWidth = compData.value.style.width;
            curWidth = curWidth ? curWidth : style[compData.value.tag].width;
            width.value = Number(curWidth.slice(0,curWidth.search(reg)));
            widthUnits.value = curWidth.slice(curWidth.search(reg));


            // height
            // heightUnits
            let curHeight = compData.value.style.height;
            curHeight = curHeight ? curHeight : style[compData.value.tag].height;
            height.value = Number(curHeight.slice(0,curHeight.search(reg)));
            heightUnits.value = curHeight.slice(curHeight.search(reg));
         }

					initStatus = false;
				} else {
					tagOptions.value = {};
				}
			}, 500),
      {
        deep: true
      }
		);

		watch(tagOptions, () => {
			console.log(tagOptions);
		});

		// 修改文本内容
		function modifyText(flag) {
			store.commit("editPage/setActiveComponentValues", {
				content: flag ? textContent.value.value : "",
			});
		}

		// #endregion 超旭end

		// #region 超旭start
		let fontFamilys = reactive({
			options: [{ value: "微软雅黑" }, { value: "宋体" }, { value: "黑体" }],
			value: "微软雅黑",
		});
		// #endregion 超旭end

		// #region 超旭start
		// 监听字体变化
		watch(
			() => fontFamilys.value,
			() => {
				setStyle({
					"font-family": fontFamilys.value,
				});
			}
		);
		// #endregion 超旭end

		// #region 超旭start
		let fontColor = ref(null);
		fontColor.value = "#ffe793";
		watch(
			() => fontColor.value,
			() => {
				setStyle({
					color: fontColor.value,
				});
			}
		);
		// #endregion 超旭end

		let fontSizes = reactive({
			options: [
				{ value: "8" },
				{ value: "10" },
				{ value: "12" },
				{ value: "14" },
				{ value: "16" },
				{ value: "18" },
				{ value: "20" },
				{ value: "24" },
				{ value: "26" },
				{ value: "28" },
			],
			value: "16",
		});

		// #region 超旭start
		// 监听文字大小变化
		watch(
			() => fontSizes.value,
			() => {
				setStyle({
					"font-size": fontSizes.value + "px",
				});
			}
		);

		let borderTypes = reactive({
			options: [{ value: "dashed" }, { value: "dotted" }, { value: "solid" }],
			value: "solid",
		});
		// BIUSA解释：
		// BIUSA分别代表B(加粗), I(斜体), U(下划线), S(删除线), A(英文变大写)
		// 由于text-align和这个操作方式相同
		// 所以text-align直接使用了BIUSA相关函数

		// 判断BIUSA的状态
		function checkBIUSA(attr) {
			if (attr == "b") {
				return compData.value.style["font-weight"] == "700";
			} else if (attr == "i") {
				return compData.value.style["font-style"] == "italic";
			} else if (attr == "u") {
				return compData.value.style["text-decoration"] == "underline";
			} else if (attr == "s") {
				return compData.value.style["text-decoration"] == "line-through";
			} else if (attr == "a") {
				return compData.value.style["text-transform"] == "uppercase";
			} else if (attr == "left") {
				return compData.value.style["text-align"] == "left";
			} else if (attr == "center") {
				return compData.value.style["text-align"] == "center";
			} else if (attr == "right") {
				return compData.value.style["text-align"] == "right";
			} else {
				return false;
			}
		}

		// 获取BIUSA的class
		function getBIUSAClass(attr) {
			let res = [attr];
			if (checkBIUSA(attr)) {
				res.push("active");
			}
			return res;
		}

		// 切换BIUSA
		function changeBIUSA(attr) {
			if (checkBIUSA(attr)) {
				if (attr == "b") {
					setStyle({ "font-weight": "400" });
				} else if (attr == "i") {
					setStyle({ "font-style": "normal" });
				} else if (attr == "u") {
					setStyle({ "text-decoration": "none" });
				} else if (attr == "s") {
					setStyle({ "text-decoration": "none" });
				} else if (attr == "a") {
					setStyle({ "text-transform": "none" });
				}
			} else {
				if (attr == "b") {
					setStyle({ "font-weight": "700" });
				} else if (attr == "i") {
					setStyle({ "font-style": "italic" });
				} else if (attr == "u") {
					setStyle({ "text-decoration": "underline" });
				} else if (attr == "s") {
					setStyle({ "text-decoration": "line-through" });
				} else if (attr == "a") {
					setStyle({ "text-transform": "uppercase" });
				} else if (attr == "left") {
					setStyle({ "text-align": "left" });
				} else if (attr == "center") {
					setStyle({ "text-align": "center" });
				} else if (attr == "right") {
					setStyle({ "text-align": "right" });
				}
			}
		}
		// #endregion 超旭end

		let text = reactive({});

		// #region 超旭start

		// 背景色
		let BgColor = ref(null);
		BgColor.value = "#fff";
		watch(
			() => BgColor.value,
			() => {
				setStyle({
					"background-color": BgColor,
				});
			}
		);

		// 透明度
		let opacity = ref(null);
		opacity.value = 100;
		watch(
			() => opacity.value,
			() => {
				setStyle({
					opacity: opacity.value / 100,
				});
			}
		);

		// #endregion 超旭end

		//#region 边框
		const componentBorder = computed(() =>
      compData.value?.style['border']
    );
	
		const hasBorder = computed(() => 
      !(componentBorder.value === undefined
        || componentBorder.value === 'none')
    );

    const defaultBorder = '1px solid #bbbbbb';
		const onSetBorder = (e) => {
      const bool = e.target.checked;
      setStyle({ 'border': bool ? defaultBorder : 'none' });
    };
	
		/** @type {import('vue').ComputedRef<string[]>} */
    const borderToken = computed(() => {
      /** expect border: 1px solid #bbbbbb; */
      const splits = hasBorder.value ?
        componentBorder.value.split(' ') :
        defaultBorder.split(' ');
      const thickness = splits[0].slice(0, -2);
			const type = splits[1];
      const color = splits[2];
      /** return ['1','solid','#bbbbbb'] */
      return [thickness, type, color];
    });

		const borderColor = computed(() =>
      borderToken.value[2]
				?? /** 如果变量是 undefined */ '#bbbbbb'
    );
    const borderThickness = computed(() => borderToken.value[0]);

		/** @typedef {'thickness' | 'type' | 'color'} BorderChangeType */
    /** @type {(type: BorderChangeType; val: string) => void} */
    const onBorderChange = (type, val) => {
			if (hasBorder.value) {
        const template = ({
					thickness = borderThickness.value,
					type = borderTypes.value,
					color = borderColor.value
				}) => `${thickness}px ${type} ${color}`;
        let s;
				switch (type) {
					case 'thickness':
						s = template({ thickness: val });
						break;
					case 'type':
						s = template({ type: val });
						break;
					case 'color':
						s = template({ color: val });
						break;
					default:
						throw new TypeError('unrecognized border type: ' + type);
				}
				setStyle({ 'border': s });
			}
    };
    //#endregion 边框
	
    //#region 阴影
    /** @type {import('vue').ComputedRef<string | undefined>} */
    const componentShadow = computed(() =>
      compData.value?.style['box-shadow']
    );

    const hasShadow = computed(() => 
      !(componentShadow.value === undefined
        || componentShadow.value === 'none')
    );

    const defaultShadow = '1px 1px 1px 1px rgba(0,0,0,1)';
    const onSetShadow = (e) => {
      const bool = e.target.checked;
      setStyle({ 'box-shadow': bool ? defaultShadow : 'none' });
    };
   
    /** @type {import('vue').ComputedRef<string[]>} */
    const shadowTokens = computed(() => {
      /** expect box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
      const splits = hasShadow.value ?
        componentShadow.value.split(' ') :
        defaultShadow.split(' ');
      const px = splits.slice(0, 4).map(s => s.slice(0, -2));
      const color = splits.slice(4).join('');
      /** return ['2','2','2','2','rgba(0,0,0,0.2)'] */
      return [...px, color];
    });
		
    const shadowColor = computed(() =>
      shadowTokens.value[4]
				?? /** 如果变量是 undefined */ 'rgba(255, 255, 255, 1)'
    );

    const shadowX = computed(() => shadowTokens.value[0]);
    const shadowY = computed(() => shadowTokens.value[1]);
    const shadowBlur = computed(() => shadowTokens.value[2]);
    const shadowSpread = computed(() => shadowTokens.value[3]);

    /** @typedef {'x' | 'y' | 'blur' | 'spread' | 'color'} ShadowChangeType */
    /** @type {(type: ShadowChangeType; newValue: string) => void} */
    const onShadowChange = (type, newValue) => {
      if (hasShadow.value) {
        const template =
					(x, y, blur, spread, color) =>
					  `${x}px ${y}px ${blur}px ${spread}px ${color}`;
        let s;
        switch (type) {
        case 'x':
          s = template(newValue, shadowY.value, shadowBlur.value, shadowSpread.value, shadowColor.value);
          break;
        case 'y':
          s = template(shadowX.value, newValue, shadowBlur.value, shadowSpread.value, shadowColor.value);
          break;
        case 'blur':
          s = template(shadowX.value, shadowY.value, newValue, shadowSpread.value, shadowColor.value);
          break;
        case 'spread':
          s = template(shadowX.value, shadowY.value, shadowBlur.value, newValue, shadowColor.value);
          break;
        case 'color':
          s = template(shadowX.value, shadowY.value, shadowBlur.value, shadowSpread.value, newValue);
          break;
        default:
          throw new Error('unrecognize tag: ' + type);
        }
        setStyle({ 'box-shadow': s });
      }
    };
    //#endregion 阴影


    // #region 远安 start

    // 监听组件的高度和宽度的变化
    let width = ref(0);
    let widthUnits = reactive({
      options: [{ value: 'px' }, { value: '%' }],
      value: 'px',
    });
    
    let height = ref(0);
    let heightUnits = reactive({
      options: [{ value: 'px' }, { value: '%' }],
      value: 'px',
    });

    const changeHeight = (e) => {
      setStyle({
        height: e.target.value + heightUnits.value
      })
    }

    const changeHeightUnit = (u) => {
      console.log(u);
      setStyle({
        height: height.value + u
      })
    }

    const changeWidth = (e) => {
      setStyle({
        width: e.target.value + widthUnits.value
      })
    }

    const changeWidthUnit = (u) => {
      console.log(u);
      setStyle({
        width: width.value + u
      })
    }

    

    // #endregion 



		// #region 超旭start
		let urlContent = ref(null);
		function modifyUrl() {
			store.commit("editPage/setActiveComponentValues", {
				url: urlContent.value.value,
			});
		}

		function changeImageFile(e) {
			console.log(e.target.files);
			api.uploadImg(e.target.files[0]).then((data) => {
				if (data.flag) {
					store.commit("editPage/setActiveComponentValues", {
						url: data.data.url,
					});
				} else {
					alert("上传失败");
				}
			});
		}

		// 未开发事件
		function uncultivated() {
			alert("敬请期待");
		}
		// #endregion 超旭end

		//runnging-snails  begin
		const changeVertical = (type) => {
			setStyle({ 'align-items': type });
		};

		const changeAlign = (type) => {
			setStyle({ 'justify-content': type });
		};
		//runnging-snails  end

		return {
			// #region 超旭start
			tagOptions,
			compData,
			getBIUSAClass,
			changeBIUSA,
			opacity,
			modifyUrl,
			modifyText,

			// ref dom元素
			textContent,
			urlContent,

			// #endregion 超旭end

			fontFamilys,
			fontColor,
			fontSizes,
			BgColor,

			///#region 边框
      hasBorder,
      borderColor,
      borderThickness,

      onSetBorder,
			onBorderChange,
      ///#endregion 边框

      //#region 阴影
      hasShadow,
      shadowColor,
      shadowX,
      shadowY,
      shadowBlur,
      shadowSpread,

      onSetShadow,
      onShadowChange,
      //#endregion 阴影

			borderTypes,

			// #region 超旭start
			changeImageFile,
			uncultivated,
			// #endregion 超旭end

			changeVertical,
			changeAlign,


      // 变换
      width,
      height,
      widthUnits,
      heightUnits,
      changeHeight,
      changeWidth,
      changeHeightUnit,
      changeWidthUnit
		};
	},
};
</script>

<style>
.el-color-picker__trigger {
	width: 40px;
	height: 25px;
	padding: 0;
	border-color: #dddddd;
	border-radius: 2px;
}
.el-color-picker__color {
	border: 0;
}
.el-color-picker {
	margin-right: 0.5rem;
}
.el-input__inner {
	height: 25px;
	border-radius: 0.125rem;
	padding-right: 20px;
	padding-left: 5px;
}
.el-select--default {
	margin-top: 0;
}
</style>

<style scoped>
.attrStyle {
	padding-bottom: 40px;
}
.attrStyle > div {
	width: 100%;
	background-color: #fafafb;
	border: 1px solid #e8e8e8;
	border-top: 0;
	border-right: 0;
	padding: 0.9375rem 0;
}
.attrStyle > div .title {
	width: 90%;
	margin: 0 auto;
	font-size: 0.875rem;
	position: relative;
}
.attrStyle > div .title > span {
	display: block;
	/* float: left; */
	width: 43px;
}
.attrStyle > div.special .title {
	margin-bottom: 1.25rem;
}

.attrStyle > div .title > span:nth-of-type(2) {
	width: calc(100% - 45px);
	font-size: 0.625rem;
	position: absolute;
	top: -5px;
	left: 43px;
	font-weight: 400;
}
.attrStyle > div.childPosition .title > span:nth-of-type(2),
.attrStyle > div.image .title > span:nth-of-type(2),
.attrStyle > div.text .title > span:nth-of-type(2) {
	top: 3px;
}

.attrStyle > div .core {
	width: 12rem;
	margin: 0 auto;
	/* background-color: #fff; */
	font-size: 0.75rem;
}
.core div {
	display: flex;
	margin-top: 10px;
	align-items: center;
}
.core div > b {
	font-weight: normal;
	margin-right: 10px;
	color: #666666;
}
.text .core .fontFamily {
	margin-top: 0;
	width: 70%;
	margin-right: 0.625rem;
}
.text .core div .fontSize {
	/* width: 33px; */
	width: 70%;
	margin-top: 0;
}
.change .core div div.unit {
	width: 65px;
	margin-top: 0;
}
/*  #region colorChoose  */
.appearance .core div em.bg {
	/* margin-right: 10px; */
}
/*  #endregion  */

/* #region       em input.editable              */
.core div em {
	font-style: normal;
	font-size: 0.75rem;
	color: #666666;
	margin-right: 2px;
}
.core div input.editable {
	min-width: 10px;
	max-width: 19px;
	height: 25px;
	font-style: normal;
	font-size: 0.75rem;
	color: #666666;
	display: inline-block;
	padding: 2px 2px;
	border: 0;
	border-bottom: 2px #bbbbbb solid;
	margin-right: 10px;
	outline: none;
	background-color: transparent;
}

.change .core div i.rotate {
	display: inline-block;
	width: 15px;
	height: 17px;
	background: url("/img/EditIcons/change.png") no-repeat -55px 2px;
	background-size: 470%;
}
.appearance .core div i.water {
	display: inline-block;
	width: 15px;
	height: 17px;
	background: url("/img/EditIcons/appearance.png") no-repeat -31px 2px;
	background-size: 300%;
	margin-left: 10px;
}
.appearance .core div:nth-of-type(1) > input.editable {
	margin-right: 0.1875rem;
}
.appearance .core div:nth-of-type(1) > input.editable:nth-of-type(1) {
	margin-left: 8px;
}

.appearance .core div.alaph em.per {
	color: #bbbbbb;
	position: relative;
	left: -5px;
}
.appearance .core div.alaph em {
	margin-right: 0;
}
.appearance .core div.alaph b {
	margin-left: 2px;
	margin-right: 0;
}
.appearance .core div.alaph .editable {
	margin-right: 3px;
}
.appearance .core div input[type="checkbox"] {
	margin-right: 10px;
}

.appearance .core div.border .borderType {
	width: 80px;
	margin-top: 0;
}
.appearance .core > div:nth-last-of-type(2) {
	margin-bottom: 0;
}
.appearance .core > div:nth-last-of-type(1) {
	margin-top: 0;
}
/* #endregion */

/* #region          span i icon                    */

.core div > span {
	width: 14px;
	height: 15px;
	background: #ffffff;
	border: 1px solid #dddddd;
	border-right: 0;
	padding: 4px 9px;
	/* box-sizing: border-box; */
	cursor: pointer;
}
.core div > span:nth-of-type(1) {
	border-radius: 2px 0px 0px 2px;
}
.core div > span:nth-last-of-type(1) {
	border-radius: 0 2px 2px 0;
	border-right: 1px solid #dddddd;
}

.core div > span i {
	overflow: hidden;
	display: block;
	width: 100%;
	height: 100%;
	background: url("/img/EditIcons/text.png") no-repeat 0px 1px;
	background-size: 502%;
}
/* 字体形状 */
/* .text .core div > span:hover i, */
.text .core div > span.active i {
	background-position-y: -13px;
}

.text .core div > span:nth-of-type(2) i {
	background-position-x: -13px;
}
/* .text .core div > span:nth-of-type(2):hover i, */
.text .core div > span:nth-of-type(2).active i {
	background-position-y: -12px;
}
.text .core div > span:nth-of-type(3) i {
	background-position-x: -28px;
}
/* .text .core div > span:nth-of-type(3):hover i, */
.text .core div > span:nth-of-type(3).active i {
	background-position-y: -13px;
}
.text .core div > span:nth-of-type(4) i {
	background-position-x: -41px;
}
/* .text .core div > span:nth-of-type(4):hover i, */
.text .core div > span:nth-of-type(4).active i {
	background-position-y: -13px;
}
.text .core div > span:nth-of-type(5) i {
	background-position-x: -56px;
}
/* .text .core div > span:nth-of-type(5):hover i, */
.text .core div > span:nth-of-type(5).active i {
	background-position-y: -14px;
}

/* 对齐 */
.text .core div.align > span i {
	background-position-y: -28px;
}
/* .text .core div.align > span:hover i, */
.text .core div.align > span.active i {
	background-position-y: -41px;
}
.text .core div.align > span:nth-of-type(2) i {
	background-position-y: -27px;
}
/* .text .core div.align > span:nth-of-type(2):hover i, */
.text .core div.align > span:nth-of-type(2).active i {
	background-position-y: -41px;
}
.text .core div.align > span:nth-of-type(3) i {
	background-position-y: -28px;
}
/* .text .core div.align > span:nth-of-type(3):hover i, */
.text .core div.align > span:nth-of-type(3).active i {
	background-position-y: -42px;
}

/* 变换 */
.change .core div.whole > span i {
	background-image: url("/img/EditIcons/change.png");
	background-position-y: -55px;
}
/* .change .core div.whole > span:hover i, */
.change .core div.whole > span.active i {
	background-position-y: -70px;
}
.change .core div.whole > span:nth-of-type(2) i {
	background-position-x: -14px;
}
.change .core div.whole > span:nth-of-type(2) {
	border-right: 1px solid #e8e8e8;
}
/* 1:1 */
.change .core div.whole > span:nth-last-of-type(1) {
	border-radius: 2px;
	margin-left: 0.9375rem;
}
.change .core div.whole > span:nth-last-of-type(1) i {
	background-position: -61px -31px;
	background-size: 540%;
}
/* .change .core div.whole > span:nth-last-of-type(1):hover i, */
.change .core div.whole > span:nth-last-of-type(1).active i {
	background-position: -61px -45px;
}

/* 外观 */
.appearance .core div > span i {
	width: 15px;
	background-image: url("/img/EditIcons/appearance.png");
	background-position: 0 0;
	background-size: 291%;
}
/* .appearance .core div > span:hover i, */
.appearance .core div > span.active i {
	background-position-y: -14px;
}
.appearance .core div > span:nth-of-type(2) i {
	background-position-x: -15px;
}

/* 特有1 WholeLayout */

.WholeLayout .core div > span i {
	background-image: url("/img/EditIcons/change.png");
	background-size: 700%;
	background-position: -2px -2px;
}
/* .WholeLayout .core div > span:hover i, */
.WholeLayout .core div > span.active i {
	background-position-y: -21px;
}
.WholeLayout .core div:nth-of-type(1) > span i {
	background-position-y: -41px;
}
/* .WholeLayout .core div:nth-of-type(1) > span:hover i, */
.WholeLayout .core div:nth-of-type(1) > span.active i {
	background-position-y: -61px;
}
.WholeLayout .core div > span:nth-of-type(2) i {
	background-position-x: -22px;
}
.WholeLayout .core div > span:nth-of-type(3) i {
	background-position-x: -42px;
}
.WholeLayout .core div > span:nth-of-type(4) i {
	background-position: -52px -1px;
	background-size: 600%;
}
/* .WholeLayout .core div > span:nth-of-type(4):hover i, */
.WholeLayout .core div > span:nth-of-type(4).active i {
	background-position-y: -17px;
}
.WholeLayout .core div:nth-of-type(2) > span:nth-of-type(4) i {
	background-position: -52px -34px;
	background-size: 600%;
}

/* .WholeLayout .core div:nth-of-type(2) > span:nth-of-type(4):hover i, */
.WholeLayout .core div:nth-of-type(2) > span:nth-of-type(4).active i {
	background-position: -52px -51px;
	background-size: 600%;
}
/* #endregion */

/* 特有2 childLayout 4个btn */
.core div button {
	padding: 0.3125rem 0.625rem;
	background-color: #4a8af4;
	outline: none;
	border: none;
	border-radius: 2px;
	font-size: 0.8125rem;
	color: #fff;
	margin-right: 0.625rem;
}
.core div button:nth-last-of-type(1) {
	margin-right: 0;
}

/* 特有4 image */
.image .core div span {
	width: auto;
	height: auto;
	padding: 0.3125rem 0.1875rem;
	border: 1px solid #dddddd;
	border-radius: 2px;
	margin-right: 0.625rem;
}
.image .core div span b {
	font-weight: normal;
	font-size: 0.75rem;
	color: #666666;
}
.image .core div:nth-last-of-type(1) {
	text-align: center;
}
.core div input[type="text"] {
	outline: none;
	border: 1px solid #dddddd;
	background-color: #fff;
	width: 100%;
	height: 1.5625rem;
	padding: 0 0.625rem;
	color: #333;
}
.image .core div button {
	padding: 0.3125rem 20px;
	margin: 0 auto;
}
.image .core div {
	position: relative;
}
.image .core div input.uploading {
	width: 88%;
	height: 25px;
	position: absolute;
	box-sizing: border-box;
	left: -26px;
	opacity: 0;
	cursor: pointer;
}

/* 特有5 text */

.text .core div button {
	padding: 0.3125rem 25px;
	border: 1px solid #4a8af4;
	/* margin-left: 10px; */
	margin-left: 9px;
}
.text .core div button.cancel {
	background-color: #fff;
	color: #4a8af4;
	border: 1px solid #dadce0;
}
.text .core div input {
	width: 70%;
}
</style>