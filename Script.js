const feed = document.getElementById("feed");

questions.forEach((q, index) => {

    const card = document.createElement("div");
    card.className = "poll-card";

    const totalVotes = q.votes.reduce((a, b) => a + b, 0);

    let optionsHTML = "";

    q.options.forEach((option, i) => {
        optionsHTML += `<button class="option">${option}</button>`;
    });

    card.innerHTML = `
        <div class="question-number">
            Question ${index + 1}
        </div>

        <div class="question">
            ${q.question}
        </div>

        ${optionsHTML}

        <div class="reference">
            📖 ${q.reference}
        </div>

        <div class="explanation">
            💡 ${q.explanation}
        </div>

        <div class="vote-count">
            ${totalVotes} Votes
        </div>
    `;

    feed.appendChild(card);
});