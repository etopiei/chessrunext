class ChessCom {

    constructor() {
        this.gameType = this.getGameType();
    }

    getGameType() {
        // To find the game type on chess.com look for the class of the icon next to the game
        if (document.getElementsByClassName("blitz")) {
            return "Blitz";
        } else if (document.getElementsByClassName("bullet")) {
            return "Bullet";
        } else if (window.location.href.indexOf("puzzles") > -1) {
            return "Puzzle";
        }
    }

    updateRatingIfFound(mutationList, observer) {
        // Here a child has been added or removed from the sidebar
        // if a rating component is here we need to send the latest rating
        // Wait a small period to ensure the elements are ready.
        window.setTimeout(() => {
            let possibleRatingEl = document.getElementsByClassName("animated-number-component");
            if (possibleRatingEl && possibleRatingEl.length > 0) {
                let newRating = possibleRatingEl[0].innerText;
                this.ratingUpdate(newRating);
            }
        }, 200);
    }

    checkForNewRating() {
        let els = document.getElementsByClassName("new-rating-component");
        if (els && els.length > 0) {
            this.ratingUpdate(els[0].innerText);
        }
    }

    startPolling() {
        if (this.gameType == "Puzzle") {
            // Set up a mutation observer
            const sidebar = document.getElementsByClassName("sidebar-view")[0];
            const config = {childList: true};
            const observer = new MutationObserver(this.updateRatingIfFound);
            observer.observe(sidebar, config);
        } else {
            // First get the initial rating
            let el = document.getElementsByClassName("user-tagline-rating");
            if (el && el.length > 0) {
                // The user's rating is the second one shown
                this.ratingUpdate(el[1].innerText);
            }
            window.setInterval(() => {
                this.checkForNewRating();
            }, 500);
        }
    }

    ratingUpdate(){}
}