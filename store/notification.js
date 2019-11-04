export const state = () =>({
    news: 0,
    archive: 0
  })

  export const mutations = {
    updateNews (state, news) {
        state.news = news;
        
    },
    updateArchive (state, archive){
        state.archive = archive;
    }
  }