export function openModal(m){
    const modal = document.querySelector(m)
    modal.classList.add("active")
}
export function closeModal(m){
    const modal = document.querySelector(m)
    modal.classList.remove("active")
}