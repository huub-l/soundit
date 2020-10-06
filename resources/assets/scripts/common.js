export default function common() {
    document.getElementById('gridToggle').addEventListener('click', () => {
        document.getElementById('grid-debug').classList.toggle('visible')
    })
}