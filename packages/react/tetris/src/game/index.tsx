import { initMap } from "./map";
import { MGame, NewGame, Plugins } from "./game";
import { Player } from "./Player";
import { initMessage } from "./message";
import { Rival } from "./Rival";
import mitt from "mitt";
import { Alone } from "./alone";
import ScoreSystemComponent from "../components/score";
import React from "react";
// import { Config, transition } from "./utils/config";
const emitter = mitt();

export type ExternalState = {
  // getScore: () => number
  // getEmitter: () => any
  renderScore?: () => JSX.Element;
};
export function getEmitter() {
  return emitter;
}
export function initGameMult(name: string, isHost: boolean) {
  initMessage(name, isHost);
  emitter.emit("startGame");
}

export function initGameSelf() {
  emitter.emit("startGame");
}
let singleGame: NewGame;
let alone: Alone;

//单人游戏
export function initAloneGame(
  mapRef: React.MutableRefObject<number[][]>,
  setMapRef: (_map: number[][]) => void
): ExternalState {
  initMap(setMapRef);
  singleGame = new NewGame(mapRef, setMapRef);
  singleGame.registerPlugins(
    Plugins.TickerPlugin,
    Plugins.CoreStrategyPlugin
    // Plugins.DownStrategyIsMovePlugin
  );
  alone = new Alone(singleGame);
  return {
    renderScore: () => {
      return <ScoreSystemComponent game={singleGame} />;
    },
  };
}

export function initTestGame(
  mapRef: React.MutableRefObject<number[][]>,
  setMapRef: (_map: number[][]) => void
): ExternalState {
  initMap(setMapRef);
  singleGame = new NewGame(mapRef, setMapRef);
  singleGame.registerPlugins(Plugins.CoreStrategyPlugin);
  alone = new Alone(singleGame);
  return {};
}

//双人游戏
let selfGame: MGame;
let player: Player;
export function initSelfGame(
  mapRef: React.MutableRefObject<number[][]>,
  setMapRef: (_map: number[][]) => void
) {
  initMap(setMapRef);
  selfGame = new MGame(mapRef, setMapRef);
  selfGame.registerPlugins(Plugins.TickerPlugin,);
  player = new Player(selfGame);
}

let rivalGame: MGame;
let rivalPlayer: Rival;
export function initRivalGame(
  mapRef: React.MutableRefObject<number[][]>,
  setMapRef: (_map: number[][]) => void
) {
  initMap(setMapRef);
  rivalGame = new MGame(mapRef, setMapRef);
  rivalGame.registerPlugins();
  rivalPlayer = new Rival(rivalGame);
}
export function getRival() {
  return rivalPlayer;
}

export function startGameSingle() {
  alone.start();
}

export function startGame() {
  player.start();
}
export function operateInMobile(order: string) {
  player && player.handlerButton(order);
  alone && alone.handlerButton(order);
}
let _gameoverHandler: Function;
export function setGameoverHandler(fn: Function) {
  _gameoverHandler = fn;
}
export function getGameoverHandler() {
  return _gameoverHandler;
}

//单人游戏生效
export function forceOverSelfGame() {
  singleGame.endGame();
}

export function gameoverAll() {
  singleGame && singleGame.endGame();
  rivalGame && rivalGame.endGame();
  selfGame && selfGame.endGame();
  window.location.href = "/";
}
