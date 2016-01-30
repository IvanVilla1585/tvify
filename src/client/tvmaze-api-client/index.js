/**
 * Module Dependencies
 */

import $ from 'jquery'

export function getShows(fn) {
  $.ajax('/api/shows', {
    success: (shows, textStatus, xhr) =>{
       fn(shows)
    }
  })
}

export function searchShows(busqueda, fn) {
  $.ajax('api/search', {
    data: busqueda,
    success: function (shows, textStatus, xhr) {
      fn(shows)
    }
  })
}
