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
            score = this.computeScoreIfBothAreTied(score);
        } else if (isMatchPoint) {
            score = this.computeScoreIfMatchPoint();
        } else {
            for (let i = 1; i <= 2; i++) {
                if (i === 1) {
                    tempScore = this.player1Score;
                } else {
                    score += '-';
                    tempScore = this.player2Score;
                }
                score += this.getWordForScore(tempScore, score);
            }
        }
        return score;
    }

    private getWordForScore(tempScore: number, score: string) {
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
        return score;
    }

    private computeScoreIfMatchPoint() {
        const differenceBetweenPlayerScores: number = this.player1Score - this.player2Score;
        if (differenceBetweenPlayerScores === 1) return 'Advantage player1';
        else if (differenceBetweenPlayerScores === -1) return 'Advantage player2';
        else if (differenceBetweenPlayerScores >= 2) return 'Win for player1';
        else return 'Win for player2';
    }

    private computeScoreIfBothAreTied(score: string) {
        switch (this.player1Score) {
            case 0:
                score = 'Love-All';
                break;
            case 1:
                score = 'Fifteen-All';
                break;
            case 2:
                score = 'Thirty-All';
                break;
            default:
                score = 'Deuce';
                break;
        }
        return score;
    }
}
