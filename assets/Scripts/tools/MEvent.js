const MEvent = {
    eventList: {},

    // 添加事件
    addEvent(type, fun, thisObject) {
        if (this.eventList[type] == null) {
            this.eventList[type] = [];
        }
        const len = this.eventList[type].length;
        this.eventList[type][len] = { "fun": fun, "this": thisObject };
    },

    //删除事件
    removeEvent(type, thisObject){
        let dic = this.eventList[type];
        if (dic == null) return;
        dic.forEach((item, i) => {
            if (dic[i]['this'] === thisObject) {
                dic.splice(i, 1);
            }
        });
    },

    removeEventByType(type) {
        this.eventList[type] = [];
    },

    //派发事件
    dispatchEvent(type, data) {
        let dic = this.eventList[type];
        if (!dic) return;
        for (let i = 0; i < dic.length; i++) {
			let data1 = dic[i];
			(data1["fun"]).apply(data1["this"], [data]);
        }
    },

    hasEvent(type) {
        let dic = this.eventList[type];
        if (!dic) return false;
        return true;
    },

    //删除无用事件类型
    gc() {

    },

    //清空事件列表事件类型
    cleanAll() {
        this.eventList = {};
    }
}
    
export default MEvent;
