
<script>
import "@/style/modal.css"
export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    selectedFood: {
      type: Object,
      required: true,
    },
    foodTypes: {
      type: Array,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>


