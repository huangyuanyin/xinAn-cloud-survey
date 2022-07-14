<template>
  <div id="termail" style='width: 100%;height: 100%;'></div>
</template>

<script lang="ts">
import 'xterm/css/xterm.css'
import { defineComponent, onMounted } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
export default defineComponent({
  setup() {
    onMounted(() => {
      var term = new Terminal();
      term.open(document.getElementById('termail'));
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    })
    return {}
  },
})
</script>

 