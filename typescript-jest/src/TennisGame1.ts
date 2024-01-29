import {TennisGame} from './TennisGame';

export class TennisGame1 implements TennisGame {
    private player1Score: number = 0;
    private player2Score: number = 0;
    private player1Name: string;
    private player2Name: string;

    constructor(player1Name: string, player2Name: string) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
    }

    wonPoint(playerName: string): void {
        if (playerName === 'player1')
            this.player1Score += 1;
        else
            this.player2Score += 1;
    }

    getScore(): string {
        let playerScoresAreEqual = this.player1Score === this.player2Score;
        let isMatchPoint = this.player1Score >= 4 || this.player2Score >= 4;

        // consider replacing this with a strategy pattern
        if (playerScoresAreEqual) {
            return this.computeScoreIfBothAreTied();
        } else if (isMatchPoint) {
            return this.computeScoreIfMatchPoint();
        } else {
            return `${this.getWordForScore(this.player1Score)}-${this.getWordForScore(this.player2Score)}`;
        }
    }

    private getWordForScore(tempScore: number) {
        return ['Love', 'Fifteen', 'Thirty', 'Forty'][tempScore];
    }

    private computeScoreIfMatchPoint() {
        const differenceBetweenPlayerScores: number = this.player1Score - this.player2Score;
        if (differenceBetweenPlayerScores === 1) return 'Advantage player1';
        else if (differenceBetweenPlayerScores === -1) return 'Advantage player2';
        else if (differenceBetweenPlayerScores >= 2) return 'Win for player1';
        else return 'Win for player2';
    }

    private computeScoreIfBothAreTied() {
        switch (this.player1Score) {
            case 0:
                return 'Love-All';
            case 1:
                return 'Fifteen-All';
            case 2:
                return 'Thirty-All';
            default:
                return 'Deuce';
        }
    }
}
