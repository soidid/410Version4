/** @jsx React.DOM */
var React = require('react/addons');
require('./IssueSummary.css');
var Sayings = require('../Sayings/Sayings.jsx');
var Legislator = require('../Legislator/Legislator.jsx');

var IssueSummary = React.createClass({

  getInitialState(){
    return {
      
    }
  },
  
  render () {
    var { data } = this.props;
    var positionSummaryItem = "";
    //console.log(data.positionSummary);
    if(data.positionSummary){
        positionSummaryItem = data.positionSummary.map((item,key)=>{
            return (
                <div>
                  <div className="IssueSummary-positionSummaryAvatar"><Legislator name={item.name}  party={item.party}/></div>
                  <div className="IssueSummary-positionSummaryQuote">{item.quote}</div>
                </div>
            )
        });

    }
    
    
    return (
      <div className="IssueSummary">
          
          <div className="IssueSummary-item">
                <div className="IssueSummary-itemLeft">民團訴求</div>
                <div className="IssueSummary-itemMain">{data.titleFull}</div>
          </div>
          <div className="IssueSummary-item">
              <div className="IssueSummary-itemLeft">現行法律</div>
              <div className="IssueSummary-itemMain">{data.currentLaw}</div>
          </div>

          <div className="IssueSummary-item">
              <div className="IssueSummary-itemLeft">立場回顧</div>
              <div className="IssueSummary-itemMain"> 
                  {positionSummaryItem}
              </div>
          </div>
         
          <div className="IssueSummary-item">
              <div className="IssueSummary-itemLeft">逐字紀錄</div>
              <div className="IssueSummary-itemMain">2012年6月6日內政委員會會議中，關於此條審查的發言紀錄。</div>
          </div>

          <Sayings data={data.lines}/>
          
      </div>
    );
  }
});

module.exports = IssueSummary;
