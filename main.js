// ...existing code...
let textarea = document.querySelector("textarea");
let select = document.querySelector("select");

let voices = [];

function populateVoices() {
    voices = window.speechSynthesis.getVoices() || [];
    select.innerHTML = "";
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? " — default" : ""}`;
        select.appendChild(option);
    });
}

// some browsers fire getVoices() asynchronously
populateVoices();
if (typeof window.speechSynthesis !== "undefined") {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

let a = () => {
    if (!textarea || !textarea.value.trim()) return;
    let utter = new SpeechSynthesisUtterance(textarea.value);
    utter.lang = "en-US";
    utter.volume = 1;
    utter.rate = 1;
    utter.pitch = 1;

    const idx = parseInt(select.value, 10);
    if (!Number.isNaN(idx) && voices[idx]) {
        utter.voice = voices[idx];
        // set lang from voice if available
        if (voices[idx].lang) utter.lang = voices[idx].lang;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
}

// optional: speak immediately when user changes selection (remove if not wanted)
select.addEventListener("change", () => {
    // preview first few words
    // a();
});
// ...existing code...