import _ from 'lodash';

cc.Class({
    extends: cc.Component,

    properties: {
        rectNode: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startPoint = null;
        this.endPoint = null;
        this.test = this.rectNode.getComponent(cc.BoxCollider);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // this.rect = new cc.Rect();
        // this.rect.size = 30;
        // this.node.addChild(this.rect);

        this.node.on('touchmove', function (event) {
            // console.log('Mouse move');
            this.startPoint = event.getStartLocation();
            this.endPoint = event.getLocation();

            // 起点
            this.rectNode.node.position = this.node.convertToNodeSpace(this.startPoint);
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
            this.rectNode.node.rotation = rotation;
            //设置宽度，我这里是用宽度改变的线条长度
            this.rectNode.node.width = cc.pDistance(this.startPoint, this.endPoint);
            // this.rectNode.Collider.size.width = cc.pDistance(this.startPoint, this.endPoint);
            // this.test = this.rectNode.getComponent(cc.BoxCollider);
            this.test.enabled = false;
            this.test.size.width = cc.pDistance(this.startPoint, this.endPoint);
            this.test.offset.x = cc.pDistance(this.startPoint, this.endPoint) / 2;
            
            
            // console.log(this.node.convertToNodeSpace(this.startPoint));
            let s = this.node.convertToNodeSpace(this.startPoint);
            let e = this.node.convertToNodeSpace(this.endPoint);
            // var ctx = this.node.getComponent(cc.Graphics);
            // ctx.moveTo(this.node.convertToNodeSpace(this.startPoint));
            // ctx.lineTo(this.node.convertToNodeSpace(this.endPoint));

            // this.rect.x
            // D.MEvent.emit('slide', {
            //     start: { x: s.x, y: s.y },
            //     end: { x: e.x, y: e.y },
            // })
        }, this);

        this.node.on('touchend', function(event) {
            console.log('Mouse end');
            this.startPoint = null;
            this.endPoint = null;

            // 碰撞组件
            this.test.enabled = true;

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
