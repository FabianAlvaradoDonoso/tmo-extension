function addNextChaperButton() {
  const inChapters = document.querySelector('#chapters')

  if (inChapters) {
    // Buscamos el contenedor con id "chapters"
    const title = 'TMO Extension:'
    // Dentro de chapters, buscamos el primer <ul>
    const uls = chapters.querySelectorAll('.upload-link')

    if (uls.length === 0) {
      console.log(title, 'No se encontró capítulos.')
    } else {
      // Obtenemos todos los li
      const liElements = [...uls]

      // Creamos un array de booleans, inicializado en false
      let viewedArray = new Array(liElements.length).fill(false)

      // Recorremos cada <li> para ver si está "viewed"
      liElements.forEach((li, index) => {
        const span = li.querySelector('span.chapter-viewed-icon')

        if (span && span.classList.contains('viewed')) {
          viewedArray[index] = true
        }
      })

      // Obtenemos el primer índice que tenga valor 'true'
      const firstTrueIndex = viewedArray.indexOf(true) - 1
      let targetLi, capNumber, isLast

      if (firstTrueIndex === -1) {
        // estan todos marcados como 'viewed', por lo que seleccionamos el primero
        targetLi = liElements[0]
        isLast = true
      } else if (firstTrueIndex === -2) {
        // no hay ninguno marcado como 'viewed', por lo que seleccionamos el último
        targetLi = liElements[liElements.length - 1]
      } else {
        targetLi = liElements[firstTrueIndex]
      }

      const nombre = targetLi.querySelector('h4').textContent.trim()
      const match = nombre.match(/Capítulo\s+(\d+(?:\.\d+)?)/i)
      if (match) {
        capNumber = match[1]
      } else {
        console.log(title, 'No se encontró el número de capítulo.')
      }

      let finalA = targetLi.querySelectorAll('li.list-group-item')
      if (finalA.length === 0) {
        console.log(title, 'No se encontró el enlace.')
      }

      finalA = finalA[0]
        .querySelector('div')
        .querySelector(':scope > div:nth-child(6)')
        .querySelector('a')

      if (targetLi) {
        // 1. Buscar el botón (o enlace) que dice "Subir capítulo"
        const subirCapituloBtn = Array.from(
          document.querySelectorAll('a')
        ).find((link) => link.textContent.trim() === 'Subir capítulo')

        const textContext = isLast
          ? `Volver a leer ultimo capítulo: ${capNumber}`
          : `Leer siguiente capítulo: ${capNumber}`

        // 2. Si encontramos "Subir capítulo", creamos e insertamos el nuevo botón
        if (subirCapituloBtn) {
          const icon = document.createElement('i')
          icon.classList.add('fa', 'fa-step-forward')

          const nuevoBoton = document.createElement('button')
          nuevoBoton.textContent = ` ${textContext}`
          nuevoBoton.id = 'goToNextChapter'
          nuevoBoton.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block')
          nuevoBoton.addEventListener('click', () => {
            window.open(finalA.href, '_blank')
          })

          // agregar <i> al principio del boton y después el texto
          nuevoBoton.insertAdjacentElement('afterbegin', icon)

          subirCapituloBtn.insertAdjacentElement('afterend', nuevoBoton)
        } else {
          console.log(
            title,
            'No se encontró un enlace con texto "Subir capítulo".'
          )
        }
      } else {
        console.log(title, 'No se encontró ningún <li> en la lista.')
      }
    }
  }
}

function setupChapterNavigation() {
  const buttonNextChapter = document.querySelector('.chapter-next a')
  const buttonPrevChapter = document.querySelector('.chapter-prev a')
  const buttonHome = document.querySelector("a[title='Volver']")
  const buttonGoToNextChapter = document.querySelector('#goToNextChapter')

  document.addEventListener('keydown', (event) => {
    const { key } = event

    switch (key) {
      case 'ArrowRight':
        if (buttonNextChapter) {
          buttonNextChapter.click()
        } else if (buttonHome) {
          buttonHome.click()
        } else if (buttonGoToNextChapter) {
          buttonGoToNextChapter.click()
        }
        break

      case 'ArrowLeft':
        if (buttonPrevChapter) {
          buttonPrevChapter.click()
        }
        break

      case 'v':
      case 'V':
      case 'b':
      case 'B':
        if (buttonHome) {
          buttonHome.click()
        }
        break
    }
  })
}

function insertInstructions() {
  const headerManga = document.querySelector('h4.no-margin')
  const footerManga = document.querySelector(
    '#app > section:nth-child(6) > div'
  )
  const instructionsHTML =
    "<span style='font-weight: normal;'><kbd>←</kbd> Capítulo anterior | <kbd>v</kbd> ó <kbd>b</kbd> para Volver | Capítulo siguiente <kbd>→</kbd></span>"

  const commonStyles = {
    fontSize: '1.5em',
    color: '#fff',
    paddingTop: '8px',
    textAlign: 'center'
  }

  if (headerManga) {
    const topH4 = document.createElement('h4')
    topH4.innerHTML = instructionsHTML
    topH4.classList.add('no-margin')
    Object.assign(topH4.style, commonStyles)
    headerManga.insertAdjacentElement('afterend', topH4)
  }

  if (footerManga) {
    const bottomH4 = document.createElement('h4')
    bottomH4.innerHTML = instructionsHTML
    bottomH4.classList.add('no-margin', 'footer-instructions')
    Object.assign(bottomH4.style, commonStyles)
    footerManga.insertAdjacentElement('beforebegin', bottomH4)
  }
}

;(function main() {
  addNextChaperButton()
  setupChapterNavigation()
  insertInstructions()
})()
