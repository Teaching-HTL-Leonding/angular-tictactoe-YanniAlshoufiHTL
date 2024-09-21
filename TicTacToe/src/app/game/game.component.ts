import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type Cell = { value: ' ' | 'X' | 'O' };

let currentSymbol: 'X' | 'O' = 'O';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [RouterLink],
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

        if (this.gameState === 'stopped') {
            setTimeout(() => {
                alert(winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`);
            }, 0);
        }
    }

    checkWinner(): undefined | 'X' | 'O' | 'draw' {
        const lines = [
            // Rows
            ...this.board,
            // Columns
            ...this.board[0].map((_, colIndex) => this.board.map((row) => row[colIndex])),
            // Diagonals
            this.board.map((_, index) => this.board[index][index]),
            this.board.map((_, index) => this.board[index][GameComponent.NUMBER_COLS - 1 - index]),
        ];

        for (const line of lines) {
            if (line.every((cell) => cell.value === 'X')) {
                return 'X';
            }
            if (line.every((cell) => cell.value === 'O')) {
                return 'O';
            }
        }

        if (this.board.flat().every((cell) => cell.value !== ' ')) {
            return 'draw';
        }

        return undefined;
    }

    reset() {
        this.board = this.board.map((row) => row.map(() => ({ value: ' ' })));
        this.gameState = 'running';
    }
}
