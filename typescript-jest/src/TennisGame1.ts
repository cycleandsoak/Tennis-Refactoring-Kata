import {TennisGame} from './TennisGame';

interface CurrentScore {
    player1:number;
    player2:number;
}

interface ScoreStrategy {
    getScore(current: CurrentScore): string;
}

interface ConditionalScoreStrategy extends ScoreStrategy {
    isApplicable(current: CurrentScore): boolean;
}

class ChainOfCommand implements ScoreStrategy {

    constructor(
        private mainStrategy: ConditionalScoreStrategy,
        private delegateTo: ScoreStrategy,
    ) {
    }
    getScore(current: CurrentScore): string {
        if (this.mainStrategy.isApplicable(current)) {
            return this.mainStrategy.getScore(current);
        }
        return this.delegateTo.getScore(current);
    }

}

class MatchPointScoringStrategy implements ConditionalScoreStrategy{

    isApplicable(current: CurrentScore) {
        return current.player1 >= 4 || current.player2 >= 4;
    }

    getScore(current: CurrentScore) {
        const differenceBetweenPlayerScores: number = current.player1 - current.player2;
        if (differenceBetweenPlayerScores === 1) return 'Advantage player1';
        else if (differenceBetweenPlayerScores === -1) return 'Advantage player2';
        else if (differenceBetweenPlayerScores >= 2) return 'Win for player1';
        else return 'Win for player2';
    }
}
class EqualScoreStrategy implements ConditionalScoreStrategy{
    isApplicable(current: CurrentScore) {
        return current.player1 === current.player2;
    }
    getScore(current: CurrentScore) {
        switch (current.player1) {
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
class RegularScoringStrategy implements ScoreStrategy {
    getScore(current: CurrentScore): string {
        return `${this.getWordForScore(current.player1)}-${this.getWordForScore(current.player2)}`;
    }

    private getWordForScore(tempScore: number) {
        return ['Love', 'Fifteen', 'Thirty', 'Forty'][tempScore];
    }
}


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

    private readonly SCORING_RULES = new ChainOfCommand(new EqualScoreStrategy(),
        new ChainOfCommand(new MatchPointScoringStrategy(),
            new RegularScoringStrategy()));

    // private readonly SCORING_RULES = ChainOfCommand.defineRules()
    //     .firstTry(new EqualScoreStrategy())
    //     .thenTry(new MatchPointScoringStrategy())
    //     .fallbackTo(new RegularScoringStrategy());

    getScore(): string {
        return this.SCORING_RULES.getScore({
            player1: this.player1Score,
            player2: this.player2Score,
        });
    }

    //function recursive()
    //return if regularScoringStrategy is applicable
    //else
    //


//1) Introduce a type for all the data(the 2 scores).
    //2 Extract method for player scores are equal: shouldHandle: (current) => boolean
    //3 Extract method for compute score, both are tied. handle: (current) => string
    //4 Create class for shouldHandle and handle (and update our if/else)
    //5. repeat 2-4 for each of our if/elses
    //6. a) replace our if/else with a loop that loops over each strategy object
    //6. b) [alternative] write the recursive delegation thing that says "if applicable get score otherwise delegate"





}
