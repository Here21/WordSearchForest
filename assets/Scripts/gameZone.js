import _ from 'lodash';
import MEvent from './tools/MEvent';


cc.Class({
    extends: cc.Component,

    properties: {
        lineNode: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startPoint = null;
        this.endPoint = null;
        this.lineCollider = this.lineNode.getComponent(cc.BoxCollider);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        this.lineNode.node.opacity = 0;

        // this.rect = new cc.Rect();
        // this.rect.size = 30;
        // this.node.addChild(this.rect);

        this.node.on('touchstart', function(event) {
            // 修正点击位置
            this.startPoint = event.getStartLocation();
            this.lineNode.node.position = this.node.convertToNodeSpace(this.startPoint);
            
            this.lineNode.node.zIndex = 1;
            this.lineNode.node.opacity = 100;

            MEvent.addEvent('touch-first', function(ev) {
                console.log('touch-first --->',ev);
                this.lineNode.node.position = ev;
            }, this);
        }, this);


        this.node.on('touchmove', function (event) {
            MEvent.removeEventByType('touch-first');
            // console.log('Mouse move');
            // this.startPoint = event.getStartLocation();
            this.endPoint = event.getLocation();

            // 起点
            // this.lineNode.node.position = this.node.convertToNodeSpace(this.startPoint);
            // console.log('start:', this.startPoint, this.endPoint);
            // this.node.emit('slide', {
            //     start: this.startPoint,
            //     end: this.endPoint,
            // });

            // 计算
            let dt = cc.pSub(this.startPoint, this.endPoint);
            //计算角度
            let radian = Math.atan2(dt.x, dt.y); 
            let rotation = (180 * radian / Math.PI + 90) % 360;
            //旋转线条
            this.lineNode.node.rotation = rotation;
            //设置宽度，我这里是用宽度改变的线条长度
            this.lineNode.node.width = cc.pDistance(this.startPoint, this.endPoint);
            // this.lineNode.Collider.size.width = cc.pDistance(this.startPoint, this.endPoint);
            // this.lineCollider = this.lineNode.getComponent(cc.BoxCollider);
            this.lineCollider.enabled = false;
            this.lineCollider.size.width = cc.pDistance(this.startPoint, this.endPoint);
            this.lineCollider.offset.x = cc.pDistance(this.startPoint, this.endPoint) / 2;
            
            
            // console.log(this.node.convertToNodeSpace(this.startPoint));
            let s = this.node.convertToNodeSpace(this.startPoint);
            let e = this.node.convertToNodeSpace(this.endPoint);
            // var ctx = this.node.getComponent(cc.Graphics);
            // ctx.moveTo(this.node.convertToNodeSpace(this.startPoint));
            // ctx.lineTo(this.node.convertToNodeSpace(this.endPoint));
        }, this);

        this.node.on('touchend', function(event) {
            console.log('Mouse end');
            this.startPoint = null;
            this.endPoint = null;

            this.lineNode.node.width = 0;

            console.log('------', D.commonState.selectList.map(el => el.node.coord));

            // 碰撞组件
            this.lineCollider.enabled = true;

            // TODO: 解决同步问题
            setTimeout(() => {
                this.checkTargetWord();
            },300);
        }, this);
    },
    onCollisionEnter: function (other, self) {
        // console.log('!!!!!');
    },

    start () {

    },

    checkTargetWord: function() {
        const tar = _.find(D.commonState.answer, (el) => {
            let target = D.commonState.selectList.map(el => el.node.coord);
            return JSON.stringify(el.coord) === JSON.stringify(target) || JSON.stringify(el.coord) === JSON.stringify(target.reverse())
        })
        console.log(tar);
        if(tar) {
            D.commonState.selectList.forEach(el => {
                el.getComponent(cc.Sprite).spriteFrame = el.green;
            });
        } else {
            let nodes = [... D.commonState.selectList];
            nodes.forEach(el => {
                el.getComponent(cc.Sprite).spriteFrame = el.red;
            });
            setTimeout(() => {
                nodes.forEach(el => {
                    el.getComponent(cc.Sprite).spriteFrame = el.yellow;
                });
            }, 500);
        }
        D.commonState.selectList = [];
    }

    // update (dt) {},
});
