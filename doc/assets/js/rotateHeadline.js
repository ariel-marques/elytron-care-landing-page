function getRandomHeadline() {
    const randomIndex = Math.floor(Math.random() * headlines.length);
    return headlines[randomIndex];
}

document.addEventListener('DOMContentLoaded', () => {
    const headlineElement = document.getElementById('headline');

    if (headlineElement) {
        const randomHeadline = getRandomHeadline();
        headlineElement.textContent = randomHeadline;

        console.log("🧠 Headline exibida:", randomHeadline);

        // 🔥 Disparar evento no GA4
        if (typeof gtag === 'function') {
            gtag('event', 'headline_displayed', {
                event_category: 'Landing Page',
                event_label: randomHeadline,
                value: 1
            });
        } else {
            console.warn("⚠️ gtag() não encontrado. GA4 não carregado.");
        }
    }
});