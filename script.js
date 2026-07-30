const feed = document.getElementById("feed");
const toast = document.getElementById("toast");

function showToast() {
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

questions.forEach((q, questionIndex) => {

    const totalVotes = q.votes.reduce((a, b) => a + b, 0);

    const card = document.createElement("div");
    card.className = "poll-card";

    let optionsHTML = "";

    q.options.forEach((option, index) => {

        optionsHTML += `

        <button
            class="option"
            data-question="${questionIndex}"
            data-option="${index}">

            ${option}

        </button>

        `;

    });

    let resultsHTML = "";

    q.options.forEach((option, index) => {

        const percent = Math.round(
            (q.votes[index] / totalVotes) * 100
        );

        resultsHTML += `

        <div class="percent">

            <span>${option}</span>

            <span>${percent}%</span>

        </div>

        <div class="bar">

            <div
            class="fill"
            data-width="${percent}">
            </div>

        </div>

        `;

    });

    card.innerHTML = `

        <div class="question-number">

            Question ${questionIndex + 1}

        </div>

        <div class="question">

            ${q.question}

        </div>

        ${optionsHTML}

        <div class="result">

            ${resultsHTML}

            <div class="reference">

                📖 ${q.reference}

            </div>

            <div class="explanation">

                💡 ${q.explanation}

            </div>

            <div class="vote-count">

                ${totalVotes} Votes

            </div>

        </div>

    `;

    feed.appendChild(card);

});

document.querySelectorAll(".option").forEach(button => {

    button.addEventListener("click", function () {

        const question =
            Number(this.dataset.question);

        const answer =
            Number(this.dataset.option);

        const q = questions[question];

        const card = this.closest(".poll-card");

        card.querySelectorAll(".option")
            .forEach(btn => {

                btn.classList.add("locked");

            });

        if (answer === q.answer) {

            this.classList.add("correct");

        } else {

            this.classList.add("wrong");

            card.querySelectorAll(".option")[q.answer]
                .classList.add("correct");

        }

        const result =
            card.querySelector(".result");

        result.classList.add("show");

        setTimeout(() => {

            result.querySelectorAll(".fill")
                .forEach(fill => {

                    fill.style.width =
                        fill.dataset.width + "%";

                });

        }, 120);

        showToast();

    });

});