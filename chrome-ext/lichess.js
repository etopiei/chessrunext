class LiChess {

    constructor() {
        this.gameType = this.getGameType();
    }

    getGameType() {
        // First check if it's a puzzle - then check for actual game
        if (window.location.pathname.indexOf("training") > -1) {
            return "Puzzle";
        }
        let supportedGameTypes = ["Bullet", "Blitz"];
        let setupBox = document.getElementsByClassName("setup")[0];
        let gameTypeSpans = Object.values(setupBox.getElementsByTagName("span"));
        for (let gameInd in gameTypeSpans) {
            let gameType = gameTypeSpans[gameInd].innerText.replace(/\s/g, '');
            if (supportedGameTypes.indexOf(gameType) > -1) {
                // We found a valid game type
                return gameType;
            }
        }
        return null;
    }

    checkPuzzleRating() {
        let els = document.getElementsByClassName("puzzle__side__user");
        if (els && els.length > 0) {
            let rating = els[0].getElementsByTagName("strong")[0].innerText.split(" ")[0];
            this.ratingUpdate(rating);
        }
    }

    startPolling() {
        window.setInterval(this.checkRating.bind(this), 500);
    }

    checkRating() {
        if (this.gameType && this.gameType == "Puzzle") {
            this.checkPuzzleRating();
        } else if (this.gameType) {
            let username = document.getElementById("user_tag").innerText;
            let rating_displays = Object.values(document.getElementsByClassName("user-link"));
            rating_displays.forEach(r => {
                let matches = r.innerText.match(`^${username}\\s\\((\\d+\[?\]{0,1})\\)`);
                if (matches && matches.length > 1) {
                    let rating = matches[1];
                    this.ratingUpdate(rating);
                }
            });
        }
    }

    // This function will be overriden by the client
    ratingUpdate(){}
}