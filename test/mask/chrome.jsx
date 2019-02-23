import { makeTestSuite } from 'zoroaster'
import IdioContext from '../context/Idio'
import RemoteChrome from '../context/RemoteChrome'
import JSXContext from '@depack/context'

export const Chrome = makeTestSuite('test/result/chrome.jsx', {
  /**
   * @param {string} input
   * @param {IdioContext} i
   * @param {RemoteChrome} i
   * @param {JSXContext} i
   */
  async getResults(input, { start }, { Page, Runtime }) {
    const u = await start({
      // jsx
      input,
    }, 5005)
    const url =
    // u.replace('localhost:5005',
    'https://4353fbdc.ngrok.io' //) how to tunnel to docker
    // run proxy server on 9221 that

    await Page.navigate({ url })
    await Page.loadEventFired()
    const res = await Runtime.evaluate({ expression: 'window.idio.format(document.querySelector(\'html body\'), 0).innerHTML.trim()' })
    const { result: { value }, exceptionDetails } = res
    if (exceptionDetails) {
      throw new Error(exceptionDetails.exception.description)
    }
    return `(${value})`
  },
  context: [
    // JSXContext,
    IdioContext,
    RemoteChrome,
    JSXContext,
  ],
})