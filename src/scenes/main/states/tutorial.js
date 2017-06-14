import {
  EventData,
  Array, // eslint-disable-line
  String, // eslint-disable-line
  delay, debugWarn, debuglog, debugError,
} from 'experiment-js'


// You are not forced to use the Ressourcemanager or the state globals
const intro = {
  title: { en: 'This is the tutorial state' },
  content: {
    en: `
    <h5>Welcome ! 👋🏽 😄 </h5>
    This is a SmartModal, from the experiment-boxes module. Shift+P would show you the ParamBox<br>
    If you click the button below, an "modal_dismissed" event will fire and trigger the next modal to appear<br><br>`,
  },
}

const disclaimer = {
  title: { en: '😬' },
  content: {
    en: `How fun is that !<br>
  Let's do another one ✌🏽😉 `,
  },
}

const trialInstruction = {
  title: { en: 'There is no small examples' },
  content: { en: `<h5>Time to act</h5>
    Try clicking on the little adventurer !<br>
    Check in your console the logs. 👍🏽
    <br>` },
}
const tutorials = {
  disclaimer,
  intro,
  trialInstruction,
}

const pageOrderTutorialOne = ['intro', 'disclaimer', 'trialInstruction']

const awakeTutorial = function () {
  this.stateManager.set('currentPage', 'intro')
  this.stateManager.call('disposeOfButtons')
  const showIntro = new EventData(this.R.get.events_showModal, this.stateManager.timeInMs + 100, { page: 'intro' })
  this.stateManager.addTimeTriggerEvent(showIntro)
}

const showModal = function ({ data: { page = 'intro' } }) {
  if (this.taskObject.currentModal !== null) {
    try {
      this.taskObject.currentModal.modalBox.destroy()
    } catch (e) {
      debugWarn(e)
    }
  }

  // Sometimes modals and divs need some time to place themselves in the DOM, those short delay allow for it
  // TODO hopefully this will get fixed in future version
  delay(50).then(() => {
    if (tutorials.hasOwnProperty(page)) {
      const tutorial = tutorials[page]
      const event = new EventData(this.R.get.events_modalDismissed, { page })
      this.taskObject.modal({ type: 'centralLarge', title: tutorial.title.en, content: tutorial.content.en, event })
    }
  })
}

const showNextPage = function ({ data: { page: currentPage = this.stateManager.get('currentPage', 'intro') } }) {
  const pageOrder = pageOrderTutorialOne

  const currentIndex = pageOrder.indexOf(currentPage)
  if (currentIndex !== -1) {
    if (currentIndex !== pageOrder.length - 1) {
      const showEvent = new EventData(this.R.get.events_showModal, { page: pageOrder[currentIndex + 1] })
      this.stateManager.addEvent(showEvent)
    } else {
      debuglog('state.showNextPage: end of tutorial.')
      this.stateManager.goToState(this.R.get.states_running, true)
    }
  } else {
    debugError('state.showNextPage: invalid currentPage.')
  }
}


export {
awakeTutorial,
showNextPage,
showModal }
