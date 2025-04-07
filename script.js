// Fetch the riddle and answer from the API
const fetchRiddle = () => {
    // Delay fetching by a little more than 0.3s (300ms)
    setTimeout(() => {
        fetch('https://riddles-api.vercel.app/random')
        .then(res => res.json())
        .then(data => {
            if ( data.answer.length < 200 && data.riddle.length < 200) {
                document.getElementById('riddleText').textContent = data.riddle
                document.getElementById('answer').textContent = data.answer
            } else {
                fetchRiddle()
            }
        })
        .catch(error => {
            console.error('Error fetching the riddle: ', error)
        })
    }, 350)
}

// Call the fetchRiddle on page load
document.addEventListener('DOMContentLoaded', fetchRiddle)

// Toggle the curtains
const curtains = document.querySelector('.curtains')
curtains.addEventListener('click', () => {
    const leftCurtain = document.querySelector('.left-curtain')
    const rightCurtain = document.querySelector('.right-curtain')

    leftCurtain.classList.toggle('opened')
    rightCurtain.classList.toggle('opened')
})

// When we request a new riddle, close curtains, then fetch riddle
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.querySelector('.left-curtain').classList.remove('opened')
    document.querySelector('.right-curtain').classList.remove('opened')
    document.getElementById('riddleText').textContent = 'Loading the next riddle...'
    document.getElementById('answer').textContent = 'Loading...'
    setTimeout(() => {
        fetchRiddle()
    }, 3000)
})
