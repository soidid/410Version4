/** @jsx React.DOM */

var React = require('react/addons');

/* ===== GET JSON ======= */
var hash = window.location.hash.substring(1); // remove #
if(hash === "referendum"){
  var data = require("../../data/referendum");//公投
}
if(hash === "dismiss"){
  var data = require("../../data/dismiss");//選罷
}

var levelData = require("../../data/level");
var positionData = require("../../data/position");

///////////////////////////////////////////////////
/* ===== Components ======= */
var Progress = require('../Progress/Progress.jsx');
var Intro = require('../Intro/Intro.jsx');
var BillVersion = require('../BillVersion/BillVersion.jsx');
var IssueSummary = require('../IssueSummary/IssueSummary.jsx');
var NavIndicator = require('../NavIndicator/NavIndicator.jsx');

//

require('./App.css');

var App = React.createClass({

  getInitialState(){
    return {
       currentIndex: 0,
       touchStartX: null,
       touchStartY: null,
       touchEndX: null,
       touchEndY: null,
       max: 5 // MaxIndex = data.length-1
    }
  },

  componentWillMount(){
    React.initializeTouchEvents(true);
  },

  _onTouchStart(event){
    this.setState({
      touchStartX: event.touches[0].clientX,
      touchStartY: event.touches[0].clientY
    });
  },

  _onTouchEnd(event){
    var state = this.state;
    var moveX = state.touchEndX - state.touchStartX;
    var moveY = state.touchEndY - state.touchStartY;
   
    currentIndex = state.currentIndex;

    //console.log("x:"+Math.abs(moveX)+", y:"+Math.abs(moveY));
    // 40 is threshold
    if(Math.abs(moveX) < 40 || Math.abs(moveY) > 50){
       return;

    }
    // Slide Direction
    if(moveX > 0){//toggle Prev
        currentIndex = currentIndex -1;
        if(currentIndex < 0)
           currentIndex = state.max;
    
    }else{//toggle Next
        currentIndex = currentIndex + 1;
        if(currentIndex > state.max)
           currentIndex = currentIndex % (state.max+1);
       
    }
    
    this.setState({
      currentIndex: currentIndex
    });
    
  },
  
  _onTouchMove(event){
    this.setState({
      touchEndX: event.touches[0].clientX,
      touchEndY: event.touches[0].clientY
    });
  },

  _onSetIndex(value){
    this.setState({
      currentIndex: value
    });
  },

  render () {
    

    var classSet = React.addons.classSet;
   
    var navItem = (data) ? <NavIndicator data={data}
                                         currentIndex={this.state.currentIndex}
                                         indexHandler={this._onSetIndex} /> : "";

    // traverse through issues 不同訴求
    var issueItems = (data) ? (data.issues.map((item,key)=>{
        

        // traverse through different versions of bill 不同提案

        //根據版本數計算圖表高度
        var legendHeight = 0
        var versionCount = item.proposedBill.length;
        if(versionCount >= 2){
            legendHeight = 110 + (versionCount-2) * 40;
        }
        var legendBorderStyle = {
            "height" : legendHeight - 40

        }

        //下方各版本
        var versionItems = item.proposedBill.map((i,k)=>{
            return (
                <div className="App-billVersion"
                      key={k} >
                    <BillVersion data={i}
                                 levelData={levelData}/>
                </div>
            )
        });


        // 上方各審查階段圖示
        var progressItem = (versionCount>0) ? 
                           (<Progress legiProcess={data.legiProcess}
                                      levelData={levelData} 
                                      legendHeight={legendHeight}/>):"";

        var blockClasses = classSet({
          "App-block" : true,
          "is-show" : this.state.currentIndex === key
        })


        ///////////////////
        return (
          <div className={blockClasses}
               key={key}>
              <div className="App-section">
                 <div className="App-sectionTitle">{item.title}</div>
              </div>

              <IssueSummary data={item} />
              
          </div>
          
        );
    })):"";

    var result = (data) ? (
        <div>
        {navItem}
        <div className="App"
             id="App"
             onTouchStart={this._onTouchStart}
             onTouchEnd={this._onTouchEnd}
             onTouchMove={this._onTouchMove}>
             {issueItems}
             
        </div>
        </div>
        ):<div className="App">網址錯誤</div>;


    return result;
  }

});

module.exports = App;

       
