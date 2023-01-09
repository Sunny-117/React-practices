<script>
import { computed, defineComponent, h, inject } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    },
    transformer: {
      type: Function,
      default: (rawData) => rawData
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    if (!slots.default) return () => '空的';
    const store = useStore();

    const rawData = computed(() => store.state.editPage.components.get(props.id) ?? null);

    // 开的后门
    /** @type {Map<string, (raw: Record<string, string>) => unknown> | null} */
    const transformers = inject(
      '__userComponentTransformers',
      null
    );

    const transformer = computed(() =>
      transformers?.get(rawData.value?.tag) ?? props.transformer
    );
   
    const data = computed(() => transformer.value(rawData.value));

    const onClickWrapper = (cb) =>
      (e) => {
        emit('click', e);
        store.commit('editPage/setActiveComponent', props.id);
        if (cb) cb(e);
      };

    return () =>
      slots.default({ data: data.value })
        .map(
          comp => h(
            comp.type,
            {
              ...comp.props,
              onClick: onClickWrapper(comp.props /* 处理注释节点没有props */  && comp.props.onClick)
            },
            comp.children
          )
        );
  }
});
</script>
