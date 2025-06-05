

    // Збір інформації про систему
    const systemData = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
    };

    // Збереження у localStorage
    localStorage.setItem('systemInfo', JSON.stringify(systemData));

    // Відображення у футері
    const infoElement = document.getElementById('systemInfo');
    const savedInfo = localStorage.getItem('systemInfo');

    if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        infoElement.textContent = `
User Agent: ${parsed.userAgent}
Платформа: ${parsed.platform}
Мова: ${parsed.language}
Cookies увімкнено: ${parsed.cookiesEnabled ? 'Так' : 'Ні'}
        `.trim();
    }
document.addEventListener("DOMContentLoaded", () => {
  const commentsList = document.getElementById("comments-list");

  fetch("https://jsonplaceholder.typicode.com/posts/18/comments")
    .then(response => {
      if (!response.ok) {
        throw new Error("Помилка завантаження коментарів");
      }
      return response.json();
    })
    .then(comments => {
      comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${comment.name}</strong> (${comment.email})<br>
          <p>${comment.body}</p>
        `;
        commentsList.appendChild(li);
      });
    })
    .catch(error => {
      commentsList.innerHTML = `<li>⚠️ ${error.message}</li>`;
    });

  // Приклад виводу інформації про систему 
  const systemInfo = document.getElementById("systemInfo");
  systemInfo.textContent = `Мова: ${navigator.language}\nБраузер: ${navigator.userAgent}`;
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const currentHour = new Date().getHours();
  const prefersDark = localStorage.getItem("theme") === "dark";

  // Автоматичне встановлення теми за часом (якщо користувач не вибирав)
  if (!localStorage.getItem("theme")) {
    if (currentHour >= 7 && currentHour < 21) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      toggle.checked = true;
      localStorage.setItem("theme", "dark");
    }
  } else {
    // Застосування збереженої теми
    if (prefersDark) {
      document.body.classList.add("dark-theme");
      toggle.checked = true;
    }
  }

  // Слухач перемикача
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  });

  // Вивід інформації про систему
  const systemInfo = document.getElementById("systemInfo");
  systemInfo.textContent = `Мова: ${navigator.language}\nБраузер: ${navigator.userAgent}`;
  
  // Завантаження коментарів
  const commentsList = document.getElementById("comments-list");
  fetch("https://jsonplaceholder.typicode.com/posts/18/comments")
    .then(response => response.json())
    .then(comments => {
      comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${comment.name}</strong> (${comment.email})<br><p>${comment.body}</p>`;
        commentsList.appendChild(li);
      });
    })
    .catch(error => {
      commentsList.innerHTML = `<li>⚠️ ${error.message}</li>`;
    });
});

// Показати модальне вікно через 60 секунд
setTimeout(() => {
    document.getElementById('feedbackModal').style.display = 'block';
}, 10000); // 60 000 мс = 1 хвилина

// Закриття модального вікна
function closeModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}
