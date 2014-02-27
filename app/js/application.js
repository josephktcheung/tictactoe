// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  var BoardCtrl,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.ticTacToe = angular.module('TicTacToe', []);

  ticTacToe.constant('WIN_PATTERNS', [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]);

  BoardCtrl = (function() {
    function BoardCtrl($scope, WIN_PATTERNS) {
      this.$scope = $scope;
      this.WIN_PATTERNS = WIN_PATTERNS;
      this.mark = __bind(this.mark, this);
      this.parseBoard = __bind(this.parseBoard, this);
      this.rowStillWinnable = __bind(this.rowStillWinnable, this);
      this.announceTie = __bind(this.announceTie, this);
      this.announceWinner = __bind(this.announceWinner, this);
      this.styleWinUnwin = __bind(this.styleWinUnwin, this);
      this.gameUnwinnable = __bind(this.gameUnwinnable, this);
      this.player = __bind(this.player, this);
      this.movesRemaining = __bind(this.movesRemaining, this);
      this.numberOfMoves = __bind(this.numberOfMoves, this);
      this.resetBoard = __bind(this.resetBoard, this);
      this.getRow = __bind(this.getRow, this);
      this.getPatterns = __bind(this.getPatterns, this);
      this.startGame = __bind(this.startGame, this);
      this.resetBoard();
      this.$scope.mark = this.mark;
      this.$scope.startGame = this.startGame;
      this.$scope.gameOn = false;
      this.$scope.styleWinUnwin = this.styleWinUnwin;
    }

    BoardCtrl.prototype.startGame = function() {
      this.$scope.gameOn = true;
      return this.resetBoard();
    };

    BoardCtrl.prototype.getPatterns = function() {
      return this.patternsToTest = this.WIN_PATTERNS.slice(0);
    };

    BoardCtrl.prototype.getRow = function(pattern) {
      var c, c0, c1, c2;
      c = this.cells;
      c0 = c[pattern[0]] || pattern[0];
      c1 = c[pattern[1]] || pattern[1];
      c2 = c[pattern[2]] || pattern[2];
      return "" + c0 + c1 + c2;
    };

    BoardCtrl.prototype.someoneWon = function(row) {
      return 'xxx' === row || 'ooo' === row;
    };

    BoardCtrl.prototype.resetBoard = function() {
      this.$scope.theWinnerIs = false;
      this.$scope.cats = false;
      this.cells = this.$scope.cells = {};
      this.$scope.currentPlayer = this.player();
      return this.getPatterns();
    };

    BoardCtrl.prototype.numberOfMoves = function() {
      return Object.keys(this.cells).length;
    };

    BoardCtrl.prototype.movesRemaining = function(player) {
      var totalMoves;
      totalMoves = 9 - this.numberOfMoves();
      if (player === 'x') {
        return Math.ceil(totalMoves / 2);
      } else if (player === 'o') {
        return Math.floor(totalMoves / 2);
      } else {
        return totalMoves;
      }
    };

    BoardCtrl.prototype.player = function(options) {
      var moves;
      options || (options = {
        whoMovedLast: false
      });
      moves = this.numberOfMoves() - (options.whoMovedLast ? 1 : 0);
      if (moves % 2 === 0) {
        return 'x';
      } else {
        return 'o';
      }
    };

    BoardCtrl.prototype.isMixedRow = function(row) {
      return !!row.match(/o+\d?x+|x+\d?o+/i);
    };

    BoardCtrl.prototype.hasOneX = function(row) {
      return !!row.match(/x\d\d|\dx\d|\d\dx/i);
    };

    BoardCtrl.prototype.hasTwoXs = function(row) {
      return !!row.match(/xx\d|x\dx|\dxx/i);
    };

    BoardCtrl.prototype.hasOneO = function(row) {
      return !!row.match(/o\d\d|\do\d|\d\do/i);
    };

    BoardCtrl.prototype.hasTwoOs = function(row) {
      return !!row.match(/oo\d|o\do|\doo/i);
    };

    BoardCtrl.prototype.isEmptyRow = function(row) {
      return !!row.match(/\d\d\d/i);
    };

    BoardCtrl.prototype.gameUnwinnable = function() {
      return this.patternsToTest.length < 1;
    };

    BoardCtrl.prototype.flatten = function(a) {
      if (a.length === 0) {
        return [];
      }
      return a.reduce(function(lhs, rhs) {
        return lhs.concat(rhs);
      });
    };

    BoardCtrl.prototype.styleWinUnwin = function(cell) {
      var takenCells, unwinCells, winCells, winRow;
      winRow = this.patternsToTest.filter((function(_this) {
        return function(pattern) {
          var row;
          row = _this.getRow(pattern);
          return _this.someoneWon(row);
        };
      })(this));
      if (winRow.length > 0) {
        takenCells = Object.keys(this.cells).map(function(cell) {
          return parseInt(cell);
        });
        winCells = this.flatten(winRow);
        unwinCells = takenCells.filter(function(cell) {
          return !(__indexOf.call(winCells, cell) >= 0);
        });
        if (__indexOf.call(winCells, cell) >= 0) {
          return 'win';
        } else if (__indexOf.call(unwinCells, cell) >= 0) {
          return 'unwin';
        }
      }
    };

    BoardCtrl.prototype.announceWinner = function() {
      var winner;
      winner = this.player({
        whoMovedLast: true
      });
      this.$scope.theWinnerIs = winner;
      return this.$scope.gameOn = false;
    };

    BoardCtrl.prototype.announceTie = function() {
      this.$scope.cats = true;
      return this.$scope.gameOn = false;
    };

    BoardCtrl.prototype.rowStillWinnable = function(row) {
      return !(this.isMixedRow(row) || (this.hasOneX(row) && this.movesRemaining('x') < 2) || (this.hasTwoXs(row) && this.movesRemaining('x') < 1) || (this.hasOneO(row) && this.movesRemaining('o') < 2) || (this.hasTwoOs(row) && this.movesRemaining('o') < 1) || (this.isEmptyRow(row) && this.movesRemaining() < 5));
    };

    BoardCtrl.prototype.parseBoard = function() {
      var won;
      won = false;
      this.patternsToTest = this.patternsToTest.filter((function(_this) {
        return function(pattern) {
          var row;
          row = _this.getRow(pattern);
          won || (won = _this.someoneWon(row));
          return _this.rowStillWinnable(row);
        };
      })(this));
      if (won) {
        return this.announceWinner();
      } else if (this.gameUnwinnable()) {
        return this.announceTie();
      }
    };

    BoardCtrl.prototype.mark = function($event) {
      var cell;
      this.$event = $event;
      cell = this.$event.target.dataset.index;
      if (this.$scope.gameOn && !this.cells[cell]) {
        this.cells[cell] = this.player();
        this.parseBoard();
        return this.$scope.currentPlayer = this.player();
      }
    };

    return BoardCtrl;

  })();

  BoardCtrl.$inject = ["$scope", "WIN_PATTERNS"];

  ticTacToe.controller("BoardCtrl", BoardCtrl);

}).call(this);

//# sourceMappingURL=application.map
