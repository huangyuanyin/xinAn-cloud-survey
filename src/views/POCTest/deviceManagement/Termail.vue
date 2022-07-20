<template>
  <div>
    <div class="console" id="terminal"></div>
  </div>

</template>
<script>
import Terminal from '../../../config/Xterm'
export default {
  name: 'Console',
  props: {
    terminal: {
      type: Object,
      default: {
        pid: 1,
        name: 'terminal',
        cols: 400,
        rows: 400
      }
    }
  },
  data() {
    return {
      term: null,
      terminalSocket: null
    }
  },
  methods: {
    runRealTerminal() {
      console.log('webSocket is finished')
    },
    errorRealTerminal() {
      console.log('error')
    },
    closeRealTerminal() {
      console.log('close')
    }
  },
  mounted() {
    console.log('pid : ' + this.terminal.pid + ' is on ready')
    let terminalContainer = document.getElementById('terminal')
    this.term = new Terminal({
      cursorBlink: true,
      rendererType: "canvas", //渲染类型
      convertEol: true, //启用时，光标将设置为下一行的开头
      scrollback: 50, //终端中的回滚量
      disableStdin: false, //是否应禁用输入
      // cursorStyle: "underline", //光标样式
      cursorBlink: true, //光标闪烁
      theme: {
        foreground: "#ECECEC", //字体
        background: "#000000", //背景色
        cursor: "help", //设置光标
        lineHeight: 20
      }
    })
    this.term.open(terminalContainer)
    // open websocket
    // this.terminalSocket = new WebSocket('ws://127.0.0.1:3000/terminals/')
    this.terminalSocket = new WebSocket('ws://10.20.70.73:3000/terminals/')
    this.terminalSocket.onopen = this.runRealTerminal
    this.terminalSocket.onclose = this.closeRealTerminal
    this.terminalSocket.onerror = this.errorRealTerminal
    this.term.attach(this.terminalSocket)
    this.term._initialized = true
    console.log('mounted is going on')
  },
  beforeDestroy() {
    this.terminalSocket.close()
    this.term.destroy()
  }
}
</script>

<style lang="scss" scoped>
.console {
  width: 100%;
  height: 100%;
}
</style>
 