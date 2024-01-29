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
        let score: string = '';
        let tempScore: number = 0;
        let playerScoresAreEqual = this.player1Score === this.player2Score;
        let isMatchPoint = this.player1Score >= 4 || this.player2Score >= 4;

        if (playerScoresAreEqual) {
            score = this.computeScoreIfBothAreTied();
        } else if (isMatchPoint) {
            score = this.computeScoreIfMatchPoint();
        } else {
            let considerPlayer1Score = 1;
            let considerPlayer2Score = 2;
            for (let i = considerPlayer1Score; i <= considerPlayer2Score; i++) {
                if (i === considerPlayer1Score) {
                    tempScore = this.player1Score;
                } else {
                    score += '-';
                    tempScore = this.player2Score;
                }
                score += this.getWordForScore(tempScore);
            }
        }
        return score;
    }

    private getWordForScore(tempScore: number) {
        switch (tempScore) {
            case 0:
                return 'Love';
            case 1:
                return 'Fifteen';
            case 2:
                return 'Thirty';
            case 3:
                return 'Forty';
        }
        return ''
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
