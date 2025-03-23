// Get DOM elements

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

// Add event listeners

emotionRadios.addEventListener('change', highlightCheckedOption)
memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)

// Highlights the selected emotion radio option

function highlightCheckedOption(e){

    const radios = document.getElementsByClassName('radio')
    
    // Remove highlight from all radio options

    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    
    // Add highlight to selected radio option

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

// Closes the modal window

function closeModal(){

    memeModal.style.display = 'none'
}

// Renders a cat image in the modal based on selected emotion

function renderCat(){

    const catObject = getSingleCatObject()

    memeModalInner.innerHTML =  
        `<img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`
        
    memeModal.style.display = 'flex'
}

// Returns a single cat object from the matching cats array

function getSingleCatObject(){

    const catsArray = getMatchingCatsArray()
    
    // If only one cat matches, return it

    if (catsArray.length === 1){
        return catsArray[0]
    }

    // Otherwise, return a random cat from the matching array

    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

// Returns an array of cats that match the selected emotion and gif preference

function getMatchingCatsArray(){ 

    if (document.querySelector('input[type="radio"]:checked')){
        
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        // Filter cats based on selected emotion and gif preference

        const matchingCatsArray = catsData.filter(function(cat){

            if (isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else {
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        
        return matchingCatsArray 
    }  
}

// Returns an array of unique emotions from all cats

function getEmotionsArray(cats){

    const emotionsArray = []  
      
    // Loop through each cat and its emotions

    for (let cat of cats){

        for (let emotion of cat.emotionTags){

            // Add emotion to array if it's not already included

            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    
    return emotionsArray
}

// Renders radio buttons for each unique emotion

function renderEmotionsRadios(cats){

    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    
    // Create HTML for each emotion radio button

    for (let emotion of emotions){
        radioItems += 
        `<div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    
    emotionRadios.innerHTML = radioItems
}

// Initialize the emotion radio buttons

renderEmotionsRadios(catsData)


