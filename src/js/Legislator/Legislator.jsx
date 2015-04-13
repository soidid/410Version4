/** @jsx React.DOM */
var React = require('react/addons');

require("./Legislator.css");
var Legislator = React.createClass({
  
  render() {
    var {name, party} = this.props;
    
    try{
    	var imgURL = require("./images/avatar/"+name+".png");

    }catch(e){
    	var imgURL = require("./images/candidate-not-found.jpg");
    	console.log(e);

    }
    

    var partyClass = "Legislator-avatarImg is-"+party;
       
    
    return (
      <div className="Legislator-avatar">
           <img className={partyClass} src={imgURL} />
           <div>{name}</div>
       
      </div>
    );
  }
});


module.exports = Legislator;


