import { writable } from 'svelte/store'
import appContent from './content.yaml'

const APP_STATES = appContent.calculators.map((panel) => panel.name)
APP_STATES.push('Play')

export const appState = writable(APP_STATES[0])

export function nextAppState() {
  appState.update((state) => APP_STATES[APP_STATES.indexOf(state) + 1])
}
