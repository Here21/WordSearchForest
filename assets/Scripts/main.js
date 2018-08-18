import { wordsearch } from './tools/util';
import MEvent from './tools/MEvent';

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
        wordBoardList: {
            default: null,
            type: cc.Node,
            serializable: true,
        },
        letterPrefab: {
            default: null,
            type: cc.Prefab,
        },
        wordPrefab: {
            default: null,
            type: cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log(MEvent);
        // 定义全局变量
        D.commonState.selectList = [];
        D.commonState.words = ['dog', 'cat', 'Tes', 'book', 'catepaer', 'answer'];
        // D.common.MEvent = MEvent;
        
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

        for(let w = 0; w < puzzle.answer.length; w++){
            const wordNode = cc.instantiate(this.wordPrefab);
            let text = wordNode.getChildByName('text').getComponent(cc.Label);
            text.string = puzzle.answer[w].word;
            let sign = wordNode.getChildByName('rightSign');
            sign.opacity = 0;
            this.wordBoardList.addChild(wordNode);
        }
       
    },

    start () {

    },

    // update (dt) {},
});
