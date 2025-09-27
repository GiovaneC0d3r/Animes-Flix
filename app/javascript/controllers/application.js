import { Application } from "@hotwired/stimulus"
import * as Turbo from "@hotwired/turbo-rails"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application
window.openAnime = function(imdbID, type) {
    const embed = document.getElementById("anime-embed")
    if (!embed) return

    if (type === "movie") {
        embed.innerHTML = `<iframe class="h-[600px] w-[80vw] absolute right-0" src="https://embed.warezcdn.link/filme/${imdbID}" scrolling="no" allowfullscreen></iframe>`
    } else {

        embed.innerHTML = `
<div class=""><iframe  sandbox="allow-scripts allow-same-origin"  class=" h-[600px] w-[80vw] absolute right-0"  src="https://embed.warezcdn.link/serie/${imdbID}/1/1" scrolling="no" allowfullscreen></iframe>
</div>
`
    }
}

export { application }
