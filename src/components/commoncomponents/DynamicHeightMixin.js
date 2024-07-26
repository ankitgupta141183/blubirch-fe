export const DynamicHeightMixin = {
    data() {
      return {
        windowHeight: window.innerHeight,
      };
    },
    computed: {
      calculateTableHeight() {
        const multiplier = this.windowHeight < 800 ? 0.56 : 0.6;
        return `${this.windowHeight * multiplier}px`;
      },
    },
    mounted() {
      window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowHeight = window.innerHeight;
      },
    },
  };