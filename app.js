async function searchGithub() {
    const username = document.getElementById('githubUsername').value;

    if (!username) {
        alert('Silakan masukkan nama GitHub.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();

        const languages = {};

        repositories.forEach((repo) => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        displayChart(Object.keys(languages), Object.values(languages));
        document.getElementById('totalVisits').innerText = Object.keys(languages).length;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        alert('Terjadi kesalahan saat mengambil data dari GitHub. Silakan coba lagi.');
    }
}

function displayChart(labels, data) {
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Commits',
                data: data,
                backgroundColor: generateRandomColors(labels.length),
            }],
        },
    });
}

function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        colors.push(color);
    }
    return colors;
}