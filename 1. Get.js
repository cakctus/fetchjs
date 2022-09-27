class Movie {
  constructor(debaunce) {
    this.inputSearch = document.getElementById("input")
    this.form = document.getElementById("myForm")
    this.sortForm = document.getElementById("sortForm")
    this.selectMovie = document.getElementById("movie-select")
    this.debaunce = debaunce
    // this.moviesItemContainer = null
    this.loader = false
  }

  promise(url) {
    fetch(url ? url : `http://www.omdbapi.com/?apikey=86b4ca13&s=terminator`)
      .then((response) => response)
      .then((r) => r.json())
      .then((r) => {
        if (r.Response === "True") return r.Search
        if (r.Response === "False") return r.Error
      })

    return fetch(
      url ? url : `http://www.omdbapi.com/?apikey=86b4ca13&s=terminator`
    )
  }

  // buildContainer() {
  // this.moviesItemContainer = document.createElement("div")
  // this.moviesItemContainer.setAttribute("class", "containers")
  // document.body.prepend(this.moviesItemContainer)
  // }

  build({ createElement, classs, id, append }) {
    this.moviesContainer = document.createElement(createElement)
    this.moviesContainer.setAttribute("class", classs)
    this.moviesContainer.setAttribute("id", id)
    if (append === "body") {
      document.body.append(this.moviesContainer)
    } else {
      document.getElementById(append).append(this.moviesContainer)
    }
  }

  buildForm() {
    this.build({
      createElement: "form",
      classs: "sortForm",
      id: "sortForm",
    })

    // <form id="sortForm" action="" onchange="sortMovie()">
    //     <div>
    //         <select name="movie" id="movie-select">
    //             <option value="default">--Sort By:--</option>
    //             <option value="new">New</option>
    //             <option value="old">Old</option>
    //         </select>
    //     </div>
    // </form>
  }

  moviesContainer() {
    this.build({
      createElement: "div",
      classs: "movies-container",
      id: "movies-container",
      append: "body",
    })
  }

  moviesSection() {
    this.build({
      createElement: "section",
      classs: "movies",
      id: "movies",
      append: "movies-container",
    })
  }

  sortItem(arr) {
    this.clearmarkUp(document.getElementById("movies"))
    if (typeof arr === "object") {
      this.sortForm.style.display = "block"
      this.sortForm.style.textAlign = "center"
      arr.forEach((movie) => {
        const article = document.createElement("article")
        const div = document.createElement("div")
        const img = document.createElement("img")
        const footer = document.createElement("footer")
        const span1 = document.createElement("span")
        const span2 = document.createElement("span")

        article.setAttribute("class", "movie-item")

        div.setAttribute("class", "movie-item__img")
        div.setAttribute("id", "movie-item__img")

        img.setAttribute("class", "movie-item__image")
        img.setAttribute("id", "movie-item__image")
        img.src = /^(http|https):\/\//i.test(movie.Poster)
          ? movie.Poster
          : "images/noimage.jpeg"

        footer.setAttribute("class", "movie-item__footer")
        footer.setAttribute("id", "movie-item__footer")

        span1.setAttribute("class", "movie-item__title")
        span1.innerHTML = movie.Title
        span2.setAttribute("class", "movie-item__year")
        span2.innerHTML = movie.Year

        document.getElementById("movies").appendChild(article)
        article.appendChild(div)
        article.appendChild(footer)
        div.appendChild(img)
        footer.append(span1, span2)
      })
    }

    if (typeof arr === "string") {
      const div = document.createElement("div")
      div.innerHTML = "Movie not found"
      document.getElementById("movies").append(div)
      this.sortForm.style.display = "none"
    }
  }

  sort() {
    if (this.arrr) {
      if (document.getElementById("movie-select").value === "new") {
        this.arrr.sort((a, b) => parseInt(b.Year) - parseInt(a.Year))
      }
      if (document.getElementById("movie-select").value === "old") {
        this.arrr.sort((a, b) => parseInt(a.Year) - parseInt(b.Year))
      }

      this.clearmarkUp(document.getElementById("movies"))
      // document.getElementById("movies").innerHTML = this.arrr
      for (let i of this.arrr) {
        const article = document.createElement("article")
        const div = document.createElement("div")
        const img = document.createElement("img")
        const footer = document.createElement("footer")
        const span1 = document.createElement("span")
        const span2 = document.createElement("span")

        article.setAttribute("class", "movie-item")

        div.setAttribute("class", "movie-item__img")
        div.setAttribute("id", "movie-item__img")

        img.setAttribute("class", "movie-item__image")
        img.setAttribute("id", "movie-item__image")
        img.src = /^(http|https):\/\//i.test(i.Poster)
          ? i.Poster
          : "images/noimage.jpeg"

        footer.setAttribute("class", "movie-item__footer")
        footer.setAttribute("id", "movie-item__footer")

        span1.setAttribute("class", "movie-item__title")
        span1.innerHTML = i.Title
        span2.setAttribute("class", "movie-item__year")
        span2.innerHTML = i.Year

        document.getElementById("movies").appendChild(article)
        article.appendChild(div)
        article.appendChild(footer)
        div.appendChild(img)
        footer.append(span1, span2)
      }
    }
    // console.log(this.arrr)
  }

  clearmarkUp(el) {
    el && (el.innerHTML = "")
  }

  urlFunc(e) {
    let enter = e.code === "Enter"
    this.debaunce(
      () => {
        const searchString = e.target.value.trim()
        this.clearmarkUp(document.getElementById("movies"))
        document.getElementById("movie-select").value = "default"
        if (searchString.length > 1 && searchString !== "") {
          fetch(`http://www.omdbapi.com/?apikey=86b4ca13&s=${searchString}`)
            .then((response) => response)
            .then((r) => r.json())
            .then((r) => {
              if (r.Response === "True") return r.Search
              if (r.Response === "False") return r.Error
            })
            .then((r) => {
              this.sortItem(r)
              // document
              //   .getElementById("movie-select")
              //   .addEventListener("change", this.sortItem.bind(this, r))
              // console.log(r)
              this.arrr = [...r]
              return r
              // return this.arrayOfMovie
            })
            // .then((r) => this.sort(r))
            .catch((e) => console.log(e))
        }
      },
      enter ? 200 : 2000
    )
  }

  events() {
    this.inputSearch.addEventListener("keyup", this.urlFunc.bind(this))
    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
    })
    document
      .getElementById("movie-select")
      .addEventListener("change", this.sort.bind(this, this.arrr))
    // document
    //   .getElementById("movie-select")
    //   .addEventListener("change", this.sortItem.bind(this, [1, 2, 3]))
  }

  init() {
    this.promise()
    this.events()
    this.debaunce.bind(this)
    // this.buildContainer()
    this.moviesContainer()
    this.moviesSection()
    // this.movieItem()
    this.sort()
    //this.sortMovie.bind(this)
    // console.log(this.movieItem.bind(this))
    //this.movieItemImage()
  }
}

const debaunce = (() => {
  let timer = null
  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(cb, ms)
  }
})()

const m = new Movie(debaunce)
m.init()

////////////////////////////////////

// const myPromise = (url) =>
//   fetch(url)
//     .then((response) => response)
//     .then((r) => r.json())
//     .then((r) => {
//       if (r.Response === "True") return r.Search
//       if (r.Response === "False") console.log(r.Error)
//     })

// const urlFunc = (e) => {
//   debaunce(() => {
//     const searchString = e.target.value.trim()
//     myPromise(`http://www.omdbapi.com/?apikey=86b4ca13&s=${searchString}`)
//       .then((r) =>
//         r.forEach((element) => {
//           //console.log(element)
//           const div = document.createElement("div")
//           const p = document.createElement("p")
//           const img = document.createElement("img")
//           const year = document.createElement("p")
//           img.src = element.Poster
//           img.width = "250"
//           img.height = "400"
//           p.innerText = element.Title
//           year.innerHTML = element.Year
//           div.append(p, year, img)
//           div.setAttribute("style", "box-shadow: 5px 5px 5px silver; ")
//           document.body.appendChild(div)
//           //document.getElementById("movies").append(div)
//         })
//       )
//       .catch((e) => console.log(e))
//   })
// }

// document.getElementById("input").addEventListener("keyup", urlFunc)

// function urlFunc(e) {
//   debaunce(() => {
//     console.log("s")
//     myPromise(`http://www.omdbapi.com/?apikey=86b4ca13&s=${e.value}`)
//       .then((r) =>
//         r.forEach((element) => {
//           console.log(element)
//           const div = document.createElement("div")
//           const p = document.createElement("p")
//           const img = document.createElement("img")
//           const year = document.createElement("p")
//           img.src = element.Poster
//           img.width = "250"
//           img.height = "400"
//           p.innerText = element.Title
//           year.innerHTML = element.Year
//           div.append(p, year, img)
//           div.setAttribute("style", "box-shadow: 5px 5px 5px silver;")
//           document.body.appendChild(div)
//           //document.getElementById("movies").append(div)
//         })
//       )
//       .catch((e) => console.log(e))
//   }, 2000)
// }

// document.getElementById("a").innerHTML = "movie"
