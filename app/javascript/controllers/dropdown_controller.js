import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["menu"]

    connect() {
        this.isOpen = false
        document.addEventListener("click", this.outsideClickListener)
    }

    disconnect() {
        document.removeEventListener("click", this.outsideClickListener)
    }

    toggle(event) {
        event.stopPropagation()
        this.isOpen = !this.isOpen
        this.animateMenu()
    }

    close() {
        this.isOpen = false
        this.animateMenu()
    }

    animateMenu() {
        if (this.isOpen) {
            this.menuTarget.classList.remove("hidden", "scale-95", "opacity-0")
            this.menuTarget.classList.add("scale-100", "opacity-100")
        } else {
            this.menuTarget.classList.add("scale-95", "opacity-0")
            setTimeout(() => this.menuTarget.classList.add("hidden"), 150)
        }
    }

    outsideClickListener = (event) => {
        if (!this.element.contains(event.target)) {
            this.close()
        }
    }
}
