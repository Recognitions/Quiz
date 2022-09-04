export function openModal(m){
    const modal = document.getElementById(m)
    modal.classList.add("active")
}
export function closeModal(m){
    const modal = document.getElementById(m)
    modal.classList.remove("active")
}