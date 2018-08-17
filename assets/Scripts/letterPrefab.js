// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        green: {
            default: null,
            type: cc.SpriteFrame,
            serializable: true,
        },
        red: {
            default: null,
            type: cc.SpriteFrame,
            serializable: true,
        },
        yellow: {
            default: null,
            type: cc.SpriteFrame,
            serializable: true,
        },
        letter: {
            default: null,
            type: cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.collision = cc.director.getCollisionManager();
        this.collision.enabled = true;
        this.collision.enabledDebugDraw = false;
        // console.log('122222',D);
        // D.MEvent.on('slide', this.onHandleMatch, this);
    },
    onCollisionEnter: function (other, self) {
        console.log('---- letter --- !!!!!', this.node.coord);
        D.commonState.selectList.push(this);
    },
    start () {
        
    },
    onHandleMatch: function(event) {
        console.log(event);
        if (cc.Intersection.lineRect(event.start, event.end, this.node)) {
            console.log('---------------',this.node.x, this.node.y);
            this.letter.node.opacity = '30'
        } else {
            this.letter.node.opacity = '255'
        }
        // if (cc.Intersection.pointInPolygon(event.start, this.node)) {
        //     console.log('---------------',this.node.world);
        //     this.letter.node.opacity = '30'
        // }
    }

    // update (dt) {},
});
