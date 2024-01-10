async function searchGithub() {
    const username = document.getElementById('githubUsername').value;

    if (!username) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Silakan masukkan nama GitHub.',
            zIndex: 9999
        });
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Terjadi kesalahan saat mengambil data dari GitHub. Silakan coba lagi.',
            zIndex: 9999
        });
    }
}

function displayChart(labels, data) {
    const canvas = document.getElementById('chart');
    const ctx = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 200;

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Commits',
                data: data,
                backgroundColor: generateTwoColors(labels.length)
            }],
        },
        options: {
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'lightGreen',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: 'rgba(168, 114, 247, 1)',
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                    },
                    grid: {
                        color: 'rgba(68, 147, 219, 1)',
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }
        }
    });
}

function generateTwoColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
            colors.push('#4197DB');
        } else {
            colors.push('#AA71F6');
        }
    }
    return colors;
}