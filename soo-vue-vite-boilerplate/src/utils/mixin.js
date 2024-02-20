export const mixinFormattingNumber = {
  data() {
    return {
      mixinTestData: 0,
    };
  },
  methods: {
    mixinComma(nums) {
      return nums.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
