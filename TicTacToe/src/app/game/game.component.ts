import { Component } from '@angular/core';

type Cell = { value: ' ' | 'X' | 'O' };

let currentSymbol: 'X' | 'O' = 'O';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [],
    templateUrl: './game.component.html',
})
export class GameComponent {
    static NUMBER_ROWS = 3;
    static NUMBER_COLS = 3;

    static nextSymbol(): 'X' | 'O' {
        currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
        return currentSymbol;
    }

    gameState: 'running' | 'stopped' = 'running';

    board: Cell[][] = new Array(GameComponent.NUMBER_ROWS)
        .fill(null)
        .map(() => new Array(GameComponent.NUMBER_COLS).fill(null).map(() => ({ value: ' ' })));

    reveal(cell: Cell) {
        if (!cell || this.gameState !== 'running' || cell.value !== ' ') {
            return;
        }

        cell.value = GameComponent.nextSymbol();
        const winner = this.checkWinner();
        this.gameState = winner === undefined ? 'running' : 'stopped';

        console.info(winner);
    }

    checkWinner(): undefined | 'X' | 'O' | 'draw' {
        // Check rows
        for (const row of this.board) {
            if (row.every((cell) => cell.value !== ' ')) {
                return row[0].value === 'X' ? 'X' : 'O';
            }
        }

        // Check columns
        for (let i = 0; i < GameComponent.NUMBER_COLS; i++) {
            if (this.board.every((row) => row[i].value === 'X')) {
                return 'X';
            }
            if (this.board.every((row) => row[i].value === 'O')) {
                return 'O';
            }
        }

        // Check diagonals
        if (
            this.board[1][1].value !== ' ' &&
            this.board[0][0].value === this.board[1][1].value &&
            this.board[1][1].value === this.board[2][2].value
        ) {
            return this.board[0][0].value === 'X' ? 'X' : 'O';
        }

        if (
            this.board[1][1].value !== ' ' &&
            this.board[0][2].value === this.board[1][1].value &&
            this.board[1][1].value === this.board[2][0].value
        ) {
            return this.board[0][2].value === 'X' ? 'X' : 'O';
        }

        if (this.board.every((row) => row.every((cell) => cell.value !== ' '))) {
            return 'draw';
        }

        return undefined;
    }
}
