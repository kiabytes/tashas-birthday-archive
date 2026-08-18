/* ========================================================= 
   SLYTHERIN ARCHIVES — FULL WEBSITE SCRIPT 
========================================================= */ 
 

/* ========================================================= 
   1. GLOBAL STATE 
========================================================= */ 
 
/* 
 * CHANGE THIS PIN IF YOU WANT A DIFFERENT ONE. 
 */ 
const correctPin = "081807"; 
 
let enteredPin = ""; 
 
let cakeTimer = null; 
 
let currentIDLayout = 1; 
 
let uploadedIDPhoto = null; 
 
let uploadedIDPhotoData = null; 
 
let completionTimer = null; 
 
let questLetterTimer = null; 
 
 
const giftKeys = [ 
    "honeydukes", 
    "specialLetter", 
    "birthdayLetter", 
    "flora", 
    "idCard", 
    "specialCards", 
    "movieCards", 
    "playlist" 
]; 
 
 
let openedGifts = new Set( 
    JSON.parse( 
        sessionStorage.getItem("slytherinOpenedGifts") || "[]" 
    ) 
); 

/* =========================================================
   BACKGROUND MUSIC
========================================================= */

const backgroundMusic = document.getElementById("background-music");

function startMusic() {
    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0.80;

    backgroundMusic.play().catch(error => {
        console.log("Audio could not start:", error);
    });
}
 
/* ========================================================= 
   2. PIN / LOCK SCREEN 
========================================================= */ 
 
function enterNumber(number) { 
 
    if (enteredPin.length >= 6) { 
        return; 
    } 
 
    enteredPin += number; 
 
    updateDots(); 
 
    if (enteredPin.length === 6) { 
 
        setTimeout( 
            checkPin, 
            180 
        ); 
 
    } 
 
} 
 
 
function deleteNumber() { 
 
    enteredPin = 
        enteredPin.slice(0, -1); 
 
    updateDots(); 
 
    const message = 
        document.getElementById("message"); 
 
    if (message) { 
        message.textContent = ""; 
    } 
 
} 
 
 
function clearPin() { 
 
    enteredPin = ""; 
 
    updateDots(); 
 
    const message = 
        document.getElementById("message"); 
 
    if (message) { 
        message.textContent = ""; 
    } 
 
} 
 
 
function updateDots() { 
 
    document 
        .querySelectorAll("#pin-dots span") 
        .forEach((dot, index) => { 
 
            dot.classList.toggle( 
                "filled", 
                index < enteredPin.length 
            ); 
 
        }); 
 
} 
 
 
function checkPin() { 
 
    const message = 
        document.getElementById("message"); 
 
    const lockScreen = 
        document.getElementById("lock-screen"); 
 
    const loadingScreen = 
        document.getElementById("loading-screen"); 
 
    const homepage = 
        document.getElementById("homepage"); 
 
 
    if (enteredPin === correctPin) { 
 
        message.textContent = 
            "Ahh... What do we have here? A Slytherin. The wards recognize you."; 

        setTimeout(() => { 
 
            lockScreen.classList.add( 
                "screen-hidden" 
            ); 
 
 
            loadingScreen.classList.add( 
                "show" 
            ); 
 
            startMusic();

            loadingScreen.setAttribute( 
                "aria-hidden", 
                "false" 
            ); 
 
 
            setTimeout(() => { 
 
                loadingScreen.classList.remove( 
                    "show" 
                ); 
 
                loadingScreen.setAttribute( 
                    "aria-hidden", 
                    "true" 
                ); 
 
 
                document.body.classList.add( 
                    "home-active" 
                ); 
 
 
                setTimeout(() => { 
 
                    showQuestLetter(); 
 
                }, 5000); 
 
 
            }, 5000); 
 
 
        }, 4000); 
 
 
    } else {

    message.textContent =
        "Hmm... An unfamiliar presence. The wards remain sealed.";

    message.classList.add("error");

    setTimeout(() => {
        message.classList.remove("error");
    }, 350);

    enteredPin = "";

    updateDots();
}
 
} 
 
 
/* ========================================================= 
   3. QUEST BEGIN / QUEST COMPLETED 
========================================================= */ 
 
function showQuestLetter() { 
 
    const modal = 
        document.getElementById( 
            "quest-letter-modal" 
        ); 
 
    if (!modal) { 
        return; 
    } 
 
 
    if ( 
        document 
            .getElementById("archive-modal") 
            .classList 
            .contains("show") 
    ) { 
 
        questLetterTimer = 
            setTimeout( 
                showQuestLetter, 
                1000 
            ); 
 
        return; 
 
    } 
 
 
    modal.classList.add( 
        "show" 
    ); 
 
    modal.setAttribute( 
        "aria-hidden", 
        "false" 
    ); 
 
    document.body.classList.add( 
        "overlay-open" 
    ); 
 
} 
 
 
function closeQuestLetter() { 
 
    const modal = 
        document.getElementById( 
            "quest-letter-modal" 
        ); 
 
    if (!modal) { 
        return; 
    } 
 
 
    modal.classList.remove( 
        "show" 
    ); 
 
    modal.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 
 
    document.body.classList.remove( 
        "overlay-open" 
    ); 
 
} 
 
 
function showQuestCompleted() { 
 
    clearTimeout( 
        completionTimer 
    ); 
 
 
    const modal = 
        document.getElementById( 
            "quest-completed-modal" 
        ); 
 
    if (!modal) { 
        return; 
    } 
 
 
    modal.classList.add( 
        "show" 
    ); 
 
    modal.setAttribute( 
        "aria-hidden", 
        "false" 
    ); 
 
    document.body.classList.add( 
        "overlay-open" 
    ); 
 
} 
 
 
function closeQuestCompleted() { 
 
    const modal = 
        document.getElementById( 
            "quest-completed-modal" 
        ); 
 
    if (!modal) { 
        return; 
    } 
 
 
    modal.classList.remove( 
        "show" 
    ); 
 
    modal.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 
 
    document.body.classList.remove( 
        "overlay-open" 
    ); 
 
} 
 
 
function markGiftOpened(giftName) { 
 
    openedGifts.add( 
        giftName 
    ); 
 
 
    sessionStorage.setItem( 
        "slytherinOpenedGifts", 
        JSON.stringify( 
            [...openedGifts] 
        ) 
    ); 
}

function scheduleQuestCompletion() {

    if (
        sessionStorage.getItem(
            "slytherinQuestCompletedShown"
        ) === "true"
    ) {
        return;
    }

    clearTimeout(completionTimer);

    completionTimer = setTimeout(() => {

        sessionStorage.setItem(
            "slytherinQuestCompletedShown",
            "true"
        );

        showQuestCompleted();

    }, 3000);

}
 
 
/* ========================================================= 
   4. ARCHIVE CONTENT 
========================================================= */ 
 
const archiveContents = { 
 
 
    /* ===================================================== 
       GIFT 1 
    ===================================================== */ 
 
    honeydukes: { 
 
        title: 
            "Honeydukes Delivery", 
 
        content: ` 
 
            <div class="honeydukes-content"> 
 
                <div 
                    class="timer-display" 
                    id="timer-message" 
                > 
 
                    Blow the candles in 
 
                    <span id="cake-timer"> 
                        5 
                    </span> 
 
                </div> 
 
 
                <img 
                    src="cake.png" 
                    class="honeydukes-cake" 
                    id="honeydukes-cake" 
                    alt="Honeydukes birthday cake" 
                > 
 
 
                <p 
                    class="honeydukes-message" 
                    id="honeydukes-message" 
                > 
 
                    A little something sweet has 
                    arrived from Honeydukes. 
 
                    Make a wish first and begin 
                    the candle charm. 
 
                </p> 
 
 
                <button 
                    class="candle-button" 
                    type="button" 
                    onclick="startCakeTimer()" 
                    id="candle-button" 
                > 
 
                    Begin the Candle Charm 
 
                </button> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 2 
    ===================================================== */ 
 
    specialLetter: { 
 
        title: 
            "Owl Post", 
 
        content: ` 
 
            <div class="owl-post-content"> 
 
                <img 
                    src="letter_1_preview.png" 
                    class="letter-preview" 
                    alt="A special letter preview" 
                > 
 
 
                <p class="owl-message"> 
                    A letter has arrived by owl. 
                </p> 
 
 
                <p class="owl-message"> 
                    Perhaps you should open it... 
                </p> 
 
 
                <button 
                    class="letter-button" 
                    type="button" 
                    id="open-special-letter-button" 
                > 
 
                    Open the Letter 
 
                </button> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 3 
    ===================================================== */ 
 
    birthdayLetter: { 
 
        title: 
            "Owl Post", 
 
        content: ` 
 
            <div class="owl-post-content"> 
 
                <img 
                    src="letter_2_preview.png" 
                    class="letter-preview" 
                    alt="A few wishes for you preview" 
                > 
 
 
                <p class="owl-message"> 
                    Another letter has arrived by owl. 
                </p> 
 
 
                <p class="owl-message"> 
 
                    This one carries a few wishes 
                    meant just for you... 
 
                </p> 
 
 
                <button 
                    class="letter-button" 
                    type="button" 
                    id="open-birthday-letter-button" 
                > 
 
                    Open the Letter 
 
                </button> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 4 
    ===================================================== */ 
 
    flora: { 
 
        title: 
            "Flora of the Serpent's Garden", 
 
        content: ` 
 
            <div class="flora-content"> 
 
                <p class="flora-message"> 
 
                    A flora has been delivered to you! 
 
                </p> 
 
 
                <div class="flower-display"> 
 
                    <img 
                        src="flowers.png" 
                        class="flora-flower" 
                        alt="Flora from the Serpent's Garden" 
                    > 
 
                </div> 
 
 
                <div class="flora-buttons"> 
 
                    <button
                        type="button"
                        class="letter-button"
                        onclick="downloadImageFile('flowers.png', 'tashas bday flowers.png')"
                    > 
 
                        Download the Flora 
 
                    </button> 
 
 
                    <button 
                        class="letter-button" 
                        type="button" 
                        onclick="openFloraCard()" 
                    > 
 
                        Open the Card 
 
                    </button> 
 
                </div> 
 
 
                <div 
                    id="flora-card-overlay" 
                    class="nested-overlay" 
                    aria-hidden="true" 
                > 
 
                    <div class="flora-card-container"> 
 
                        <button 
                            class="flora-card-exit" 
                            type="button" 
                            onclick="closeFloraCard()" 
                        > 
 
                            Exit 
 
                        </button> 
 
 
                        <img 
                            src="letter card.png" 
                            class="flora-card-image" 
                            alt="Flora greeting card" 
                        > 
 
                    </div> 
 
                </div> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 5 — ID CARD 
    ===================================================== */ 
 
    idCard: { 
 
        title: 
            "The Serpent's Registry", 
 
        content: ` 
 
            <div class="id-card-content"> 
 
                <p class="id-card-message"> 
 
                    A personal Hogwarts identification 
                    card awaits its rightful owner. 
 
                </p> 
 
 
                <div class="id-card-editor"> 
 
                    <div class="id-card-layout-selector"> 
 
                        <p class="layout-title"> 
 
                            Choose your card layout 
 
                        </p> 
 
 
                        <button 
                            class="layout-choice active" 
                            type="button" 
                            onclick="changeIDLayout(1)" 
                            aria-label="Choose card layout 1" 
                        > 
                            1 
                        </button> 
 
 
                        <button 
                            class="layout-choice" 
                            type="button" 
                            onclick="changeIDLayout(2)" 
                            aria-label="Choose card layout 2" 
                        > 
                            2 
                        </button> 
 
 
                        <button 
                            class="layout-choice" 
                            type="button" 
                            onclick="changeIDLayout(3)" 
                            aria-label="Choose card layout 3" 
                        > 
                            3 
                        </button> 
 
                    </div> 
 
 
                    <div class="id-card-preview-column"> 
 
                        <div 
                            class="id-card-preview" 
                            id="id-card-preview" 
                        > 
 
                            <img 
                                id="id-card-background" 
                                src="id-card-1.png" 
                                alt="Slytherin ID card preview" 
                            > 
 
                        </div> 
 
 
                        <div class="id-card-actions"> 
 
                            <button 
                                class="letter-button" 
                                type="button" 
                                onclick="downloadIDCard()" 
                            > 
                                Acquire ID Card 
                            </button> 
 
                        </div> 
 
                    </div> 
 
                </div> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 6 
    ===================================================== */ 
 
    specialCards: { 
 
        title: 
            "The Serpent's Card Collection", 
 
        content: ` 
 
            <div class="collection-content"> 
 
                <p class="collection-message"> 
 
                    Four special cards are waiting in the 
                    collection. 
 
                    Click each card to reveal its other side. 
 
                </p> 
 
 
                <div 
                    class="card-grid" 
                    id="bucky-card-grid" 
                > 
 
                    ${createFlipCardMarkup("bucky", 1)} 
 
                    ${createFlipCardMarkup("bucky", 2)} 
 
                    ${createFlipCardMarkup("bucky", 3)} 
 
                    ${createFlipCardMarkup("bucky", 4)} 
 
                </div> 
 
 
                <button 
                    class="letter-button collection-download" 
                    id="download-bucky-cards" 
                    type="button" 
                    onclick="downloadAllBuckyCards()" 
                    disabled 
                > 
 
                    Flip All Cards to Unlock Download 
 
                </button> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 7 
    ===================================================== */ 
 
    movieCards: { 
 
        title: 
            "The Moving Picture Archives", 
 
        content: ` 
 
            <div class="collection-content"> 
 
                <p class="collection-message"> 
 
                    A collection of movie/show recommendations 
                    from your movie obsessed friend. Click each card to reveal the review. 
 
                </p> 
 
 
                <div 
                    class="card-grid movie-grid" 
                    id="movie-card-grid" 
                > 
 
                    ${createMovieCardWithDownload(1)} 
 
                    ${createMovieCardWithDownload(2)} 
 
                    ${createMovieCardWithDownload(3)} 
 
                    ${createMovieCardWithDownload(4)} 
 
                </div> 
 
            </div> 
 
        ` 
 
    }, 
 
 
    /* ===================================================== 
       GIFT 8 
    ===================================================== */ 
 
    playlist: { 
 
        title: 
            "The Slytherin Privilege", 
 
        content: ` 
 
            <div class="playlist-content"> 
 
                <p class="playlist-message"> 
 
                    A special privilege has been 
                    granted to you. 
 
                </p> 
 
 
                <div class="playlist-card-wrap"> 
 
                    <img 
                        src="playlist_card.png" 
                        class="playlist-card-image" 
                        alt="Slytherin privilege playlist card" 
                    > 
 
 
                    <button
                        type="button"
                        class="letter-button playlist-download"
                        onclick="downloadImageFile('coupon.png', 'free spanish latte coupon.png')"
                    > 
 
                        Claim Your Privilege 
 
                    </button> 
 
                </div> 
 
            </div> 
 
        ` 
 
    } 
 
}; 
 
 
/* ========================================================= 
   CARD MARKUP HELPERS 
========================================================= */ 
 
function createFlipCardMarkup( 
    type, 
    number 
) { 
 
    const folder = 
        type === "bucky" 
            ? "buckycard" 
            : "moviecard"; 
 
 
    return ` 
 
        <div 
            class="flip-card" 
            data-type="${type}" 
            data-number="${number}" 
            data-flipped="false" 
            onclick="flipCollectionCard(this)" 
            tabindex="0" 
            role="button" 
            aria-label="Flip ${type} card ${number}" 
        > 
 
            <div class="flip-card-inner"> 
 
                <div class="flip-card-face flip-card-back"> 
 
                    <img 
                        src="${folder}${number}_back.png" 
                        alt="${type} card ${number} back" 
                    > 
 
                </div> 
 
 
                <div class="flip-card-face flip-card-front"> 
 
                    <img 
                        src="${folder}${number}_front.png" 
                        alt="${type} card ${number} front" 
                    > 
 
                </div> 
 
            </div> 
 
        </div> 
 
    `; 
 
} 
 
 
function createMovieCardWithDownload(number) { 
 
    return ` 
 
        <div class="movie-card-unit"> 
 
            ${createFlipCardMarkup( 
                "movie", 
                number 
            )} 
 
        </div> 
 
    `; 
 
} 
 
 
/* ========================================================= 
   5. OPEN ARCHIVE 
========================================================= */ 
 
function openArchive(archiveName) {

    const archive =
        archiveContents[archiveName];

    if (!archive) {
        return;
    }

    closeQuestLetter();
    closeQuestCompleted();
 
 
    const modal = 
        document.getElementById( 
            "archive-modal" 
        ); 
 
 
    const title = 
        document.getElementById( 
            "modal-title" 
        ); 
 
 
    const body = 
        document.getElementById( 
            "modal-body" 
        ); 
 
 
    title.textContent = 
        archive.title; 
 
 
    body.innerHTML = 
        archive.content; 
 
 
    modal.classList.add( 
        "show" 
    ); 
 
 
    modal.setAttribute( 
        "aria-hidden", 
        "false" 
    ); 
 
 
    document.body.classList.add( 
        "modal-open" 
    ); 
 
 
    markGiftOpened( 
        archiveName 
    ); 
 
 
    if ( 
        archiveName === 
        "specialLetter" 
    ) { 
 
        document 
            .getElementById( 
                "open-special-letter-button" 
            ) 
            .addEventListener( 
                "click", 
                openSpecialLetter 
            ); 
 
    } 
 
 
    if ( 
        archiveName === 
        "birthdayLetter" 
    ) { 
 
        document 
            .getElementById( 
                "open-birthday-letter-button" 
            ) 
            .addEventListener( 
                "click", 
                openBirthdayLetter 
            ); 
 
    } 
 
 
    if ( 
        archiveName === 
        "idCard" 
    ) { 
 
        setTimeout(() => { 
 
            changeIDLayout( 
                currentIDLayout 
            ); 
 
            loadSavedIDCard(); 
 
        }, 0); 
 
    } 
 
 
    if ( 
        archiveName === 
        "specialCards" || 
        archiveName === 
        "movieCards" 
    ) { 
 
        setupCollectionKeyboardNavigation(); 
 
    } 
 
} 
 
 
/* ========================================================= 
   CLOSE ARCHIVE 
========================================================= */ 
 
function closeArchive() { 
 
    clearInterval( 
        cakeTimer 
    ); 
 
    cakeTimer = null; 
 
 
    closeFloraCard(); 
 
    closeIDCardInfo(); 
 
 
    const modal = 
        document.getElementById( 
            "archive-modal" 
        ); 
 
 
    modal.classList.remove( 
        "show" 
    ); 
 
 
    modal.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 
 
 
    document.body.classList.remove( 
        "modal-open" 
    ); 
 
 
    document 
        .getElementById( 
            "modal-body" 
        ) 
        .innerHTML = ""; 
 
 
    if (
    openedGifts.size === giftKeys.length &&
    sessionStorage.getItem(
        "slytherinQuestCompletedShown"
    ) !== "true"
) {

    scheduleQuestCompletion();

}
 
 
document 
    .getElementById( 
        "archive-modal" 
    ) 
    .addEventListener( 
        "click", 
        function(event) { 
 
            if ( 
                event.target === this 
            ) { 
 
                closeArchive(); 
 
            } 
 
        } 
    ); 
 
}
/* ========================================================= 
   6. GIFT 1 — HONEYDUKES 
========================================================= */ 
 
function startCakeTimer() { 
 
    clearInterval( 
        cakeTimer 
    ); 
 
 
    let timeLeft = 5; 
 
 
    const timerMessage = 
        document.getElementById( 
            "timer-message" 
        ); 
 
 
    const timer = 
        document.getElementById( 
            "cake-timer" 
        ); 
 
 
    const cake = 
        document.getElementById( 
            "honeydukes-cake" 
        ); 
 
 
    const button = 
        document.getElementById( 
            "candle-button" 
        ); 
 
 
    const message = 
        document.getElementById( 
            "honeydukes-message" 
        ); 
 
 
    if ( 
        !timer || 
        !cake || 
        !button || 
        !message 
    ) { 
 
        return; 
 
    } 
 
 
    timer.textContent = 
        timeLeft; 
 
    button.disabled = 
        true; 
 
    button.textContent = 
        "Blowing the candles..."; 
 
    cake.classList.remove( 
        "cake-blown" 
    ); 
 
 
    cakeTimer = 
        setInterval(() => { 
 
            timeLeft -= 1; 
 
            timer.textContent = 
                Math.max( 
                    timeLeft, 
                    0 
                ); 
 
 
            if ( 
                timeLeft <= 0 
            ) { 
 
                clearInterval( 
                    cakeTimer 
                ); 
 
                cakeTimer = 
                    null; 
 
                timerMessage.innerHTML = 
                    "Happy Birthday, Slytherin! ✦"; 
 
                cake.classList.add( 
                    "cake-blown" 
                ); 
 
                message.textContent = 
                    "The candles have been blown. What a joyous celebration!"; 
 
                button.disabled = 
                    false; 
 
                button.textContent = 
                    "Make Another Wish"; 
 
            } 
 
        }, 1000); 
 
} 
 
 
/* ========================================================= 
   7. GIFT 2 — SPECIAL LETTER 
========================================================= */ 
 
function openSpecialLetter() { 
 
    document 
        .getElementById( 
            "modal-body" 
        ) 
        .innerHTML = ` 
 
            <div class="letter-reading"> 
 
                <img 
                    src="special_letter_1.png" 
                    class="letter-page" 
                    alt="Special Letter Page 1" 
                > 
 
 
                <button 
                    class="letter-button" 
                    type="button" 
                    id="next-special-letter-button" 
                > 
 
                    Read Next Page 
 
                </button> 
 
            </div> 
 
        `; 
 
 
    document 
        .getElementById( 
            "next-special-letter-button" 
        ) 
        .addEventListener( 
            "click", 
            nextSpecialLetterPage 
        ); 
 
} 
 
 
function nextSpecialLetterPage() { 
 
    document 
        .getElementById( 
            "modal-body" 
        ) 
        .innerHTML = ` 
 
            <div class="letter-reading"> 
 
                <img 
                    src="special_letter_2.png" 
                    class="letter-page" 
                    alt="Special Letter Page 2" 
                > 
 
 
                <button 
                    class="letter-button" 
                    type="button" 
                    id="exit-special-letter-button" 
                > 
 
                    Exit the Letter 
 
                </button> 
 
            </div> 
 
        `; 
 
 
    document 
        .getElementById( 
            "exit-special-letter-button" 
        ) 
        .addEventListener( 
            "click", 
            closeArchive 
        ); 
 
} 
 
 
/* ========================================================= 
   8. GIFT 3 — WISHES 
========================================================= */ 
 
function openBirthdayLetter() { 
 
    document 
        .getElementById( 
            "modal-body" 
        ) 
        .innerHTML = ` 
 
            <div class="letter-reading"> 
 
                <img 
                    src="wishes_letter.png" 
                    class="letter-page" 
                    alt="A Few Wishes For You" 
                > 
 
 
                <button 
                    class="letter-button" 
                    type="button" 
                    id="exit-birthday-letter-button" 
                > 
 
                    Exit the Letter 
 
                </button> 
 
            </div> 
 
        `; 
 
 
    document 
        .getElementById( 
            "exit-birthday-letter-button" 
        ) 
        .addEventListener( 
            "click", 
            closeArchive 
        ); 
 
} 
 
 
/* ========================================================= 
   9. GIFT 4 — FLORA 
========================================================= */ 
 
function openFloraCard() { 
 
    const overlay = 
        document.getElementById( 
            "flora-card-overlay" 
        ); 
 
 
    if (!overlay) { 
        return; 
    } 
 
 
    overlay.classList.add( 
        "show" 
    ); 
 
 
    overlay.setAttribute( 
        "aria-hidden", 
        "false" 
    ); 
 
} 
 
 
function closeFloraCard() { 
 
    const overlay = 
        document.getElementById( 
            "flora-card-overlay" 
        ); 
 
 
    if (!overlay) { 
        return; 
    } 
 
 
    overlay.classList.remove( 
        "show" 
    ); 
 
 
    overlay.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 
 
} 
 
 
/* ========================================================= 
   10. GIFT 5 — ID CARD 
========================================================= */ 
 
const idCardLayouts = { 
 
    1: { 
 
        image: 
            "id-card-1.png", 
 
        photo: { 
 
            left: 11.2, 
 
            top: 27, 
 
            width: 21, 
 
            height: 52 
 
        }, 
 
        fields: { 
 
            name: [38, 30], 
 
            house: [38, 39], 
 
            birthday: [38, 48], 
 
            year: [38, 57], 
 
            wand: [38, 66], 
 
            patronus: [38, 75], 
 
            spell: [38, 84], 
 
            specialty: [38, 93] 
 
        } 
 
    }, 
 
    2: { 
 
        image: 
            "id-card-2.png", 
 
        photo: { 
 
            left: 69, 
 
            top: 27, 
 
            width: 21, 
 
            height: 52 
 
        }, 
 
        fields: { 
 
            name: [16, 30], 
 
            house: [16, 39], 
 
            birthday: [16, 48], 
 
            year: [16, 57], 
 
            wand: [16, 66], 
 
            patronus: [16, 75], 
 
            spell: [16, 84], 
 
            specialty: [16, 93] 
 
        } 
 
    }, 
 
    3: { 
 
        image: 
            "id-card-3.png", 
 
        photo: { 
 
            left: 12, 
 
            top: 26, 
 
            width: 21, 
 
            height: 52 
 
        }, 
 
        fields: { 
 
            name: [39, 30], 
 
            house: [39, 39], 
 
            birthday: [39, 48], 
 
            year: [39, 57], 
 
            wand: [39, 66], 
 
            patronus: [39, 75], 
 
            spell: [39, 84], 
 
            specialty: [39, 93] 
 
        } 
 
    } 
 
}; 
 
 
/* ========================================================= 
   CHANGE ID CARD LAYOUT 
========================================================= */ 
 
function changeIDLayout( 
    layoutNumber 
) { 
 
    const layout = 
        idCardLayouts[ 
            layoutNumber 
        ]; 
 
 
    if (!layout) { 
        return; 
    } 
 
 
    currentIDLayout = 
        layoutNumber; 
 
 
    const background = 
        document.getElementById( 
            "id-card-background" 
        ); 
 
    const photo = 
        document.getElementById( 
            "id-photo-container" 
        ); 
 
    const preview = 
        document.getElementById( 
            "id-card-preview" 
        ); 
 
 
    if (background) { 
 
        background.src = 
            layout.image; 
 
    } 
 
 
    if (preview) { 
 
        preview.dataset.layout = 
            String( 
                layoutNumber 
            ); 
 
    } 
 
 
    if (photo) { 
 
        photo.style.left = 
            layout.photo.left + "%"; 
 
        photo.style.top = 
            layout.photo.top + "%"; 
 
        photo.style.width = 
            layout.photo.width + "%"; 
 
        photo.style.height = 
            layout.photo.height + "%"; 
 
    } 
 
 
    document 
        .querySelectorAll( 
            ".layout-choice" 
        ) 
        .forEach(button => { 
 
            button.classList.toggle( 
                "active", 
                Number( 
                    button.textContent.trim() 
                ) === layoutNumber 
            ); 
 
        }); 
 
 
    positionLiveIDFields( 
        layoutNumber 
    ); 
 
    updateIDInfoOverlay(); 
 
} 
 
 
/* ========================================================= 
   POSITION ID CARD TEXT 
========================================================= */ 
 
function positionLiveIDFields( 
    layoutNumber 
) { 
 
    const layout = 
        idCardLayouts[ 
            layoutNumber 
        ]; 
 
 
    if (!layout) { 
        return; 
    } 
 
 
    const fieldMap = { 
 
        name: 
            "saved-name", 
 
        house: 
            "saved-house", 
 
        birthday: 
            "saved-birthday", 
 
        year: 
            "saved-year", 
 
        wand: 
            "saved-wand", 
 
        patronus: 
            "saved-patronus", 
 
        spell: 
            "saved-spell", 
 
        specialty: 
            "saved-specialty" 
 
    }; 
 
 
    Object 
        .entries(fieldMap) 
        .forEach( 
            ([key, id]) => { 
 
                const element = 
                    document.getElementById( 
                        id 
                    ); 
 
                const position = 
                    layout.fields[ 
                        key 
                    ]; 
 
 
                if ( 
                    !element || 
                    !position 
                ) { 
 
                    return; 
 
                } 
 
 
                element.style.left = 
                    position[0] + "%"; 
 
                element.style.top = 
                    position[1] + "%"; 
 
            } 
        ); 
 
} 
 
 
/* ========================================================= 
   GET ID VALUES 
========================================================= */ 
 
function getIDValues() { 
 
    return { 
 
        name: 
            document 
                .getElementById("id-name") 
                ?.value 
                .trim() || "", 
 
        house: 
            document 
                .getElementById("id-house") 
                ?.value 
                .trim() || "", 
 
        birthday: 
            document 
                .getElementById("id-birthday") 
                ?.value 
                .trim() || "", 
 
        year: 
            document 
                .getElementById("id-year") 
                ?.value 
                .trim() || "", 
 
        wand: 
            document 
                .getElementById("id-wand") 
                ?.value 
                .trim() || "", 
 
        patronus: 
            document 
                .getElementById("id-patronus") 
                ?.value 
                .trim() || "", 
 
        spell: 
            document 
                .getElementById("id-spell") 
                ?.value 
                .trim() || "", 
 
        specialty: 
            document 
                .getElementById("id-specialty") 
                ?.value 
                .trim() || "" 
 
    }; 
 
} 
 
 
/* ========================================================= 
   APPLY ID VALUES TO PREVIEW 
========================================================= */ 
 
function applyIDValuesToPreview( 
    values 
) { 
 
    const mapping = { 
 
        name: 
            "saved-name", 
 
        house: 
            "saved-house", 
 
        birthday: 
            "saved-birthday", 
 
        year: 
            "saved-year", 
 
        wand: 
            "saved-wand", 
 
        patronus: 
            "saved-patronus", 
 
        spell: 
            "saved-spell", 
 
        specialty: 
            "saved-specialty" 
 
    }; 
 
 
    Object 
        .entries(mapping) 
        .forEach( 
            ([key, id]) => { 
 
                const element = 
                    document.getElementById( 
                        id 
                    ); 
 
 
                if (element) { 
 
                    element.textContent = 
                        values[key] || ""; 
 
                } 
 
            } 
        ); 
 
} 
 
 
/* ========================================================= 
   SAVE ID CARD 
========================================================= */ 
 
function saveIDCard() { 
 
    const values = 
        getIDValues(); 
 
 
    applyIDValuesToPreview( 
        values 
    ); 
 
 
    localStorage.setItem( 
        "slytherinIDInfo", 
        JSON.stringify( 
            values 
        ) 
    ); 
 
 
    localStorage.setItem( 
        "slytherinIDLayout", 
        String( 
            currentIDLayout 
        ) 
    ); 
 
 
    if (uploadedIDPhotoData) { 
 
        localStorage.setItem( 
            "slytherinIDPhoto", 
            uploadedIDPhotoData 
        ); 
 
    } 
 
 
    const button = 
        document.querySelector( 
            ".save-id-button" 
        ); 
 
 
    if (button) { 
 
        const originalText = 
            button.textContent; 
 
 
        button.textContent = 
            "Information Saved ✓"; 
 
 
        setTimeout(() => { 
 
            if ( 
                document.body.contains( 
                    button 
                ) 
            ) { 
 
                button.textContent = 
                    originalText; 
 
            } 
 
        }, 1800); 
 
    } 
 
 
    updateIDInfoOverlay(); 
 
} 
 
 
/* ========================================================= 
   LOAD SAVED ID CARD 
========================================================= */ 
 
function loadSavedIDCard() { 
 
    const savedInfo = 
        localStorage.getItem( 
            "slytherinIDInfo" 
        ); 
 
 
    const savedLayout = 
        Number( 
            localStorage.getItem( 
                "slytherinIDLayout" 
            ) 
        ) || 1; 
 
 
    const savedPhoto = 
        localStorage.getItem( 
            "slytherinIDPhoto" 
        ); 
 
 
    currentIDLayout = 
        idCardLayouts[ 
            savedLayout 
        ] 
            ? savedLayout 
            : 1; 
 
 
    if (savedInfo) { 
 
        try { 
 
            const values = 
                JSON.parse( 
                    savedInfo 
                ); 
 
 
            const fields = { 
 
                "id-name": 
                    values.name || "", 
 
                "id-house": 
                    values.house || 
                    "Slytherin", 
 
                "id-birthday": 
                    values.birthday || "", 
 
                "id-year": 
                    values.year || "", 
 
                "id-wand": 
                    values.wand || "", 
 
                "id-patronus": 
                    values.patronus || "", 
 
                "id-spell": 
                    values.spell || "", 
 
                "id-specialty": 
                    values.specialty || "" 
 
            }; 
 
 
            Object 
                .entries(fields) 
                .forEach( 
                    ([id, value]) => { 
 
                        const input = 
                            document.getElementById( 
                                id 
                            ); 
 
 
                        if (input) { 
 
                            input.value = 
                                value; 
 
                        } 
 
                    } 
                ); 
 
 
            applyIDValuesToPreview( 
                values 
            ); 
 
 
        } catch (error) { 
 
            console.warn( 
                "Could not load saved ID card information.", 
                error 
            ); 
 
        } 
 
    } else { 
 
        const house = 
            document.getElementById( 
                "id-house" 
            ); 
 
 
        if (house) { 
 
            house.value = 
                "Slytherin"; 
 
        } 
 
    } 
 
 
    if (savedPhoto) { 
 
        uploadedIDPhotoData = 
            savedPhoto; 
 
 
        const preview = 
            document.getElementById( 
                "id-profile-preview" 
            ); 
 
        const placeholder = 
            document.getElementById( 
                "photo-placeholder" 
            ); 
 
        const photoName = 
            document.getElementById( 
                "photo-name" 
            ); 
 
 
        if (preview) { 
 
            preview.src = 
                savedPhoto; 
 
            preview.style.display = 
                "block"; 
 
        } 
 
 
        if (placeholder) { 
 
            placeholder.style.display = 
                "none"; 
 
        } 
 
 
        if (photoName) { 
 
            photoName.textContent = 
                "Saved photo"; 
 
        } 
 
    } 
 
 
    changeIDLayout( 
        currentIDLayout 
    ); 
 
 
    updateIDInfoOverlay(); 
 
} 
 
 
/* ========================================================= 
   PHOTO UPLOAD 
========================================================= */ 
 
document.addEventListener( 
    "change", 
    function(event) { 
 
        if ( 
            event.target.id !== 
            "id-photo-upload" 
        ) { 
 
            return; 
 
        } 
 
 
        const file = 
            event.target.files?.[0]; 
        if (!file) { 
            return; 
        } 
 
 
        if ( 
            !file.type.startsWith( 
                "image/" 
            ) 
        ) { 
 
            alert( 
                "Please choose an image file." 
            ); 
 
 
            event.target.value = 
                ""; 
 
 
            return; 
 
        } 
 
 
        uploadedIDPhoto = 
            file; 
 
 
        const reader = 
            new FileReader(); 
 
 
        reader.onload = 
            function(e) { 
 
                uploadedIDPhotoData = 
                    e.target.result; 
 
 
                const preview = 
                    document.getElementById( 
                        "id-profile-preview" 
                    ); 
 
                const placeholder = 
                    document.getElementById( 
                        "photo-placeholder" 
                    ); 
 
                const photoName = 
                    document.getElementById( 
                        "photo-name" 
                    ); 
 
 
                if (preview) { 
 
                    preview.src = 
                        uploadedIDPhotoData; 
 
                    preview.style.display = 
                        "block"; 
 
                } 
 
 
                if (placeholder) { 
 
                    placeholder.style.display = 
                        "none"; 
 
                } 
 
 
                if (photoName) { 
 
                    photoName.textContent = 
                        file.name; 
 
                } 
 
            }; 
 
 
        reader.readAsDataURL( 
            file 
        ); 
 
    } 
); 
 
 
/* ========================================================= 
   DOWNLOAD FINISHED ID CARD 
========================================================= */ 
 
async function downloadIDCard() { 
 
    const layout = 
        idCardLayouts[ 
            currentIDLayout 
        ]; 
 
 
    if (!layout) { 
        return; 
    } 
 
 
    try { 
 
        const canvas = 
            document.createElement( 
                "canvas" 
            ); 
 
        const ctx = 
            canvas.getContext( 
                "2d" 
            ); 
 
        const background = 
            await loadImage( 
                layout.image 
            ); 
 
 
        canvas.width = 
            background.naturalWidth; 
 
        canvas.height = 
            background.naturalHeight; 
 
 
        ctx.drawImage( 
            background, 
            0, 
            0, 
            canvas.width, 
            canvas.height 
        ); 
 
 
        const photoSource = 
            uploadedIDPhotoData || 
            localStorage.getItem( 
                "slytherinIDPhoto" 
            ); 
 
 
        if (photoSource) { 
 
            const photo = 
                await loadImage( 
                    photoSource 
                ); 
 
 
            const x = 
                canvas.width * 
                ( 
                    layout.photo.left / 
                    100 
                ); 
 
 
            const y = 
                canvas.height * 
                ( 
                    layout.photo.top / 
                    100 
                ); 
 
 
            const width = 
                canvas.width * 
                ( 
                    layout.photo.width / 
                    100 
                ); 
 
 
            const height = 
                canvas.height * 
                ( 
                    layout.photo.height / 
                    100 
                ); 
 
 
            drawCoverImage( 
                ctx, 
                photo, 
                x, 
                y, 
                width, 
                height 
            ); 
 
        } 
 
 
        drawIDText( 
            ctx, 
            canvas, 
            layout 
        ); 
 
 
        const link = 
            document.createElement( 
                "a" 
            ); 
 
 
        link.download = 
            "tasha's slytherin card.png"; 
 
 
        link.href = 
            canvas.toDataURL( 
                "image/png" 
            ); 
 
        link.style.display = 
            "none"; 
 
 
        document.body.appendChild( 
            link 
        ); 
 
        link.click(); 
 
        link.remove(); 
 
 
    } catch (error) { 
 
        console.error( 
            error 
        ); 
 
 
        alert( 
            "The ID card could not be generated. Please check that the card images are in the same folder as the website." 
        ); 
 
    } 
 
} 
 
 
/* ========================================================= 
   DRAW PHOTO WITH COVER CROP 
========================================================= */ 
 
function drawCoverImage( 
    ctx, 
    image, 
    x, 
    y, 
    width, 
    height 
) { 
 
    const imageRatio = 
        image.naturalWidth / 
        image.naturalHeight; 
 
 
    const boxRatio = 
        width / 
        height; 
 
 
    let drawWidth; 
 
    let drawHeight; 
 
    let drawX; 
 
    let drawY; 
 
 
    if ( 
        imageRatio > 
        boxRatio 
    ) { 
 
        drawHeight = 
            height; 
 
        drawWidth = 
            height * 
            imageRatio; 
 
        drawX = 
            x - 
            ( 
                drawWidth - 
                width 
            ) / 2; 
 
        drawY = 
            y; 
 
    } else { 
 
        drawWidth = 
            width; 
 
        drawHeight = 
            width / 
            imageRatio; 
 
        drawX = 
            x; 
 
        drawY = 
            y - 
            ( 
                drawHeight - 
                height 
            ) / 2; 
 
    } 
 
 
    ctx.save(); 
 
    ctx.beginPath(); 
 
    ctx.rect( 
        x, 
        y, 
        width, 
        height 
    ); 
 
    ctx.clip(); 
 
    ctx.drawImage( 
        image, 
        drawX, 
        drawY, 
        drawWidth, 
        drawHeight 
    ); 
 
    ctx.restore(); 
 
} 
 
 
/* ========================================================= 
   DRAW ID TEXT 
========================================================= */ 
 
function drawIDText( 
    ctx, 
    canvas, 
    layout 
) { 
 
    const values = 
        getIDValues(); 
 
 
    const fields = [ 
 
        [ 
            "name", 
            values.name 
        ], 
 
        [ 
            "house", 
            values.house 
        ], 
 
        [ 
            "birthday", 
            values.birthday 
        ], 
 
        [ 
            "year", 
            values.year 
        ], 
 
        [ 
            "wand", 
            values.wand 
        ], 
 
        [ 
            "patronus", 
            values.patronus 
        ], 
 
        [ 
            "spell", 
            values.spell 
        ], 
 
        [ 
            "specialty", 
            values.specialty 
        ] 
 
    ]; 
 
 
    ctx.fillStyle = 
        "#173E2A"; 
 
 
    ctx.font = 
        "bold 25px Georgia"; 
 
 
    ctx.textBaseline = 
        "top"; 
 
 
    fields.forEach( 
        ([key, value]) => { 
 
            if ( 
                !value || 
                !layout.fields[key] 
            ) { 
 
                return; 
 
            } 
 
 
            const position = 
                layout.fields[ 
                    key 
                ]; 
 
 
            const x = 
                canvas.width * 
                ( 
                    position[0] / 
                    100 
                ); 
 
 
            const y = 
                canvas.height * 
                ( 
                    position[1] / 
                    100 
                ); 
 
 
            ctx.fillText( 
                value, 
                x, 
                y 
            ); 
 
        } 
    ); 
 
} 
 
 
/* ========================================================= 
   IMAGE LOADING 
========================================================= */ 
 
function loadImage( 
    source 
) { 
 
    return new Promise( 
        (resolve, reject) => { 
 
            const image = 
                new Image(); 
 
 
            image.onload = 
                () => resolve( 
                    image 
                ); 
 
 
            image.onerror = 
                () => reject( 
                    new Error( 
                        `Unable to load image: ${source}` 
                    ) 
                ); 
 
 
            image.src = 
                source; 
 
        } 
    ); 
 
} 
 
 
/* ========================================================= 
   ID CARD INFORMATION 
========================================================= */ 
 
function openIDCardInfo() { 
 
    const overlay = 
        document.getElementById( 
            "id-info-overlay" 
        ); 
 
 
    if (!overlay) { 
        return; 
    } 
 
 
    updateIDInfoOverlay(); 
 
 
    overlay.classList.add( 
        "show" 
    ); 
 
 
    overlay.setAttribute( 
        "aria-hidden", 
        "false" 
    ); 
 
} 
 
 
function closeIDCardInfo() { 
 
    const overlay = 
        document.getElementById( 
            "id-info-overlay" 
        ); 
 
 
    if (!overlay) { 
        return; 
    } 
 
 
    overlay.classList.remove( 
        "show" 
    ); 
 
 
    overlay.setAttribute( 
        "aria-hidden", 
        "true" 
    ); 
 
} 
 
 
function updateIDInfoOverlay() { 
 
    const layoutNumber = 
        document.getElementById( 
            "info-layout-number" 
        ); 
 
 
    const photoStatus = 
        document.getElementById( 
            "info-photo-status" 
        ); 
 
 
    if (layoutNumber) { 
 
        layoutNumber.textContent = 
            currentIDLayout; 
 
    } 
 
 
    if (photoStatus) { 
 
        photoStatus.textContent = 
 
            uploadedIDPhotoData || 
            localStorage.getItem( 
                "slytherinIDPhoto" 
            ) 
 
                ? "Uploaded" 
 
                : "Not uploaded"; 
 
    } 
 
} 
 
 
/* ========================================================= 
   13. GIFT 6 & 7 — FLIP CARDS 
========================================================= */ 
 
function flipCollectionCard( 
    card 
) { 
 
    if (!card) { 
        return; 
    } 
 
 
    const flipped = 
        card.dataset.flipped === 
        "true"; 
 
 
    card.dataset.flipped = 
        String(!flipped); 
 
 
    card.classList.toggle( 
        "is-flipped", 
        !flipped 
    ); 
 
 
    const type = 
        card.dataset.type; 
 
 
    if ( 
        type === "bucky" 
    ) { 
 
        updateBuckyDownloadState(); 
 
    } 
 
} 
 
 
function setupCollectionKeyboardNavigation() { 
 
    document 
        .querySelectorAll( 
            ".flip-card" 
        ) 
        .forEach(card => { 
 
            card.addEventListener( 
                "keydown", 
                event => { 
 
                    if ( 
                        event.key === 
                            "Enter" || 
                        event.key === 
                            " " 
                    ) { 
 
                        event.preventDefault(); 
 
                        flipCollectionCard( 
                            card 
                        ); 
 
                    } 
 
                } 
            ); 
 
        }); 
 
} 
 
 
/* ========================================================= 
   GIFT 6 DOWNLOAD STATE 
========================================================= */ 
 
function updateBuckyDownloadState() { 
 
    const cards = [ 
 
        ...document.querySelectorAll( 
            "#bucky-card-grid .flip-card" 
        ) 
 
    ]; 
 
 
    const downloadButton = 
        document.getElementById( 
            "download-bucky-cards" 
        ); 
 
 
    if (!downloadButton) { 
        return; 
    } 
 
 
    const allFlipped = 
 
        cards.length === 4 && 
 
        cards.every( 
            card => 
                card.dataset.flipped === 
                "true" 
        ); 
 
 
    downloadButton.disabled = 
        !allFlipped; 
 
 
    downloadButton.textContent = 
 
        allFlipped 
 
            ? "Obtain All Bucky Cards" 
 
            : "Flip All Cards to Unlock Download"; 
 
} 
 
 
/* ========================================================= 
   DOWNLOAD ALL BUCKY CARDS 
========================================================= */ 
 
async function downloadAllBuckyCards() { 
 
    const cards = [ 
        "buckycard1_front.png", 
        "buckycard2_front.png", 
        "buckycard3_front.png", 
        "buckycard4_front.png" 
    ]; 
 
    /*
     * Use the actual PNG filenames as the
     * downloaded filenames.
     */
    const filenames = [ 
        "bucky-card-1.png", 
        "bucky-card-2.png", 
        "bucky-card-3.png", 
        "bucky-card-4.png" 
    ]; 
 
 
    for ( 
        let i = 0; 
        i < cards.length; 
        i++ 
    ) { 
 
        await downloadImageFile( 
            cards[i], 
            filenames[i], 
            i * 500 
        ); 
 
    } 
 
} 
 
 
/* ========================================================= 
   GIFT 7 — MOVIE CARD DOWNLOAD 
========================================================= */ 
 
async function downloadMovieCard( 
    number 
) { 
 
    const card = 
        document.querySelector( 
            `#movie-card-grid .flip-card[data-number="${number}"]` 
        ); 
 
 
    if ( 
        !card || 
        card.dataset.flipped !== 
            "true" 
    ) { 
 
        alert( 
            `Flip Movie Card ${number} first.` 
        ); 
 
        return; 
 
    } 
 
 
    await downloadImageFile( 
        `moviecard${number}_front.png`, 
        `moviecard${number}_front.png` 
    ); 
 
} 
 
 
/* =========================================================
   IMAGE DOWNLOAD HELPER
========================================================= */

async function downloadImageFile(
    source,
    filename,
    delay = 0
) {

    /*
     * Optional delay between multiple downloads.
     */
    if (delay > 0) {

        await new Promise(
            resolve => {

                setTimeout(
                    resolve,
                    delay
                );

            }
        );

    }


    try {

        /*
         * IMPORTANT:
         *
         * Do NOT use fetch() here.
         *
         * When the website is opened locally from
         * a folder using file://, fetch() can fail
         * and produce the "make sure the image is
         * in the same folder" error.
         *
         * Instead, load the PNG as an Image and
         * convert it to a PNG data URL.
         */

        const image =
            await loadImage(
                source
            );


        /*
         * Create a canvas the same size as
         * the original PNG.
         */

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            image.naturalWidth;


        canvas.height =
            image.naturalHeight;


        const ctx =
            canvas.getContext(
                "2d"
            );


        /*
         * Draw the original PNG onto the canvas.
         */

        ctx.drawImage(
            image,
            0,
            0
        );


        /*
         * Convert the canvas back into a PNG.
         */

        const dataURL =
            canvas.toDataURL(
                "image/png"
            );


        /*
         * Create a temporary download link.
         */

        const link =
            document.createElement(
                "a"
            );


        link.href =
            dataURL;


        link.download =
            filename;


        link.style.display =
            "none";


        /*
         * Trigger the browser download.
         */

        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


    } catch (error) {

        console.error(
            "Image download failed:",
            error
        );


        alert(
            `Could not download "${filename}". Please make sure the image file is in the same folder as the website.`
        );

    }

}
 
 
/* ========================================================= 
   14. KEYBOARD / OVERLAY FINISHING TOUCHES 
========================================================= */ 
 
document.addEventListener( 
    "keydown", 
    function(event) { 
 
        if ( 
            event.key !== 
            "Escape" 
        ) { 
 
            return; 
 
        } 
 
 
        const questCompleted = 
            document.getElementById( 
                "quest-completed-modal" 
            ); 
 
 
        const questBegin = 
            document.getElementById( 
                "quest-letter-modal" 
            ); 
 
 
        const archive = 
            document.getElementById( 
                "archive-modal" 
            ); 
 
 
        const flora = 
            document.getElementById( 
                "flora-card-overlay" 
            ); 
 
 
        const info = 
            document.getElementById( 
                "id-info-overlay" 
            ); 
 
 
        if ( 
            questCompleted?.classList.contains( 
                "show" 
            ) 
        ) { 
 
            closeQuestCompleted(); 
 
            return; 
 
        } 
 
 
        if ( 
            questBegin?.classList.contains( 
                "show" 
            ) 
        ) { 
 
            closeQuestLetter(); 
 
            return; 
 
        } 
 
 
        if ( 
            info?.classList.contains( 
                "show" 
            ) 
        ) { 
 
            closeIDCardInfo(); 
 
            return; 
 
        } 
 
 
        if ( 
            flora?.classList.contains( 
                "show" 
            ) 
        ) { 
 
            closeFloraCard(); 
 
            return; 
 
        } 
 
 
        if ( 
            archive?.classList.contains( 
                "show" 
            ) 
        ) { 
 
            closeArchive(); 
 
        } 
 
    } 
); 
 
 
/* ========================================================= 
   NESTED OVERLAY CLICK-OUTSIDE 
========================================================= */ 
 
document.addEventListener( 
    "click", 
    function(event) { 
 
        const flora = 
            document.getElementById( 
                "flora-card-overlay" 
            ); 
 
 
        const info = 
            document.getElementById( 
                "id-info-overlay" 
            ); 
 
 
        if ( 
            event.target === 
            flora 
        ) { 
 
            closeFloraCard(); 
 
        } 
 
 
        if ( 
            event.target === 
            info 
        ) { 
 
            closeIDCardInfo(); 
 
        } 
 
    } 
); 
 
 
/* ========================================================= 
   15. INITIAL STATE 
========================================================= */ 
 
document.addEventListener( 
    "DOMContentLoaded", 
    function() { 
 
        updateDots(); 
 
 
        document.body.classList.remove( 
            "home-active" 
        ); 
 
 
        document.addEventListener( 
            "keydown", 
            function(event) { 
 
                if ( 
                    event.key === 
                        "Enter" && 
                    event.target.matches( 
                        ".id-card-form input" 
                    ) 
                ) { 
 
                    event.preventDefault(); 
 
                } 
 
            } 
        ); 
 
    } 
);