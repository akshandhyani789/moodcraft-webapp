const loginBtn = document.querySelectorAll(".loginBtn");
const loader = document.getElementById("loader");
const mainContent = document.getElementById("home");
const toggleBtn = document.getElementById("toggleBtn");
const icon = document.getElementById("icon");
const exersizetext = document.querySelector(".exersizetext")
const exersizemsg = document.getElementById("msg")
const profilebtn = document.querySelector(".profilesection")
const contactname = document.getElementById("contactname")
const contactemail = document.getElementById("contactemail")
const contactmsg = document.getElementById("contactmsg")
const moodopt = document.querySelectorAll(".moodopt");


function Gotologinpage() {
  loginBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      loader.style.display = "flex";
      setTimeout(() => {
        loader.style.display = "none";
        mainContent.style.display = "block";
        window.location.href = "loginpage/login.html";
      }, 1000);
    });
  });
}

function smoothscroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function playbrethexersize() {
  let isRunning = false; // Track breathing state

  toggleBtn.addEventListener("click", () => {
    const steps = [
      { action: "Inhale for four second", time: 0 },
      { action: "Hold  for four second ", time: 4000 },
      { action: "Exhale  for four second", time: 8000 },
      { action: "Hold  for four second", time: 12000 }
    ];

    if (!isRunning) {
      // Start breathing
      isRunning = true;
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");

      steps.forEach(step => {
        setTimeout(() => {
          const msg = new SpeechSynthesisUtterance(step.action);
          msg.lang = 'en-in'
          speechSynthesis.speak(msg)
          exersizetext.innerHTML = step.action
        }, step.time);
      });
      setTimeout(() => {
        exersizetext.innerHTML = "start"

      }, 16000);

      // After 16 seconds, end breathing
      setTimeout(() => {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        isRunning = false; // Allow restart
      }, 16000);
    } else {
      console.log("Breathing already in progress...");
      exersizemsg.innerHTML = "Breathing already in progress..."
      setTimeout(() => {
        exersizemsg.innerHTML = ""
      }, 1000);
    }
  });
}

function opencontactsection() {
  const openBtn = document.getElementById("openContact");
  const closeBtn = document.getElementById("closeContact");
  const modal = document.getElementById("contactModal");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Optional: Close modal when clicking outside the box
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

function savecontactinfo() {
  localStorage.setItem("Namefromcontact", contactname.value)
  localStorage.setItem("emailfromcontact", contactemail.value)
  localStorage.setItem("msgfromcontact", contactmsg.value)

  let div = document.createElement("div");
  div.textContent = `<div class="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded relative max-w-md mx-auto mt-6">
  <strong class="font-bold">Success!</strong>
  <span class="block sm:inline">Your message has been sent successfully.</span>
</div>
`
  console.log("hello")
}

function stopspeak(){
  window.speechSynthesis.cancel()
}

function givesuggestionformood() {
  const suggestions = {
    happy: {
      text: "You're feeling happy! Spread the joy – maybe draw something or tell a joke!",
      voice: "You seem really happy! That's wonderful. Spread joy today!",
      action: "https://quickdraw.withgoogle.com/"
    },
    sad: {
      text: "It's okay to feel sad. Try journaling your thoughts or listening to music.",
      voice: "You’re feeling sad. That’s okay. Take a few deep breaths and maybe talk to someone.",
      action: "https://www.calm.com/"
    },
    anxious: {
      text: "Feeling anxious? Try this breathing game to calm your mind.",
      voice: "Take a slow breath in... and out. You’re doing the best you can.",
      action: "https://breathingspace.me/"
    },
    angry: {
      text: "Angry? Try clicking or popping bubbles to release that steam.",
      voice: "Anger is energy. Let’s release it gently. Maybe move or stretch a bit.",
      action: "https://papergames.io/en/"
    },
    excited: {
      text: "You're full of excitement! Channel that into a quick challenge!",
      voice: "Excitement is power. Use it to try something fun and spontaneous.",
      action: "https://www.typingclub.com/"
    },
    tired: {
      text: "Feeling tired? Let’s do a short breathing or relaxing activity.",
      voice: "You deserve rest. Take a short break, breathe deeply, and recharge.",
      action: "https://www.sleepfoundation.org/sleep-tools"
    }
  };

  const suggestionBox = document.getElementById("suggestion-box");
  const stop = document.getElementById("stop")

  moodopt.forEach(mood => {
    mood.addEventListener("click", () => {
      stopspeak()

      const label = mood.closest("label");
      const clone = label.cloneNode(true);
      const input = clone.querySelector("input");
      if (input) input.remove();

      const result = clone.innerText.trim().toLowerCase();
      const moodData = suggestions[result];

      if (moodData) {
        // Voice
        const msg = new SpeechSynthesisUtterance(moodData.voice);
        msg.lang = 'en-US';
        speechSynthesis.speak(msg);

        // Card UI
        suggestionBox.innerHTML = `
          <div class="card">
            <h3 class="text-xl font-semibold capitalize">${result}</h3>
            <p class="mt-2 text-gray-700">${moodData.text}</p>
            <a href="${moodData.action}" id="gamelink" target="_blank" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Try Activity</a>
          </div>
        `;
        document.getElementById("gamelink").addEventListener("click", ()=>{
          stopspeak()
        })
        setTimeout(() => {
          suggestionBox.innerHTML =""
        }, 6000);
      }
      stop.addEventListener("click", ()=>{
              stopspeak()

      })
    });
  });
}

 function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
  }

  // Auto-close mobile menu when clicking a link
  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("mobileMenu").classList.add("hidden");
    });
  });

function main() {
  smoothscroll()
  Gotologinpage()
  playbrethexersize()
  opencontactsection()
  givesuggestionformood()
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const username = sessionStorage.getItem("username");

  if (isLoggedIn === "true") {
    console.log("login")
    profilebtn.innerHTML = '<button class="w-12 h-12 rounded-full border-[3px] border-green-400 overflow-hidden shadow-md transition hover:scale-105"><img src="https://api.dicebear.com/9.x/bottts/svg" alt="Profile" class="w-full h-full object-cover" /></button>'
    let profile = `<div class="card">`
  } else {
    console.log("plese log in")
  }

  window.addEventListener("beforeunload", () => {
  window.speechSynthesis.cancel(); // stops any ongoing speech
});

}

main()


