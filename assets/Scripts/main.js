import { wordsearch } from './util';

cc.Class({
    extends: cc.Component,

    properties: {
        gridLayout: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        letterPrefab: {
            default: null,
            type: cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // 定义全局变量
        D.commonState.selectList = [];
        D.commonState.words = ['dog', 'cat', 'Tes', 'book', 'catepaer', 'answer'];


        // console.log(puzzle);
        
        // 初始化棋盘
        const puzzle = wordsearch(D.commonState.words, 6, 6, 1, 2);
        console.log(puzzle);
        D.commonState.answer = puzzle.answer;
        // D.commonState.target

        for(let y = 0; y < puzzle.grid.length; y++) {
            for(let x = 0; x < puzzle.grid[y].length; x++) {
                const letterNode = cc.instantiate(this.letterPrefab);
                let letter = letterNode.getChildByName('letter').getComponent(cc.Label);
                letter.string = puzzle.grid[y][x];
                letterNode.coord = { y, x };
                this.gridLayout.addChild(letterNode);
                letterNode.x = x * letterNode.width + (x * 16) + (letterNode.width / 2);
                letterNode.y = y * letterNode.height + (y * 16) + (letterNode.height / 2);
            }
        }
       
    },

    start () {

    },

    // update (dt) {},
});
