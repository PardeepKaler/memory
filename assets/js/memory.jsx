import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

'use strict';
export default function run_demo(root) {
  ReactDOM.render(<Board />, root);
}

class Board extends React.Component {

  fillTiles(){
    let tiles=['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

    for(let i=0;i<16;i++){
      let x= Math.floor(Math.random()*(i+1));
      let y=  tiles[x];
      tiles[x]=tiles[i];
      tiles[i]=y;
    }
    return tiles;
  }

  constructor(props) {
    super(props);
    this.state = {
      tiles: Array(16).fill(null),
      tiles1: this.fillTiles(),
      prev_value: -1,
      count:0,
      click:0,
    };
  }

  restart(){
    this.setState({
      tiles: Array(16).fill(null),
      tiles1: this.fillTiles(),
      prev_value: -1,
      count:0,
      click:0,
    });

    for(let i=0;i<16;i++){
      document.getElementById(""+i).style.background="LightSkyBlue";
      document.getElementById(""+i).style.color="inherit";
    }
  }

  handleClick(i) {
    let tiles1= this.state.tiles1;
    let tiles= this.state.tiles;
    let count= this.state.count;
    let prev_value= this.state.prev_value;
    let click=this.state.click;
    if(tiles[i]==tiles1[i] || count>=2) return;
    tiles[i] = tiles1[i];
    this.setState({tiles: tiles,
      count: count+1,
      click: click+1,});
      if(prev_value==-1){
        this.setState({prev_value: i,
          count: 1});
          return;
        }

        else{
          if(tiles1[i]==tiles1[prev_value]){

            setTimeout(() => {
              this.setState({prev_value: -1,
                count:0,});
                document.getElementById(""+i).style.background="MediumBlue";
                document.getElementById(""+prev_value).style.background="MediumBlue";
                document.getElementById(""+i).style.color="MediumBlue";
                document.getElementById(""+prev_value).style.color="MediumBlue";
              }, 1000);
              return;
            }
            let newTiles1=tiles.slice();
            newTiles1[i]=null;
            newTiles1[prev_value]=null;

            setTimeout(() => {
              this.setState({
                tiles: newTiles1,
                prev_value: -1,
                count:0,
              });
            }, 1000);
          }
        }

        renderTile(i) {
          let id1=i+"";
          return <Tile value={this.state.tiles[i]} id={id1}
          onClick={() => this.handleClick(i)}/>;
        }


        render() {
          return (
            <div>
            <div>
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
          <button id={props.id} className="btn btn-default" onClick={props.onClick}>
          {props.value}
          </button>
        );
      }
