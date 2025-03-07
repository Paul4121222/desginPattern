/* 單例模式
 * 保證一個類別在整個應用程式只有一個實例，並提供一個存取點來訪問該實例
 * 目的: 避免重複創建，造成資源浪費
 * 常用於: 資料庫連線、log管理器等共享物件
 */

class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.logs = [];
    }
    return Logger.instance;
  }

  log(mes) {
    this.logs.push(mes);
  }

  getLogs() {
    return this.logs;
  }
}

const log1 = new Logger();
const log2 = new Logger();
log1.log("第一次記錄");
log2.log("第二次記錄");

console.log(log1.getLogs());
console.log(log1 === log2);

//當第一次Logger被創建時，會將this(當前物件)賦值給此類別，下一次創建時，就會返回第一個物件
