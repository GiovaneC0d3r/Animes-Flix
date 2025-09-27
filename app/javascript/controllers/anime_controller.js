import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["searchInput"]

    connect() {
        this.apiKey = "API_KEY"
        console.log("[Anime] Controller conectado")
        this.resultsFrame = document.getElementById("anime_results")
        this.embedFrame = document.getElementById("anime-embed")

        // Carrega os top 5 animes do Jikan na inicial
        this.loadTopAnimes()
    }

    async translateToEnglish(text) {
        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|en`)
            const data = await res.json()
            console.log("[Anime] Tradução:", text, "=>", data.responseData.translatedText)
            return data.responseData.translatedText || text
        } catch(e) {
            console.error("[Anime] Erro na tradução:", e)
            return text
        }
    }

    async searchListOmdb(query) {
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&s=${encodeURIComponent(query)}`)
            const data = await res.json()
            console.log("[Anime] Resultado OMDb para", query, data)
            return data
        } catch(e) {
            console.error("[Anime] Erro ao buscar OMDb:", e)
            return { Response: "False", Search: [] }
        }
    }

    async search() {
        const query = this.searchInputTarget.value.trim()
        if (!query) return

        console.log("[Anime] Iniciando busca para:", query)
        const translated = await this.translateToEnglish(query)
        const searchData = await this.searchListOmdb(translated)

        if (searchData.Response === "True") {
            this.renderResults(searchData.Search)
        } else {
            this.resultsFrame.innerHTML = `<p>❌ Nenhum resultado encontrado para "${query}"</p>`
            console.warn("[Anime] Nenhum resultado encontrado")
        }
    }

    renderResults(list) {
        if (!this.resultsFrame) return
        console.log("[Anime] Renderizando resultados:", list)
        this.resultsFrame.innerHTML = `
    <div class="grid grid-cols-1 gap-4 w-[20vw]">
      ${list.map(item => this.renderItem(item)).join("")}
    </div>
  `
    }

    renderItem(item) {
        return `
      
      
      <div class="flex flex-col gap-14" onclick="openAnime('${item.imdbID}', '${item.Type}')">
    <div class="h-fit"> <div class="flex flex-col w-fit h-fit gap-2 bg-[#151515] rounded-lg p-2">
        <img src="${item.Poster && item.Poster !== 'N/A' ? item.Poster : ''}" alt="${item.Title}" class="w-full h-[20vw]">
        <h2 class="text-[#FF4500] font-bold">${item.Title}</h2>
          <p><b>Ano:</b> ${item.Year} | <b>Tipo:</b> ${item.Type}</p>

</div></div>
     
</div>
    `
    }

    async loadTopAnimes() {
        console.log("[Anime] Buscando Top 5 animes do Jikan")
        try {
            const res = await fetch("https://api.jikan.moe/v4/top/anime")
            const data = await res.json()
            const top5 = data.data.slice(0,5)

            const omdbPromises = top5.map(a => this.searchListOmdb(a.title))
            const omdbResults = await Promise.all(omdbPromises)

            const validResults = omdbResults
                .filter(r => r.Response === "True")
                .map(r => r.Search[0]) // pegar primeiro resultado OMDb

            if (validResults.length > 0) {
                this.renderResults(validResults)
                // mostra automaticamente o primeiro anime no iframe
                const first = validResults[0]
                console.log("[Anime] Carregando primeiro anime no iframe:", first)
                window.openAnime(first.imdbID, first.Type)
            }
        } catch(e) {
            console.error("[Anime] Erro ao carregar top animes:", e)
        }
    }
}
