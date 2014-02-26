// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  var BoardCtrl,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.ticTacToe = angular.module('TicTacToe', []);

  ticTacToe.constant('Settings', {
    WIN_PATTERNS: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  });

  BoardCtrl = (function() {
    function BoardCtrl($scope, Settings) {
      this.$scope = $scope;
      this.Settings = Settings;
      this.mark = __bind(this.mark, this);
      this.parseBoard = __bind(this.parseBoard, this);
      this.announceWinner = __bind(this.announceWinner, this);
      this.numberOfMoves = __bind(this.numberOfMoves, this);
      this.player = __bind(this.player, this);
      this.resetBoard = __bind(this.resetBoard, this);
      this.getBoard = __bind(this.getBoard, this);
      this.$scope.cells = {};
      this.$scope.mark = this.mark;
    }

    BoardCtrl.prototype.getBoard = function(pattern) {
      var c, c0, c1, c2;
      c = this.$scope.cells;
      c0 = c[pattern[0]] || pattern[0];
      c1 = c[pattern[1]] || pattern[1];
      c2 = c[pattern[2]] || pattern[2];
      return "" + c0 + c1 + c2;
    };

    BoardCtrl.prototype.resetBoard = function() {
      return this.$scope.cells = {};
    };

    BoardCtrl.prototype.player = function() {
      if (this.numberOfMoves() % 2 === 0) {
        return 'x';
      } else {
        return 'o';
      }
    };

    BoardCtrl.prototype.numberOfMoves = function() {
      return Object.keys(this.$scope.cells).length;
    };

    BoardCtrl.prototype.checkForWin = function(board) {
      return 'xxx' === board || 'ooo' === board;
    };

    BoardCtrl.prototype.announceWinner = function() {
      var winner;
      winner = this.numberOfMoves() % 2 === 0 ? 'o' : 'x';
      return alert("" + winner + " wins!");
    };

    BoardCtrl.prototype.parseBoard = function() {
      var board, pattern, _i, _len, _ref, _results;
      _ref = this.Settings.WIN_PATTERNS;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pattern = _ref[_i];
        board = this.getBoard(pattern);
        if (this.checkForWin(board)) {
          _results.push(this.announceWinner());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    BoardCtrl.prototype.mark = function($event) {
      var cell;
      this.$event = $event;
      cell = this.$event.target.dataset.index;
      this.$scope.cells[cell] = this.player();
      return this.parseBoard();
    };

    return BoardCtrl;

  })();

  BoardCtrl.$inject = ["$scope", "Settings"];

  ticTacToe.controller('BoardCtrl', BoardCtrl);

}).call(this);

//# sourceMappingURL=application.map
