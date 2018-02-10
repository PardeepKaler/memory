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
    console.log("#{tiles1}");

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


    console.log(this.state.count);
    this.channel.push("onClick", { num: i })
    .receive("ok", this.gotView.bind(this));
  }

  renderTile(i) {
    let id1=i+"";
    let clickable= this.state.tiles[i]==this.state.tiles1[i]? "click0" : "click1"
    return <Tile value={this.state.tiles[i]} id={id1} classname={this.state.found[i]} clickable={clickable}
    onClick={() => this.handleClick(i)}/>;
  }


  render() {
    return (
      <div>
      <div className={"board_div"+this.state.count}>
      <div className="board-row">
      {this.renderTile(0)}
      {this.renderTile(1)}
      {this.renderTile(2)}
      {this.renderTile(3)}
      </div>
      <div className="board-row">
      {this.renderTile(4)}
      {this.renderTile(5)}
      {this.renderTile(6)}
      {this.renderTile(7)}
      </div>
      <div className="board-row">
      {this.renderTile(8)}
      {this.renderTile(9)}
      {this.renderTile(10)}
      {this.renderTile(11)}
      </div>
      <div className="board-row">
      {this.renderTile(12)}
      {this.renderTile(13)}
      {this.renderTile(14)}
      {this.renderTile(15)}
      </div>
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
    <button id={props.id} className={"btn btn-default button_found" + props.classname +" "+props.clickable} onClick={props.onClick}>
    {props.value}
    </button>
  );
}
