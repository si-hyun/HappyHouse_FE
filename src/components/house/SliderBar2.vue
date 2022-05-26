<template>
  <div>
    <div class="form">
      <div>
        <h6 style="float: left">전용면적</h6>
        <br />
        <div style="display: none">
          <i-input
            id="areafrom"
            v-model="from"
            :disabled="disabled"
            style="width: 60px"
          />
          〜
          <i-input
            id="areato"
            v-model="to"
            :disabled="disabled"
            style="width: 60px"
          />
        </div>
      </div>
      <div><i-switch v-model="disabled" /></div>
    </div>
    <VueSlider
      v-model="value"
      :min="min"
      :max="max"
      :interval="interval"
      :disabled="disabled"
      :tooltip="tooltip"
      :tooltip-placement="tooltipPlacement"
      :tooltip-formatter="formatter"
      :tooltip-style="tooltipStyle"
      :dot-size="dotSize"
      :dot-style="dotStyle"
      :rail-style="railStyle"
      :process-style="processStyle"
    />
    <br />
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css"; // default.css or antd.css or material.css
import { Input, Switch } from "view-design";

export default {
  name: "Slider1",
  components: {
    VueSlider,
    "i-input": Input,
    "i-switch": Switch,
  },
  data() {
    return {
      from: null,
      to: null,
      // value: [0, 5000],
      min: 0,
      max: 500,
      interval: 1,
      disabled: false,
      tooltip: "active", // 'none' | 'always' | 'hover' | 'focus' | 'active'
      tooltipPlacement: "bottom", // 'top' | 'right' | 'bottom' | 'left'
      formatter: (v) => (v ? `${v.toLocaleString()}㎡` : " - "),
      tooltipStyle: {
        color: "#000",
        backgroundColor: "#fff",
        border: "2px solid #1E90FF",
      },
      dotSize: 20,
      dotStyle: {
        backgroundColor: "#1E90FF",
        // borderColor: "#f00",
      },
      railStyle: {
        border: "1px solid #cfcfcf",
        backgroundColor: "#fff",
      },
      processStyle: {
        border: "2px solid #1E90FF",
        backgroundColor: "#333",
      },
    };
  },
  computed: {
    value: {
      get() {
        return [this.from, this.to];
      },
      set(val) {
        this.from = val[0];
        this.to = val[1];
      },
    },
  },
  watch: {
    disabled(val) {
      if (val) {
        this.from = null;
        this.to = null;
      }
    },
  },
};
</script>

<style>
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
