/**
 * 事件处理类
 */

export class Events {
    // 事件列表
    private events: { [key: string]: any };
    // 单次事件列表
    private eventsOne: { [key: string]: any };
  
    constructor() {
      this.events = {};
      this.eventsOne = {};
    }
  
    /**
     * 事件监听
     * @param {String} eventName 事件名称
     * @param {Function} callback 事件触发后执行的回调函数
     */
    public on(eventName: string, callback: (data?: any) => void): () => void {
      // 获取已存在的单次事件列表
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      // 添加至数组
      this.events[eventName].push(callback);
      return callback;
    }
  
    /**
     * 事件监听 (单次)
     * @param {String} eventName 事件名称
     * @param {Function} callback 事件触发后执行的回调函数
     */
    public once(eventName: string, callback: (data?: any) => void): () => void {
      // 获取已存在的单次事件列表
      if (!this.eventsOne[eventName]) {
        this.eventsOne[eventName] = [];
      }
      // 添加至数组
      this.eventsOne[eventName].push(callback);
      return callback;
    }
  
    /**
     * 事件触发
     * @param {String} eventName 事件名称
     * @param {Object} data 传参参数值
     */
    public emit(eventName: string, data = {}) {
      // 获取全部事件列表 和 单次事件列表，并且合并
      const es = [
        ...(this.events[eventName] || []),
        ...(this.eventsOne[eventName] || [])
      ];
      // 遍历触发
      // for (let f of es) {
      //     f && f.call(f, data)
      // }
      for (let i = 0, l = es.length; i < l; i += 1) {
        const f = es[i];
        if (f) {
          f.call(f, data);
        }
      }
      // 单次事件清空
      this.eventsOne[eventName] = [];
    }
  
    /**
     * 清空当前页面事件
     * @param {String} eventName 事件名称
     */
    public off(eventName: string, callback?: (data?: any) => void, offAll = true) {
      if (callback && typeof callback === "function") {
        this.events[eventName] = (this.events[eventName] || []).filter(func => {
          return func !== callback;
        });
        this.eventsOne[eventName] = (this.events[eventName] || []).filter(func => {
          return func !== callback;
        });
      } else if(offAll) {
        // 清空事件列表
        this.events[eventName] = [];
        this.eventsOne[eventName] = [];
      }
    }
  
    /**
     * 移除页面单次事件
     * @param {String} eventName 事件名称
     */
    public offOnce(eventName: string, callback?: (data?: any) => void, offAll = true) {
      if (callback && typeof callback === "function") {
        
        this.eventsOne[eventName] = (this.events[eventName] || []).filter(func => {
          return func !== callback;
        });
      } else if(offAll){
        // 清空事件列表
        this.eventsOne[eventName] = [];
      }
    }
  
    public getEvents(eventName: string) {
      return {
        events: this.events[eventName],
        eventsOne: this.eventsOne[eventName]
      };
    }
  }
  
  