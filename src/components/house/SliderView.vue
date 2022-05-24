<template>
  <div>
    <slider-bar-1></slider-bar-1>
    <slider-bar-2></slider-bar-2>
    <slider-bar-3></slider-bar-3>
    <slider-bar-4></slider-bar-4>
    <button class="btn btn-outline-primary">검색</button>
  </div>
</template>

<script>
import SliderBar1 from "@/components/house/SliderBar1.vue";
import SliderBar2 from "@/components/house/SliderBar2.vue";
import SliderBar3 from "@/components/house/SliderBar3.vue";
import SliderBar4 from "@/components/house/SliderBar4.vue";

export default {
  name: "SliderView",
  components: {
    SliderBar1,
    SliderBar2,
    SliderBar3,
    SliderBar4,
  },
  methods: {},
};
</script>

<style></style>
