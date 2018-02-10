defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel
  alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
   game = Memory.GameBackup.load(name) || Game.new()
   socket = socket
   |> assign(:game, game)
   |> assign(:name, name)
   {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
 else
   {:error, %{reason: "unauthorized"}}
 end
    end

  # def join("games:lobby", payload, socket) do
  #   if authorized?(payload) do
  #     {:ok, socket}
  #   else
  #     {:error, %{reason: "unauthorized"}}
  #   end
  # end


  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("restart", %{}, socket) do
   game = Game.restart(socket.assigns[:game])
   Memory.GameBackup.save(socket.assigns[:name], game)
   socket = assign(socket, :game, game)
   {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
 end

 def handle_in("handleClick", %{"num" => i}, socket) do
  game = Game.handleClick(socket.assigns[:game], i)
  Memory.GameBackup.save(socket.assigns[:name], game)
  socket = assign(socket, :game, game)
  {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
end

def handle_in("onClick", %{"num" => i}, socket) do
 game = Game.onClick(socket.assigns[:game], i)
 Memory.GameBackup.save(socket.assigns[:name], game)
 socket = assign(socket, :game, game)
 {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

 #  def handle_in("restart", socket) do
 #   game = Game.restart(socket.assigns[:game])
 #   socket = assign(socket, :game, game)
 #   {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
 # end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
