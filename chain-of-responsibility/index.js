/* 責任鏈
 * 如果有一系列的處理，每個都層層相扣，即可透過此設計模式處理
 * 透過沿著一條處理器鏈傳遞，直到找到可以處理的處理器，這樣可以讓請求的發送者跟接受者解耦
 * 特點: 1.減少if-else 2.可動態新增處理器，再調整chain即可
 */

//情境: 紀錄請求(log)，條件是需要通過不同的審核流程: 1.有userID 2.有權限，通過之後才發log

class Handler {
  constructor() {
    this.next = null;
  }

  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(request) {
    if (this.next) {
      this.next.handle(request);
    }

    return null; //沒有下個處理器
  }
}

class CheckIdHandler extends Handler {
  handle(request) {
    if (!request.userId) {
      return console.log("user id 缺少。");
    }
    super.handle(request);
  }
}

class CheckPermissionHandler extends Handler {
  handle(request) {
    if (!request.admin) {
      return console.log("非admin");
    }
    super.handle(request);
  }
}

class LogHandler extends Handler {
  handle(request) {
    if (request.log) {
      console.log("成功顯示:", request.log);
    } else {
      return console.log("缺少log訊息");
    }

    super.handle(request);
  }
}

const checkIdHandler = new CheckIdHandler();
const checkPermissionHandler = new CheckPermissionHandler();
const logHandler = new LogHandler();
checkIdHandler.setNext(checkPermissionHandler).setNext(logHandler);

console.log("🛠 測試請求 1：缺少 userId");
checkIdHandler.handle({ isAdmin: true });

console.log("\n");

// 測試請求 2：沒有管理員權限 (失敗)
console.log("🛠 測試請求 2：非管理員");
checkIdHandler.handle({ userId: 123, admin: false });
console.log("\n");

console.log("🛠 測試請求 3：沒有log內容");
checkIdHandler.handle({ userId: 123, admin: true });
console.log("\n");

console.log("🛠 測試請求 ：成功顯示log");
checkIdHandler.handle({ userId: 123, admin: true, log: "學習是無止盡" });

//每個判斷都由handler自己決定，且當需要實作新的規則，只要新增一個新的Handler，再調整chain即可
