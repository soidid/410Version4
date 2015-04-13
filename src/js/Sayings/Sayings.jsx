/** @jsx React.DOM */

var React = require('react/addons');
var Legislator = require('../Legislator/Legislator.jsx');
require('./Sayings.css');

var Sayings = React.createClass({
  render () {
  	var classSet = React.addons.classSet;
    var data = this.props.data;
    console.log(data);
  	var sayingItems = "";
  	if(data){
  	    sayingItems = data.map((item,key)=>{
  	    	var isOdd = (key%2 !== 0);
  	    	var entryClasses = classSet({
                "Sayings-entry" : true,
                "is-odd" : isOdd
  	    	});
  	    	return isOdd ? (
  	    		<div className={entryClasses}
  	    		     key={key}>
  	    		    
  	    		    <div className="Sayings-entryMain">{item.paragraph}</div>
  	    		    <div className="Sayings-entryLeft">
  	    		   		 <Legislator name={item.speaker}  party={item.speaker_party}/>
  	    		    </div>
  	    		</div>
  	    	):(
  	    	    <div className={entryClasses}
  	    	         key={key}>
  	    		    <div className="Sayings-entryLeft">
  	    		   		 <Legislator name={item.speaker}  party={item.speaker_party}/>
  	    		    </div>
  	    		    <div className="Sayings-entryMain">{item.paragraph}</div>
  	    		</div>
  	    	);
  	    })
    }else{
    	sayingItems = <div>上次會議未討論此條修正</div>
    }
    return (
      <div className="Sayings">
           {sayingItems}
          
          
      </div>
    );
  }
});

module.exports = Sayings;


