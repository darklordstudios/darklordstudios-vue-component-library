/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImagesStore = defineStore('images', () => {
  // define the store
  const selectedImageUrl = ref('')
  const libraries = ref<any[]>([])
  const folders = ref<any[]>([])
  const files = ref<any[]>([])
  const stockImagePickerUrl = ref(
    'https://hubblecontent.osi.office.net/contentsvc/m365contentpicker/index.html?p=3&app=1001&aud=prod&channel=devmain&setlang=en-US&msel=0&env=prod&premium=1',
  )

  function getFileFromBlob(blob: Blob, fileName: string): File {
    let result: any = null
    try {
      result = new File([blob], fileName)
    } catch (e) {
      result = blob
      result.fileName = fileName
    }
    return result
  }

  async function getImageContentAsFile(
    absoluteFileUrl: string,
    fileName: string,
  ): Promise<File | null> {
    try {
      const result = await fetch(absoluteFileUrl, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!result || !result.ok) {
        console.log('ERROR GETTING IMAGE CONTENT ALPHA')
      }
      const blob: Blob = await result.blob()
      return getFileFromBlob(blob, fileName)
    } catch (e) {
      console.log('ERROR GETTING IMAGE CONTENT BRAVO')
      return null
    }
  }

  function getFileNameFromUrl(itemUrl: string): string {
    const urlTokens = itemUrl.split('?')
    const url = urlTokens[0]
    const tokens = url.split('/')
    const fileName = tokens[tokens.length - 1]
    return fileName
  }

  function getFileNameWithoutExtension(itemUrl: string): string {
    const fn = getFileNameFromUrl(itemUrl)
    const fileName = fn.substring(0, fn.lastIndexOf('.'))
    return fileName
  }

  async function getLibraries(wurl: string): Promise<boolean> {
    // Get the lists for the site selected
    // Assume the pasted site is valid and get the lists. If there is an error, the pasted site is most likely not valid
    // console.log(site.Url + ", " + index)
    const p = new Array<any>()
    const url = wurl + '/_api/web/lists'
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json;odata=verbose',
      },
    })
    console.log('GET LIBRARIES RESPONSE: ' + response)
    const j = response.data.d.results
    for (let i = 0; i < j.length; i++) {
      const hidden = Boolean(j[i].Hidden)
      const catalog = Boolean(j[i].IsCatalog)
      const title = String(j[i].Title)
      const template = String(j[i].BaseTemplate)
      if (!hidden && !catalog) {
        if (template === '101') {
          if (
            title.indexOf('WP') < 0 &&
            title.indexOf('Site Pages') < 0 &&
            title.indexOf('Form Templates') < 0 &&
            title.indexOf('Apps for') < 0
          ) {
            p.push({
              Id: j[i].Id,
              Url: wurl,
              Title: title,
              Folders: [],
            })
          }
        }
      }
    }
    libraries.value = p
    console.log('LIBRARIES FOR SITE COLLECTED: ' + p)
    return true
  }

  return {
    stockImagePickerUrl,
    getImageContentAsFile,
    getFileNameFromUrl,
    getFileNameWithoutExtension,
    selectedImageUrl,
    getLibraries,
    libraries,
    folders,
    files,
  }
})
