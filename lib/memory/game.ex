defmodule Memory.Game do
  def new do
    %{
      tiles: List.duplicate(nil,16),
      tiles1: fillTiles(),
      found: List.duplicate(0,16),
      prev_value: -1,
      count: 0,
      click: 0,
    }
  end
  def client_view(game) do

    %{
      tiles: game.tiles,
      tiles1: game.tiles1,
      found: game.found,
      prev_value: game.prev_value,
      count: game.count,
      click: game.click,
    }
  end

  def fillTiles do
    ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"]
    |> Enum.to_list
    |> Enum.shuffle
  end



  def restart(game) do
    Map.merge(game, %{tiles: List.duplicate(nil,16), found: List.duplicate(0,16), tiles1: fillTiles(), prev_value: -1,  count: 0, click: 0})
  end

  def handleClick(game,i) do
    t1=game.tiles1
    t= game.tiles
    cnt= game.count
    clk=game.click
    found=game.found
    prev=game.prev_value
    c=Enum.at(t1,i)

    t= List.replace_at(t,i,c)
    Map.merge(game, %{tiles: t, count: cnt+1, click: clk+1})
  end

  def onClick(game,i) do
    t1=game.tiles1
    t= game.tiles
    cnt= game.count
    clk=game.click
    found=game.found
    prev=game.prev_value
    if(prev == -1) do
      Map.merge(game, %{prev_value: i, count: 1})
    else
      helper(game,i)
    end
  end


  def helper(game,i) do
    t1=game.tiles1
    t= game.tiles
    cnt= game.count
    clk=game.click
    prev=game.prev_value
    found= game.found
    if(Enum.at(t,i) == Enum.at(t,prev)) do

      :timer.sleep(1000)
      found=List.replace_at(found,i,1)
      found=List.replace_at(found,prev,1)
      Map.merge(game, %{found: found, prev_value: -1, count: 0})

    else
      t=  List.replace_at(t,i,nil)
      t=  List.replace_at(t,prev,nil)
      :timer.sleep(1000)
      Map.merge(game, %{tiles: t, prev_value: -1, count: 0})
    end
  end
end
