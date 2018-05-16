const initialState = {
  // prepareCreate: {},
  prepareCreate: {
    name: "Writers and Authors",
    category: "Media and Communication",
    info: {
      COG: { min: 51.565415738, max: 62.034584261999996 },
      CPN: { min: 40.13602222305, max: 62.30300217075 },
      LOM
        :
        { min: 20.84897999465, max: 29.15102000535 },
      PCS
        :
        { min: 55.8087662441, max: 61.827256272499994 },
      PEW
        :
        { min: 58.08515422095, max: 63.06869193505 },
      PIS
        :
        { min: 23.59391072755, max: 33.254119298250004 },
      PPM
        :
        { min: 23.788582512799998, max: 34.0913424398 },
      SMC
        :
        { min: 72.7832242657, max: 77.2167757343 },
      WCEO
        :
        { min: 18.40573161555, max: 27.87204616445 },
      WIAM
        :
        { min: 65.78431894575, max: 80.49345883425 },
      WICH
        :
        { min: 22.06153577005, max: 35.21624200995 },
      WPAM
        :
        { min: 48.6927089936, max: 53.2517354464 },
      WPPM
        :
        { min: 16.05117564975, max: 19.22660213025 },
      name
        :
        "Writers and Authors",
      tags
        :
        "Account Executive, Advertising Associate, Advertising Copy Writer, Advertising Writer, Author, Book Reviewer, Communications Specialist, Copy Writer, Copywriter, Creative Writer, Documentary Script Writer, Freelance Journalist, Freelance Copywriter, Freelance Writer, Librettist, Lyricist, Novelist, Production Director, Songwriter, Web Content Writer",
    }
  },
  searchPosition: '',
  positionData: []
}

const Positions = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_POSITIONS_DATA':
      return {
        ...state,
        positionData: [...action.data]
      }
    case 'SEARCH_POSITION':
      return {
        ...state,
        searchPosition: action.data
      }
    case 'PREPRARE_CREATE':
      return {
        ...state,
        prepareCreate: action.data
      }
    default:
      return state
  }
}

export default Positions