import { boot } from 'quasar/wrappers'
import { date } from 'quasar'


export default boot(({ app }) => {
  app.config.globalProperties['date'] = (i) => 
    date.formatDate(i, 'DD-MM-YYYY HH:mm')
})
