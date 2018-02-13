import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

'use strict';
export default function run_demo(root,channel) {
  ReactDOM.render(<Board channel={channel}/>, root);
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.channel=props.channel;
    this.state = {
      tiles: [],
      tiles1: [],
      found: [],
      prev_value: -1,
      count:0,
      click:0,
    };
    this.channel.join()
    .receive("ok", this.gotView.bind(this))
    .receive("error", resp => { console.log("Unable to join", resp) });
  }

  gotView(view) {
    console.log("New view", view);
    this.setState(view.game);
  }

  restart(){
    this.channel.push("restart", {})
    .receive("ok", this.gotView.bind(this));
  }


  handleClick(i) {
    this.channel.push("handleClick", { num: i })
    .receive("ok", this.gotView.bind(this));

    this.channel.push("onClick", { num: i })
    .receive("ok", this.gotView.bind(this));
  }

  addTiles(cnt){
    var  lis=[];
    for(var i= 0;i<4;i++){
      let id2=cnt;
      let clickable= this.state.tiles[cnt]==this.state.tiles1[cnt]? "click0" : "click1"
      lis.push(<Tile value={this.state.tiles[cnt]}  key={id2} classname={this.state.found[cnt]} clickable={clickable}
        onClick={() => this.handleClick(id2)}/>);
        cnt++;
      }
      return lis;
    }

    render() {
      var lis= [];
      var cnt=0;
      for(var i=0;i<4;i++){
        lis.push(<div key={i} className="board-row">{this.addTiles(cnt)}</div>);
        cnt+=4;
      }
      return (
        <div>
        <div className={"board_div"+this.state.count}>
        {lis}
        </div>
        <br></br>
        <div className="restart_div">
        <button id="restart_button" onClick={()=>{this.restart()}}>RESTART</button>
        <br></br>
        <br></br>
        <p>Clicks : {this.state.click}</p>
        </div>
        </div>
      );
    }
  }

  function Tile(props){
    return (
      <button className={"btn btn-default button_found" + props.classname +" "+props.clickable} onClick={props.onClick}>
      {props.value}
      </button>
    );
  }
